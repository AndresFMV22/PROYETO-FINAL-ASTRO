export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  date: string;
  cardholderName: string;
  status?: string;
}

const STATUSES = ['Confirmado', 'En preparacion', 'Enviado', 'Entregado'];

const CART_PREFIX = 'liquidsky-cart';
const ORDERS_KEY = 'liquidsky-orders';

import { getSession } from './auth';

// --- User-scoped key: cada usuario tiene su propio carrito en localStorage ---

function getCartKey(): string {
  const session = getSession();
  return session?.id ? `${CART_PREFIX}-${session.id}` : CART_PREFIX;
}

function isUuid(v: any): boolean {
  return typeof v === 'string' && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v);
}

function cleanItems(items: CartItem[]): CartItem[] {
  return items.filter(i => i.id && isUuid(i.id));
}

function getItems(): CartItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(getCartKey());
    const items: CartItem[] = raw ? JSON.parse(raw) : [];
    return cleanItems(items);
  } catch {
    return [];
  }
}

function save(items: CartItem[]): void {
  localStorage.setItem(getCartKey(), JSON.stringify(items));
  dispatchEvent(new CustomEvent('cart-update'));
}

export function addItem(item: Omit<CartItem, 'quantity'>): void {
  if (!item.id || !isUuid(item.id)) {
    console.error('[Cart] ID de producto invalido:', item.id);
    return;
  }
  const items = getItems();
  const existing = items.find(i => i.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ ...item, quantity: 1 });
  }
  save(items);
}

export function removeItem(id: string): void {
  const items = getItems().filter(i => i.id !== id);
  save(items);
}

export function updateQuantity(id: string, quantity: number): void {
  if (quantity <= 0) return removeItem(id);
  const items = getItems();
  const item = items.find(i => i.id === id);
  if (item) item.quantity = quantity;
  save(items);
}

export function getTotalItems(): number {
  return getItems().reduce((sum, i) => sum + i.quantity, 0);
}

export function getTotalPrice(): number {
  return getItems().reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function clearCart(): void {
  localStorage.removeItem(getCartKey());
  dispatchEvent(new CustomEvent('cart-update'));
}

export { getItems };

// --- Orders ---

function generateId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
}

export function addOrder(items: CartItem[], total: number, cardholderName: string): void {
  const session = getSession();
  const orders = getOrders();
  orders.unshift({
    id: generateId(),
    userId: session?.id || 'guest',
    items: items.map(i => ({ ...i })),
    total,
    date: new Date().toISOString(),
    cardholderName,
    status: 'Confirmado',
  });
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  dispatchEvent(new CustomEvent('orders-update'));
}

export function updateOrderStatus(orderId: string, status: string): void {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order && STATUSES.includes(status)) {
    order.status = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    dispatchEvent(new CustomEvent('orders-update'));
  }
}

export { STATUSES };

export function getOrders(userId?: string): Order[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const all: Order[] = raw ? JSON.parse(raw) : [];
    return userId ? all.filter(o => o.userId === userId) : all;
  } catch {
    return [];
  }
}

// --- Manejo del ciclo de vida de sesion ---

export function migrateCartOnLogin(userId: string): void {
  const guestKey = CART_PREFIX;
  const userKey = `${CART_PREFIX}-${userId}`;
  try {
    const rawGuest = localStorage.getItem(guestKey);
    const rawUser = localStorage.getItem(userKey);
    const guestItems: CartItem[] = rawGuest ? cleanItems(JSON.parse(rawGuest)) : [];
    const userItems: CartItem[] = rawUser ? cleanItems(JSON.parse(rawUser)) : [];
    const existingIds = new Set(userItems.map(i => i.id));
    const merged = [...userItems, ...guestItems.filter(gi => !existingIds.has(gi.id))];
    if (merged.length > 0 || guestItems.length > 0) {
      localStorage.setItem(userKey, JSON.stringify(merged));
    }
    localStorage.removeItem(guestKey);
    dispatchEvent(new CustomEvent('cart-update'));
  } catch {}
}

export function clearUserCart(userId: string): void {
  const userKey = `${CART_PREFIX}-${userId}`;
  localStorage.removeItem(userKey);
  localStorage.removeItem(CART_PREFIX);
  dispatchEvent(new CustomEvent('cart-update'));
}

// Escucha cambios de sesion para migrar/limpiar carrito automaticamente
if (typeof window !== 'undefined') {
  window.addEventListener('session-update', (e: Event) => {
    const detail = (e as CustomEvent).detail;
    const session = getSession();
    if (session) {
      migrateCartOnLogin(session.id);
    } else if (detail?.userId) {
      clearUserCart(detail.userId);
    }
  });
}

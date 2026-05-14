export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  cardholderName: string;
  status?: string;
}

const STATUSES = ['Confirmado', 'En preparacion', 'Enviado', 'Entregado'];

const CART_KEY = 'liquidsky-cart';
const ORDERS_KEY = 'liquidsky-orders';

function getItems(): CartItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  dispatchEvent(new CustomEvent('cart-update'));
}

export function addItem(item: Omit<CartItem, 'quantity'>): void {
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
  localStorage.removeItem(CART_KEY);
  dispatchEvent(new CustomEvent('cart-update'));
}

export { getItems };

// --- Orders ---

export function addOrder(items: CartItem[], total: number, cardholderName: string): void {
  const orders = getOrders();
  orders.unshift({
    id: crypto.randomUUID(),
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

export function getOrders(): Order[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string | null;
  category: string;
  addedAt: string;
}

const PREFIX = 'liquidsky-wishlist';

import { getSession } from './auth';

function isUuid(v: any): boolean {
  return typeof v === 'string' && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v);
}

function getKey(): string {
  const session = getSession();
  return session?.id ? `${PREFIX}-${session.id}` : PREFIX;
}

function getItems(): WishlistItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(getKey());
    const items: WishlistItem[] = raw ? JSON.parse(raw) : [];
    return items.filter(i => i.id && isUuid(i.id));
  } catch { return []; }
}

function save(items: WishlistItem[]): void {
  localStorage.setItem(getKey(), JSON.stringify(items));
  dispatchEvent(new CustomEvent('wishlist-update'));
}

export function toggleItem(item: Omit<WishlistItem, 'addedAt'>): void {
  if (!isUuid(item.id)) return;
  const items = getItems();
  const existing = items.find(i => i.id === item.id);
  if (existing) {
    save(items.filter(i => i.id !== item.id));
  } else {
    items.push({ ...item, addedAt: new Date().toISOString() });
    save(items);
  }
}

export function isInWishlist(id: string): boolean {
  if (!isUuid(id)) return false;
  return getItems().some(i => i.id === id);
}

export function removeFromWishlist(id: string): void {
  save(getItems().filter(i => i.id !== id));
}

export function getWishlistItems(): WishlistItem[] {
  return getItems();
}

export function getWishlistCount(): number {
  return getItems().length;
}

function migrateOnLogin(userId: string): void {
  const guestKey = PREFIX;
  const userKey = `${PREFIX}-${userId}`;
  try {
    const rawGuest = localStorage.getItem(guestKey);
    const rawUser = localStorage.getItem(userKey);
    const guestItems: WishlistItem[] = rawGuest ? JSON.parse(rawGuest).filter((i: any) => i && isUuid(i.id)) : [];
    const userItems: WishlistItem[] = rawUser ? JSON.parse(rawUser).filter((i: any) => i && isUuid(i.id)) : [];
    const existingIds = new Set(userItems.map(i => i.id));
    const merged = [...userItems, ...guestItems.filter(gi => !existingIds.has(gi.id))];
    if (merged.length > 0 || guestItems.length > 0) {
      localStorage.setItem(userKey, JSON.stringify(merged));
    }
    localStorage.removeItem(guestKey);
    dispatchEvent(new CustomEvent('wishlist-update'));
  } catch {}
}

function clearUserWishlist(userId: string): void {
  localStorage.removeItem(`${PREFIX}-${userId}`);
  localStorage.removeItem(PREFIX);
  dispatchEvent(new CustomEvent('wishlist-update'));
}

if (typeof window !== 'undefined') {
  window.addEventListener('session-update', (e: Event) => {
    const detail = (e as CustomEvent).detail;
    const session = getSession();
    if (session) {
      migrateOnLogin(session.id);
    } else if (detail?.userId) {
      clearUserWishlist(detail.userId);
    }
  });
}

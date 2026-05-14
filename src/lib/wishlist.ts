export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string | null;
  category: string;
  addedAt: string;
}

const KEY = 'liquidsky-wishlist';

function getItems(): WishlistItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function save(items: WishlistItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
  dispatchEvent(new CustomEvent('wishlist-update'));
}

export function toggleItem(item: Omit<WishlistItem, 'addedAt'>): void {
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

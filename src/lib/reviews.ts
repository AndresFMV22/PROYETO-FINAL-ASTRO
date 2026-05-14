export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const KEY = 'liquidsky-reviews';

function isUuid(v: string): boolean {
  return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v);
}

function getAll(): Review[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    const reviews: Review[] = raw ? JSON.parse(raw) : [];
    const valid = reviews.filter(r => isUuid(r.productId));
    if (valid.length !== reviews.length) {
      save(valid);
    }
    return valid;
  } catch { return []; }
}

function save(reviews: Review[]): void {
  localStorage.setItem(KEY, JSON.stringify(reviews));
}

function generateId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
}

export function addReview(productId: string, userId: string, userName: string, rating: number, comment: string): Review {
  if (!isUuid(productId)) {
    console.error('[Reviews] productId invalido:', productId);
    throw new Error('ID de producto invalido');
  }
  const reviews = getAll();
  const review: Review = {
    id: generateId(),
    productId,
    userId,
    userName,
    rating,
    comment,
    date: new Date().toISOString(),
  };
  reviews.unshift(review);
  save(reviews);
  return review;
}

export function getReviewsForProduct(productId: string): Review[] {
  return getAll().filter(r => r.productId === productId);
}

export function getAverageRating(productId: string): { average: number; count: number } {
  const reviews = getReviewsForProduct(productId);
  if (reviews.length === 0) return { average: 0, count: 0 };
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  return { average: sum / reviews.length, count: reviews.length };
}

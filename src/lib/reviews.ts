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

function getAll(): Review[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function save(reviews: Review[]): void {
  localStorage.setItem(KEY, JSON.stringify(reviews));
}

export function addReview(productId: string, userId: string, userName: string, rating: number, comment: string): Review {
  const reviews = getAll();
  const review: Review = {
    id: crypto.randomUUID(),
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

export interface Customer {
  id: string;
  name: string;
  email: string;
  password: string;
  registeredAt: string;
}

export interface Session {
  id: string;
  name: string;
  email: string;
}

const CUSTOMERS_KEY = 'liquidsky-customers';
const SESSION_KEY = 'liquidsky-session';

function generateId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
}

function getCustomers(): Customer[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOMERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCustomers(customers: Customer[]): void {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
}

export function signup(name: string, email: string, password: string): { ok: boolean; error?: string } {
  const customers = getCustomers();
  if (customers.find(c => c.email === email)) {
    return { ok: false, error: 'Este email ya está registrado' };
  }
  const customer: Customer = {
    id: generateId(),
    name,
    email,
    password,
    registeredAt: new Date().toISOString(),
  };
  customers.push(customer);
  saveCustomers(customers);
  setSession({ id: customer.id, name: customer.name, email: customer.email });
  return { ok: true };
}

export function login(email: string, password: string): { ok: boolean; error?: string } {
  const customers = getCustomers();
  const customer = customers.find(c => c.email === email && c.password === password);
  if (!customer) {
    return { ok: false, error: 'Email o contraseña incorrectos' };
  }
  setSession({ id: customer.id, name: customer.name, email: customer.email });
  return { ok: true };
}

export function logout(): void {
  const session = getSession();
  localStorage.removeItem(SESSION_KEY);
  dispatchEvent(new CustomEvent('session-update', { detail: { userId: session?.id } }));
}

function setSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  dispatchEvent(new CustomEvent('session-update'));
}

export function getSession(): Session | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function getCustomerById(id: string): Customer | undefined {
  return getCustomers().find(c => c.id === id);
}

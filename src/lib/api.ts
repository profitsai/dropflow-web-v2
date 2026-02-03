const API_URL = import.meta.env.VITE_API_URL || 'https://dropflow-production.up.railway.app';

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

// Products
export async function getProducts() {
  return fetchApi<{ items: Product[] }>('/api/products');
}

export async function importProduct(url: string) {
  return fetchApi<{ success: boolean; product?: Product; error?: string }>('/api/import', {
    method: 'POST',
    body: JSON.stringify({ url }),
  });
}

// Orders
export async function getOrders() {
  return fetchApi<{ items: Order[] }>('/api/orders');
}

// Listings
export async function getListings() {
  return fetchApi<{ items: Listing[] }>('/api/listings');
}

// eBay Auth
export async function getEbayAuthUrl() {
  return fetchApi<{ url: string }>('/api/ebay/authorize');
}

export async function getEbayMe() {
  return fetchApi<{ user: EbayUser }>('/api/ebay/me');
}

// Types
export interface Product {
  id: string;
  name: string;
  sku: string;
  source: string;
  price: number;
  cost: number;
  stock: number;
  status: string;
  imageUrl?: string;
  sourceUrl?: string;
}

export interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: string;
  tracking?: string;
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  quantity: number;
  status: string;
}

export interface EbayUser {
  username: string;
  email: string;
}

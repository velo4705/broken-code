export interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  image?: string;
  description?: string;
  stripe_price_id?: string;
  price_id?: string;
  category?: string;
  created_at?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

export interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface StripeCheckoutItem {
  name: string;
  price: number;
  image_url?: string;
  quantity: number;
}

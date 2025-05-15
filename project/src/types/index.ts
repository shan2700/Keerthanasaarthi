export interface PlateDecor {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  style: string;
  occasion: string[];
  available: boolean;
  rating: number;
  reviews: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Booking {
  id: string;
  userId: string;
  plateDecorId: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface CartItem {
  plateDecor: PlateDecor;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}
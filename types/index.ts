import { z } from 'zod'
import type { CartItem } from "@/hooks/cartSlice"; // importing here


// this is the auth state that we will use in our redux store
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  role: 'admin' | 'user' | null;
  authInitialized: boolean; // check if the auth state has been initialized 
}

// this is the user type that we will get from the backend after login
export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  role: 'admin' | 'user';
};

// // this is going to be our login response 
// export type LoginResponse = {
//   id: number;
//   username: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   gender: string;
//   image: string;
//   role: 'admin' | 'moderator' | 'user';
 
//   refreshToken: string;
// };

// main login page.tsx 

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(4, 'Password must be at least 4 chars'),
})

export type LoginFormData = z.infer<typeof loginSchema>


export type Product = {
  id: number;
  title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

// this is the ProductsState
export interface ProductsState {
  items: Product[]
  selected: Product | null
  loading: boolean
  error: string | null
  page: number     
  limit: number      
  total: number   
  sortBy : string | null
  order : string | null  
}


export const filters = [
  { label: "📱 Smartphones", value: "smartphones", description: "Latest phones from top brands." },
  { label: "💻 Laptops", value: "laptops", description: "Portable laptops for work and study." },
  { label: "🧴 Skin Care", value: "skincare", description: "Top skincare products and beauty essentials." },
  { label: "🕶️ Sunglasses", value: "sunglasses", description: "Stylish shades for every look." },
  { label: "👚 Tops", value: "tops", description: "T-shirts, blouses, and casual tops." },
  { label: "🌸 Fragrances", value: "fragrances", description: "Perfumes and scents for all styles." },
  { label: "🪑 Furniture", value: "furniture", description: "Home furniture and decor items." },
  { label: "🛒 Groceries", value: "groceries", description: "Pantry and everyday essentials." },
]

export type Order = {
  id: string;              // unique order ID
  userId: number;          // from logged-in user
  username: string;        // from user profile
  items: CartItem[];       // products in cart
  total: number;           // sum of price * quantity
  status: "pending" | "received"; // default "pending"
  createdAt: string;       // timestamp
}


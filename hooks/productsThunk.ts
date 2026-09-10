import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts , getProductById , searchProducts , getProductsByCategory , getSortedProducts  } from '@/services/products'
import type { Product } from '@/types'

// fetch all products with pagination
export const fetchProducts = createAsyncThunk<
  { products: Product[]; total: number },
  { limit?: number; skip?: number; sortBy?: string; order?: string }
>(
  "products/fetchProducts",
  async ({ limit = 20, skip = 0, sortBy, order }) => {
    const response = await getProducts(limit, skip, sortBy, order)
    return { products: response.products, total: response.total }
  }
)


// fetch single product by id
export const fetchProductById = createAsyncThunk<Product, string>(
  "products/fetchProductById",
  async (id: string) => {
    const response = await getProductById(id)
    return response            // dummyjson returns a single product object
  }
)

// search products
export const searchProductsThunk = createAsyncThunk<
  { products: Product[]; total: number },
  string
>(
  "products/searchProducts",
  async (query) => {
    const response = await searchProducts(query)
    return { products: response.products, total: response.total }
  }
)

// fetch category products with pagination
export const fetchCategoryThunk = createAsyncThunk<
  { products: Product[]; total: number },
  { category: string; limit?: number; skip?: number; sortBy?: string; order?: string }
>(
  "products/fetchCategory",
  async ({ category, limit = 20, skip = 0, sortBy, order }) => {
    const response = await getProductsByCategory(category, limit, skip, sortBy, order)
    return { products: response.products, total: response.total }
  }
)

// SORT products
export const fetchSortedProducts = createAsyncThunk<Product[], {sortBy: string , order: string , category?: string}>(
  'products/fetchSortedProducts',

    async ({sortBy , order , category}) => {
    const response = await getSortedProducts(sortBy , order , category)
    return response.products || []
  }
)
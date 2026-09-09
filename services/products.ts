import axios from "axios"

const API_URL = "https://dummyjson.com"

// fetch products with pagination + optional sort
export const getProducts = async (
  limit = 20,
  skip = 0,
  sortBy?: string,
  order?: string
) => {
  let url = `${API_URL}/products?limit=${limit}&skip=${skip}`
  if (sortBy && order) url += `&sortBy=${sortBy}&order=${order}`
  const response = await axios.get(url)
  return response.data
}

// fetch products by category with pagination + optional sort
export const getProductsByCategory = async (
  category: string,
  limit = 20,
  skip = 0,
  sortBy?: string,
  order?: string
) => {
  let url = `${API_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
  if (sortBy && order) url += `&sortBy=${sortBy}&order=${order}`
  const response = await axios.get(url)
  return response.data
}

// single product detail
export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/products/${id}`)
  return response.data
}

// search products
export const searchProducts = async (query: string) => {
  const response = await axios.get(`${API_URL}/products/search?q=${query}`)
  return response.data
}

// sort products (standalone)
export const getSortedProducts = async (
  sortBy: string,
  order: string,
  category?: string
) => {
  const url = category
    ? `${API_URL}/products/category/${category}?sortBy=${sortBy}&order=${order}`
    : `${API_URL}/products?sortBy=${sortBy}&order=${order}`
  const response = await axios.get(url)
  return response.data
}

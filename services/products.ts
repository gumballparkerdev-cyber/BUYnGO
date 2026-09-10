import axios from "axios"

const API_URL = "/api";

// fetch products
export const getProducts = async (limit = 20, skip = 0, sortBy?: string, order?: string) => {
  let url = `${API_URL}/products?limit=${limit}&skip=${skip}`;
  if (sortBy && order) url += `&sortBy=${sortBy}&order=${order}`;
  const response = await axios.get(url);
  
  return { products: response.data.products, total: response.data.total };
};

// fetch category
export const getProductsByCategory = async (category: string, limit = 20, skip = 0, sortBy?: string, order?: string) => {
  let url = `${API_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
  if (sortBy && order) url += `&sortBy=${sortBy}&order=${order}`;
  const response = await axios.get(url);
  
  return { products: response.data.products, total: response.data.total };
};

// single product
export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};


// search
export const searchProducts = async (query: string) => {
  const response = await axios.get(`${API_URL}/products/search?q=${query}`);
  return { products: response.data.products, total: response.data.total };
};


// sort products (standalone)
export const getSortedProducts = async (sortBy: string, order: string, category?: string) => {
  const url = category
    ? `${API_URL}/products/category/${category}?sortBy=${sortBy}&order=${order}`
    : `${API_URL}/products?sortBy=${sortBy}&order=${order}`;
  const response = await axios.get(url);

  return { products: response.data.products, total: response.data.total };
};


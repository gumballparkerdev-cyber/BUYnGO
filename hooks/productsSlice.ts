import { createSlice } from '@reduxjs/toolkit'
import type { Product , ProductsState } from '@/types'
import { fetchProducts , fetchProductById , searchProductsThunk , fetchCategoryThunk , fetchSortedProducts } from './productsThunk'



const initialState: ProductsState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
  page: 1,   
  limit: 20, 
  total: 0 ,
  sortBy: null, 
  order: null   
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearItems: (state) => { state.items = [] },
    setPage: (state, action) => { state.page = action.payload },
    setSort: (state, action) => {
      state.sortBy = action.payload.sortBy
      state.order = action.payload.order
    },
    clearFilters: (state) => {
      state.page = 1
      state.sortBy = null
      state.order = null
      state.items = []
    }
  },


  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.products
        state.total = action.payload.total
      })

      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to fetch products'
      })

       // fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
        state.selected = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.selected = action.payload
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false
        state.error = "Failed to fetch product by id"
      })

      // search the products
      .addCase(searchProductsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload // ✅ replace items with search results
      })
      .addCase(searchProductsThunk.rejected, (state) => {
        state.loading = false
        state.error = "Failed to search products"
      })


      // products by category
      .addCase(fetchCategoryThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategoryThunk.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.products
        state.total = action.payload.total
      })
      .addCase(fetchCategoryThunk.rejected, (state) => {
        state.loading = false
        state.error = "Failed to fetch products by category"
      })

            // search the products
      .addCase(fetchSortedProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSortedProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload || []
      })
      .addCase(fetchSortedProducts.rejected, (state) => {
        state.loading = false
        state.error = "Failed to sort products"
      })
  },
})

export const { clearItems , setPage , setSort , clearFilters } = productSlice.actions
export default productSlice.reducer

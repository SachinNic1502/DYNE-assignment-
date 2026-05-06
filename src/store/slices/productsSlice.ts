import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: number
  name: string
  description?: string
  price: number
  discount: number
  sku: string
  stock: number
  categoryId: number
  category: {
    id: number
    name: string
  }
  averageRating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

interface ProductsState {
  products: Product[]
  categories: Array<{ id: number; name: string; _count: { products: number } }>
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
  filters: {
    search: string
    category: string
    minRating: number | undefined
  }
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
  filters: {
    search: '',
    category: '',
    minRating: undefined,
  },
}

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: {
    page?: number
    limit?: number
    search?: string
    category?: string
    minRating?: number
  }) => {
    const queryParams = new URLSearchParams()
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())
    if (params.search) queryParams.append('search', params.search)
    if (params.category) queryParams.append('category', params.category)
    if (params.minRating) queryParams.append('minRating', params.minRating.toString())

    const response = await fetch(`/api/products?${queryParams}`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetch('/api/categories')
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    return response.json()
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.pagination = action.payload.pagination
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch categories'
      })
  },
})

export const { setFilters, clearFilters, setPage } = productsSlice.actions
export default productsSlice.reducer

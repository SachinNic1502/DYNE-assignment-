import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface AnalyticsData {
  productsPerCategory: Array<{ name: string; _count: { products: number } }>
  topReviewedProducts: Array<{ name: string; reviewCount: number }>
  discountDistribution: Array<{ range: string; count: number }>
  categoryWiseRatings: Array<{ category: string; averageRating: number; reviewCount: number }>
}

interface AnalyticsState {
  data: AnalyticsData
  loading: boolean
  error: string | null
}

const initialState: AnalyticsState = {
  data: {
    productsPerCategory: [],
    topReviewedProducts: [],
    discountDistribution: [],
    categoryWiseRatings: [],
  },
  loading: false,
  error: null,
}

// Async thunks
export const fetchProductsPerCategory = createAsyncThunk(
  'analytics/fetchProductsPerCategory',
  async () => {
    const response = await fetch('/api/analytics/products-per-category')
    if (!response.ok) {
      throw new Error('Failed to fetch products per category')
    }
    return response.json()
  }
)

export const fetchTopReviewedProducts = createAsyncThunk(
  'analytics/fetchTopReviewedProducts',
  async () => {
    const response = await fetch('/api/analytics/top-reviewed-products')
    if (!response.ok) {
      throw new Error('Failed to fetch top reviewed products')
    }
    return response.json()
  }
)

export const fetchDiscountDistribution = createAsyncThunk(
  'analytics/fetchDiscountDistribution',
  async () => {
    const response = await fetch('/api/analytics/discount-distribution')
    if (!response.ok) {
      throw new Error('Failed to fetch discount distribution')
    }
    return response.json()
  }
)

export const fetchCategoryWiseRatings = createAsyncThunk(
  'analytics/fetchCategoryWiseRatings',
  async () => {
    const response = await fetch('/api/analytics/category-wise-ratings')
    if (!response.ok) {
      throw new Error('Failed to fetch category wise ratings')
    }
    return response.json()
  }
)

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Products per category
      .addCase(fetchProductsPerCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsPerCategory.fulfilled, (state, action) => {
        state.loading = false
        state.data.productsPerCategory = action.payload
      })
      .addCase(fetchProductsPerCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products per category'
      })
      // Top reviewed products
      .addCase(fetchTopReviewedProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTopReviewedProducts.fulfilled, (state, action) => {
        state.loading = false
        state.data.topReviewedProducts = action.payload
      })
      .addCase(fetchTopReviewedProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch top reviewed products'
      })
      // Discount distribution
      .addCase(fetchDiscountDistribution.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDiscountDistribution.fulfilled, (state, action) => {
        state.loading = false
        state.data.discountDistribution = action.payload
      })
      .addCase(fetchDiscountDistribution.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch discount distribution'
      })
      // Category wise ratings
      .addCase(fetchCategoryWiseRatings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategoryWiseRatings.fulfilled, (state, action) => {
        state.loading = false
        state.data.categoryWiseRatings = action.payload
      })
      .addCase(fetchCategoryWiseRatings.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch category wise ratings'
      })
  },
})

export default analyticsSlice.reducer

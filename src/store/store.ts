import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import analyticsReducer from './slices/analyticsSlice'
import uploadReducer from './slices/uploadSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    analytics: analyticsReducer,
    upload: uploadReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

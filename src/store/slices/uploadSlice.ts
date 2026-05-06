import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface UploadResult {
  categories: number
  products: number
  reviews: number
  errors: string[]
}

interface UploadState {
  loading: boolean
  error: string | null
  result: UploadResult | null
}

const initialState: UploadState = {
  loading: false,
  error: null,
  result: null,
}

// Async thunk for file upload
export const uploadFile = createAsyncThunk(
  'upload/uploadFile',
  async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload file')
    }

    return response.json()
  }
)

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    clearResult: (state) => {
      state.result = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true
        state.error = null
        state.result = null
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false
        state.result = action.payload.results
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to upload file'
        state.result = null
      })
  },
})

export const { clearResult } = uploadSlice.actions
export default uploadSlice.reducer

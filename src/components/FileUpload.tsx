'use client'

import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile, clearResult } from '@/store/slices/uploadSlice'
import {
  Box,
  Button,
  Paper,
  Typography,
  Alert,
  LinearProgress,
} from '@mui/material'
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material'
import { AppDispatch, RootState } from '@/store/store'

export default function FileUpload() {
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state: RootState) => state.upload.loading)
  const error = useSelector((state: RootState) => state.upload.error)
  const result = useSelector((state: RootState) => state.upload.result)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      dispatch(uploadFile(e.dataTransfer.files[0]))
    }
  }, [dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      dispatch(uploadFile(e.target.files[0]))
    }
  }

  const handleClear = () => {
    dispatch(clearResult())
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload Product Data
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Upload a CSV or Excel file containing product data with categories and reviews.
      </Typography>

      {loading && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Processing file...
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {result && (
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
          action={
            <Button size="small" onClick={handleClear}>
              Clear
            </Button>
          }
        >
          <Typography variant="body2">
            Successfully imported: {result.categories} categories, {result.products} products, {result.reviews} reviews
          </Typography>
          {result.errors.length > 0 && (
            <Typography variant="caption" color="text.secondary">
              {result.errors.length} errors occurred during import
            </Typography>
          )}
        </Alert>
      )}

      <Box
        sx={{
          border: `2px dashed ${dragActive ? 'primary.main' : 'grey.300'}`,
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          bgcolor: dragActive ? 'primary.50' : 'grey.50',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          accept=".csv,.xlsx,.xls"
          onChange={handleChange}
          style={{ display: 'none' }}
          disabled={loading}
        />
        <label htmlFor="file-upload">
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {dragActive ? 'Drop file here' : 'Drag & drop file here'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            or click to select file
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Supported formats: CSV, Excel (.xlsx, .xls)
          </Typography>
        </label>
      </Box>

      {!loading && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Choose File
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleChange}
              style={{ display: 'none' }}
            />
          </Button>
        </Box>
      )}
    </Paper>
  )
}

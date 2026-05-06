'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

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

interface ProductsTableProps {
  products: Product[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
  onPageChange: (page: number) => void
  onSearch: (search: string) => void
  onFilterChange: (filters: { category: string; minRating: number | undefined }) => void
  categories: Array<{ id: number; name: string }>
}

export default function ProductsTable({
  products,
  loading,
  error,
  pagination,
  onPageChange,
  onSearch,
  onFilterChange,
  categories,
}: ProductsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [minRating, setMinRating] = useState<number | undefined>(undefined)
  const [isSearching, setIsSearching] = useState(false)
  const isInitialLoad = useRef(true)

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }
    
    setIsSearching(true)
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm)
      setIsSearching(false)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, onSearch])

  useEffect(() => {
    onFilterChange({ category: selectedCategory, minRating })
  }, [selectedCategory, minRating, onFilterChange])

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage + 1)
  }


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ p: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', bgcolor: 'background.paper' }}>
        <TextField
          size="small"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              endAdornment: (isSearching || loading) && <CircularProgress size={20} color="inherit" />,
            }
          }}
          sx={{ minWidth: { xs: '100%', sm: 260 } }}
        />
        
        <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 180 } }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 150 } }}>
          <InputLabel>Min Rating</InputLabel>
          <Select
            value={minRating || ''}
            label="Min Rating"
            onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : undefined)}
          >
            <MenuItem value="">All Ratings</MenuItem>
            <MenuItem value={1}>1+ Stars</MenuItem>
            <MenuItem value={2}>2+ Stars</MenuItem>
            <MenuItem value={3}>3+ Stars</MenuItem>
            <MenuItem value={4}>4+ Stars</MenuItem>
            <MenuItem value={5}>5 Stars</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Category</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>Price</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>Discount</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>Stock</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary' }}>Rating</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary' }}>Reviews</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>SKU</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                  <CircularProgress size={32} sx={{ mb: 2 }} />
                  <Typography color="text.secondary">Loading products...</Typography>
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                  <Typography color="text.secondary">No products found matching your criteria</Typography>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {product.name}
                      </Typography>
                      {product.description && (
                        <Typography variant="caption" color="text.secondary" sx={{ 
                          display: 'block',
                          maxWidth: 250,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {product.description}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={product.category.name} 
                      size="small" 
                      sx={{ 
                        fontWeight: 600, 
                        bgcolor: 'rgba(99, 102, 241, 0.08)',
                        color: 'primary.main',
                        border: 'none'
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {formatPrice(product.price)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {product.discount > 0 ? (
                      <Chip 
                        label={`${product.discount}% OFF`} 
                        size="small" 
                        color="secondary" 
                        sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">-</Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{ 
                        fontWeight: 600,
                        color: product.stock < 20 ? 'error.main' : 'text.primary'
                      }}
                    >
                      {product.stock}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {product.reviewCount > 0 ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          {product.averageRating.toFixed(1)}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#ff9800' }}>★</Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">No rating</Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {product.reviewCount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                      {product.sku}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid', borderColor: 'divider' }}>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={pagination.total}
          rowsPerPage={pagination.limit}
          page={pagination.page - 1}
          onPageChange={handleChangePage}
          sx={{ border: 'none' }}
        />
      </Box>
    </Box>
  )
}

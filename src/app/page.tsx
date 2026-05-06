'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Typography,
  Box,
  Alert,
  Paper,
} from '@mui/material'
import DashboardShell from '@/components/DashboardShell'
import StatCard from '@/components/StatCard'
import FileUpload from '@/components/FileUpload'
import ProductsTable from '@/components/ProductsTable'
import AnalyticsCharts from '@/components/AnalyticsCharts'
import { fetchProducts, fetchCategories } from '@/store/slices/productsSlice'
import { fetchProductsPerCategory, fetchTopReviewedProducts, fetchDiscountDistribution, fetchCategoryWiseRatings } from '@/store/slices/analyticsSlice'
import { AppDispatch, RootState } from '@/store/store'
import {
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const [activeTab, setActiveTab] = useState(0)

  const products = useSelector((state: RootState) => state.products.products)
  const categories = useSelector((state: RootState) => state.products.categories)
  const productsLoading = useSelector((state: RootState) => state.products.loading)
  const productsError = useSelector((state: RootState) => state.products.error)
  const pagination = useSelector((state: RootState) => state.products.pagination)

  const analyticsData = useSelector((state: RootState) => state.analytics.data)
  const analyticsLoading = useSelector((state: RootState) => state.analytics.loading)
  const analyticsError = useSelector((state: RootState) => state.analytics.error)

  const handleFetchProducts = useCallback((params: { page?: number; search?: string; category?: string; minRating?: number } = {}) => {
    dispatch(fetchProducts(params))
  }, [dispatch])

  const handleFetchCategories = useCallback(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleFetchAnalytics = useCallback(() => {
    dispatch(fetchProductsPerCategory())
    dispatch(fetchTopReviewedProducts())
    dispatch(fetchDiscountDistribution())
    dispatch(fetchCategoryWiseRatings())
  }, [dispatch])

  const handleFetchProductsPage = useCallback((page: number) => {
    handleFetchProducts({ page })
  }, [handleFetchProducts])

  const handleFetchProductsSearch = useCallback((search: string) => {
    handleFetchProducts({ search })
  }, [handleFetchProducts])

  useEffect(() => {
    handleFetchCategories()
    handleFetchProducts()
    handleFetchAnalytics()
  }, [handleFetchCategories, handleFetchProducts, handleFetchAnalytics])

  const totalReviews = products.reduce((sum, p) => sum + (p.reviewCount || 0), 0)

  return (
    <DashboardShell activeTab={activeTab} onTabChange={setActiveTab}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Welcome back, Admin
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here is what is happening with your products today.
        </Typography>
      </Box>

      {(productsError || analyticsError) && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {productsError || analyticsError}
        </Alert>
      )}

      {activeTab === 0 && (
        <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
            <StatCard
              title="Total Products"
              value={products.length}
              icon={<InventoryIcon />}
              color="#6366f1"
              trend="+12%"
            />
            <StatCard
              title="Active Categories"
              value={categories.length}
              icon={<CategoryIcon />}
              color="#10b981"
              trend="+2"
            />
            <StatCard
              title="Total Reviews"
              value={totalReviews}
              icon={<StarIcon />}
              color="#f59e0b"
              trend="+85"
            />
            <StatCard
              title="Avg Discount"
              value="24.5%"
              icon={<TrendingUpIcon />}
              color="#ec4899"
              trend="+3.2%"
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
              Performance Analytics
            </Typography>
            <AnalyticsCharts
              data={analyticsData}
              loading={analyticsLoading}
              error={analyticsError}
            />
          </Box>
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
          <Box sx={{ mb: 3 }}>
            <FileUpload />
          </Box>
          <Paper sx={{ p: 0, overflow: 'hidden' }}>
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6">Product Management</Typography>
            </Box>
            <Box sx={{ p: 0 }}>
              <ProductsTable
                products={products}
                categories={categories}
                pagination={pagination}
                loading={productsLoading}
                error={productsError}
                onPageChange={handleFetchProductsPage}
                onSearch={handleFetchProductsSearch}
                onFilterChange={handleFetchProducts}
              />
            </Box>
          </Paper>
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
            Detailed Analytics Reports
          </Typography>
          <AnalyticsCharts
            data={analyticsData}
            loading={analyticsLoading}
            error={analyticsError}
          />
        </Box>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </DashboardShell>
  )
}



'use client'

import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface AnalyticsData {
  productsPerCategory: Array<{ name: string; _count: { products: number } }>
  topReviewedProducts: Array<{ name: string; reviewCount: number }>
  discountDistribution: Array<{ range: string; count: number }>
  categoryWiseRatings: Array<{ category: string; averageRating: number; reviewCount: number }>
}

interface AnalyticsChartsProps {
  data: AnalyticsData
  loading: boolean
  error: string | null
}

export default function AnalyticsCharts({ data, loading, error }: AnalyticsChartsProps) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  // Transform data for charts
  const productsPerCategoryData = data.productsPerCategory.map(item => ({
    category: item.name,
    count: item._count.products,
  }))

  const topReviewedData = data.topReviewedProducts.map(item => ({
    name: item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name,
    fullName: item.name,
    reviews: item.reviewCount,
  }))

  const discountData = data.discountDistribution.map(item => ({
    range: item.range,
    count: item.count,
  }))

  const ratingData = data.categoryWiseRatings.map(item => ({
    category: item.category,
    averageRating: item.averageRating,
    reviewCount: item.reviewCount,
  }))

  const isDataEmpty = 
    productsPerCategoryData.length === 0 && 
    topReviewedData.length === 0 && 
    discountData.length === 0 && 
    ratingData.length === 0

  if (isDataEmpty) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No data available to display analytics.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please upload a CSV or Excel file to populate the dashboard.
        </Typography>
      </Paper>
    )
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
      {/* Products per Category */}
      <Paper sx={{ p: 3, borderRadius: 4, animation: 'fadeIn 0.5s ease-in-out' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
          Products per Category
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productsPerCategoryData} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="category" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={60}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Top Reviewed Products */}
      <Paper sx={{ p: 3, borderRadius: 4, animation: 'fadeIn 0.5s ease-in-out', animationDelay: '0.1s' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
          Top Reviewed Products
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topReviewedData} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11 }}
              width={100}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="reviews" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Discount Distribution */}
      <Paper sx={{ p: 3, borderRadius: 4, animation: 'fadeIn 0.5s ease-in-out', animationDelay: '0.2s' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
          Discount Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={discountData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="range" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Category-wise Average Rating */}
      <Paper sx={{ p: 3, borderRadius: 4, animation: 'fadeIn 0.5s ease-in-out', animationDelay: '0.3s' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
          Category-wise Average Rating
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingData} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="category" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={60}
            />
            <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="averageRating" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  )
}

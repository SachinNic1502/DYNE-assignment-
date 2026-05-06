'use client'

import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Alert,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  TableChart as TableChartIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function Home() {
  const [tabValue, setTabValue] = useState(0)
  const [products, setProducts] = useState<Array<{ id: number; name: string; reviewCount?: number }>>([])
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([])
  const [error, setError] = useState<string | null>(null)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const fetchProducts = async () => {
    setError(null)
    try {
      const response = await fetch('/api/products')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setError('Failed to fetch products. Please check your database connection.')
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      setError('Failed to fetch categories.')
    }
  }

  useEffect(() => {
    const initializeData = async () => {
      await fetchCategories()
      await fetchProducts()
    }
    initializeData()
  }, [])

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Product Ratings & Review Analytics Dashboard
        </Typography>
        <Typography variant="h5" component="h2" color="primary" gutterBottom>
          Dyne Infotech Private Limited
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          Comprehensive analytics dashboard for product performance, customer feedback trends, 
          category-wise rating distribution, and review engagement metrics.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
          <Tab 
            icon={<DashboardIcon />} 
            label="Dashboard" 
            {...a11yProps(0)} 
            iconPosition="start"
          />
          <Tab 
            icon={<TableChartIcon />} 
            label="Products Data" 
            {...a11yProps(1)} 
            iconPosition="start"
          />
          <Tab 
            icon={<AssessmentIcon />} 
            label="Analytics" 
            {...a11yProps(2)} 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Welcome to the Analytics Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Upload your product data and explore comprehensive analytics insights.
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              File upload functionality temporarily disabled due to server component compatibility issues. 
              Please use the API directly or run the sample data generator to populate the database.
            </Typography>
          </Alert>
          
          {products.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Quick Overview
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2, flex: 1, minWidth: 200 }}>
                  <Typography variant="h4" color="primary">
                    {products.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Products
                  </Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'secondary.50', borderRadius: 2, flex: 1, minWidth: 200 }}>
                  <Typography variant="h4" color="secondary">
                    {categories.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Categories
                  </Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 2, flex: 1, minWidth: 200 }}>
                  <Typography variant="h4" color="success.main">
                    {products.reduce((sum, p) => sum + (p.reviewCount || 0), 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Reviews
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          Products Data
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Products table functionality temporarily disabled due to server component compatibility issues.
        </Typography>
        <Alert severity="warning">
          Please use the API endpoints directly to access products data.
        </Alert>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>
          Analytics Charts
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Charts functionality temporarily disabled due to server component compatibility issues.
        </Typography>
        <Alert severity="warning">
          Please use the API endpoints directly to access analytics data.
        </Alert>
      </TabPanel>
    </Container>
  )
}

'use client'

import React, { useState } from 'react'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  TableChart as TableChartIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'

const drawerWidth = 260

interface DashboardShellProps {
  children: React.ReactNode
  activeTab: number
  onTabChange: (index: number) => void
}

export default function DashboardShell({ children, activeTab, onTabChange }: DashboardShellProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = useState(true)

  React.useEffect(() => {
    setMounted(true)
    if (isMobile) {
      setOpen(false)
    }
  }, [isMobile])

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, index: 0 },
    { text: 'Products Data', icon: <TableChartIcon />, index: 1 },
    { text: 'Analytics', icon: <AssessmentIcon />, index: 2 },
  ]

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: [1], py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            borderRadius: '10px', 
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
          }}>
            <DashboardIcon sx={{ color: 'white' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
            DYNE <span style={{ color: theme.palette.primary.main }}>PRO</span>
          </Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ opacity: 0.6 }} />
      <List sx={{ px: 2, py: 3, flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                onTabChange(item.index)
                if (isMobile) setOpen(false)
              }}
              sx={{
                borderRadius: '12px',
                backgroundColor: activeTab === item.index ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                color: activeTab === item.index ? 'primary.main' : 'text.secondary',
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  color: 'primary.main',
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: activeTab === item.index ? 'primary.main' : 'inherit',
                minWidth: 40 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography sx={{ 
                    fontWeight: activeTab === item.index ? 700 : 500,
                    fontSize: '0.95rem',
                    color: 'inherit'
                  }}>
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <Box sx={{ 
          p: 2, 
          borderRadius: '16px', 
          bgcolor: 'rgba(99, 102, 241, 0.05)',
          border: '1px solid rgba(99, 102, 241, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>JD</Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              John Doe
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Administrator
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${mounted && open ? drawerWidth : 0}px)` },
          ml: { md: `${mounted && open ? drawerWidth : 0}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
              {menuItems[activeTab].text}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton><NotificationsIcon /></IconButton>
            <IconButton><SettingsIcon /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={mounted && isMobile ? 'temporary' : 'persistent'}
        open={mounted ? open : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          width: { md: `calc(100% - ${mounted && open ? drawerWidth : 0}px)` },
          mt: 8,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

'use client'

import React from 'react'
import { Paper, Box, Typography, IconProps } from '@mui/material'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactElement<IconProps>
  color: string
  trend?: string
}

export default function StatCard({ title, value, icon, color, trend }: StatCardProps) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px -10px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          {icon}
        </Box>
        {trend && (
          <Typography variant="caption" sx={{ 
            color: trend.startsWith('+') ? 'success.main' : 'error.main',
            fontWeight: 700,
            bgcolor: trend.startsWith('+') ? 'success.50' : 'error.50',
            px: 1,
            py: 0.5,
            borderRadius: 1
          }}>
            {trend}
          </Typography>
        )}
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        {value}
      </Typography>
      
      {/* Decorative background shape */}
      <Box
        sx={{
          position: 'absolute',
          right: -20,
          bottom: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: `${color}05`,
          zIndex: 0,
        }}
      />
    </Paper>
  )
}

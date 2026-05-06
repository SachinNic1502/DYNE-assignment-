import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: { discount: true }
    })

    const distribution = products.reduce((acc, product) => {
      const discount = product.discount
      const range = Math.floor(discount / 10) * 10
      const key = `${range}-${range + 9}%`
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const result = Object.entries(distribution).map(([range, count]) => ({ range, count }))
    return NextResponse.json(result)
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
  }
}

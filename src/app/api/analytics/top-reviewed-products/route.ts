import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await prisma.product.findMany({
      select: {
        name: true,
        reviews: {
          select: { rating: true }
        }
      }
    })

    const productsWithReviewCount = data.map((product) => ({
      name: product.name,
      reviewCount: product.reviews.length
    })).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 10)

    return NextResponse.json(productsWithReviewCount)
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await prisma.category.findMany({
      select: {
        name: true,
        products: {
          select: {
            reviews: {
              select: { rating: true }
            }
          }
        }
      }
    })

    const categoryRatings = data.map((category) => {
      const allReviews = category.products.flatMap((product) => product.reviews)
      const avgRating = allReviews.length > 0
        ? allReviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / allReviews.length
        : 0

      return {
        category: category.name,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: allReviews.length
      }
    })

    return NextResponse.json(categoryRatings)
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
  }
}

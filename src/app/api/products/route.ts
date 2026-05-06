import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const minRating = searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}

    if (search) {
      where.name = { contains: search, mode: 'insensitive' }
    }

    if (category) {
      where.category = { name: { contains: category, mode: 'insensitive' } }
    }

    if (minRating !== undefined) {
      where.reviews = {
        some: {
          rating: { gte: minRating }
        }
      }
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          reviews: {
            select: {
              rating: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
    ])

    const productsWithRatings = products.map((product) => {
      const reviews = product.reviews
      const avgRating = reviews.length > 0 
        ? reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / reviews.length 
        : 0
      
      return {
        ...product,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length
      }
    })

    return NextResponse.json({
      products: productsWithRatings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Products error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

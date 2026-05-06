import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const categories = [
  { name: 'Electronics', description: 'Electronic devices and gadgets' },
  { name: 'Clothing', description: 'Apparel and fashion items' },
  { name: 'Home & Kitchen', description: 'Home appliances and kitchenware' },
  { name: 'Books', description: 'Books and educational materials' },
  { name: 'Sports & Outdoors', description: 'Sports equipment and outdoor gear' },
  { name: 'Toys & Games', description: 'Toys, games, and entertainment' },
  { name: 'Beauty & Personal Care', description: 'Cosmetics and personal care products' },
  { name: 'Automotive', description: 'Car parts and accessories' },
]

const products = [
  // Electronics
  { name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 79.99, discount: 10, stock: 150 },
  { name: 'Smart Watch Pro', category: 'Electronics', price: 299.99, discount: 15, stock: 75 },
  { name: '4K Webcam', category: 'Electronics', price: 129.99, discount: 5, stock: 200 },
  { name: 'USB-C Hub', category: 'Electronics', price: 49.99, discount: 20, stock: 300 },
  { name: 'Wireless Mouse', category: 'Electronics', price: 34.99, discount: 0, stock: 500 },
  { name: 'Mechanical Keyboard', category: 'Electronics', price: 149.99, discount: 25, stock: 100 },
  { name: 'Laptop Stand', category: 'Electronics', price: 39.99, discount: 10, stock: 250 },
  { name: 'Portable Charger', category: 'Electronics', price: 29.99, discount: 15, stock: 400 },
  
  // Clothing
  { name: 'Cotton T-Shirt', category: 'Clothing', price: 19.99, discount: 30, stock: 1000 },
  { name: 'Denim Jeans', category: 'Clothing', price: 59.99, discount: 20, stock: 300 },
  { name: 'Winter Jacket', category: 'Clothing', price: 89.99, discount: 40, stock: 150 },
  { name: 'Running Shoes', category: 'Clothing', price: 79.99, discount: 25, stock: 200 },
  { name: 'Leather Belt', category: 'Clothing', price: 29.99, discount: 10, stock: 400 },
  { name: 'Wool Sweater', category: 'Clothing', price: 69.99, discount: 35, stock: 180 },
  { name: 'Sports Shorts', category: 'Clothing', price: 24.99, discount: 15, stock: 600 },
  { name: 'Formal Shirt', category: 'Clothing', price: 49.99, discount: 20, stock: 250 },
  
  // Home & Kitchen
  { name: 'Coffee Maker', category: 'Home & Kitchen', price: 89.99, discount: 15, stock: 120 },
  { name: 'Blender', category: 'Home & Kitchen', price: 59.99, discount: 20, stock: 200 },
  { name: 'Air Fryer', category: 'Home & Kitchen', price: 129.99, discount: 25, stock: 80 },
  { name: 'Vacuum Cleaner', category: 'Home & Kitchen', price: 199.99, discount: 30, stock: 60 },
  { name: 'Microwave Oven', category: 'Home & Kitchen', price: 149.99, discount: 10, stock: 100 },
  { name: 'Toaster', category: 'Home & Kitchen', price: 39.99, discount: 15, stock: 300 },
  { name: 'Electric Kettle', category: 'Home & Kitchen', price: 49.99, discount: 20, stock: 250 },
  { name: 'Food Processor', category: 'Home & Kitchen', price: 79.99, discount: 25, stock: 90 },
  
  // Books
  { name: 'JavaScript Guide', category: 'Books', price: 39.99, discount: 40, stock: 500 },
  { name: 'Python Programming', category: 'Books', price: 44.99, discount: 30, stock: 400 },
  { name: 'Data Science Handbook', category: 'Books', price: 54.99, discount: 20, stock: 300 },
  { name: 'Web Development', category: 'Books', price: 49.99, discount: 25, stock: 350 },
  { name: 'Machine Learning', category: 'Books', price: 59.99, discount: 15, stock: 250 },
  { name: 'Cloud Computing', category: 'Books', price: 52.99, discount: 35, stock: 280 },
  { name: 'Mobile App Development', category: 'Books', price: 47.99, discount: 20, stock: 320 },
  { name: 'Cybersecurity Basics', category: 'Books', price: 41.99, discount: 30, stock: 380 },
  
  // Sports & Outdoors
  { name: 'Yoga Mat', category: 'Sports & Outdoors', price: 29.99, discount: 20, stock: 400 },
  { name: 'Dumbbells Set', category: 'Sports & Outdoors', price: 79.99, discount: 15, stock: 150 },
  { name: 'Tennis Racket', category: 'Sports & Outdoors', price: 89.99, discount: 25, stock: 100 },
  { name: 'Camping Tent', category: 'Sports & Outdoors', price: 199.99, discount: 30, stock: 60 },
  { name: 'Hiking Backpack', category: 'Sports & Outdoors', price: 69.99, discount: 20, stock: 180 },
  { name: 'Fitness Tracker', category: 'Sports & Outdoors', price: 99.99, discount: 35, stock: 120 },
  { name: 'Water Bottle', category: 'Sports & Outdoors', price: 19.99, discount: 10, stock: 600 },
  { name: 'Jump Rope', category: 'Sports & Outdoors', price: 14.99, discount: 25, stock: 500 },
  
  // Toys & Games
  { name: 'Board Game Set', category: 'Toys & Games', price: 39.99, discount: 20, stock: 200 },
  { name: 'Building Blocks', category: 'Toys & Games', price: 49.99, discount: 15, stock: 150 },
  { name: 'Puzzle Collection', category: 'Toys & Games', price: 29.99, discount: 30, stock: 300 },
  { name: 'Action Figure', category: 'Toys & Games', price: 24.99, discount: 25, stock: 400 },
  { name: 'Remote Control Car', category: 'Toys & Games', price: 59.99, discount: 20, stock: 120 },
  { name: 'Art Supplies Kit', category: 'Toys & Games', price: 34.99, discount: 15, stock: 250 },
  { name: 'Musical Keyboard', category: 'Toys & Games', price: 79.99, discount: 10, stock: 80 },
  { name: 'Science Experiment Kit', category: 'Toys & Games', price: 44.99, discount: 35, stock: 180 },
  
  // Beauty & Personal Care
  { name: 'Face Cream', category: 'Beauty & Personal Care', price: 29.99, discount: 20, stock: 400 },
  { name: 'Shampoo Set', category: 'Beauty & Personal Care', price: 24.99, discount: 25, stock: 500 },
  { name: 'Makeup Kit', category: 'Beauty & Personal Care', price: 49.99, discount: 30, stock: 200 },
  { name: 'Perfume', category: 'Beauty & Personal Care', price: 79.99, discount: 15, stock: 150 },
  { name: 'Hair Dryer', category: 'Beauty & Personal Care', price: 39.99, discount: 20, stock: 300 },
  { name: 'Skincare Set', category: 'Beauty & Personal Care', price: 59.99, discount: 25, stock: 180 },
  { name: 'Nail Polish Kit', category: 'Beauty & Personal Care', price: 19.99, discount: 40, stock: 600 },
  { name: 'Body Lotion', category: 'Beauty & Personal Care', price: 22.99, discount: 15, stock: 450 },
  
  // Automotive
  { name: 'Car Phone Holder', category: 'Automotive', price: 19.99, discount: 30, stock: 800 },
  { name: 'Seat Covers', category: 'Automotive', price: 89.99, discount: 20, stock: 150 },
  { name: 'Car Air Freshener', category: 'Automotive', price: 9.99, discount: 50, stock: 1000 },
  { name: 'Tire Pressure Gauge', category: 'Automotive', price: 14.99, discount: 25, stock: 400 },
  { name: 'Car Vacuum', category: 'Automotive', price: 49.99, discount: 15, stock: 200 },
  { name: 'Steering Wheel Cover', category: 'Automotive', price: 29.99, discount: 20, stock: 350 },
  { name: 'Car Organizer', category: 'Automotive', price: 34.99, discount: 30, stock: 250 },
  { name: 'Emergency Kit', category: 'Automotive', price: 59.99, discount: 10, stock: 120 },
]

const reviewComments = [
  'Excellent product! Highly recommended.',
  'Good quality for the price.',
  'Works as expected. Very satisfied.',
  'Outstanding value and performance.',
  'Would definitely buy again.',
  'Great product, fast shipping.',
  'Exceeded my expectations!',
  'Perfect for my needs.',
  'Highly recommend this product.',
  'Very happy with this purchase.',
  'Good product, minor issues.',
  'Average quality, fair price.',
  'Works okay, could be better.',
  'Decent product for the money.',
  'Met my basic requirements.',
  'Some improvements needed.',
  'Not what I expected.',
  'Below average quality.',
  'Disappointed with this purchase.',
  'Would not recommend.',
]

const reviewerNames = [
  'John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis',
  'James Wilson', 'Maria Garcia', 'Robert Martinez', 'Jennifer Anderson',
  'David Taylor', 'Lisa Thomas', 'William Jackson', 'Linda White',
  'Richard Harris', 'Patricia Martin', 'Joseph Thompson', 'Barbara Garcia',
  'Charles Martinez', 'Susan Robinson', 'Thomas Clark', 'Jessica Rodriguez',
]

async function main() {
  console.log('🌱 Starting product database seeding...')

  // Clear existing data
  await prisma.review.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  console.log('🧹 Cleared existing data')

  // Create categories
  const createdCategories = []
  for (const category of categories) {
    const created = await prisma.category.create({
      data: category,
    })
    createdCategories.push(created)
  }
  console.log(`📁 Created ${createdCategories.length} categories`)

  // Create products
  const createdProducts = []
  for (const product of products) {
    const category = createdCategories.find(c => c.name === product.category)
    if (!category) {
      console.error(`Category not found: ${product.category}`)
      continue
    }

    const created = await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        discount: product.discount,
        sku: `SKU-${product.name.replace(/\s+/g, '-').toUpperCase()}-${Math.random().toString(36).substr(2, 9)}`,
        stock: product.stock,
        categoryId: category.id,
      },
    })
    createdProducts.push(created)
  }
  console.log(`📦 Created ${createdProducts.length} products`)

  // Create reviews
  let reviewCount = 0
  for (const product of createdProducts) {
    const numReviews = Math.floor(Math.random() * 20) + 5 // 5-25 reviews per product
    
    for (let i = 0; i < numReviews; i++) {
      const rating = Math.floor(Math.random() * 5) + 1 // 1-5 stars
      const comment = reviewComments[Math.floor(Math.random() * reviewComments.length)]
      const reviewerName = reviewerNames[Math.floor(Math.random() * reviewerNames.length)]
      const verified = Math.random() > 0.3 // 70% verified reviews
      const helpful = Math.floor(Math.random() * 10) // 0-10 helpful votes

      await prisma.review.create({
        data: {
          rating,
          comment,
          productId: product.id,
          reviewerName,
          reviewerEmail: reviewerName.toLowerCase().replace(' ', '.') + '@example.com',
          verified,
          helpful,
        },
      })
      reviewCount++
    }
  }
  console.log(`⭐ Created ${reviewCount} reviews`)

  console.log('✅ Database seeding completed successfully!')
  
  // Display statistics
  const stats = await prisma.$queryRaw`
    SELECT 
      c.name as category_name,
      COUNT(p.id) as product_count,
      AVG(r.rating) as avg_rating,
      COUNT(r.id) as review_count
    FROM categories c
    LEFT JOIN products p ON c.id = p."categoryId"
    LEFT JOIN reviews r ON p.id = r."productId"
    GROUP BY c.name
    ORDER BY product_count DESC
  `
  
  console.log('\n📊 Database Statistics:')
  console.table(stats)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

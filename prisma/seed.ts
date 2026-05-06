import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Create a sample category
  const category = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: {
      name: 'Electronics',
      description: 'Electronic gadgets and devices',
    },
  })

  // Create a sample product
  await prisma.product.upsert({
    where: { sku: 'SAMPLE-001' },
    update: {},
    create: {
      name: 'Sample Product',
      description: 'This is a sample product for testing.',
      price: 99.99,
      discount: 10,
      sku: 'SAMPLE-001',
      stock: 50,
      categoryId: category.id,
    },
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

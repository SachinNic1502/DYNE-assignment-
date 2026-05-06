import * as XLSX from 'xlsx'
import { writeFileSync } from 'fs'

// Sample data structure matching the provided format
const sampleData = [
  {
    product_id: 'ELEC001',
    product_name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    discounted_price: 71.99,
    actual_price: 79.99,
    discount_percentage: 10,
    rating: 4.2,
    rating_count: 156,
    about_product: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    user_name: 'John Smith',
    review_title: 'Excellent Sound Quality',
    review_content: 'These headphones exceeded my expectations. The sound quality is crystal clear and the noise cancellation works perfectly.'
  },
  {
    product_id: 'ELEC001',
    product_name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    discounted_price: 71.99,
    actual_price: 79.99,
    discount_percentage: 10,
    rating: 4.2,
    rating_count: 156,
    about_product: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    user_name: 'Sarah Johnson',
    review_title: 'Great Value',
    review_content: 'Good quality for the price. Comfortable to wear for long periods.'
  },
  {
    product_id: 'ELEC002',
    product_name: 'Smart Watch Pro',
    category: 'Electronics',
    discounted_price: 254.99,
    actual_price: 299.99,
    discount_percentage: 15,
    rating: 4.5,
    rating_count: 89,
    about_product: 'Advanced fitness tracking smartwatch with heart rate monitor and GPS.',
    user_name: 'Mike Davis',
    review_title: 'Best Smartwatch',
    review_content: 'Amazing features and battery life. The GPS is very accurate during runs.'
  },
  {
    product_id: 'CLOTH001',
    product_name: 'Cotton T-Shirt',
    category: 'Clothing',
    discounted_price: 13.99,
    actual_price: 19.99,
    discount_percentage: 30,
    rating: 3.8,
    rating_count: 234,
    about_product: '100% organic cotton t-shirt, comfortable and breathable for everyday wear.',
    user_name: 'Emma Wilson',
    review_title: 'Comfortable Fit',
    review_content: 'Very soft and comfortable. The color is exactly as shown in the picture.'
  },
  {
    product_id: 'CLOTH002',
    product_name: 'Denim Jeans',
    category: 'Clothing',
    discounted_price: 47.99,
    actual_price: 59.99,
    discount_percentage: 20,
    rating: 4.1,
    rating_count: 167,
    about_product: 'Classic fit denim jeans with stretch fabric for maximum comfort.',
    user_name: 'Robert Brown',
    review_title: 'Perfect Fit',
    review_content: 'Great quality jeans. The fit is perfect and the material is durable.'
  },
  {
    product_id: 'HOME001',
    product_name: 'Coffee Maker',
    category: 'Home & Kitchen',
    discounted_price: 76.49,
    actual_price: 89.99,
    discount_percentage: 15,
    rating: 4.3,
    rating_count: 198,
    about_product: 'Programmable coffee maker with thermal carafe and auto-shutoff feature.',
    user_name: 'Lisa Anderson',
    review_title: 'Great Coffee',
    review_content: 'Makes excellent coffee every time. Easy to program and clean.'
  },
  {
    product_id: 'BOOK001',
    product_name: 'JavaScript Guide',
    category: 'Books',
    discounted_price: 23.99,
    actual_price: 39.99,
    discount_percentage: 40,
    rating: 4.6,
    rating_count: 412,
    about_product: 'Comprehensive guide to modern JavaScript programming with practical examples.',
    user_name: 'David Taylor',
    review_title: 'Must Read',
    review_content: 'Excellent book for learning JavaScript. Clear explanations and great examples.'
  },
  {
    product_id: 'SPORT001',
    product_name: 'Yoga Mat',
    category: 'Sports & Outdoors',
    discounted_price: 23.99,
    actual_price: 29.99,
    discount_percentage: 20,
    rating: 4.0,
    rating_count: 289,
    about_product: 'Non-slip exercise yoga mat with carrying strap and alignment markers.',
    user_name: 'Jennifer Martinez',
    review_title: 'Perfect for Yoga',
    review_content: 'Great grip and cushioning. Love the alignment markers.'
  },
  {
    product_id: 'TOY001',
    product_name: 'Board Game Set',
    category: 'Toys & Games',
    discounted_price: 31.99,
    actual_price: 39.99,
    discount_percentage: 20,
    rating: 4.4,
    rating_count: 156,
    about_product: 'Family board game collection with strategy and luck-based games.',
    user_name: 'William Harris',
    review_title: 'Family Fun',
    review_content: 'Great variety of games. Perfect for family game nights.'
  },
  {
    product_id: 'BEAUTY001',
    product_name: 'Face Cream',
    category: 'Beauty & Personal Care',
    discounted_price: 23.99,
    actual_price: 29.99,
    discount_percentage: 20,
    rating: 3.9,
    rating_count: 378,
    about_product: 'Hydrating face cream with natural ingredients and SPF protection.',
    user_name: 'Patricia Clark',
    review_title: 'Good Moisturizer',
    review_content: 'Keeps my skin hydrated all day. Non-greasy formula.'
  },
  {
    product_id: 'AUTO001',
    product_name: 'Car Phone Holder',
    category: 'Automotive',
    discounted_price: 13.99,
    actual_price: 19.99,
    discount_percentage: 30,
    rating: 4.2,
    rating_count: 445,
    about_product: 'Adjustable car phone holder with dashboard and windshield mounting options.',
    user_name: 'James Lewis',
    review_title: 'Sturdy Holder',
    review_content: 'Very secure and stable. Holds my phone perfectly even on bumpy roads.'
  }
]

// Create Excel workbook
const wb = XLSX.utils.book_new()
const ws = XLSX.utils.json_to_sheet(sampleData)

// Set column widths
const colWidths = [
  { wch: 12 }, // product_id
  { wch: 25 }, // product_name
  { wch: 15 }, // category
  { wch: 15 }, // discounted_price
  { wch: 13 }, // actual_price
  { wch: 18 }, // discount_percentage
  { wch: 8 },  // rating
  { wch: 12 }, // rating_count
  { wch: 50 }, // about_product
  { wch: 15 }, // user_name
  { wch: 20 }, // review_title
  { wch: 50 }, // review_content
]
ws['!cols'] = colWidths

// Add worksheet to workbook
XLSX.utils.book_append_sheet(wb, ws, 'Product Data')

// Write Excel file
const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' })
writeFileSync('sample-products.xlsx', excelBuffer)

console.log('Sample Excel file created: sample-products.xlsx')
console.log('File contains', sampleData.length, 'rows with product and review data')

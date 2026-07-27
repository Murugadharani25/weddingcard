// Mock data used only when REACT_APP_USE_MOCK=true (default).
// Swap the service files to call the real Django API once it's running.

export const mockAdminUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Kavya (Admin)' },
]

export const mockCustomerUsers = [
  { id: 1, username: 'priya', password: 'priya123', role: 'customer', name: 'Priya Raman', email: 'priya@example.com' },
]

export const mockCategories = [
  {
    id: 'bride',
    name: 'Bride',
    subcategories: [
      { id: 'bridal-wear', name: 'Bridal Wear' },
      { id: 'jewellery', name: 'Jewellery' },
      { id: 'makeup', name: 'Makeup' },
      { id: 'accessories-bride', name: 'Accessories' },
    ],
  },
  {
    id: 'groom',
    name: 'Groom',
    subcategories: [
      { id: 'groom-wear', name: 'Groom Wear' },
      { id: 'footwear', name: 'Footwear' },
      { id: 'accessories-groom', name: 'Accessories' },
      { id: 'gifts', name: 'Gifts' },
    ],
  },
]

export const mockProducts = [
  { id: 1, name: 'Crimson Silk Bridal Lehenga', category: 'bride', subcategory: 'bridal-wear', price: 45999, stock: 6, description: 'Hand-embroidered silk lehenga with zari border and dupatta, in deep crimson with gold thread work.', image: '👰' },
  { id: 2, name: 'Kundan Choker Necklace Set', category: 'bride', subcategory: 'jewellery', price: 12999, stock: 14, description: 'Traditional kundan choker with matching earrings and maang tikka.', image: '💍' },
  { id: 3, name: 'Bridal Makeup Kit — Deluxe', category: 'bride', subcategory: 'makeup', price: 3499, stock: 22, description: 'Long-wear bridal makeup kit with foundation, sindoor, and setting spray.', image: '💄' },
  { id: 4, name: 'Embellished Bridal Clutch', category: 'bride', subcategory: 'accessories-bride', price: 1899, stock: 30, description: 'Hand-beaded clutch to match bridal ensembles.', image: '👜' },
  { id: 5, name: 'Ivory Silk Banarasi Lehenga', category: 'bride', subcategory: 'bridal-wear', price: 38999, stock: 5, description: 'Banarasi silk lehenga in ivory with silver zari work.', image: '👰' },
  { id: 6, name: 'Polki Diamond Earrings', category: 'bride', subcategory: 'jewellery', price: 8999, stock: 18, description: 'Uncut polki diamond earrings set in gold-plated silver.', image: '💎' },
  { id: 7, name: 'Maroon Silk Sherwani', category: 'groom', subcategory: 'groom-wear', price: 24999, stock: 9, description: 'Hand-embroidered silk sherwani with matching stole, in rich maroon.', image: '🤵' },
  { id: 8, name: 'Mojari Juttis — Gold Embroidered', category: 'groom', subcategory: 'footwear', price: 2499, stock: 25, description: 'Traditional mojari juttis with gold thread embroidery.', image: '👞' },
  { id: 9, name: 'Kundan Groom Brooch Set', category: 'groom', subcategory: 'accessories-groom', price: 1599, stock: 40, description: 'Kundan brooch and pocket square set for sherwani.', image: '📌' },
  { id: 10, name: 'Groom Gift Hamper — Grooming Essentials', category: 'groom', subcategory: 'gifts', price: 2999, stock: 16, description: 'Curated grooming hamper for the groom, pre-wedding.', image: '🎁' },
  { id: 11, name: 'Ivory Silk Sherwani', category: 'groom', subcategory: 'groom-wear', price: 27999, stock: 7, description: 'Ivory silk sherwani with matching churidar and dupatta.', image: '🤵' },
  { id: 12, name: 'Classic Nagra Shoes', category: 'groom', subcategory: 'footwear', price: 1999, stock: 20, description: 'Classic leather nagra shoes with subtle embroidery.', image: '👞' },
]

export const mockCustomers = [
  { id: 1, name: 'Priya Raman', email: 'priya@example.com', phone: '9840011223', registeredOn: '2026-05-12', totalOrders: 2 },
  { id: 2, name: 'Anjali Menon', email: 'anjali@example.com', phone: '9940055667', registeredOn: '2026-06-02', totalOrders: 1 },
]

export const mockOrders = [
  {
    id: 5001,
    customerId: 1,
    date: '2026-07-10',
    status: 'delivered',
    items: [
      { productId: 1, qty: 1, price: 45999 },
      { productId: 2, qty: 1, price: 12999 },
    ],
  },
  {
    id: 5002,
    customerId: 1,
    date: '2026-07-20',
    status: 'shipped',
    items: [
      { productId: 6, qty: 1, price: 8999 },
    ],
  },
  {
    id: 5003,
    customerId: 2,
    date: '2026-07-22',
    status: 'processing',
    items: [
      { productId: 7, qty: 1, price: 24999 },
      { productId: 9, qty: 1, price: 1599 },
    ],
  },
]

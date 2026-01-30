// Mock data for E-commerce Admin Dashboard

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Order {
  id: string;
  customer: string;
  customerEmail: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'stock' | 'customer' | 'system';
  time: string;
  read: boolean;
}

export interface SalesData {
  day: string;
  sales: number;
  orders: number;
}

// Products mock data
export const products: Product[] = [
  { id: '1', name: 'Cozy Cloud Sweater', category: 'Clothing', price: 79.99, stock: 45, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200', status: 'in-stock' },
  { id: '2', name: 'Sunset Glow Candle', category: 'Home', price: 24.99, stock: 120, image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=200', status: 'in-stock' },
  { id: '3', name: 'Botanical Print Tote', category: 'Accessories', price: 34.99, stock: 8, image: 'https://images.unsplash.com/photo-1597633125097-5a9ae21457a4?w=200', status: 'low-stock' },
  { id: '4', name: 'Lavender Dream Pillow', category: 'Home', price: 49.99, stock: 0, image: 'https://images.unsplash.com/photo-1629949009765-40fc74c9ec21?w=200', status: 'out-of-stock' },
  { id: '5', name: 'Artisan Ceramic Mug', category: 'Kitchen', price: 18.99, stock: 67, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200', status: 'in-stock' },
  { id: '6', name: 'Organic Cotton Socks', category: 'Clothing', price: 12.99, stock: 200, image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200', status: 'in-stock' },
  { id: '7', name: 'Minimalist Watch', category: 'Accessories', price: 149.99, stock: 5, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200', status: 'low-stock' },
  { id: '8', name: 'Bamboo Desk Organizer', category: 'Office', price: 39.99, stock: 32, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200', status: 'in-stock' },
];

// Orders mock data
export const orders: Order[] = [
  { id: 'ORD-001', customer: 'Emma Wilson', customerEmail: 'emma@email.com', date: '2026-01-30', total: 129.98, status: 'pending', items: 3 },
  { id: 'ORD-002', customer: 'James Chen', customerEmail: 'james@email.com', date: '2026-01-29', total: 249.97, status: 'processing', items: 5 },
  { id: 'ORD-003', customer: 'Sofia Garcia', customerEmail: 'sofia@email.com', date: '2026-01-29', total: 79.99, status: 'shipped', items: 1 },
  { id: 'ORD-004', customer: 'Liam Johnson', customerEmail: 'liam@email.com', date: '2026-01-28', total: 184.96, status: 'delivered', items: 4 },
  { id: 'ORD-005', customer: 'Olivia Brown', customerEmail: 'olivia@email.com', date: '2026-01-28', total: 67.98, status: 'delivered', items: 2 },
  { id: 'ORD-006', customer: 'Noah Davis', customerEmail: 'noah@email.com', date: '2026-01-27', total: 299.99, status: 'delivered', items: 2 },
  { id: 'ORD-007', customer: 'Ava Martinez', customerEmail: 'ava@email.com', date: '2026-01-27', total: 54.97, status: 'processing', items: 3 },
  { id: 'ORD-008', customer: 'Lucas Taylor', customerEmail: 'lucas@email.com', date: '2026-01-26', total: 112.98, status: 'shipped', items: 2 },
];

// Customers mock data
export const customers: Customer[] = [
  { id: '1', name: 'Emma Wilson', email: 'emma@email.com', avatar: 'https://i.pravatar.cc/150?u=emma', totalOrders: 12, totalSpent: 1249.88, joinedDate: '2025-03-15' },
  { id: '2', name: 'James Chen', email: 'james@email.com', avatar: 'https://i.pravatar.cc/150?u=james', totalOrders: 8, totalSpent: 892.45, joinedDate: '2025-05-22' },
  { id: '3', name: 'Sofia Garcia', email: 'sofia@email.com', avatar: 'https://i.pravatar.cc/150?u=sofia', totalOrders: 23, totalSpent: 2341.67, joinedDate: '2024-11-08' },
  { id: '4', name: 'Liam Johnson', email: 'liam@email.com', avatar: 'https://i.pravatar.cc/150?u=liam', totalOrders: 5, totalSpent: 456.90, joinedDate: '2025-08-30' },
  { id: '5', name: 'Olivia Brown', email: 'olivia@email.com', avatar: 'https://i.pravatar.cc/150?u=olivia', totalOrders: 18, totalSpent: 1876.32, joinedDate: '2025-01-12' },
  { id: '6', name: 'Noah Davis', email: 'noah@email.com', avatar: 'https://i.pravatar.cc/150?u=noah', totalOrders: 31, totalSpent: 4523.11, joinedDate: '2024-06-03' },
  { id: '7', name: 'Ava Martinez', email: 'ava@email.com', avatar: 'https://i.pravatar.cc/150?u=ava', totalOrders: 7, totalSpent: 634.55, joinedDate: '2025-09-18' },
  { id: '8', name: 'Lucas Taylor', email: 'lucas@email.com', avatar: 'https://i.pravatar.cc/150?u=lucas', totalOrders: 14, totalSpent: 1567.80, joinedDate: '2025-02-25' },
];

// Notifications mock data
export const notifications: Notification[] = [
  { id: '1', title: 'New Order', message: 'Emma Wilson placed an order for $129.98', type: 'order', time: '5 min ago', read: false },
  { id: '2', title: 'Low Stock Alert', message: 'Botanical Print Tote is running low (8 left)', type: 'stock', time: '1 hour ago', read: false },
  { id: '3', title: 'Out of Stock', message: 'Lavender Dream Pillow is now out of stock', type: 'stock', time: '2 hours ago', read: false },
  { id: '4', title: 'New Customer', message: 'Marcus Lee just created an account', type: 'customer', time: '3 hours ago', read: true },
  { id: '5', title: 'Order Delivered', message: 'Order ORD-004 was delivered successfully', type: 'order', time: '5 hours ago', read: true },
];

// Sales data for the last 7 days
export const salesData: SalesData[] = [
  { day: 'Mon', sales: 2400, orders: 24 },
  { day: 'Tue', sales: 1398, orders: 13 },
  { day: 'Wed', sales: 3800, orders: 38 },
  { day: 'Thu', sales: 3908, orders: 39 },
  { day: 'Fri', sales: 4800, orders: 48 },
  { day: 'Sat', sales: 3800, orders: 38 },
  { day: 'Sun', sales: 4300, orders: 43 },
];

// Dashboard stats
export const dashboardStats = {
  totalSales: 24404,
  totalOrders: 243,
  totalCustomers: 1892,
  totalRevenue: 89432,
  salesGrowth: 12.5,
  ordersGrowth: 8.3,
  customersGrowth: 15.2,
  revenueGrowth: 23.1,
};

// Helper function to get time-based greeting
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Categories for filtering
export const categories = ['All', 'Clothing', 'Home', 'Accessories', 'Kitchen', 'Office'];

// Order statuses
export const orderStatuses = ['All', 'pending', 'processing', 'shipped', 'delivered'];

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import AdminLogin from './pages/AdminLogin'

import Home from './pages/customer/Home'
import Categories from './pages/customer/Categories'
import ProductDetail from './pages/customer/ProductDetail'
import Cart from './pages/customer/Cart'
import Checkout from './pages/customer/Checkout'
import OrderConfirmation from './pages/customer/OrderConfirmation'
import MyOrders from './pages/customer/MyOrders'

import Dashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminCustomers from './pages/admin/AdminCustomers'
import AdminReports from './pages/admin/AdminReports'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin-login" element={<AdminLogin />} />

              {/* Customer storefront */}
              <Route path="/" element={
                <ProtectedRoute role="customer" redirectTo="/login">
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/categories/:categoryId" element={
                <ProtectedRoute role="customer" redirectTo="/login">
                  <Categories />
                </ProtectedRoute>
              } />
              <Route path="/products/:id" element={
                <ProtectedRoute role="customer" redirectTo="/login">
                  <ProductDetail />
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute role="customer" redirectTo="/login">
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute role="customer" redirectTo="/login">
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/order-confirmation/:orderId" element={
                <ProtectedRoute role="customer" redirectTo="/login">
                  <OrderConfirmation />
                </ProtectedRoute>
              } />
              <Route path="/my-orders" element={
                <ProtectedRoute role="customer" redirectTo="/login">
                  <MyOrders />
                </ProtectedRoute>
              } />

              {/* Admin console */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute role="admin" redirectTo="/admin-login">
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute role="admin" redirectTo="/admin-login">
                  <AdminProducts />
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute role="admin" redirectTo="/admin-login">
                  <AdminOrders />
                </ProtectedRoute>
              } />
              <Route path="/admin/customers" element={
                <ProtectedRoute role="admin" redirectTo="/admin-login">
                  <AdminCustomers />
                </ProtectedRoute>
              } />
              <Route path="/admin/reports" element={
                <ProtectedRoute role="admin" redirectTo="/admin-login">
                  <AdminReports />
                </ProtectedRoute>
              } />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}

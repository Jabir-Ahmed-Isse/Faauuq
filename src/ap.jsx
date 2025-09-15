import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeaturedProducts from './components/featuredProducts';
import CartSidebar from './components/CartSidebar';
import CheckOutPage from './components/CheckOutpage';
import MyOrdersPage from './components/MyOrdersPage';
import PaymentReturnPage from './components/PaymentReturnPage'; // 👈 NEW IMPORT
import API from './api';
import Header from './components/UserHeader';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [cartData, setCartData] = useState(null);
  const cartCount = cartData?.items?.length || 0;

  const handleViewOrders = useCallback(() => {
    setIsOrdersOpen(true);
    setIsCartOpen(false);
  }, []);

  const handleBackFromOrders = useCallback(() => {
    setIsOrdersOpen(false);
  }, []);

  const handleAddToCart = async (book) => {
    if (isAdding) return;
    if (!book?._id) return alert("Invalid book");

    const token = localStorage.getItem('token');
    if (!token) return alert("Please log in");

    setIsAdding(true);

    try {
      const res = await API.post('/api/v1/cart', {
        bookId: book._id,
        qty: 1
      });

      console.log("✅ [App.js] Added to cart:", res.data);
      setCartData(res.data);
      setIsCartOpen(true);
      alert(`${book.title} added to cart!`);

    } catch (err) {
      console.error("❌ [App.js] Add to cart failed:", err.message);
      alert(err.response?.data?.error || "Failed to add item");
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await API.get('/api/v1/cart');
        setCartData(res.data);
      } catch (err) {
        console.error("Failed to load cart:", err);
      }
    };

    loadCart();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header cartCount={cartCount} />

                <FeaturedProducts
                  onAddToCart={handleAddToCart}
                  isAdding={isAdding}
                />

                <CartSidebar
                  isOpen={isCartOpen}
                  onClose={() => setIsCartOpen(false)}
                  cartData={cartData}
                />

                <div className="fixed top-6 right-6 flex gap-2 z-50">
                  <button
                    onClick={handleViewOrders}
                    className="bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
                    title="My Orders"
                    aria-label="My Orders"
                  >
                    📦
                  </button>
                  <button
                    onClick={() => setIsCartOpen(true)}
                    disabled={isAdding}
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
                    title="Cart"
                    aria-label="Cart"
                  >
                    🛒
                    {cartCount > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full inline-flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>
              </>
            }
          />

          <Route
            path="/checkout"
            element={<CheckOutPage />}
          />

          <Route
            path="/my-orders"
            element={<MyOrdersPage onBack={handleBackFromOrders} />}
          />

          {/* ✅ NEW ROUTE: Payment Success Page */}
          <Route
            path="/payment-return"
            element={<PaymentReturnPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
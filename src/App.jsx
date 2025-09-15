import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./utils/themeContext";
import { SidebarProvider } from "./utils/sidebarContext";

// Pages
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import AddBookForm from "./pages/AddBookForm";
import Categories from "./pages/Categories";
import AddCategoryForm from "./components/addCategory";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import UserPage from "./pages/UserPage";
import Orders from "./pages/Orders";
import AllProductsPage from "./components/allProducts";
import AuthForm from "./components/login";
import DashboardLayout from "./components/DashboardLayout";
import AdminRoute from "./components/AdminRoutes";
import Coupons from "./pages/Coupons";

import UserOrders from "./components/UserOrders";
import CheckOutPage from "./components/CheckOutpage";
import PaymentReturn from "./pages/PaymentReturn";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminLayout from "./utils/AdminLayout";




const App = () => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Router>
          
          <Routes>
            {/* Public */}
            <Route path="/" element={<UserPage />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/signin" element={<AuthForm />} />
            <Route path="/userorders" element={<UserOrders />} />
            <Route path="/checkout" element={<CheckOutPage />} />
           <Route path="/payment-return" element={<PaymentReturn/>} />
           <Route path="/payment-success" element={<PaymentSuccess />} />
            {/* Checkout */}
            {/* <Route path="/check" element={< CheckoutPage/>} /> */}

            {/* Admin */}
            <Route
              path="/dashboard/*"
              element={
                <AdminRoute>
                  <DashboardLayout />
                </AdminRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="books" element={<Books />} />
              <Route path="categories" element={<Categories />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="settings" element={<Settings />} />
              <Route path="orders" element={
  <AdminLayout>
    <Orders />
  </AdminLayout>
} />
              <Route path="coupons" element={<Coupons />} />
            </Route>

            {/* Standalone */}
            <Route path="/add-book" element={<AddBookForm />} />
            <Route path="/add-category" element={<AddCategoryForm />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default App;

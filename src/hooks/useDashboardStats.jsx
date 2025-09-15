import { useState, useEffect } from 'react';
import API from '../api';
import { useDashboardRefresh } from '../context/DashboardContext';

const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    growthRate: 0,
    weeklySales: Array(7).fill(0),
    genreDistribution: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { refreshKey } = useDashboardRefresh(); // 👈 Listen for changes

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Total Books
        const booksRes = await API.get('/api/v1/books?limit=0');
        const books = booksRes.data.books || [];
        const totalBooks = books.length;

        // 2. Total Customers (role = "user")
        const usersRes = await API.get('/api/v1/users?role=user&limit=0');
        const users = usersRes.data.users || [];
        const totalCustomers = users.length;

        // 3. Total Revenue (sum of all order totals)
        const ordersRes = await API.get('/api/v1/orders');
        const orders = ordersRes.data.orders || [];
        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

        // 4. Weekly Sales (last 7 days)
        const now = new Date();
        const weeklySales = Array(7).fill(0);

        orders.forEach(order => {
          const orderDate = new Date(order.createdAt);
          const diffDays = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

          if (diffDays >= 0 && diffDays < 7) {
            const dayIndex = 6 - diffDays; // Sunday = index 0
            const bookCount = order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
            weeklySales[dayIndex] += bookCount;
          }
        });

        // 5. Genre Distribution
        const categoriesRes = await API.get('/api/v1/categories');
        const categories = categoriesRes.data || [];
        const genreCounts = categories.map(cat => {
          const count = books.filter(book =>
            Array.isArray(book.categories) &&
            book.categories.some(c => c._id === cat._id)
          ).length;
          return { name: cat.name, count };
        });
        const genreDistribution = genreCounts.filter(item => item.count > 0);

        // 6. Growth Rate
        const lastDaySales = weeklySales[6];
        const prev6DaysSales = weeklySales.slice(0, 6).reduce((a, b) => a + b, 0);
        const growthRate = prev6DaysSales > 0 
          ? Math.round(((lastDaySales - prev6DaysSales) / prev6DaysSales) * 100) 
          : 0;

        setStats({
          totalBooks,
          totalCustomers,
          totalRevenue,
          growthRate,
          weeklySales,
          genreDistribution,
        });

      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(
          err.response?.data?.error ||
          err.message ||
          'Failed to load dashboard data.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats(); // Run on mount
  }, [refreshKey]); // 👈 ONLY re-run when refreshKey changes

  return { stats, loading, error };
};

export default useDashboardStats;
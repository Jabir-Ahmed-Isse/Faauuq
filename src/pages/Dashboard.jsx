import { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { 
  BookOpenIcon, 
  UsersIcon, 
  CurrencyDollarIcon, 
  ArrowTrendingUpIcon, // Corrected icon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [salesData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Books Sold',
      data: [12, 19, 15, 22, 18, 25, 30],
      backgroundColor: 'rgba(79, 70, 229, 0.7)',
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 1,
    }],
  });

  const [genreData] = useState({
    labels: ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Romance', 'Mystery'],
    datasets: [{
      data: [30, 25, 20, 15, 10],
      backgroundColor: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'],
    }],
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Books" value="1,248" change={12} positive={true} icon={BookOpenIcon} />
        <DashboardCard title="Customers" value="892" change={5} positive={true} icon={UsersIcon} />
        <DashboardCard title="Revenue" value="$12,492" change={-2} positive={false} icon={CurrencyDollarIcon} />
        <DashboardCard title="Growth" value="14.3%" change={18} positive={true} icon={ArrowTrendingUpIcon} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Weekly Sales</h3>
          <Bar data={salesData} options={{ responsive: true }} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Genre Distribution</h3>
          <Doughnut data={genreData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

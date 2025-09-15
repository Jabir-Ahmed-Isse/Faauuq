import { Outlet } from 'react-router-dom';
import { useSidebar } from '../utils/sidebarContext';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar />
      <Header />
      <main className={`pt-16 px-6 transition-all duration-300 ${isCollapsed ? 'pl-20' : 'pl-72'}`}>
        <Outlet /> {/* This is crucial for nested routes to render */}
      </main>
    </div>
  );
};

export default DashboardLayout;

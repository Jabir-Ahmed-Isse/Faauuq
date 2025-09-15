import { useTheme } from '../utils/themeContext';
import { useSidebar } from '../utils/sidebarContext';
import { Link, useLocation } from 'react-router-dom';

import {
  HomeIcon,
  BookOpenIcon,
  UsersIcon,
  CogIcon,
  ChartBarIcon,
  ShoppingCartIcon, 
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

// ✅ Updated: Paths are now relative to /dashboard
const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Books', path: '/dashboard/books', icon: BookOpenIcon },
  { name: 'Categories', path: '/dashboard/Categories', icon: Squares2X2Icon },
  { name: 'Orders', path: '/dashboard/orders', icon: ShoppingCartIcon },
  { name: 'coupons', path: '/dashboard/coupons', icon: ShoppingCartIcon },
  { name: 'User Management', path: '/dashboard/users', icon: UsersIcon },
  { name: 'Reports', path: '/dashboard/reports', icon: ChartBarIcon },
  { name: 'Settings', path: '/dashboard/settings', icon: CogIcon },
];

const Sidebar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const location = useLocation();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b dark:border-gray-700">
          {!isCollapsed ? (
            <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">BookStore</h1>
          ) : (
            <div></div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            // ✅ Improved: Check if current path matches (supports nested routes)
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group relative ${
                  isActive
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}

                {/* Tooltip when collapsed */}
                {isCollapsed && (
                  <span className="absolute left-16 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none z-50 whitespace-nowrap transition-opacity duration-200">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="p-3 border-t dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className={`text-sm ${isCollapsed && 'sr-only'}`}>
              {darkMode ? 'Light' : 'Dark'} Mode
            </span>
            <button
              onClick={toggleDarkMode}
              className="relative w-10 h-5 rounded-full bg-gray-300 dark:bg-indigo-600 transition-colors"
            >
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  darkMode ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
import { useState } from 'react';
import { CogIcon, BellIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Settings</h2>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-5">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Store Information</h3>
              <div className="grid grid-cols-1 md:col-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Store Name</label>
                  <input type="text" defaultValue="BookStore Pro" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
                  <input type="email" defaultValue="contact@store.com" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                <textarea defaultValue="123 Book St, New York, NY" rows="3" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"></textarea>
              </div>
              <div className="flex justify-end">
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-5">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">New Orders</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a new order is placed</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Low Stock Alerts</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Notify when stock is below 10</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                  <input type="password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                  <input type="password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                  <input type="password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white" />
                </div>
                <div className="flex justify-end">
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Change Password</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
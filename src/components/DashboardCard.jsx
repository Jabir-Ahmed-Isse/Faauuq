const DashboardCard = ({ title, value, icon: Icon, change, positive }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">{value}</p>
          <p className={`text-sm mt-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
            {change > 0 ? '+' : ''}{change}% vs last week
          </p>
        </div>
        <div className="text-gray-400 dark:text-gray-500">
          <Icon className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <DashboardContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardRefresh = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardRefresh must be used within DashboardProvider');
  }
  return context;
};
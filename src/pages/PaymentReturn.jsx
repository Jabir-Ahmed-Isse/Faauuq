import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentReturn = () => {
  const navigate = useNavigate();
  const orderId = localStorage.getItem('lastOrderId');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-1">Order ID: #{orderId}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
        >
          Continue Shopping
        </button>

        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          You will be redirected to homepage in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentReturn;
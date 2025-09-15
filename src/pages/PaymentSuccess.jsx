import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, message, waafiResponse } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate('/cart');
    }
  }, [orderId, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 {message}</h2>
        <p className="text-gray-600 mb-6">Your order <strong>#{orderId}</strong> is confirmed.</p>
        
        {waafiResponse && (
          <div className="text-left bg-gray-50 p-4 rounded-lg text-sm mb-6">
            <h3 className="font-semibold mb-2">Payment Details:</h3>
            <p><strong>Transaction ID:</strong> {waafiResponse.params?.transactionId}</p>
            <p><strong>Amount:</strong> ${waafiResponse.params?.txAmount}</p>
            <p><strong>Status:</strong> {waafiResponse.params?.state}</p>
            <p><strong>Phone:</strong> {waafiResponse.params?.accountNo}</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate('/orders')}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
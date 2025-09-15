import React, { useState } from 'react';
import API from '../api';

const UpdateCouponForm = ({ coupon, onUpdate, onCancel }) => {
  const [code, setCode] = useState(coupon.code || '');
  const [discountValue, setDiscountValue] = useState(coupon.value || '');
  const [minSubtotal, setMinSubtotal] = useState(coupon.minSubtotal || '50');
  const [active, setActive] = useState(coupon.active !== undefined ? coupon.active : true);
  const [type, setType] = useState(coupon.type || 'percent'); // ← Initialize from coupon
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || !discountValue) {
      setError('Coupon code and discount value are required.');
      return;
    }

    const valueNum = Number(discountValue);
    if (valueNum <= 0) {
      setError('Discount value must be greater than 0.');
      return;
    }

    const minSubtotalNum = Number(minSubtotal);
    if (minSubtotalNum < 0) {
      setError('Minimum subtotal cannot be negative.');
      return;
    }

    // ✅ EXACTLY MATCHES BACKEND SCHEMA
    const updatedCoupon = {
      _id: coupon._id,
      code: code.trim(),
      type: type, // ← From radio selection
      value: valueNum,
      minSubtotal: minSubtotalNum,
      active: active,
    };

    try {
      const res = await API.put(`/api/v1/coupons/${coupon._id}`, updatedCoupon);
      onUpdate(res.data); // ✅ Trigger parent update
    } catch (err) {
      console.error("Update coupon error:", err);

      if (err.response?.status === 400) {
        setError(err.response.data.error || 'Invalid coupon data. Check fields.');
      } else if (err.response?.status === 401) {
        setError('Unauthorized. Admin access required.');
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
      } else if (err.response?.status === 404) {
        setError('Coupon not found.');
      } else if (err.response?.status === 409) {
        setError('Coupon code already exists. Try another.');
      } else {
        setError('Failed to update coupon. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Coupon Code *
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="SUMMER25"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Discount Type *
        </label>
        <div className="flex gap-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="type"
              value="percent"
              checked={type === 'percent'}
              onChange={() => setType('percent')}
              className="h-4 w-4 text-indigo-600"
            />
            <span className="text-sm">Percent (%)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="type"
              value="fixed"
              checked={type === 'fixed'}
              onChange={() => setType('fixed')}
              className="h-4 w-4 text-indigo-600"
            />
            <span className="text-sm">Fixed Amount ($)</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Discount Value *
        </label>
        <input
          type="number"
          min="0.01"
          step={type === 'percent' ? "0.01" : "1"}
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder={type === 'percent' ? "10 (for 10%)" : "50 (for $50 off)"}
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {type === 'percent'
            ? 'Enter percentage (e.g., 10 for 10% off)'
            : 'Enter fixed dollar amount (e.g., 50 for $50 off)'
          }
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Minimum Subtotal ($)
        </label>
        <input
          type="number"
          min="0"
          value={minSubtotal}
          onChange={(e) => setMinSubtotal(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="50"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Minimum cart total required to use this coupon.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="active"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
        />
        <label htmlFor="active" className="text-sm text-gray-700 dark:text-gray-300">
          Active
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Update Coupon
        </button>
      </div>
    </form>
  );
};

export default UpdateCouponForm;
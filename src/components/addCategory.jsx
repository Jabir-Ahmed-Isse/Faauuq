import { useState, useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

// Configure Axios instance — NO hardcoded token, NO typo in URL
const API = axios.create({
  baseURL: 'https://faaruuqbooks.onrender.com', // ✅ Fixed URL — no spaces!
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject token dynamically from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired/invalid token globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired — clear storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const AddCategoryForm = ({ onAddCategory, onCancel }) => {
  const [formData, setFormData] = useState({ name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 👇 Track if component is mounted to prevent state updates on unmounted components
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false; // Cleanup on unmount
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      setError('Category name is required');
      return;
    }

    const slug = trimmedName.toLowerCase().replace(/\s+/g, '-');
    setLoading(true);
    setError('');

    try {
      const response = await API.post('/api/v1/categories', {
        name: trimmedName,
        slug,
      });

      // ✅ Only proceed if response is 201
      if (response.status === 201) {
        // 👇 Only update state if component is still mounted
        if (isMounted.current) {
          // Wrap onAddCategory in try-catch to prevent its errors from bubbling up
          try {
            onAddCategory(response.data); // This might cause error if parent has issues
          } catch (callbackError) {
            console.warn('onAddCategory callback error:', callbackError);
            // Don't show user-facing error — backend succeeded
          }
          setFormData({ name: '' });
        }
      } else {
        throw new Error(`Unexpected status: ${response.status}`);
      }
    } catch (err) {
      console.error('API Error:', err);

      // 👇 Only show error to user if component is mounted
      if (isMounted.current) {
        setError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          'Failed to add category. Please try again.'
        );
      }
    } finally {
      // 👇 Only update loading state if component is mounted
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Add New Category
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-300"
          aria-label="Close form"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. Science, History, Fiction"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition disabled:opacity-70"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white rounded-lg transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
import { useState, useEffect } from 'react';
import axios from 'axios';

// Configure API (same as Books.js)
const API = axios.create({
  baseURL: 'https://faaruuqbooks.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const AddBookForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    stock: '',
  });
  const [selectedCategories, setSelectedCategories] = useState([]); // ✅ Array of category IDs
  const [categories, setCategories] = useState([]); // ✅ Fetched from backend
  const [coverImage, setCoverImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);

  // ✅ Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/api/v1/categories');
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setError('Failed to load categories. Please refresh.');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedCategories(selected);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        setCoverImage(null);
        setPreviewUrl(null);
        return;
      }
      setCoverImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.author || !formData.price || !formData.stock) {
      setError('Title, author, price, and stock are required.');
      return;
    }

    if (selectedCategories.length === 0) {
      setError('Please select at least one category.');
      return;
    }

    // Create FormData object
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title.trim());
    formDataToSend.append('author', formData.author.trim());
    formDataToSend.append('price', parseFloat(formData.price) || 0);
    formDataToSend.append('stock', parseInt(formData.stock) || 0);

    // ✅ Append each selected category ID
    selectedCategories.forEach(catId => {
      formDataToSend.append('categories', catId);
    });

    if (coverImage) {
      formDataToSend.append('coverImage', coverImage);
    }

    onSubmit(formDataToSend);

    // Reset form
    setFormData({ title: '', author: '', price: '', stock: '' });
    setSelectedCategories([]);
    setCoverImage(null);
    setPreviewUrl(null);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Add New Book</h2>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* ✅ Category Multi-Select */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Categories <span className="text-gray-500">(Select one or more)</span>
          </label>
          {loadingCategories ? (
            <p className="mt-1 text-sm text-gray-500">Loading categories...</p>
          ) : (
            <select
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 h-32"
            >
              {categories.length === 0 ? (
                <option disabled>No categories available</option>
              ) : (
                categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price ($)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cover Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900/30 dark:file:text-indigo-300"
          />
          {previewUrl && (
            <div className="mt-3 flex items-center gap-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-20 w-16 object-cover rounded border border-gray-300 dark:border-gray-600"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverImage(null);
                  setPreviewUrl(null);
                }}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-70"
        >
          Add Book
        </button>
      </div>
    </form>
  );
};

export default AddBookForm;
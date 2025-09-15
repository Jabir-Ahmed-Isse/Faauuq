import { useState, useEffect, useMemo } from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import AddBookForm from './AddBookForm';
import UpdateBookForm from '../updates/updateBookForm';
import axios from 'axios';

const ITEMS_PER_PAGE = 5;

// ✅✅✅ FIXED: NO TRAILING SPACES + TOKEN INTERCEPTOR
const API = axios.create({
  baseURL: 'https://faaruuqbooks.onrender.com', // ✅ CRITICAL — NO SPACES!
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Inject token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle 401 — auto redirect to login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingBook, setEditingBook] = useState(null); // ✅ For modal edit
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Fetch books from backend on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const limit = ITEMS_PER_PAGE;
        const skip = (currentPage - 1) * limit;
        let url = `/api/v1/books?limit=${limit}&skip=${skip}`;

        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }

        const res = await API.get(url);
        console.log('📚 Books API Response:', res.data); // ✅ Debug log
        setBooks(res.data.books || []);
      } catch (err) {
        console.error("Fetch books error:", err);
        setError('Failed to load books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, searchTerm]);

  // ✅ Filtered books — search in title, author, and category names
  const filteredBooks = useMemo(() => {
    if (!searchTerm) return books;
    return books.filter(book =>
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.categories?.some(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [books, searchTerm]);

  // ✅ Pagination
  const totalBooks = books.length;
  const totalPages = Math.ceil(totalBooks / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await API.delete(`/api/v1/books/${id}`);
      setBooks(prev => prev.filter(book => book._id !== id));
      if (currentPage > totalPages - 1 && totalPages > 1) {
        setCurrentPage(totalPages - 1);
      }
      setError('');
    } catch (err) {
      console.error("Delete book error:", err);
      setError('Failed to delete book.');
    }
  };

  // ✅ Start edit — open modal
  const startEdit = (id) => {
    const book = books.find(b => b._id === id);
    if (book) {
      setEditingBook(book);
    }
  };

  // ✅ Handle add book
  const handleAddBook = async (newBook) => {
    try {
      const res = await API.post('/api/v1/books', newBook, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setBooks(prev => [res.data, ...prev]);
      setShowAddForm(false);
      setCurrentPage(1);
      setError('');
    } catch (err) {
      console.error("Add book error:", err);
      setError('Failed to add book. Please check your data.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Books Management</h2>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Add New Book Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          <PlusIcon className="w-5 h-5" />
          Add New Book
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow max-w-md">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search books by title, author, or category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full outline-none text-gray-700 dark:text-gray-200 bg-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Author</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Category</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedBooks.length > 0 ? (
                paginatedBooks.map((book) => (
                  <tr key={book._id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {book.title}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {Array.isArray(book.categories) && book.categories.length > 0 
                        ? book.categories.map(cat => cat.name).join(', ') 
                        : '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      ${parseFloat(book.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      {book.stock}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium space-x-2">
                      <button
                        onClick={() => startEdit(book._id)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400"
                        aria-label="Edit book"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400"
                        aria-label="Delete book"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No books found for "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-700">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Page <span className="font-medium">{currentPage}</span> of {totalPages}
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded text-sm bg-white dark:bg-gray-800 disabled:opacity-50 shadow hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`w-8 h-8 rounded text-sm shadow ${
                    currentPage === i + 1
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded text-sm bg-white dark:bg-gray-800 disabled:opacity-50 shadow hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Book Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <AddBookForm
              onSubmit={handleAddBook}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {/* Update Book Modal */}
      {editingBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg">
            <button
              onClick={() => setEditingBook(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <UpdateBookForm
              book={editingBook}
              onUpdate={(updatedBook) => {
                setBooks(prev => prev.map(b => b._id === updatedBook._id ? updatedBook : b));
                setEditingBook(null);
              }}
              onCancel={() => setEditingBook(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
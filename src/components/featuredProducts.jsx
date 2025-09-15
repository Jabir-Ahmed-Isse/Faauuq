import React, { useState, useEffect } from 'react';
import API from '../api';
import ReviewAPI from '../reviewApi';
import { StarIcon } from '@heroicons/react/24/solid';

const FeaturedProducts = ({ onAddToCart, onBuyNow, isAdding = false }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [languages] = useState(["English", "Arabic", "French", "Somali"]);

  // Get current user
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/api/v1/categories');
        setCategories(res.data || []);
      } catch (err) {
        console.error("Fetch categories error:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        let url = `/api/v1/books?limit=20`;

        if (selectedCategories.length > 0) {
          url += `&category=${encodeURIComponent(selectedCategories[0])}`;
        }

        if (selectedLanguages.length > 0) {
          url += `&language=${encodeURIComponent(selectedLanguages[0])}`;
        }

        const res = await API.get(url);
        const booksWithReviews = await Promise.all(
          res.data.books.map(async (book) => {
            try {
              const reviews = await ReviewAPI.getReviewsByBook(book._id);
              const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
              const avg = reviews.length > 0 ? totalRating / reviews.length : 0;
              return {
                ...book,
                ratingAvg: parseFloat(avg.toFixed(1)),
                ratingCount: reviews.length,
              };
            } catch (err) {
              console.warn(`Failed to load reviews for book ${book._id}:`, err);
              return {
                ...book,
                ratingAvg: 0,
                ratingCount: 0,
              };
            }
          })
        );

        setBooks(booksWithReviews);
      } catch (err) {
        console.error("Fetch books error:", err);
        setError('Failed to load featured books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [selectedCategories, selectedLanguages]);

  const toggleCategory = (slug) => {
    setSelectedCategories(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
  };

  const toggleLanguage = (lang) => {
    setSelectedLanguages(prev =>
      prev.includes(lang)
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLanguages([]);
  };

  const handleRateBook = async (bookId, rating) => {
    if (!isLoggedIn) {
      alert("Please log in to rate this book.");
      return;
    }

    try {
      const review = await ReviewAPI.createReview(bookId, { rating });

      const reviews = await ReviewAPI.getReviewsByBook(bookId);
      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      const avg = reviews.length > 0 ? totalRating / reviews.length : 0;

      setBooks(prev =>
        prev.map(book =>
          book._id === bookId
            ? {
                ...book,
                ratingAvg: parseFloat(avg.toFixed(1)),
                ratingCount: reviews.length,
              }
            : book
        )
      );
    } catch (err) {
      console.error("Rating failed:", err);
      alert(err.response?.data?.error || "Failed to rate book.");
    }
  };

  // ✅ Final Star Rendering: Filled Yellow + Outline Empty Stars — Already Correct!
  const renderStars = (bookId, avg, count) => {
    const maxStars = 5;
    const filledStars = Math.floor(avg || 0);
    const hasHalfStar = avg && avg % 1 !== 0;

    return (
      <div className="flex items-center gap-1 mt-1">
        {[...Array(maxStars)].map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleRateBook(bookId, i + 1)}
            className="focus:outline-none"
            aria-label={`Rate ${i + 1} stars`}
          >
            <StarIcon
              className={`w-4 h-4 transition-colors ${
                i < filledStars
                  ? 'text-yellow-400'
                  : i === filledStars && hasHalfStar
                  ? 'text-yellow-400'
                  : 'text-gray-400 dark:text-gray-300 hover:text-yellow-300'
              }`}
              fill={
                i < filledStars || (i === filledStars && hasHalfStar)
                  ? 'currentColor'
                  : 'none'
              }
              stroke={
                i >= filledStars && !hasHalfStar
                  ? 'currentColor'
                  : undefined
              }
              strokeWidth="1.5"
            />
          </button>
        ))}
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
          ({count || 0})
        </span>
      </div>
    );
  };

  if (loading) return <p className="text-center mt-10 text-gray-700 dark:text-gray-300">Loading books...</p>;
  if (error) return <p className="text-center mt-10 text-red-600 dark:text-red-400">{error}</p>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center dark:text-blue-400">Featured Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Filters Sidebar — FULLY DARK MODE COMPATIBLE */}
        <aside className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm h-fit sticky top-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Filters</h3>
            {(selectedCategories.length > 0 || selectedLanguages.length > 0) && (
              <button onClick={clearFilters} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium">Clear</button>
            )}
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Languages</h4>
            <div className="space-y-2">
              {languages.map((lang, i) => (
                <label key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition">
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes(lang)}
                    onChange={() => toggleLanguage(lang)}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span>{lang}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Categories</h4>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat._id} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Book Cards — FULLY DARK MODE COMPATIBLE */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {books.length === 0 ? (
            <div className="col-span-full flex justify-center py-12 text-gray-500 dark:text-gray-400">
              No books available
            </div>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden h-80 flex flex-col"
              >
                
                {/* Book Cover — Now uses dark-safe background */}
                <div className="h-40 overflow-hidden bg-gray-50 dark:bg-gray-700">
                  <img
                    src={book.coverUrl || "https://via.placeholder.com/300x400?text=No+Cover"}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x400/374151/9ca3af?text=No+Image";
                    }}
                  />
                </div>

                {/* Book Info */}
                <div className="p-3 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm line-clamp-2">{book.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{book.author}</p>
                    <p className="text-blue-700 dark:text-blue-400 font-bold text-sm mt-1">ETB {parseFloat(book.price).toFixed(2)}</p>

                    {/* ✅ RATING WIDGET — Already Correct */}
                    {renderStars(book._id, book.ratingAvg, book.ratingCount)}
                  </div>

                  {/* Buttons — Updated for dark mode hover */}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        console.log("📤 Book passed to onAddToCart:", book);
                        onAddToCart && onAddToCart(book);
                      }}
                      disabled={isAdding}
                      className="flex-1 bg-blue-700 text-white py-1.5 rounded-lg text-xs font-medium hover:bg-blue-800 transition-colors disabled:opacity-50 dark:hover:bg-blue-600"
                    >
                      {isAdding ? 'Adding...' : 'Add'}
                    </button>
                    <button
                      onClick={() => onBuyNow && onBuyNow(book)}
                      className="flex-1 border border-blue-700 text-blue-700 dark:text-blue-400 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default FeaturedProducts;
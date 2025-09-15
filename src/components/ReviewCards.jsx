// src/components/ReviewCards.js
import React from 'react';

const ReviewCards = () => {
  const reviews = [
    {
      id: 1,
      book: "Jaceyl",
      author: "Ayaan Mohamed",
      rating: 5,
      comment: "A masterpiece of Somali literature. The characters feel like family. I cried at the end.",
      reviewer: "Fatima K.",
      date: "2025-09-12",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      book: "Programming for Beginners",
      author: "Ahmed Hassan",
      rating: 4,
      comment: "Perfect for absolute beginners. The examples are clear and practical. Only wish it covered more advanced topics.",
      reviewer: "Mohamed A.",
      date: "2025-09-08",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      book: "The History of Mogadishu",
      author: "Dr. Yusuf Ali",
      rating: 5,
      comment: "Incredibly well-researched and beautifully written. A must-read for every Somali.",
      reviewer: "Hodan S.",
      date: "2025-09-01",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-400 dark:text-gray-500'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">({rating})</span>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Header - Dark Mode Compatible */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Reader Reviews</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">Hear what our community is saying about their favorite reads</p>
      </div>

      {/* Review Cards Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700"
            style={{ height: '300px' }}
          >
            {/* Review Header - Dark Mode Compatible */}
            <div className="flex items-start mb-4">
              <img
                src={review.avatar}
                alt={review.reviewer}
                className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md mr-3 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {review.reviewer}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </div>

            {/* Review Body - Dark Mode Compatible */}
            <blockquote className="text-gray-700 dark:text-gray-300 text-sm mb-4 italic relative pl-4 border-l-2 border-blue-200 dark:border-blue-700 flex-1 overflow-hidden">
              <span className="absolute -left-1 top-0 text-2xl text-blue-200 dark:text-blue-700 opacity-30">“</span>
              <p className="line-clamp-3">{review.comment}</p>
            </blockquote>

            {/* Book Info - Dark Mode Compatible */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-3 rounded-xl border border-blue-100 dark:border-gray-600 mt-auto">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">{review.book}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">by {review.author}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-blue-600 dark:to-indigo-700 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA - Dark Mode Compatible */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Love sharing your thoughts?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Join thousands of readers who review books and help others discover their next favorite read.</p>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
          Join Our Review Community
        </button>
      </div>
    </section>
  );
};

export default ReviewCards;
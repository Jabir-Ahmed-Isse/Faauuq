// src/components/NewsSection.js
import React from 'react';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "New Somali Literature Festival",
      excerpt: "Join us in Mogadishu this October for the biggest celebration of Somali authors.",
      date: "2025-09-15",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300&auto=format&fit=crop&q=80",
      author: "Cultural Affairs"
    },
    {
      id: 2,
      title: "Author Wins International Prize",
      excerpt: "Local author recognized for groundbreaking work in Somali historical fiction.",
      date: "2025-09-10",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80",
      author: "Literary Times"
    },
    {
      id: 3,
      title: "Digital Reading on the Rise",
      excerpt: "New report shows 200% growth in e-book purchases among Somali youth.",
      date: "2025-09-05",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1mIWTwcjegkzg9HnL_jMeEJgAM2x2bucd8g&s",
      author: "Tech Somalia"
    }
  ];

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="text-center mb-6 px-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Latest News</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">Stay updated with Somali literature</p>
      </div>

      {/* Grid Layout - Centered with Padding */}
      <div className="flex flex-wrap justify-center gap-6 px-8">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 max-w-xs w-full"
            style={{ height: '300px' }}
          >
            {/* Image */}
            <div className="h-40 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 dark:text-white text-sm line-clamp-2 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">{item.author}</p>
              <p className="text-blue-600 dark:text-blue-400 text-xs mb-3">{new Date(item.date).toLocaleDateString()}</p>
              
              {/* Buttons */}
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                  Add
                </button>
                <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 px-3 py-1 rounded text-xs font-medium transition-colors">
                  Read
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
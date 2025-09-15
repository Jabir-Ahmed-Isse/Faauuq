// ShopByGenre.js
import React from 'react';

const genres = [
  { name: 'Mystery', image: 'https://via.placeholder.com/300x200/1e40af/ffffff?text=Mystery' },
  { name: 'Romance', image: 'https://via.placeholder.com/300x200/4f46e5/ffffff?text=Romance' },
  { name: 'Science Fiction', image: 'https://via.placeholder.com/300x200/7c3aed/ffffff?text=Sci-Fi' },
  { name: 'Self-Help', image: 'https://via.placeholder.com/300x200/059669/ffffff?text=Self-Help' },
  { name: 'Biography', image: 'https://via.placeholder.com/300x200/dc2626/ffffff?text=Biography' },
  { name: 'Children\'s', image: 'https://via.placeholder.com/300x200/d97706/ffffff?text=Children%27s' },
  { name: 'Fantasy', image: 'https://via.placeholder.com/300x200/9333ea/ffffff?text=Fantasy' },
  { name: 'Thriller', image: 'https://via.placeholder.com/300x200/1f2937/ffffff?text=Thriller' },
];

const ShopByGenre = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Shop by Genre</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover your next favorite book — explore our most popular categories.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer group"
            >
              <img
                src={genre.image}
                alt={genre.name}
                className="w-full h-40 object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold">{genre.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByGenre;
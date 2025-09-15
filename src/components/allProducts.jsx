import React from 'react';
import womanImg from '../assets/images/woman.png';
import atmic from "../assets/images/atomic.jpg";

const products = [
  { 
    id: 1, 
    name: "Advanced Mathematics", 
    price: 29.99, 
    image: womanImg, 
    description: "A comprehensive guide to advanced math concepts.", 
    rating: 4.5, 
    sold: "40K+ bought in past month" 
  },
  { 
    id: 2, 
    name: "Science Lab Notebook", 
    price: 14.5, 
    image: atmic, 
    description: "Perfect for recording experiments and observations.", 
    rating: 4.3, 
    sold: "20K+ bought in past month" 
  },
  { 
    id: 3, 
    name: "Calligraphy Pen Set", 
    price: 22.0, 
    image: womanImg, 
    description: "Ideal for creating beautiful handwritten letters.", 
    rating: 4.6, 
    sold: "15K+ bought in past month" 
  },
  { 
    id: 4, 
    name: "English Literature Vol. 1", 
    price: 24.99, 
    image: womanImg, 
    description: "Classic literary works for readers and students.", 
    rating: 4.4, 
    sold: "10K+ bought in past month" 
  },
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1 text-yellow-400 text-xs">
      {Array(fullStars).fill(0).map((_, i) => <span key={i}>★</span>)}
      {halfStar && <span>☆</span>}
      <span className="text-gray-500 ml-1 text-[10px]">{rating}</span>
    </div>
  );
};

const AllProductsPage = ({ onAddToCart, onBuyNow }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">All Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />

            <div className="p-3 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-xs mt-1 line-clamp-3">{product.description}</p>
                <p className="text-blue-700 font-bold text-sm mt-2">${product.price}</p>
                <StarRating rating={product.rating} />
                <p className="text-gray-500 text-[10px] mt-1">{product.sold}</p>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 bg-blue-700 text-white py-1 rounded text-xs hover:bg-blue-800 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => onBuyNow(product)}
                  className="flex-1 border border-blue-700 text-blue-700 py-1 rounded text-xs hover:bg-blue-50 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AllProductsPage;

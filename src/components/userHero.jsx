import React from 'react';
import { FaShippingFast, FaStar, FaGift } from 'react-icons/fa';
import { GiBookshelf } from 'react-icons/gi';
import { MdLocalLibrary } from 'react-icons/md';
import { FaUserGraduate } from 'react-icons/fa';
import woman from '../assets/images/woman.png';

const Hero = () => {
  return (
    <section
      className="w-full py-10 px-4 md:px-8 bg-[radial-gradient(circle_at_top_left,_#bfdbfe_0%,_transparent_30%),
           radial-gradient(circle_at_top_right,_#bfdbfe_0%,_transparent_30%),
           radial-gradient(circle_at_bottom_left,_#bfdbfe_0%,_transparent_30%),
           radial-gradient(circle_at_bottom_right,_#bfdbfe_0%,_transparent_30%),
           white] relative overflow-hidden max-w-4xl mx-auto rounded-2xl shadow-sm flex flex-col items-center justify-center text-center"
      style={{ maxWidth: '1100px' }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-36 relative z-10 text-center md:text-left">
        {/* Text Section - Centered */}
        <div className="space-y-4 max-w-lg flex flex-col items-center md:items-start">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 leading-tight">
            <span className="text-gray-800">Discover</span> <span>Books</span> <br />
            <span className="text-gray-800">That</span> <span>Inspire</span>
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed max-w-md">
            Explore curated books and stationery at FAARUUQ Bookstore — sparking imagination and focus.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-3">
            <button className="bg-blue-800 text-white font-semibold px-4 py-2 text-sm rounded-lg shadow hover:bg-blue-900 transition">
              Shop Now
            </button>
            <button className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 text-sm rounded-lg shadow hover:bg-blue-200 transition">
              Browse All
            </button>
          </div>

          {/* Feature Icons - Centered */}
          <div className="flex gap-2 pt-4 justify-center md:justify-start">
            {[
              { icon: FaShippingFast, label: 'Fast Delivery' },
              { icon: FaStar, label: 'Top Rated' },
              { icon: FaGift, label: 'Special Offers' },
            ].map((Item, i) => (
              <div key={i} className="bg-white flex items-center gap-1 rounded-full px-3 py-1.5 shadow-sm">
                <Item.icon className="text-blue-500 text-sm" />
                <span className="text-xs text-gray-800 font-medium">{Item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image Section - Centered */}
        <div className="relative flex justify-center items-center">
          {/* Main Image */}
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-200 shadow-md">
            <img src={woman} alt="Book Lover" className="w-full h-full object-cover" />
          </div>

          {/* Floating Cards */}
          <div className="absolute left-[-70px] top-1/2 -translate-y-1/2 bg-white w-28 rounded-lg shadow-md text-center p-2 transform rotate-6">
            <GiBookshelf className="text-blue-500 text-xl mx-auto" />
            <p className="text-xs font-semibold text-gray-800">New</p>
            <p className="text-blue-600 text-xs">200+</p>
          </div>

          <div className="absolute -top-6 -right-6 bg-white w-28 rounded-lg shadow-md text-center p-2 transform -rotate-6">
            <MdLocalLibrary className="text-blue-500 text-xl mx-auto" />
            <p className="text-xs font-semibold text-gray-800">E-Books</p>
            <p className="text-blue-600 text-xs">500+</p>
          </div>

          <div className="absolute -bottom-6 -right-6 bg-white w-28 rounded-lg shadow-md text-center p-2 transform rotate-3">
            <FaUserGraduate className="text-blue-500 text-xl mx-auto" />
            <p className="text-xs font-semibold text-gray-800">Students</p>
            <p className="text-blue-600 text-xs">50% Off</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

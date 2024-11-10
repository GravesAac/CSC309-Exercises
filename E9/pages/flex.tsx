// pages/flex.tsx
import React, { useState } from 'react';

const FlexLayout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav id="navbar" className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="text-lg font-bold">MyLogo</div>

        {/* Nav links for larger screens */}
        <div id="nav-links" className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Services</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>

        {/* Hamburger menu for small screens */}
        <div id="hamburger-menu" className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Dropdown menu for small screens */}
      {menuOpen && (
        <div id="nav-links-sm" className="flex flex-col space-y-2 p-4 bg-gray-800 text-white md:hidden">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Services</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero-section" className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/1600x900)' }}>
        <div className="text-center text-white p-4 bg-black bg-opacity-50 rounded-md">
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4">Welcome to Our Website</h1>
          <button className="hero-button px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default FlexLayout;

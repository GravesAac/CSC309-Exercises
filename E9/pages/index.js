import React, { useState } from 'react';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header id="header" className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">Logo</div>
        </div>
        
        {/* Navigation Links */}
        <nav id="nav-links" className="hidden md:flex space-x-6">
          <a href="#authors" className="hover:text-gray-400">Authors</a>
          <a href="#stores" className="hover:text-gray-400">Stores</a>
          <a href="#books" className="hover:text-gray-400">Books</a>
          <a href="#contact" className="hover:text-gray-400">Contact</a>
        </nav>
        
        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button 
            id="hamburger-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="focus:outline-none"
          >
            <svg 
              className="w-6 h-6 text-white" 
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

        {/* Mobile Navigation Links */}
        {isMenuOpen && (
          <nav id="nav-links-sm" className="md:hidden bg-gray-800 w-full absolute top-16 left-0 flex flex-col items-start p-4 space-y-4">
            <a href="#authors" className="hover:text-gray-400">Authors</a>
            <a href="#stores" className="hover:text-gray-400">Stores</a>
            <a href="#books" className="hover:text-gray-400">Books</a>
            <a href="#contact" className="hover:text-gray-400">Contact</a>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-grow p-6 space-y-8">
        
        {/* Authors Section */}
        <section id="authors" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4">Author 1</div>
          <div className="bg-gray-100 p-4">Author 2</div>
          <div className="bg-gray-100 p-4">Author 3</div>
          {/* Add more author items as needed */}
        </section>

        {/* Stores Section */}
        <section id="stores" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-4">Store 1</div>
          <div className="bg-gray-100 p-4">Store 2</div>
          <div className="bg-gray-100 p-4">Store 3</div>
          <div className="bg-gray-100 p-4">Store 4</div>
          {/* Add more store items as needed */}
        </section>

        {/* Books Section */}
        <section id="books" className="flex flex-wrap gap-4">
          <div className="bg-gray-100 p-4 w-full sm:w-1/2 lg:w-1/3">Book 1</div>
          <div className="bg-gray-100 p-4 w-full sm:w-1/2 lg:w-1/3">Book 2</div>
          <div className="bg-gray-100 p-4 w-full sm:w-1/2 lg:w-1/3">Book 3</div>
          {/* Add more book items as needed */}
        </section>

      </main>

      {/* Footer */}
      <footer id="footer" className="p-4 bg-gray-800 text-white flex flex-col md:flex-row justify-between items-center">
        <div className="contact-info">
          <h3 className="font-bold">Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="social-media-links flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400">Facebook</a>
          <a href="#" className="hover:text-gray-400">Twitter</a>
          <a href="#" className="hover:text-gray-400">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

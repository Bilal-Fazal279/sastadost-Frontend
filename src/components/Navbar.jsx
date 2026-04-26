import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="text-xl font-black text-gray-900">
              Sasta<span className="text-brand-orange">Dost</span>
            </span>
            <span className="hidden sm:inline-block bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1">
              PK
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-brand-orange transition-colors">Deals</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Categories</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Price Alerts</a>
            <a href="#" className="hover:text-brand-orange transition-colors">How It Works</a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-semibold text-gray-600 hover:text-brand-orange transition-colors">
              Sign In
            </button>
            <button className="bg-brand-orange hover:bg-brand-orange-dark text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
              Get Alerts
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 flex flex-col gap-3 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-brand-orange transition-colors px-2 py-1">Deals</a>
            <a href="#" className="hover:text-brand-orange transition-colors px-2 py-1">Categories</a>
            <a href="#" className="hover:text-brand-orange transition-colors px-2 py-1">Price Alerts</a>
            <a href="#" className="hover:text-brand-orange transition-colors px-2 py-1">How It Works</a>
            <button className="bg-brand-orange text-white font-semibold px-4 py-2 rounded-full w-full mt-1">
              Get Alerts
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

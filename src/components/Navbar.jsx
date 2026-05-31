import React, { useState } from 'react';
import { categoryData } from '../categoriesData';
import mainSymbol from '../assets/icons/_Main_symbol.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* 1. Logo Section */}
          <a href="/" className='cursor-pointer'>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
<<<<<<< HEAD
                 {/* <span className="text-white font-black text-lg">S</span> */}
                <img style={{ borderRadius: '60%' }} src="./src/assets/icons/_Main_symbol.png" alt="SasaDost Logo Image" />
=======
                {/* <span className="text-white font-black text-lg">S</span> */}
                <img style={{ borderRadius: '60%' }} src={mainSymbol} alt="SasaDost Logo Image" />
>>>>>>> 4ce24ca11f64d48488af3e7595edfa0f07f2ecee
              </div>
              

              <div className="flex flex-col leading-none">
                <span className="text-xl font-black text-gray-900 tracking-tight">
                  Sasta<span className="text-orange-500">Dost</span>.pk
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest" style={{ fontSize: '10px', fontWeight: 'bold', color: '#706c6c', textTransform: 'uppercase', letterSpacing: '0.15em' }}>پیسہ کم، شاپنگ زیادہ</span>
              </div>
            </div>
          </a>

          {/* 2. Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-600">
            <a href="#" className="hover:text-orange-500 transition-colors">Deals</a>

            {/* Mega Menu Trigger */}
            <div
              className="relative py-5"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <button className={`flex items-center gap-1 transition-colors ${showCategories ? 'text-orange-500' : 'hover:text-orange-500'}`}>
                Categories
                <svg className={`w-4 h-4 transition-transform duration-300 ${showCategories ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Menu Dropdown */}
              {showCategories && (
                <div className="absolute top-full -left-48 w-[750px] bg-white shadow-2xl border border-gray-100 rounded-3xl p-8 grid grid-cols-3 gap-10 animate-in fade-in slide-in-from-top-4 duration-200">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="space-y-4">
                      <h3 className="text-orange-500 font-black text-[11px] uppercase tracking-[0.15em] border-b border-orange-50 pb-2 underline decoration-wavy decoration-orange-400/60">
                        {cat.name}
                      </h3>
                      <ul className="space-y-2.5">
                        {cat.subItems.map((sub) => (
                          <li key={sub.name}>
                            <a
                              href={sub.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-gray-500 hover:text-gray-900 text-[13px] font-medium block transition-all hover:translate-x-1"
                            >
                              {sub.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="hover:text-orange-500 transition-colors">Price Alerts</a>
            <a href="#" className="hover:text-orange-500 transition-colors">How It Works</a>
          </div>

          {/* 3. CTA Section */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-bold text-gray-500 hover:text-gray-900 px-4">Sign In</button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-7 py-2.5 rounded-full shadow-md shadow-orange-100 transition-all hover:-translate-y-0.5 active:translate-y-0">
              Get Alerts
            </button>
          </div>

          {/* 4. Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-gray-50"
          >
            <span className={`block w-5 h-0.5 bg-gray-900 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-900 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-900 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* 5. Mobile Menu View */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-6 space-y-6 max-h-[80vh] overflow-y-auto bg-white">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-lg font-bold text-gray-900 px-2">Deals</a>
              <div className="px-2">
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-4">Categories</p>
                <div className="grid grid-cols-1 gap-6">
                  {categoryData.map((cat) => (
                    <div key={cat.name}>
                      <p className="font-bold text-gray-900 text-sm mb-2">{cat.name}</p>
                      <div className="flex flex-wrap gap-2">
                        {cat.subItems.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.url}
                            className="text-[11px] font-medium bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-100"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <a href="#" className="text-lg font-bold text-gray-900 px-2">Price Alerts</a>
              <button className="w-full bg-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-100">
                Get Early Alerts
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';

interface NavbarProps {
  onLogoClick: () => void;
  isScrolled?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onLogoClick, isScrolled }) => {
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div 
        onClick={onLogoClick}
        className="cursor-pointer group"
      >
        <span className="text-2xl md:text-3xl font-black font-futuristic tracking-tighter transition-transform group-hover:scale-105 inline-block">
          PHOTO<span className="text-white/40">.</span>IN
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        <select className="bg-transparent text-sm font-medium text-white/60 outline-none cursor-pointer hover:text-white transition-colors">
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="fr">FR</option>
        </select>
        <button className="hidden md:block px-5 py-2 text-sm font-semibold rounded-full border border-white/20 hover:bg-white/10 transition-all">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


import React, { useState } from 'react';

interface SearchHeroProps {
  onSearch: (query: string) => void;
}

const CATEGORY_CHIPS = ['4K Wallpapers', 'Mobile Backgrounds', 'Cyberpunk', 'Nature', 'Minimalist', 'AI Art'];

const SearchHero: React.FC<SearchHeroProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-4xl md:text-7xl font-black font-futuristic tracking-tight leading-tight mb-6">
          Unlimited premium photos <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-400">
            for every idea
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 font-light mb-12 max-w-2xl mx-auto">
          Search stunning wallpapers, creative visuals, and high-quality images instantly.
        </p>

        <form 
          onSubmit={handleSubmit}
          className="relative max-w-2xl mx-auto mb-8 group"
        >
          <div className="glass flex items-center p-2 rounded-full border border-white/10 focus-within:border-white/30 transition-all duration-500 shadow-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search wallpapers for desktop, mobile, nature, AI art..."
              className="bg-transparent flex-1 px-6 py-4 md:py-5 outline-none text-white placeholder-white/40 text-sm md:text-base"
            />
            <button
              type="submit"
              className="bg-white text-black font-bold px-8 py-4 md:py-5 rounded-full hover:bg-neutral-200 transition-all active:scale-95 shadow-xl"
            >
              Explore
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORY_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => onSearch(chip)}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/70"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHero;

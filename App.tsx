
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Page, Photo } from './types';
import { generatePhotos } from './services/mockData';
import Navbar from './components/Navbar';
import HeroBackground from './components/HeroBackground';
import SearchHero from './components/SearchHero';
import ImageCard from './components/ImageCard';
import ImageModal from './components/ImageModal';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && currentPage === Page.RESULTS) {
        loadMorePhotos();
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loading, currentPage]);

  const loadMorePhotos = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setPhotos(prev => [...prev, ...generatePhotos(20, prev.length, searchQuery)]);
      setLoading(false);
    }, 800);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(Page.RESULTS);
    setPhotos(generatePhotos(24, 0, query));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetToHome = () => {
    setCurrentPage(Page.LANDING);
    setSearchQuery('');
    setPhotos([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar onLogoClick={resetToHome} isScrolled={isScrolled} />
      
      {/* LANDING PAGE */}
      {currentPage === Page.LANDING && (
        <main className="relative h-screen">
          <HeroBackground />
          <SearchHero onSearch={handleSearch} />
        </main>
      )}

      {/* RESULTS PAGE */}
      {currentPage === Page.RESULTS && (
        <main className="pt-32 pb-20 px-6 md:px-12 animate-in fade-in duration-700">
          <div className="mb-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black font-futuristic tracking-tighter mb-2">
                {searchQuery || 'Discovery'}
              </h2>
              <p className="text-white/40 font-medium">Over 2.4k high-resolution results for your concept</p>
            </div>
            
            <div className="flex gap-3">
              <button className="px-5 py-2 rounded-full glass text-sm font-semibold hover:bg-white/10 transition-all">Trending</button>
              <button className="px-5 py-2 rounded-full glass text-sm font-semibold hover:bg-white/10 transition-all">Latest</button>
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
              {photos.map((photo) => (
                <ImageCard 
                  key={photo.id} 
                  photo={photo} 
                  onClick={setSelectedPhoto} 
                />
              ))}
            </div>
            
            {/* Infinite Scroll Trigger */}
            <div 
              ref={loadMoreRef} 
              className="h-20 flex items-center justify-center mt-12"
            >
              {loading && (
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      <ImageModal 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />

      <footer className="py-12 px-6 border-t border-white/5 text-center text-white/20 text-xs font-futuristic uppercase tracking-widest">
        &copy; {new Date().getFullYear()} PHOTO.IN — Designed for Creators.
      </footer>
    </div>
  );
};

export default App;

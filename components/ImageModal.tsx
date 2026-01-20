
import React, { useEffect, useState } from 'react';
import { Photo } from '../types';
import ImageCard from './ImageCard';
import { generatePhotos } from '../services/mockData';

interface ImageModalProps {
  photo: Photo | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ photo, onClose }) => {
  const [related, setRelated] = useState<Photo[]>([]);

  useEffect(() => {
    if (photo) {
      // Simulate loading related images
      setRelated(generatePhotos(8, 100, photo.category));
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [photo]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-7xl h-full flex flex-col md:flex-row bg-neutral-900/50 rounded-3xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main Image View */}
        <div className="flex-[2] h-full bg-black flex items-center justify-center overflow-hidden">
          <img 
            src={photo.url} 
            alt={photo.description} 
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Content Sidebar */}
        <div className="flex-1 h-full overflow-y-auto p-8 md:p-12 scrollbar-hide">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                {photo.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{photo.author}</h3>
                <p className="text-white/40 text-sm">Professional Photographer</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">{photo.category} Vision</h2>
            <p className="text-white/60 leading-relaxed mb-8">
              {photo.description}
            </p>
            
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all active:scale-95">
                Download Free
              </button>
              <button className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">More like this</h4>
            <div className="columns-2 gap-4">
              {related.map(p => (
                <ImageCard key={p.id} photo={p} onClick={() => {}} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;


import React, { useState } from 'react';
import { Photo } from '../types';

interface ImageCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="group relative mb-6 cursor-pointer break-inside-avoid animate-in zoom-in-95 duration-700"
      onClick={() => onClick(photo)}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-neutral-900 transition-all duration-500 ${isLoaded ? 'opacity-100 shadow-lg group-hover:shadow-blue-500/20' : 'opacity-0'}`}>
        <img
          src={photo.url}
          alt={photo.description}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105`}
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <p className="text-white font-bold text-sm mb-1">{photo.category}</p>
          <p className="text-white/60 text-xs truncate">by {photo.author}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-800 rounded-2xl animate-pulse" />
      )}
    </div>
  );
};

export default ImageCard;

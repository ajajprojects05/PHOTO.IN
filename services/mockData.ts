
import { Photo } from '../types';

const CATEGORIES = ['Wallpapers', 'Nature', 'AI Art', 'Architecture', 'Cyberpunk', 'Minimal', 'Desktop', 'Abstract'];

export const generatePhotos = (count: number, startIndex: number = 0, category?: string): Photo[] => {
  return Array.from({ length: count }).map((_, i) => {
    // FIX: Keep a numeric version of the ID for arithmetic operations to avoid TS error on string multiplication
    const numericId = startIndex + i;
    const id = numericId.toString();
    const width = Math.floor(Math.random() * (1200 - 800) + 800);
    const height = Math.floor(Math.random() * (1600 - 1000) + 1000); // Taller portraits for masonry
    const cat = category || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    
    return {
      id,
      // FIX: Use numericId instead of id string for the seed calculation to satisfy type safety
      url: `https://picsum.photos/seed/${numericId * 2}/1080/1350`,
      width,
      height,
      author: `Creator ${id}`,
      description: `Breathtaking ${cat} shot capturing the essence of modern creativity.`,
      category: cat
    };
  });
};

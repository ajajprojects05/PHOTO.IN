
import React, { useMemo } from 'react';

const HeroBackground: React.FC = () => {
  // Create an array of random premium-looking photo URLs
  const backgroundImages = useMemo(() => [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600',
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <div className="flex gap-4 h-full">
        {[0, 1, 2, 3, 4].map((col) => (
          <div 
            key={col} 
            className="flex-1 flex flex-col gap-4 animate-scroll"
            style={{ 
              animation: `scroll ${30 + col * 5}s linear infinite`,
              marginTop: `${col % 2 === 0 ? '-50%' : '0'}`
            }}
          >
            {[...backgroundImages, ...backgroundImages].map((img, i) => (
              <div 
                key={`${col}-${i}`}
                className="w-full aspect-[3/4] bg-neutral-900 rounded-2xl overflow-hidden"
              >
                <img 
                  src={img} 
                  alt="" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
      <div className="absolute inset-0 bg-black/40 z-0" />
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  );
};

export default HeroBackground;

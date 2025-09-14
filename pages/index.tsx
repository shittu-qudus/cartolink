import Image from "next/image";
import { useState, useEffect } from "react";

interface Pixel {
  id: number;
  image: string;
}

const pixels: Pixel[] = [
  { id: 1, image: "/wan.jpeg" },
  { id: 2, image: "/open.jpeg" },
];

interface GenerateProps {
  id: number;
  task: string;
  new: boolean;
  image: string;
  text: string;
}

const generates: GenerateProps[] = [
  { id: 1, task: "Image", new: true, image: "/image.png", text: "Generate Image with custom in flex and diamgram" },
  { id: 2, task: "Video", new: false, image: "/video.png", text: "Generate Video with custom in flex and diamgram" },
  { id: 3, task: "RealTime", new: false, image: "/realtime.png", text: "Generate RealTime with custom in flex and diamgram" },
  { id: 4, task: "Extractor", new: true, image: "/extractor.png", text: "Generate Extractor with custom in flex and diamgram" },
  { id: 5, task: "Edit", new: true, image: "/edit.png", text: "Generate Edit with custom in flex and diamgram" },
  { id: 6, task: "Video Lipsync", new: true, image: "/lipsync.png", text: "Generate Video Lipsync with custom in flex and diamgram" },
  { id: 7, task: "Motion Transfer", new: true, image: "/motion.png", text: "Generate Motion Transfer with custom in flex and diamgram" },
  { id: 8, task: "Train", new: false, image: "/brain.png", text: "Generate Train with custom in flex and diamgram" },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode
  useEffect(() => {
    // Check if dark mode is saved in localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else {
      // If not saved, check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemPrefersDark);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getWidths = () => {
    if (typeof window === "undefined") return [800, 800]; 
    
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) return [300, 300];     
    if (screenWidth < 768) return [500, 500];      
    if (screenWidth < 1024) return [700, 700];     
    return [1100, 1100];                           
  };

  const gapPx = 32; 
  const count = pixels.length;

  const widths = getWidths();
  
  const viewportWidth =
    widths.reduce((sum, w) => sum + w, 0) + gapPx * (count - 1);

  const computeOffset = (index: number | null) => {
    if (index === null) return 0;
    const beforeWidths = widths.slice(0, index).reduce((a, b) => a + b, 0);
    const centerOfImage = beforeWidths + index * gapPx + widths[index] / 2;
    const viewportCenter = viewportWidth / 2;
    return Math.round(viewportCenter - centerOfImage);
  };

  const offsetPx = computeOffset(activeIndex);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activeIndex === null) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex((prev) => {
      const current = prev ?? 0;
      return current === 0 ? count - 1 : current - 1;
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activeIndex === null) {
      setActiveIndex(1 % count);
      return;
    }
    setActiveIndex((prev) => {
      const current = prev ?? 0;
      return current === count - 1 ? 0 : current + 1;
    });
  };

  const handleDotClick = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    setActiveIndex((cur) => (cur === i ? null : i));
  };

  const handleShowAll = (e: React.MouseEvent) => {
    e.preventDefault();
    
  };

  return (
    <div className={`min-h-screen py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
    
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'} transition-colors duration-300`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative my-4 sm:my-6 lg:my-8 w-full max-w-full">
          <div
            className="mx-auto overflow-hidden"
            style={{ width: "100%", maxWidth: viewportWidth }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6 lg:gap-8"
              style={{
                transform: `translateX(${offsetPx}px)`,
              }}
            >
              {pixels.map((pixel, i) => (
                <div
                  key={pixel.id}
                  className="w-full flex-shrink-0 relative rounded-lg overflow-hidden shadow-lg"
                  style={{ 
                    maxWidth: `${widths[i]}px`,
                    height: "clamp(200px, 40vw, 400px)"
                  }}
                >
                  <Image
                    src={pixel.image}
                    alt={`Pixel ${pixel.id}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            
            <div className="flex flex-row gap-2">
              {pixels.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => handleDotClick(e, i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full focus:outline-none ${
                    i === activeIndex 
                      ? darkMode ? "bg-white" : "bg-black" 
                      : "bg-blue-500"
                  }`}
                />
              ))}
            </div>

            <div className="flex flex-row gap-2">
              <button
                onClick={handlePrev}
                className={`border ${darkMode ? 'text-white border-gray-600 hover:bg-gray-800' : 'text-black border-gray-300 hover:bg-gray-100'} rounded-md px-3 py-1 text-sm sm:text-base transition-colors duration-300`}
                aria-label="Previous"
              >
                &lt;
              </button>
              <button
                onClick={handleNext}
                className={`border ${darkMode ? 'text-white border-gray-600 hover:bg-gray-800' : 'text-black border-gray-300 hover:bg-gray-100'} rounded-md px-3 py-1 text-sm sm:text-base transition-colors duration-300`}
                aria-label="Next"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
     
     <div className="flex justify-end mb-4">
         <button 
           onClick={handleShowAll}
           className={`border-none ${darkMode ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-500 hover:bg-gray-100'} rounded-md px-3 py-1 text-sm sm:text-base transition-colors duration-300`}
         >
           ^ show all
         </button>
     </div>

      <div className="w-full mx-auto px-0">
        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-300`}>Generate</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {generates.map((generate) => (
            <div
              key={generate.id}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 transition-colors duration-300 w-300`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Image
                    src={generate.image}
                    alt={generate.task}
                    height={48}
                    width={48}
                    className="rounded-md"
                  />
                </div>

                <div className="ml-3 sm:ml-4 flex-grow">
                  <div className="flex items-center mb-1">
                    <h2 className={`text-base sm:text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mr-2 transition-colors duration-300`}>
                      {generate.task}
                    </h2>
                    {generate.new && (
                      <span className="text-xs font-semibold text-white bg-blue-500 px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
         
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} w-100 text-sm mb-2 sm:mb-0 sm:mr-2 flex-grow transition-colors duration-300`}>
                      {generate.text}
                    </p>
                    <button 
                      className={`w-16 h-8 sm:w-20 sm:h-10 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-blue-600'} rounded-full hover:text-white transition-colors duration-300 font-medium text-xs sm:text-sm flex-shrink-0`}
                      onClick={(e) => e.preventDefault()}
                    >
                      Open
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mt-8 mb-4 transition-colors duration-300`}>GALLERY</h1>
    </div>
  );
}
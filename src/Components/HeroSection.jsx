import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../FireBase/FireBaseConfig';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Fetch images from Firestore for dynamic slider
  const fetchImages = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireDB, "Images"));
      const home = [];
      querySnapshot.forEach((docSnapshot) => {
        const data = { id: docSnapshot.id, ...docSnapshot.data() };
        if (data.type === "home") home.push(data);
      });
      // Sort newest first
      home.sort((a, b) => b.time?.seconds - a.time?.seconds);
      if (home.length > 0) {
        const latest = home[0];
        const dynamicSlides = [];
        for (let i = 1; i <= 5; i++) {
          const key = `imgurl${i}`;
          if (latest[key]) {
            dynamicSlides.push({
              src: latest[key],
              alt: `Slide ${i}`,
              name: `Slide ${i}`,
            });
          }
        }
        setSlides(dynamicSlides);
      }
    } catch (error) {
      // Optionally handle error (e.g., toast)
      console.error("Image fetch error:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (slides.length === 0 || !isPlaying) return;
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides, isPlaying]);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (slides.length === 0) return null; // or loading indicator

  return (
    <section className="w-full relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Full Width Slider Container */}
      <div className="relative w-full">
        {/* Slides */}
        <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === slideIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              }`}
            >
              <img
                className="w-full h-full object-cover object-center"
                src={slide.src}
                alt={slide.alt}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/30 z-10 shadow-lg"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/30 z-10 shadow-lg"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-2 sm:top-4 md:top-6 right-2 sm:right-4 md:right-6 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/30 z-10 shadow-lg"
        >
          {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlideIndex(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 border-2 shadow-lg ${
                index === slideIndex 
                  ? 'bg-primary border-primary scale-125' 
                  : 'bg-white/50 border-white/70 hover:bg-white/70'
              }`}
            ></button>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-2 sm:right-4 md:right-6 z-10">
          <div className="bg-black/70 backdrop-blur-sm rounded-xl px-3 py-2 sm:px-4 sm:py-3 border border-white/30 shadow-lg">
            <span className="text-white font-medium text-sm sm:text-base">
              {slideIndex + 1} / {slides.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

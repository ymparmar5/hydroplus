import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../FireBase/FireBaseConfig';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const HeroSection = () => {
  const [slides, setSlides] = useState([
              { src: "/home1.jpg", alt: "Slide 1", name: "Slide 1" }, 
          { src: "/home2.jpg", alt: "Slide 2", name: "Slide 2" },
           { src: "/home3.jpg", alt: "Slide 3", name: "Slide 3" }, 
           { src: "/home4.jpg", alt: "Slide 4", name: "Slide 4" },
  ]);
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
        const staticSlides = [
          { src: "/home1.jpg", alt: "Slide 1", name: "Slide 1" }, 
          { src: "/home2.jpg", alt: "Slide 2", name: "Slide 2" },
           { src: "/home3.jpg", alt: "Slide 3", name: "Slide 3" }, 
           { src: "/home4.jpg", alt: "Slide 4", name: "Slide 4" },
          ];
        setSlides(staticSlides);
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
    <section className="relative w-full bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Slider Container */}
      <div className="relative w-full">
        {/* Slides Container - Auto height based on image aspect ratio */}
        <div className="relative w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-full transition-all duration-1000 ease-in-out ${
                index === slideIndex
                  ? 'opacity-100 block'
                  : 'opacity-0 hidden'
              }`}
            >
              <div className="relative w-full">
                <img
                  className="w-full h-auto object-cover object-center"
                  src={slide.src}
                  alt={slide.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                
                {/* Optional: Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Responsive positioning and sizing */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/30 z-20 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/30 z-20 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>

        {/* Play/Pause Button - Responsive positioning */}
        <button
          onClick={togglePlayPause}
          className="absolute top-2 sm:top-4 md:top-6 lg:top-8 right-2 sm:right-4 md:right-6 lg:right-8 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/30 z-20 shadow-lg"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <Pause className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          ) : (
            <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          )}
        </button>

        {/* Slide Indicators - Responsive positioning and sizing */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlideIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 border-2 shadow-lg ${
                index === slideIndex
                  ? 'bg-primary border-primary scale-125'
                  : 'bg-white/50 border-white/70 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Slide Counter - Responsive positioning and sizing */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 right-2 sm:right-4 md:right-6 lg:right-8 z-20">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 border border-white/30 shadow-lg">
            <span className="text-white font-medium text-xs sm:text-sm md:text-base">
              {slideIndex + 1} / {slides.length}
            </span>
          </div>
        </div>

        {/* Optional: Hero Content Overlay */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex items-center justify-start z-10 pointer-events-none">
          <div className="text-start text-white px-4 sm:px-8 md:px-12 lg:px-20">
            <h1 className="align-start text-lg sm:text-sm text-white md:text-3xl lg:text-4xl xl:text-5xl font-bold lg:mb-2 sm:mb-1 drop-shadow-lg">
              Welcome to 
            </h1>
            <h1 className="align-start text-lg sm:text-sm text-primary md:text-3xl lg:text-4xl xl:text-5xl font-bold lg:mb-2 sm:mb-1 drop-shadow-lg">
               HydroPlus
            </h1>
            <h1 className="align-start text-lg sm:text-sm text-black md:text-3xl lg:text-4xl xl:text-5xl font-bold lg:mb-2 sm:mb-1 drop-shadow-lg">
                international
            </h1>
            <p className="text-sm text-white  sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-2xl mx-auto drop-shadow-md">
                Strenth in every stroke
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../FireBase/FireBaseConfig';

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

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
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) return null; // or loading indicator

  return (
    <section className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white py-8 md:py-16">
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-opacity duration-700 ${index === slideIndex ? 'opacity-100' : 'opacity-0 hidden'}`}
          >
            <img
              className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover object-center"
              src={slide.src}
              alt={slide.alt}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full border-2 border-blue-700 mx-1 transition-all duration-300 ${index === slideIndex ? 'bg-blue-700' : 'bg-white'}`}
            onClick={() => setSlideIndex(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

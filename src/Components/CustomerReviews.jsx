import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const CustomerReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const reviews = [
    {
      id: 1,
      name: "Michael Chen",
      role: "Business Owner",
      rating: 5,
      image: "/admin.png",
      text: "As a restaurant owner, water quality is crucial. HydroPlus delivered an industrial-grade solution that exceeded expectations!",
      company: "Restaurant Chain"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Homeowner",
      rating: 5,
      image: "/admin.png",
      text: "The water filtration system from HydroPlus has completely transformed our home. The water quality is exceptional!",
      company: "Residential Customer"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Property Manager",
      rating: 5,
      image: "/admin.png",
      text: "We installed HydroPlus systems across all our properties. The maintenance is minimal and quality is consistently excellent!",
      company: "Property Management"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Manufacturing Director",
      rating: 5,
      image: "/admin.png",
      text: "The industrial water treatment solutions have significantly improved our production efficiency. Professional team!",
      company: "Manufacturing Industry"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Healthcare Administrator",
      rating: 5,
      image: "/admin.png",
      text: "Our hospital needed the highest quality water treatment. HydroPlus provided a comprehensive solution that meets all standards!",
      company: "Healthcare Facility"
    },
    {
      id: 6,
      name: "John Smith",
      role: "Hotel Manager",
      rating: 5,
      image: "/admin.png",
      text: "The commercial water systems from HydroPlus have improved our guest satisfaction. Excellent service and support!",
      company: "Hotel Chain"
    }
  ];

  // Responsive slides per view calculation
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesPerView(3); // Large screens: 3 per slide
      } else if (width >= 768) {
        setSlidesPerView(2); // Medium screens: 2 per slide
      } else {
        setSlidesPerView(1); // Small screens: 1 per slide
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total slides based on responsive slides per view
  const totalSlides = Math.ceil(reviews.length / slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full relative bg-gradient-to-br from-black via-gray-900 to-black py-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-10 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center items-center mb-3 sm:mb-4">
            <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-primary/20 border border-primary/30">
              <Star className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary animate-pulse" />
            </span>
          </div>
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-primary/30 mb-3 sm:mb-4">
            <span className="text-primary font-semibold text-xs sm:text-sm">Customer Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl zmd:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
        </div>

        {/* Responsive Swiper */}
        <div className="max-w-5xl mx-auto relative">
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }, (_, slideIndex) => {
                const slideReviews = reviews.slice(slideIndex * slidesPerView, slideIndex * slidesPerView + slidesPerView);
                return (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className={`grid gap-6 px-1 sm:px-2 md:px-4 ${
                      slidesPerView === 1 ? 'grid-cols-1' : slidesPerView === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                      {slideReviews.map((review) => (
                        <div key={review.id} className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:scale-105 flex flex-col">
                          {/* Quote Icon */}
                          <div className="flex justify-center items-center mb-3 sm:mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center">
                              <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            </div>
                          </div>

                          {/* Review Text */}
                          <div className="text-center mb-4 sm:mb-6 flex-1">
                            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed italic">
                              "{review.text}"
                            </p>
                          </div>

                          {/* Customer Info */}
                          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary/50 flex-shrink-0">
                              <img 
                                src={review.image} 
                                alt={review.name} 
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                            <div className="text-left min-w-0 flex-1">
                              <h4 className="text-white font-bold text-xs sm:text-sm md:text-base truncate">{review.name}</h4>
                              <p className="text-gray-400 text-xs truncate">{review.role}</p>
                              <p className="text-primary text-xs font-medium truncate">{review.company}</p>
                            </div>
                          </div>

                          {/* Rating Stars */}
                          <div className="flex justify-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-primary fill-current" />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/40 z-20 shadow-xl"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-white/40 z-20 shadow-xl"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 sm:mt-6 gap-1.5 sm:gap-2 md:gap-3">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 border-2 shadow-lg ${
                  index === currentSlide 
                    ? 'bg-primary border-primary scale-125' 
                    : 'bg-white/50 border-white/70 hover:bg-white/70'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews; 
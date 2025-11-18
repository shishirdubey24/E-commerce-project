import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Hero1 from "../../../assets/HeroImages/Hero1.jpg"
import Hero2 from "../../../assets/HeroImages/Hero2.jpg"
import Hero3 from "../../../assets/HeroImages/Hero3.jpg"
import Hero4 from "../../../assets/HeroImages/Hero4.png"
const slides = [
  {
    image: Hero3,
    
  },
  {
    image: Hero4,
   
  },
  {
    image: Hero2,
   
  },
   {
    image: Hero1,
   
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={index}
          aria-hidden={index !== current}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-8 lg:px-16">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-6">{slide.subtitle}</p>

                {/* CTA as simple button */}
                <button
                  type="button"
                  className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-[1.02] transition-transform"
                  onClick={() => {
                    /* wire navigation or open collection */
                    console.log("CTA clicked:", slide.cta);
                  }}
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        aria-label="Previous slide"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Right Arrow */}
      <button
        aria-label="Next slide"
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${
              idx === current ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Hero1 from "../../../assets/HeroImages/Hero1.jpg";
import Hero2 from "../../../assets/HeroImages/Hero2.jpg";
import Hero3 from "../../../assets/HeroImages/Hero3.jpg";
import Hero4 from "../../../assets/HeroImages/Hero4.png";

const slides = [Hero3, Hero4, Hero2, Hero1];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const AUTOPLAY_MS = 3000;

  // ✅ Continuous autoplay - never stops
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [current]);

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const jumpTo = (index) => {
    setCurrent(index);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-100"
      aria-label="Hero carousel"
    >
      {/* Height responsive */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh]">
        {slides.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={img}
              alt={`Hero slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          aria-label="Previous slide"
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-20"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>

        <button
          aria-label="Next slide"
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-20"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => jumpTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

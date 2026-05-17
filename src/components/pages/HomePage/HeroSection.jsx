import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Hero1 from "../../../assets/HeroImages/Hero1.webp";
import Hero2 from "../../../assets/HeroImages/Hero2.webp";
import Hero3 from "../../../assets/HeroImages/Hero3.webp";
import Hero4 from "../../../assets/HeroImages/Hero4.webp";

const slides = [Hero3, Hero4, Hero2, Hero1];

const AUTOPLAY_MS = 3500;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const timerRef = useRef(null);

  // Stable autoplay interval
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

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
      className="relative w-full overflow-hidden bg-[#f5f5f6] mt-4"
      aria-label="Hero carousel"
    >
      <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] 2xl:h-[80vh] cursor-pointer group">
        {/* Slides */}
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
              className="w-full h-full object-cover sm:object-fill lg:object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
              draggable={false}
              sizes="100vw"
              width="1920"
              height="900"
            />
          </div>
        ))}

        {/* Previous Button */}
        <button
          aria-label="Previous slide"
          onClick={goPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-14 bg-white/50 backdrop-blur-sm group-hover:bg-white/90 shadow-sm border border-transparent hover:border-gray-200 transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="h-8 w-8 text-[#282c3f]" strokeWidth={1.5} />
        </button>

        {/* Next Button */}
        <button
          aria-label="Next slide"
          onClick={goNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-14 bg-white/50 backdrop-blur-sm group-hover:bg-white/90 shadow-sm border border-transparent hover:border-gray-200 transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="h-8 w-8 text-[#282c3f]" strokeWidth={1.5} />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => jumpTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-500 ease-out ${
                index === current
                  ? "w-3 h-3 bg-white border border-gray-300 shadow-md scale-110"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
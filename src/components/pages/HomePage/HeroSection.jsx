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
  const pausedRef = useRef(false);

  const AUTOPLAY_MS = 1000;

  // autoplay — clean and reliable
  const startAutoplay = () => {
    stopAutoplay();
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent((p) => (p + 1) % slides.length);
      }
    }, AUTOPLAY_MS);
  };

  const stopAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  const goPrev = () => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
    restartAutoplay();
  };

  const goNext = () => {
    setCurrent((p) => (p + 1) % slides.length);
    restartAutoplay();
  };

  const jumpTo = (i) => {
    setCurrent(i);
    restartAutoplay();
  };

  const restartAutoplay = () => {
    pausedRef.current = true;
    stopAutoplay();
    setTimeout(() => {
      pausedRef.current = false;
      startAutoplay();
    }, 600);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {/* Height responsive */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh]">
        {slides.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}

        {/* Arrows (tell me if you want them removed!) */}
        <button
          aria-label="Previous"
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white transition"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          aria-label="Next"
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white transition"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots (remove if unwanted) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              className={`rounded-full transition-all ${
                i === current ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

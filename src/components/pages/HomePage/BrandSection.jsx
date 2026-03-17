import { useState } from "react";
import brand1 from "../../../assets/Brand/Brand1.webp";
import brand2 from "../../../assets/Brand/Brand2.webp";
import brand3 from "../../../assets/Brand/Brand 3.webp";
import brand4 from "../../../assets/Brand/Brand4.avif";
import brand5 from "../../../assets/Brand/Brand5.jpg";
import brand7 from "../../../assets/Brand/brand7.jpeg";
import brand8 from "../../../assets/Brand/Brand 8.jpeg";
import brand11 from "../../../assets/Brand/Brand11.webp";

const brands = [
  { name: "Brand 1", image: brand1 },
  { name: "Brand 2", image: brand2 },
  { name: "Brand 3", image: brand3 },
  { name: "Brand 4", image: brand4 },
  { name: "Brand 5", image: brand5 },
  { name: "Brand 6", image: brand11 },
  { name: "Brand 7", image: brand7 },
  { name: "Brand 8", image: brand8 },
];

export default function BrandSection() {
  const [activeBrand, setActiveBrand] = useState("");

  return (
    <section className="bg-[#f5f5f6] py-16 lg:py-20" aria-labelledby="top-brands-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Brand Banner Heading inside background or minimalist */}
        <div className="mb-12 text-center flex flex-col items-center">
          <h2
            id="top-brands-heading"
            className="text-[22px] sm:text-[28px] font-bold text-[#3e4152] tracking-[0.15em] uppercase"
          >
            GRAND GLOBAL BRANDS
          </h2>
          <div className="mt-3 w-16 h-1 bg-[#f1c40f] rounded-full shadow-sm"></div>
          <p className="mt-5 text-[15px] text-[#696e79] font-medium max-w-[500px] mx-auto">
            Some of the most loved brands to level up your style
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6 justify-items-center">
          {brands.map((brand) => {
            const isActive = activeBrand.toLowerCase() === brand.name.toLowerCase();

            return (
              <button
                key={brand.name}
                type="button"
                onClick={() => setActiveBrand(brand.name)}
                aria-pressed={isActive}
                className={`group w-full max-w-[280px] bg-white rounded-md overflow-hidden 
                  flex flex-col items-center border border-transparent shadow-sm hover:shadow-lg
                  transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3f6c]
                  ${isActive ? "border-[#f1c40f] shadow-lg ring-1 ring-[#f1c40f]" : "hover:-translate-y-1 hover:border-gray-200"}
                `}
              >
                {/* Image Container */}
                <div className="w-full relative bg-white pb-[60%] sm:pb-[70%]">
                  <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className={`max-w-full max-h-full object-contain transition-transform duration-500 will-change-transform ease-out
                        ${isActive ? "scale-105" : "group-hover:scale-110"}
                      `}
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Subtle Brand Strip */}
                <div
                  className={`w-full py-4 text-center border-t border-gray-100 transition-colors
                    ${isActive ? "bg-[#fffaf0] font-bold text-[#b8860b]" : "bg-white font-semibold text-[#282c3f] group-hover:text-[#ff3f6c]"}
                  `}
                >
                  <span className="text-[14px] uppercase tracking-wide">{brand.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

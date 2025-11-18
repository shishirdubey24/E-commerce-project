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
    <section className="bg-white pt-28 pb-20" aria-labelledby="top-brands-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-8">
          <h2 id="top-brands-heading" className="text-9xl sm:text-3xl font-extrabold text-gray-900">
            Top Brands
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-[720px] mx-auto">
            Curated from the best — trending and trusted names.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {brands.map((brand) => {
            const isActive = activeBrand.toLowerCase() === brand.name.toLowerCase();

            return (
              <button
                key={brand.name}
                type="button"
                onClick={() => setActiveBrand(brand.name)}
                aria-pressed={isActive}
                className={`group bg-white rounded-2xl  flex flex-col items-center justify-center gap-3
                  transition-shadow duration-200 focus:outline-none
                  ${isActive ? "ring-4 ring-indigo-500 shadow-md" : "hover:shadow-md"}`}
              >
                {/* Logo container: object-contain keeps full logo visible */}
                <div className="w-full flex items-center justify-center">
                  <div className="w-full h-28 sm:h-36 md:h-44 flex items-center justify-center">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Visible brand name below the logo */}
                <div className="w-full text-center">
                  <span className="text-sm font-medium text-gray-800">{brand.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

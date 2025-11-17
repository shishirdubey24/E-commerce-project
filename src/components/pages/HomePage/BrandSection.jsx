import brand1 from "../../../assets/Brand/Brand1.webp";
import brand2 from "../../../assets/Brand/Brand2.webp";
import brand3 from "../../../assets/Brand/Brand 3.webp";
import brand4 from "../../../assets/Brand/Brand4.avif";
import brand5 from "../../../assets/Brand/Brand5.jpg";
import brand7 from "../../../assets/Brand/brand7.jpeg";
// Rename the file on disk: "Brand 8.jpeg" -> "Brand8.jpeg"
import brand8 from "../../../assets/Brand/Brand 8.jpeg";
import brand11 from "../../../assets/Brand/Brand11.webp"
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

const BrandSection = () => {
  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Top Brands</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="aspect-4/3 bg-white rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center p-4 transition-shadow duration-200 hover:shadow-lg cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" ? console.log("open", brand.name) : null)}
              onClick={() => console.log("clicked", brand.name)}
            >
              {/* object-contain keeps logo visible without stretching; max sizes avoid overflow */}
              <img
                src={brand.image}
                alt={brand.name}
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;

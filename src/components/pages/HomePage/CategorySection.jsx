import Saree from "../../../assets/Category/Saree.jpg";
import Shirt from "../../../assets/Category/Shirt.webp";
import Bedsheet from "../../../assets/Category/Bedsheet.webp";
import Blanket from "../../../assets/Category/Blanket.webp";
import Sports from "../../../assets/Category/Sports.webp";
import Tshirt from "../../../assets/Category/Tshirt.webp";
import Chinos from "../../../assets/Category/Chnos.webp";
import Ethnic from "../../../assets/Category/Ehenic.webp";

import { useNavigate,useParams } from "react-router-dom";

const categories = [
  { name: "Saree", image: Saree },
  { name: "Bedsheet", image: Bedsheet },
  { name: "Sports", image: Sports },
  { name: "T-Shirt", image: Tshirt },
  { name: "Shirt", image: Shirt },
  { name: "Blanket", image: Blanket },
  { name: "Chinos", image: Chinos },
  { name: "Ethnic", image: Ethnic },
];

const CategorySection = () => {
  const navigate = useNavigate();
   const {name:selected}=useParams();


  const handleSelect = (name) => {
    navigate(`/category/${encodeURIComponent(name)}`);
  };

  return (
    <section
      className="bg-white py-12 lg:py-16 px-4 lg:px-6"
      aria-labelledby="shop-by-category-heading"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Heading matching Myntra's uppercase bold tracked style */}
        <div className="mb-10 text-center">
          <h2
            id="shop-by-category-heading"
            className="text-[22px] sm:text-[28px] font-bold text-[#3e4152] tracking-[0.15em] uppercase"
          >
            SHOP BY CATEGORY
          </h2>
          <div className="mt-3 w-16 h-1 bg-[#ff3f6c] mx-auto rounded-full"></div>
        </div>

        {/* Circular Bubble Grid (Common Myntra Pattern) */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 sm:gap-8 justify-items-center">
          {categories.map((cat) => {
            const isActive =
              String(selected).toLowerCase() ===
              String(cat.name).toLowerCase();

            return (
              <div
                key={cat.name}
                onClick={() => handleSelect(cat.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  handleSelect(cat.name)
                }
                className="group flex flex-col items-center cursor-pointer max-w-[100px]"
              >
                {/* Image Container - Circular Bubble */}
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-3 relative mx-auto
                              transition-all duration-300 ease-out 
                              ${
                                isActive
                                  ? "shadow-[0_0_0_3px_#ff3f6c] p-0.5"
                                  : "shadow-md group-hover:shadow-[0_0_0_2px_#ff3f6c] group-hover:p-0.5 group-hover:-translate-y-1"
                              }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Text Label Below */}
                <h3
                  className={`text-[13px] sm:text-[14px] text-center font-bold tracking-wide transition-colors
                    ${isActive ? "text-[#ff3f6c]" : "text-[#282c3f] group-hover:text-[#ff3f6c]"}`}
                >
                  {cat.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

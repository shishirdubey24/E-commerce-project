import Saree from "../../../assets/Category/Saree.jpg";
import Shirt from "../../../assets/Category/Shirt.webp";
import Bedsheet from "../../../assets/Category/Bedsheet.webp";
import Blanket from "../../../assets/Category/Blanket.webp";
import Sports from "../../../assets/Category/Sports.webp";
import Tshirt from "../../../assets/Category/Tshirt.webp";
import Chinos from "../../../assets/Category/Chnos.webp";
import Ethnic from "../../../assets/Category/Ehenic.webp";

import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../store/categorySlice";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selected = useSelector((state) => state.category.selected);

  const handleSelect = (name) => {
    console.log("Category clicked:", name);
    dispatch(setCategory(name));
    navigate(`/category/${encodeURIComponent(name)}`);
  };

  return (
    <section
      className="bg-[#f5f5f6] py-10 sm:py-12 px-4 lg:px-8"
      aria-labelledby="shop-by-category-heading"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Heading */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h2
            id="shop-by-category-heading"
            className="text-[18px] sm:text-[20px] font-bold text-gray-900 tracking-wide"
          >
            SHOP BY CATEGORY
          </h2>
          <p className="mt-1 text-[12px] text-gray-600">
            Explore curated picks across clothing, home, and more.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
                className={`group relative bg-white border rounded-sm overflow-hidden cursor-pointer
                            transition duration-200 ease-out
                            hover:shadow-md hover:-translate-y-0.5
                            ${
                              isActive
                                ? "border-[#ff3f6c] shadow-md"
                                : "border-gray-200"
                            }`}
              >
                {/* Category image */}
                <div className="w-full h-0 pb-[115%] relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Bottom label bar */}
                <div className="absolute inset-x-0 bottom-0 bg-white/95 border-t border-gray-100 px-3 py-1.5 flex items-center justify-between">
                  <h3 className="text-[12px] font-semibold text-gray-900 truncate">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                    View all
                  </span>
                </div>

                {/* Active highlight strip */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-0.5 ${
                    isActive ? "bg-[#ff3f6c]" : "bg-transparent"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

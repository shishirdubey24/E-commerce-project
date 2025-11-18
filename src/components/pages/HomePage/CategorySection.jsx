import Saree from "../../../assets/Category/Saree.jpg";
import Shirt from "../../../assets/Category/Shirt.webp"
import Bedsheet from "../../../assets/Category/Bedsheet.webp";
import Blanket from "../../../assets/Category/Blanket.webp"
import Sports from "../../../assets/Category/Sports.webp";
import Tshirt from "../../../assets/Category/Tshirt.webp";
import Chinos from "../../../assets/Category/Chnos.webp"
import Ethnic from "../../../assets/Category/Ehenic.webp"
import { useDispatch, useSelector } from "react-redux";
import {setCategory} from "../../../store/categorySlice"
import { useNavigate } from "react-router-dom";
const categories = [
  { name: "Saree", image: Saree },
  { name: "Bedsheet", image: Bedsheet },
  { name: "Sports", image: Sports },
  { name: "T-Shirt", image: Tshirt },
    { name: "Shirt", image: Shirt },
  { name: "Blanket", image: Blanket },
  { name: "chinos", image: Chinos },
  { name: "Ethnic", image: Ethnic },
];

const CategorySection = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate();
  const selected = useSelector((state) => state.category.selected);

  const handleSelect = (name) => {
    // debug log so you can see the click in console
    console.log("Category clicked:", name);
    dispatch(setCategory(name));
      navigate(`/category/${encodeURIComponent(name)}`); 
  };

  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const isActive =
              String(selected).toLowerCase() === String(cat.name).toLowerCase();

            return (
              <div
                key={cat.name}
                onClick={() => handleSelect(cat.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && handleSelect(cat.name)
                }
                className={`group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transition ${
                  isActive ? "ring-4 ring-indigo-500 shadow-md" : "hover:shadow-lg"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  draggable={false}
                />

                {/* make overlay non-interactive so clicks reach parent */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 pointer-events-none">
                  <h3 className="text-white text-xl font-bold">{cat.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
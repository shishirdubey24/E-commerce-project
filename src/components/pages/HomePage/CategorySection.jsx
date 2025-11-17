import Saree from "../../../assets/Category/Saree.jpg";
import Jwellary from "../../../assets/Category/jwellary.jpeg";
import Sports from "../../../assets/Category/Sports.webp";
import Tshirt from "../../../assets/Category/Tshirt.webp";

const categories = [
  { name: "Saree", image: Saree },
  { name: "Jewellery", image: Jwellary },
  { name: "Sports", image: Sports },
  { name: "T-shirts", image: Tshirt },
    { name: "Saree", image: Saree },
  { name: "Jewellery", image: Jwellary },
  { name: "Sports", image: Sports },
  { name: "T-shirts", image: Tshirt },
];

const CategorySection = () => {
  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategorySection;

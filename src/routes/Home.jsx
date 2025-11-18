// routes/Home.jsx - updated grid to show 4 products per row (responsive)
import { useSelector } from "react-redux";
import Homeitem from "../components/pages/HomePage/Homeitem";
import { HomeDataMap } from "../components/hooks/HomeDataMap";
import HeroSection from "../components/pages/HomePage/HeroSection";
import CategorySection from "../components/pages/HomePage/CategorySection";
import BrandSection from "../components/pages/HomePage/BrandSection";

const Home = () => {
  const items = useSelector((store) => store.items || []);
  const bagItems = useSelector((store) => store.bag || []);

  return (
    <main>
      <HeroSection />
      <BrandSection />
      <CategorySection />

      <HomeDataMap />

      {/* Products grid: 1 / 2 / 3 / 4 columns (mobile -> desktop) */}
      <section className="w-[95%] mx-auto my-12">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => {
              const isInBag = bagItems.some((bagItem) => bagItem.id === item.id);
              return <Homeitem key={item.id} item={item} isInBag={isInBag} />;
            })}
          </div>
        ) : (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center text-gray-600">
            <h3 className="text-xl font-medium mb-2">No products available</h3>
            <p>Loading from server...</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;

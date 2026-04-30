/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import Homeitem from "./ProductCard";

const FeaturedSection = ({ items = [] }) => {
  const bagItems = useSelector((state) => state.bag || []);

  return (
    <section
      className="bg-white py-16 lg:py-20"
      aria-labelledby="featured-products-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading to match BrandSection and CategorySection */}
        <div className="mb-12 text-center flex flex-col items-center">
          <h2
            id="featured-products-heading"
            className="text-[22px] sm:text-[28px] font-bold text-[#3e4152] tracking-[0.15em] uppercase"
          >
            FEATURED TRENDS
          </h2>
          <div className="mt-3 w-16 h-1 bg-[#ff3f6c] rounded-full shadow-sm"></div>
          <p className="mt-5 text-[15px] text-[#696e79] font-medium max-w-[500px] mx-auto">
            Handpicked styles, inspired by what shoppers love right now
          </p>
        </div>

        {/* Products grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
            {items.map((item) => {
              const isInBag = bagItems.some(
                (bagItem) => bagItem.id === item.id
              );
              return (
                <Homeitem
                  key={item.id || item._id}
                  item={item}
                  isInBag={isInBag}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto py-16 flex flex-col items-center justify-center text-center bg-[#f5f5f6] rounded-md border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-[#282c3f] mb-2">
              Loading the freshest styles
            </h3>
            <p className="text-[14px] text-[#696e79]">
              Hang tight, we`re fetching your fashionable picks...
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;

/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import Homeitem from "./ProductCard";
const FeaturedSection = ({ items = [] }) => {
  // match your existing shape: store.bag is used as array in Home.jsx
  const bagItems = useSelector((state) => state.bag || []);

  return (
    <section
      className="bg-[#f5f5f6] py-10 sm:py-12"
      aria-labelledby="featured-products-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-6 sm:mb-8 text-center">
          <h2
            id="featured-products-heading"
            className="text-[18px] sm:text-[20px] font-bold text-gray-900 tracking-wide"
          >
            FEATURED PICKS
          </h2>
          <p className="mt-1 text-[12px] text-gray-600">
            Handpicked styles, inspired by what shoppers love.
          </p>
        </div>

        {/* Products grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
          <div className="w-full py-16 flex flex-col items-center justify-center text-center text-gray-600 bg-white rounded-sm border border-gray-200">
            <h3 className="text-sm font-medium mb-1">
              No featured products available
            </h3>
            <p className="text-[12px]">Loading from server...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;

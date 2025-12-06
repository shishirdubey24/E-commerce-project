// src/routes/CategoryPage.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fetchdata } from "../components/hooks/Fetchdata";
import { itemsActions } from "../store/itemsSlice";
import Homeitem from "../components/pages/HomePage/ProductCard";
import ShimmerUI from "../components/UI/ShimmerUI";

const CategoryPage = () => {
  const { name } = useParams(); // category name from URL
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items || []);
  const bagItems = useSelector((s) => s.bag || []);

  // fetch for this category (override Fetchdata)
  const { data, isLoading, error } = Fetchdata({ categoryOverride: name });

  useEffect(() => {
    if (data?.items) {
      dispatch(itemsActions.addInitialItems(data.items));
    }
  }, [data, dispatch, name]);

  if (isLoading) return <ShimmerUI />;
  if (error) return <p className="text-center py-8 text-red-600">Error: Failed to load category.</p>;

  return (
    <main>
      <section className="py-8 container mx-auto mt-8">
        <h1 className="text-2xl font-semibold mb-6">Category: {name}</h1>

        {/* Use same responsive grid as Home.jsx to ensure consistent spacing */}
        <div className="w-[95%] mx-auto">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item) => {
                const isInBag = bagItems.some((b) => b.id === item.id);
                return <Homeitem key={item.id} item={item} isInBag={isInBag} />;
              })}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-center text-gray-600">
              <h3 className="text-xl font-medium mb-2">No products available for {name}</h3>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;

// src/routes/CategoryPage.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fetchdata } from "../components/hooks/Fetchdata";
import { itemsActions } from "../store/itemsSlice";
import Homeitem from "../components/pages/HomePage/Homeitem";
import ShimmerUI from "../components/UI/ShimmerUI";

const CategoryPage = () => {
  const { name } = useParams(); // category name from URL
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const bagItems = useSelector((s) => s.bag);

  // fetch for this category (override Fetchdata)
  const { data, isLoading, error } = Fetchdata({ categoryOverride: name });

  useEffect(() => {
    if (data?.items) {
      dispatch(itemsActions.addInitialItems(data.items));
    }
  }, [data, dispatch, name]);

  if (isLoading) return <ShimmerUI />;
  if (error) return <p>Error: Failed to load category.</p>;

  return (
    <main>
      <section className="py-8 container mx-auto pt-15 mt-10">
        <h1 className="text-2xl font-semibold mb-6">Category: {name}</h1>

        <div className="items-container">
          {items.length > 0 ? (
            items.map((item) => {
              const isInBag = bagItems.some((b) => b.id === item.id);
              return <Homeitem key={item.id} item={item} isInBag={isInBag} />;
            })
          ) : (
            <div style={{ textAlign: "center", padding: "50px" }}>
              <h3>No products available for {name}</h3>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;

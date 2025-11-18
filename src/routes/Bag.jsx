// pages/Bag.jsx
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BagItem from "../components/Bag/BagItem";
import BagSummary from "../components/Bag/BagSummery"; // keep your filename
import { useNavigate } from "react-router";

const Bag = () => {
  const navigate = useNavigate();
  const bagItems = useSelector((state) => state.bag || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    console.log("Current bag items:", bagItems);
    return () => clearTimeout(timer);
  }, [bagItems]);

  if (isLoading) {
    return (
      <main>
        <div className="bag-page max-w-[1400px] mx-auto px-4 py-12">
          <div className="w-full py-24 flex items-center justify-center text-gray-600">
            Loading your bag...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="bag-page max-w-[1400px] mx-auto px-4 py-12">
        {/* Top heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Your Bag ({bagItems.length} item{bagItems.length !== 1 ? "s" : ""})
          </h1>
        </div>

        {/* Main grid: items (left) + summary (right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: items list (2/3 on md+) */}
          <div className="md:col-span-2 space-y-6">
            {bagItems.length > 0 ? (
              bagItems.map((item) => <BagItem key={item.id} item={item} />)
            ) : (
              <div className="w-full py-12 flex flex-col items-center justify-center text-center text-gray-600">
                <h3 className="text-lg font-medium mb-2">Your bag is empty</h3>
                <p className="max-w-md">
                  Add some items to get started. Browse products and add your favourites to the bag.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-6 px-4 py-2 bg-[#ff3f6c] text-white rounded-md font-semibold hover:bg-[#e13a66]"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </div>

          {/* Right: summary (1/3 on md+). Make sticky on desktop */}
          <aside className="md:col-span-1">
            <div className="w-full">
              <div className="md:sticky md:top-24">
                {/* Only show summary if there are items */}
                {bagItems.length > 0 ? (
                  <BagSummary />
                ) : (
                  <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm text-center text-gray-600">
                    No items to summarize
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Bag;

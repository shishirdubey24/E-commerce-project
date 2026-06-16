// src/routes/CategoryPage.jsx
import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"; // Only kept for the Shopping Bag!
import { Fetchdata } from "../components/hooks/Fetchdata";
import Homeitem from "../components/pages/HomePage/ProductCard";
import ShimmerUI from "../components/UI/ShimmerUI";

const CategoryPage = () => {
  const { name } = useParams();
  
  // 1. Fetch data directly from React Query
  const { data, isLoading, error } = Fetchdata({ categoryOverride: name });
  
  // 2. Extract items directly from the query response (Bypassing Redux completely)
 const fetchedItems = useMemo(() => {
  return data?.items || [];
}, [data?.items]);
  
  // 3. Get the user's local shopping bag from Redux
  const bagItems = useSelector((s) => s.bag || []);

  // Robust attribute extractors
  const getBrand = (item) => item.company || "Other";
  const getPrice = (item) => item.current_price || 0;
  const getDiscount = (item) => item.discount_percentage ?? item[" discount_percentage"] ?? 0;

  // -- FILTER STATES --
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  // Clear filters when category changes
  // We use `name` in the dependency array so if a user clicks "Shirts" then "Sarees", filters reset.
  useEffect(() => {
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    setSelectedDiscount(null);
  }, [name]);

  // Generate filter options based on available items
  const { allBrands, priceRangesOptions, discountOptions } = useMemo(() => {
    const brandsSet = new Set();
    let minPrice = Infinity;
    let maxPrice = 0;

    fetchedItems.forEach((item) => {
      brandsSet.add(getBrand(item));
      const p = getPrice(item);
      if (p < minPrice) minPrice = p;
      if (p > maxPrice) maxPrice = p;
    });

    const sortedBrands = Array.from(brandsSet).sort();

    // Generate dynamic price ranges
    const rangeStep = 500;
    const ranges = [];
    if (fetchedItems.length > 0) {
      const start = Math.floor(minPrice / rangeStep) * rangeStep;
      const end = Math.ceil(maxPrice / rangeStep) * rangeStep;
      for (let i = start; i < end; i += rangeStep) {
        ranges.push({ min: i, max: i + rangeStep, label: `Rs. ${i} to Rs. ${i + rangeStep}` });
      }
    }

    // Default discounts
    const discounts = [10, 20, 30, 40, 50, 60, 70];

    return { allBrands: sortedBrands, priceRangesOptions: ranges, discountOptions: discounts };
  }, [fetchedItems]); // Dependency changed from reduxItems to fetchedItems

  // Handlers
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const togglePriceRange = (range) => {
    setSelectedPriceRanges((prev) =>
      prev.some((r) => r.label === range.label)
        ? prev.filter((r) => r.label !== range.label)
        : [...prev, range]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    setSelectedDiscount(null);
  };

  // Compute final filtered items
  const filteredItems = useMemo(() => {
    return fetchedItems.filter((item) => {
      const brand = getBrand(item);
      const price = getPrice(item);
      const discount = getDiscount(item);

      if (selectedBrands.length > 0 && !selectedBrands.includes(brand)) return false;
      
      if (selectedPriceRanges.length > 0) {
        const matchesPrice = selectedPriceRanges.some((r) => price >= r.min && price < r.max);
        if (!matchesPrice) return false;
      }

      if (selectedDiscount !== null && discount < selectedDiscount) return false;

      return true;
    });
  }, [fetchedItems, selectedBrands, selectedPriceRanges, selectedDiscount]);

  if (isLoading) return <ShimmerUI />;
  if (error) return <p className="text-center py-8 text-red-600">Failed to load category.</p>;

  const resultCountText = `${filteredItems.length} items`;

  return (
    <main className="min-h-screen bg-white pb-10">
      {/* Header area */}
      <div className="pt-6 pb-4 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="text-[12px] text-gray-500 mb-3 flex items-center gap-1">
            <span>Home</span> <span className="font-bold">/</span>
            <span>Clothing</span> <span className="font-bold">/</span>
            <span className="font-bold text-gray-900 capitalize">{name}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h1 className="text-lg md:text-xl font-bold text-[#282c3f] capitalize">
              {name} Clothing
            </h1>
            <span className="text-[14px] text-gray-500 font-semibold">- {resultCountText}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-6 mt-6">
        
        {/* LEFT SIDEBAR: FILTERS */}
        {fetchedItems.length > 0 && (
          <aside className="w-full md:w-[250px] shrink-0">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h2 className="text-[15px] font-bold text-[#282c3f] uppercase tracking-wide">Filters</h2>
              {(selectedBrands.length > 0 || selectedPriceRanges.length > 0 || selectedDiscount !== null) && (
                <button
                  onClick={clearAllFilters}
                  className="text-[12px] font-bold text-[#ff3f6c] uppercase tracking-wider hover:text-[#ff1654]"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex flex-col gap-6 py-6">
              
              {/* Brand Filter */}
              {allBrands.length > 0 && (
                <div className="border-b border-gray-200 pb-5">
                  <h3 className="text-[13px] font-bold text-[#282c3f] uppercase mb-4 tracking-wide">Brand</h3>
                  <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto filter-scrollbar pr-2">
                    {allBrands.map((brand) => (
                      <label key={brand} className="flex items-center cursor-pointer group py-1">
                        <input
                          type="checkbox"
                          className="w-4 h-4 shrink-0 cursor-pointer accent-[#ff3f6c]"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                        />
                        <span className="ml-3 sm:ml-4 text-[13.5px] text-[#282c3f] flex-1 truncate group-hover:font-semibold transition-all">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Filter */}
              {priceRangesOptions.length > 0 && (
                <div className="border-b border-gray-200 pb-5">
                  <h3 className="text-[13px] font-bold text-[#282c3f] uppercase mb-4 tracking-wide">Price</h3>
                  <div className="flex flex-col gap-2">
                    {priceRangesOptions.map((range) => (
                      <label key={range.label} className="flex items-center cursor-pointer group py-1">
                        <input
                          type="checkbox"
                          className="w-4 h-4 shrink-0 cursor-pointer accent-[#ff3f6c]"
                          checked={selectedPriceRanges.some((r) => r.label === range.label)}
                          onChange={() => togglePriceRange(range)}
                        />
                        <span className="ml-3 sm:ml-4 text-[13.5px] text-[#282c3f] flex-1 truncate group-hover:font-semibold transition-all">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Discount Filter */}
              {discountOptions.length > 0 && (
                <div className="pb-2">
                  <h3 className="text-[13px] font-bold text-[#282c3f] uppercase mb-4 tracking-wide">Discount Range</h3>
                  <div className="flex flex-col gap-2">
                    {discountOptions.map((pct) => (
                      <label key={pct} className="flex items-center cursor-pointer group py-1">
                        <input
                          type="radio"
                          name="discountGroup"
                          className="w-4 h-4 shrink-0 cursor-pointer accent-[#ff3f6c]"
                          checked={selectedDiscount === pct}
                          onChange={() => setSelectedDiscount(pct)}
                        />
                        <span className="ml-3 sm:ml-4 text-[13.5px] text-[#282c3f] flex-1 truncate group-hover:font-semibold transition-all">
                          {pct}% and above
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* MAIN PRODUCT GRID */}
        <section className="flex-1 border-l border-gray-100 pl-0 md:pl-6 pt-4 border-t md:border-t-0">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
              {filteredItems.map((item) => {
                const isInBag = bagItems.some((b) => b.id === item.id);
                return <Homeitem key={item.id} item={item} isInBag={isInBag} />;
              })}
            </div>
          ) : (
            <div className="w-full py-24 flex flex-col items-center justify-center text-center text-gray-600 bg-gray-50 rounded-sm">
              <h3 className="text-[18px] font-bold text-[#282c3f] mb-2">No matches found</h3>
              <p className="text-[13px] text-gray-500 max-w-sm">
                We couldnt find any products matching your selected filters. Try clearing some options to see more items.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-6 px-6 py-2 border border-[#ff3f6c] text-[#ff3f6c] font-bold text-[13px] rounded-sm hover:bg-[#ff3f6c] hover:text-white transition-colors uppercase tracking-wide"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default CategoryPage;
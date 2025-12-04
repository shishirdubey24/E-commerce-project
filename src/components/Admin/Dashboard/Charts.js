// src/components/Admin/Charts.js
import { useSelector } from "react-redux";
import { useMemo } from "react";

const EMPTY = { categoryChart: [], discountChart: [], ratingChart: [] };

const useChartData = () => {
  // Updated: Read from adminPanel slice instead of items slice
  const items = useSelector((state) => state.adminPanel.products || []);
  const loading = useSelector((state) => state.adminPanel.loading);

  console.log("Admin panel items:", items.length);

  const processed = useMemo(() => {
    // Return empty if loading or no items
    if (loading || !items || items.length === 0) return EMPTY;

    const categoryCount = {};
    const discountDistribution = {};
    const averageRatingByCategory = {};

    items.forEach((item = {}) => {
      const category = item.category || "Uncategorized";
      const discount = Number(item.discount_percentage || 0);
      const rating = item.rating?.stars || 0;

      categoryCount[category] = (categoryCount[category] || 0) + 1;

      const discountGroup = `${Math.floor(discount / 10) * 10}-${
        Math.floor(discount / 10) * 10 + 9
      }%`;
      discountDistribution[discountGroup] =
        (discountDistribution[discountGroup] || 0) + 1;

      if (!averageRatingByCategory[category])
        averageRatingByCategory[category] = { totalRating: 0, count: 0 };
      averageRatingByCategory[category].totalRating += rating;
      averageRatingByCategory[category].count += 1;
    });

    const categoryChart = Object.entries(categoryCount).map(
      ([name, count]) => ({ name, count })
    );
    const discountChart = Object.entries(discountDistribution).map(
      ([discountRange, count]) => ({ discountRange, count })
    );
    const ratingChart = Object.entries(averageRatingByCategory).map(
      ([category, data]) => ({
        category,
        avgRating: Number((data.totalRating / data.count).toFixed(1)),
      })
    );

    return { categoryChart, discountChart, ratingChart };
  }, [items, loading]); // Add loading to dependencies

  return processed;
};

export default useChartData;

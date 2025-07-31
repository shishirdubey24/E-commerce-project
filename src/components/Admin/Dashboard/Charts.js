import { useSelector } from "react-redux";
import { useMemo } from "react";

const useChartData = () => {
  const items = useSelector((store) => store.items);

  const processedData = useMemo(() => {
    const categoryCount = {};
    const discountDistribution = {};
    const averageRatingByCategory = {};

    items.forEach((item) => {
      const category = item.category;
      const discount = item.discount_percentage;
      const rating = item.rating?.stars || 0;

      // Count per category
      categoryCount[category] = (categoryCount[category] || 0) + 1;
      // Discount grouping
      const discountGroup = `${Math.floor(discount / 10) * 10}-${
        Math.floor(discount / 10) * 10 + 9
      }%`;
      discountDistribution[discountGroup] =
        (discountDistribution[discountGroup] || 0) + 1;

      // Average rating
      if (!averageRatingByCategory[category]) {
        averageRatingByCategory[category] = { totalRating: 0, count: 0 };
      }
      averageRatingByCategory[category].totalRating += rating;
      averageRatingByCategory[category].count += 1;
    });

    const categoryChart = Object.entries(categoryCount).map(
      ([category, count]) => ({
        name: category,
        count,
      })
    );

    const discountChart = Object.entries(discountDistribution).map(
      ([range, count]) => ({
        discountRange: range,
        count,
      })
    );

    const ratingChart = Object.entries(averageRatingByCategory).map(
      ([category, data]) => ({
        category,
        avgRating: (data.totalRating / data.count).toFixed(1),
      })
    );

    return {
      categoryChart,
      discountChart,
      ratingChart,
    };
  }, [items]);

  return processedData;
};

export default useChartData;

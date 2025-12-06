// src/components/Admin/Dashboard/Dashboard.jsx
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  Star,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Download,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import useChartData from "./Charts";

export default function Dashboard() {
  const items = useSelector((store) => store.adminPanel.products || []);
  const loading = useSelector((store) => store.adminPanel.loading);

  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    totalValue: 0,
    avgRating: 0,
  });

  useEffect(() => {
    if (!items || items.length === 0) return;

    const totalProducts = items.length;
    const uniqueCategories = new Set(
      items.map((it) => it?.category || "Uncategorized")
    ).size;
    const totalValue = items.reduce(
      (sum, p) => sum + (p.current_price || 0),
      0
    );
    const avgRating = (
      items.reduce((sum, p) => sum + (p.rating?.stars || 0), 0) /
      items.length
    ).toFixed(1);

    setStats({
      products: totalProducts,
      categories: uniqueCategories,
      totalValue,
      avgRating,
    });
  }, [items]);

  // Get chart data
  const { categoryChart, discountChart, ratingChart } = useChartData();

  // Top categories by revenue
  const topCategoriesByRevenue = useMemo(() => {
    if (!items || items.length === 0) return [];

    const revenueMap = {};
    items.forEach((p) => {
      const cat = p.category || "Uncategorized";
      if (!revenueMap[cat]) {
        revenueMap[cat] = { category: cat, revenue: 0, count: 0 };
      }
      revenueMap[cat].revenue += p.current_price || 0;
      revenueMap[cat].count += 1;
    });

    return Object.values(revenueMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [items]);

  // Top categories by rating
  const topCategoriesByRating = useMemo(() => {
    if (!items || items.length === 0) return [];

    const ratingMap = {};
    items.forEach((p) => {
      const cat = p.category || "Uncategorized";
      if (!ratingMap[cat]) {
        ratingMap[cat] = { category: cat, totalRating: 0, count: 0 };
      }
      ratingMap[cat].totalRating += p.rating?.stars || 0;
      ratingMap[cat].count += 1;
    });

    return Object.values(ratingMap)
      .map((cat) => ({
        category: cat.category,
        avgRating: (cat.totalRating / cat.count).toFixed(1),
        count: cat.count,
      }))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 5);
  }, [items]);

  // No purple/indigo here
  const COLORS = [
    "#3b82f6", // blue-500
    "#0ea5e9", // sky-500
    "#ec4899", // pink-500
    "#f59e0b", // amber-500
    "#10b981", // emerald-500
    "#22c55e", // green-500
  ];

  const chartsReady =
    categoryChart.length > 0 &&
    discountChart.length > 0 &&
    ratingChart.length > 0;

  if (loading || !chartsReady) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-blue-100 p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-blue-100">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Welcome back! Here your store analytics
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">All Time</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-0.5">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products Card */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-sky-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/50">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                Active
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.products}
              </p>
              <p className="text-xs text-gray-500">In catalog</p>
            </div>
          </div>
        </div>

        {/* Total Value Card */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-green-500/10 to-emerald-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-green-500 to-green-600 rounded-xl shadow-lg shadow-green-500/50">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <TrendingUp className="w-4 h-4" />
                Total
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">
                Inventory Value
              </p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{(stats.totalValue / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-gray-500">Current price value</p>
            </div>
          </div>
        </div>

        {/* Average Rating Card */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-amber-500/10 to-orange-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/50">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                <Star className="w-4 h-4 fill-current" />
                {stats.avgRating}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.avgRating}
              </p>
              <p className="text-xs text-gray-500">
                Based on {stats.products} products
              </p>
            </div>
          </div>
        </div>

        {/* Categories Card */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-pink-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-blue-500 to-pink-500 rounded-xl shadow-lg shadow-blue-500/50">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.categories}
              </p>
              <p className="text-xs text-gray-500">Product categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Category Distribution
            </h3>
            <p className="text-sm text-gray-500 mt-1">Products per category</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={categoryChart}>
              <defs>
                <linearGradient
                  id="categoryGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#categoryGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Categories by Revenue */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Top by Revenue</h3>
            <p className="text-sm text-gray-500 mt-1">
              Highest value categories
            </p>
          </div>
          <div className="space-y-4">
            {topCategoriesByRevenue.map((cat, idx) => (
              <div key={cat.category} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {cat.category}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    ₹{(cat.revenue / 1000).toFixed(1)}K
                  </span>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 group-hover:scale-x-105 origin-left"
                    style={{
                      width: `${
                        (cat.revenue / topCategoriesByRevenue[0].revenue) * 100
                      }%`,
                      background: `linear-gradient(to right, ${COLORS[idx]}, ${COLORS[idx]}dd)`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Discount Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Discount Distribution
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Products by discount range
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={discountChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="discountRange" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Rating Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Average Rating by Category
            </h3>
            <p className="text-sm text-gray-500 mt-1">Category ratings</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ratingChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#9ca3af" />
              <YAxis domain={[0, 5]} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="avgRating"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: "#f59e0b", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories by Rating */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Top Rated Categories
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Best customer satisfaction
              </p>
            </div>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {topCategoriesByRating.map((cat, idx) => (
              <div
                key={cat.category}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="shrink-0 w-12 h-12 bg-linear-to-br from-amber-500 to-orange-400 rounded-xl flex items-center justify-center text-white font-bold">
                  #{idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {cat.category}
                  </p>
                  <p className="text-xs text-gray-500">
                    {cat.count} products
                  </p>
                </div>
                <div className="text-right flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <p className="text-lg font-bold text-gray-900">
                    {cat.avgRating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Latest Products
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Recently added items
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {items.slice(0, 5).map((product) => (
              <div
                key={product.id || product._id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="shrink-0 w-12 h-12 bg-gray-100 rounded-xl overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.item_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      <Package className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {product.item_name || product.name}
                  </p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    ₹{product.current_price}
                  </p>
                  <p className="text-xs text-green-600">
                    {product.discount_percentage}% off
                  </p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-blue-50 rounded-lg transition-all">
                  <Eye className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

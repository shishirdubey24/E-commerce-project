// src/components/Admin/Dashboard/Dashboard.jsx
import {
  Package, ShoppingCart, AlertCircle, Star,
  Sparkles,  Download, 
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area,
} from "recharts";
import { useAdminProducts } from "../Hook/useAdminProducts"; // Import the hook!

export default function Dashboard() {
  // 1. Fetch from React Query directly
  const { data, isLoading, isError } = useAdminProducts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-blue-100 p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600 flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          Loading dashboard metrics...
        </div>
      </div>
    );
  }

  if (isError) {
     return <div className="p-10 text-red-500 font-bold text-center">Failed to load Dashboard data.</div>;
  }

  // 2. Extract the Backend-Calculated Metrics from Page 1!
  const metrics = data?.pages[0]?.metrics || {};
  const globalStats = metrics.globalStats || {};
  const categoryChart = metrics.categoryChart || [];
  const discountChart = metrics.discountChart || [];
  const ratingChart = metrics.ratingChart || [];
  
  // Extract the latest 5 products from the first page payload
  const latestProducts = data?.pages[0]?.products?.slice(0, 5) || [];

  // Map backend stats to the UI variables
  const stats = {
    products: globalStats.totalProducts || 0,
    categories: categoryChart.length || 0,
    totalValue: globalStats.totalInventoryValue || 0,
    avgRating: globalStats.avgStoreRating?.toFixed(1) || 0,
  };

  // Sort Category Chart by Volume (Count) for the right-side card
  const topCategoriesByVolume = [...categoryChart]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Sort Rating Chart for the bottom card
  const topCategoriesByRating = [...ratingChart]
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 5);

  const COLORS = ["#3b82f6", "#0ea5e9", "#ec4899", "#f59e0b", "#10b981", "#22c55e"];

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
              Welcome back! Here are your store analytics.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-xl"><Package className="w-6 h-6 text-white" /></div>
          </div>
          <p className="text-sm font-medium text-gray-600">Total Products</p>
          <p className="text-3xl font-bold text-gray-900">{stats.products}</p>
        </div>

        {/* Total Value */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 rounded-xl"><ShoppingCart className="w-6 h-6 text-white" /></div>
          </div>
          <p className="text-sm font-medium text-gray-600">Inventory Value</p>
          <p className="text-3xl font-bold text-gray-900">₹{(stats.totalValue / 1000).toFixed(1)}K</p>
        </div>

        {/* Average Rating */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500 rounded-xl"><Star className="w-6 h-6 text-white" /></div>
          </div>
          <p className="text-sm font-medium text-gray-600">Avg Rating</p>
          <p className="text-3xl font-bold text-gray-900">{stats.avgRating}</p>
        </div>

        {/* Categories */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-500 rounded-xl"><AlertCircle className="w-6 h-6 text-white" /></div>
          </div>
          <p className="text-sm font-medium text-gray-600">Categories</p>
          <p className="text-3xl font-bold text-gray-900">{stats.categories}</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={categoryChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="#bfdbfe" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Categories by Volume */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top by Volume</h3>
          <div className="space-y-4">
            {topCategoriesByVolume.map((cat, idx) => (
              <div key={cat.name} className="group">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                  <span className="text-sm font-bold text-gray-900">{cat.count} items</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${(cat.count / topCategoriesByVolume[0].count) * 100}%`,
                      backgroundColor: COLORS[idx] 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Discount Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={discountChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="discountRange" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Average Rating by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ratingChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#9ca3af" />
              <YAxis domain={[0, 5]} stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="avgRating" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Rated Categories</h3>
          <div className="space-y-4">
            {topCategoriesByRating.map((cat, idx) => (
              <div key={cat.category} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold">#{idx + 1}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{cat.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <p className="text-lg font-bold text-gray-900">{cat.avgRating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Latest Products</h3>
          <div className="space-y-4">
            {latestProducts.map((product) => (
              <div key={product.id || product._id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt="product" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><Package className="w-5 h-5 text-gray-400" /></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{product.item_name || product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">₹{product.current_price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
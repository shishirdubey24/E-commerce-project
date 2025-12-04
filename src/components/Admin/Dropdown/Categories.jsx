import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  TrendingUp,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Star,
  AlertCircle,
  ArrowUpRight,
  Calendar,
  Download,
  Sparkles,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 45000, orders: 120 },
  { month: "Feb", revenue: 52000, orders: 145 },
  { month: "Mar", revenue: 48000, orders: 130 },
  { month: "Apr", revenue: 61000, orders: 165 },
  { month: "May", revenue: 55000, orders: 150 },
  { month: "Jun", revenue: 67000, orders: 180 },
];

export default function Dashboard() {
  const products = useSelector((state) => state.adminPanel.products || []);
  const loading = useSelector((state) => state.adminPanel.loading);

  // Calculate stats
  const stats = useMemo(() => {
    if (!products || products.length === 0) {
      return {
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalCustomers: 0,
        revenueGrowth: 0,
        ordersGrowth: 0,
      };
    }

    const totalRevenue = products.reduce(
      (sum, product) => sum + (product.current_price || 0),
      0
    );
    const totalOrders = Math.floor(products.length * 2.5);
    const totalCustomers = Math.floor(products.length * 1.8);

    return {
      totalRevenue: totalRevenue.toFixed(0),
      totalOrders,
      totalProducts: products.length,
      totalCustomers,
      revenueGrowth: 12.5,
      ordersGrowth: 8.3,
    };
  }, [products]);

  // Category distribution
  const categoryData = useMemo(() => {
    if (!products || products.length === 0) return [];

    const categoryCount = {};
    products.forEach((product) => {
      const category = product.category || "Uncategorized";
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    return Object.entries(categoryCount)
      .map(([name, value]) => ({ name, value }))
      .slice(0, 5);
  }, [products]);

  // Top products
  const topProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...products]
      .sort((a, b) => (b.rating?.stars || 0) - (a.rating?.stars || 0))
      .slice(0, 5);
  }, [products]);

  // Recent orders (mock data)
  const recentOrders = [
    {
      id: "ORD001",
      customer: "John Doe",
      product: "Premium Headphones",
      amount: 2999,
      status: "Completed",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      product: "Wireless Mouse",
      amount: 1499,
      status: "Pending",
    },
    {
      id: "ORD003",
      customer: "Mike Johnson",
      product: "Laptop Stand",
      amount: 3499,
      status: "Processing",
    },
    {
      id: "ORD004",
      customer: "Sarah Wilson",
      product: "USB-C Cable",
      amount: 599,
      status: "Completed",
    },
    {
      id: "ORD005",
      customer: "Tom Brown",
      product: "Keyboard",
      amount: 4999,
      status: "Completed",
    },
  ];

  // Same palette as main dashboard: blue / sky / pink / amber / emerald / green
  const COLORS = [
    "#3b82f6", // blue-500
    "#0ea5e9", // sky-500
    "#ec4899", // pink-500
    "#f59e0b", // amber-500
    "#10b981", // emerald-500
    "#22c55e", // green-500
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            Welcome back! Here whats happening with your store today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group">
            <div className="p-1.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Last 30 days
            </span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group">
            <div className="p-1.5 bg-linear-to-br from-blue-500 to-pink-600 rounded-lg">
              <Download className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-emerald-500/10 to-teal-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/50">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <TrendingUp className="w-4 h-4" />
                +{stats.revenueGrowth}%
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{(stats.totalRevenue / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-gray-500">
                +₹
                {(
                  (stats.totalRevenue * stats.revenueGrowth) /
                  100 /
                  1000
                ).toFixed(1)}
                K from last month
              </p>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-sky-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-blue-500 to-sky-400 rounded-xl shadow-lg shadow-blue-500/50">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <TrendingUp className="w-4 h-4" />
                +{stats.ordersGrowth}%
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalOrders}
              </p>
              <p className="text-xs text-gray-500">
                +{Math.floor((stats.totalOrders * stats.ordersGrowth) / 100)}{" "}
                from last month
              </p>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-pink-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/50">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-600">
                Active
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalProducts}
              </p>
              <p className="text-xs text-gray-500">
                In {categoryData.length} categories
              </p>
            </div>
          </div>
        </div>

        {/* Customers Card */}
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-amber-500/10 to-orange-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/50">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <TrendingUp className="w-4 h-4" />
                +15.3%
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">
                Total Customers
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalCustomers}
              </p>
              <p className="text-xs text-gray-500">
                +{Math.floor(stats.totalCustomers * 0.153)} new this month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Revenue Trend</h3>
              <p className="text-sm text-gray-500 mt-1">
                Monthly revenue and orders
              </p>
            </div>
            <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View Report
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
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
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Categories</h3>
            <p className="text-sm text-gray-500 mt-1">Product distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Top Products</h3>
              <p className="text-sm text-gray-500 mt-1">Best selling items</p>
            </div>
            <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View all
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="shrink-0 w-12 h-12 bg-linear-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  #{idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {product.product_name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">
                        {product.rating?.stars || 0}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600">
                      {product.rating?.count || 0} reviews
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    ₹{product.current_price}
                  </p>
                  {product.discount_percentage > 0 && (
                    <p className="text-xs text-green-600 font-medium">
                      {product.discount_percentage}% off
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
              <p className="text-sm text-gray-500 mt-1">
                Latest transactions
              </p>
            </div>
            <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View all
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {order.customer}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {order.product}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    ₹{order.amount}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Processing"
                        ? "bg-sky-100 text-sky-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Low Stock Alert</h3>
            <p className="text-sm text-gray-500">
              3 products are running low on stock
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
            Restock Now
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

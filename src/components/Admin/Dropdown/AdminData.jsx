import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { 
  Search, 
  Filter, 
  Package, 
  DollarSign,
  Star,
  Eye,
  Edit,
  Trash2,
  Download,
  Plus,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useState } from 'react';

export default function AdminData() {
  // Get actual products from Redux store
  const products = useSelector((state) => state.adminPanel.products || []);
  const loading = useSelector((state) => state.adminPanel.loading);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('list');
  const [showFilters, setShowFilters] = useState(false);

  // Calculate metrics from actual data
  const metrics = useMemo(() => {
    if (!products || products.length === 0) {
      return {
        totalProducts: 0,
        totalValue: 0,
        totalRevenue: 0,
        avgRating: 0,
        lowStock: 0,
        outOfStock: 0,
        totalViews: 0,
        totalSold: 0,
        profit: 0
      };
    }

    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + ((p.current_price || 0) * 1), 0);
    const avgRating = (products.reduce((sum, p) => sum + (p.rating?.stars || 0), 0) / products.length).toFixed(1);
    
    // Since your products don't have stock/sold data, we'll use placeholder calculations
    const lowStock = 0; // Add this field to your schema if needed
    const outOfStock = 0;

    return {
      totalProducts,
      totalValue,
      totalRevenue: totalValue, // Placeholder
      avgRating,
      lowStock,
      outOfStock,
      totalViews: 0,
      totalSold: 0,
      profit: 0
    };
  }, [products]);

  // Category distribution from actual data
  const categoryData = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const counts = {};
    products.forEach(p => {
      const cat = p.category || 'Uncategorized';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [products]);

  // Stock status distribution (placeholder since no stock data)
  const stockStatusData = useMemo(() => {
    return [
      { name: 'Available', value: products.length, color: '#10b981' },
      { name: 'Low Stock', value: 0, color: '#f59e0b' },
      { name: 'Out of Stock', value: 0, color: '#ef4444' }
    ];
  }, [products]);

  // Top rated products (instead of top selling)
  const topRated = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    return [...products]
      .sort((a, b) => (b.rating?.stars || 0) - (a.rating?.stars || 0))
      .slice(0, 10)
      .map(p => ({ 
        name: p.item_name || p.name || 'Unknown', 
        rating: p.rating?.stars || 0 
      }));
  }, [products]);

  // Price distribution from actual data
  const priceDistribution = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const ranges = [
      { range: '0-500', min: 0, max: 500 },
      { range: '501-1000', min: 501, max: 1000 },
      { range: '1001-2000', min: 1001, max: 2000 },
      { range: '2001-3000', min: 2001, max: 3000 },
      { range: '3000+', min: 3001, max: Infinity }
    ];
    
    return ranges.map(r => ({
      range: r.range,
      count: products.filter(p => {
        const price = p.current_price || 0;
        return price >= r.min && price <= r.max;
      }).length
    }));
  }, [products]);

  // Get unique categories from actual data
  const uniqueCategories = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...new Set(products.map(p => p.category).filter(Boolean))];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(p => {
      const name = p.item_name || p.name || '';
      const id = p.id || '';
      const company = p.company || '';
      
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading products data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
            <p className="text-gray-600 mt-1">Manage your inventory and track performance</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalProducts}</p>
                <p className="text-sm text-gray-500 mt-2">Active in catalog</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Package className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">₹{(metrics.totalValue / 1000).toFixed(1)}K</p>
                <p className="text-sm text-gray-500 mt-2">Inventory value</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.avgRating}</p>
                <p className="text-sm text-amber-600 mt-2 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  Based on {products.length} products
                </p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{uniqueCategories.length}</p>
                <p className="text-sm text-gray-500 mt-2">Product categories</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <AlertCircle className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Category Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stock Status */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Product Availability</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stockStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Rated Products */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Top 10 Rated Products</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topRated}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="rating" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Price Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Price Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products by name, ID, or company..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <input type="range" min="0" max="5000" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>All Ratings</option>
                  <option>4+ Stars</option>
                  <option>3+ Stars</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Products List ({filteredProducts.length})
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Original Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.slice(0, 20).map((product) => (
                  <tr key={product.id || product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="shrink-0 h-10 w-10 bg-gray-200 rounded overflow-hidden">
                          {product.image ? (
                            <img src={product.image} alt={product.item_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No img</div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.item_name || product.name}</div>
                          <div className="text-sm text-gray-500">{product.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">₹{product.current_price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 line-through">₹{product.original_price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600 font-medium">{product.discount_percentage}% off</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-900">{product.rating?.stars || 0}</span>
                        <span className="ml-1 text-xs text-gray-500">({product.rating?.count || 0})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing 1 to {Math.min(20, filteredProducts.length)} of {filteredProducts.length} results
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

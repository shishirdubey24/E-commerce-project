import { useState, useMemo } from "react";
import {
  Users,
  TrendingUp,
  ShoppingCart,
  DollarSign,
 
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  ArrowUpRight,
  Sparkles,
  Award,
 
} from "lucide-react";
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
  AreaChart,
  Area,
} from "recharts";

// Mock customer data generator
const generateCustomerData = () => {
  const firstNames = ['John', 'Emma', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Emily', 'Robert', 'Jessica', 'William', 'Olivia', 'Daniel', 'Sophia', 'Matthew'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Garcia'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'];
  const statuses = ['Active', 'Inactive', 'New'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `CUST${String(i + 1).padStart(4, '0')}`,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `customer${i + 1}@example.com`,
    phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    city: cities[Math.floor(Math.random() * cities.length)],
    totalOrders: Math.floor(Math.random() * 50) + 1,
    totalSpent: Math.floor(Math.random() * 50000) + 1000,
    avgOrderValue: 0,
    lastOrderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    status: statuses[Math.floor(Math.random() * 3)],
    loyaltyPoints: Math.floor(Math.random() * 5000),
  })).map(c => ({
    ...c,
    avgOrderValue: Math.floor(c.totalSpent / c.totalOrders),
  }));
};

// Customer activity trend (last 6 months)
const activityTrend = [
  { month: 'Jul', newCustomers: 45, activeCustomers: 320 },
  { month: 'Aug', newCustomers: 52, activeCustomers: 340 },
  { month: 'Sep', newCustomers: 61, activeCustomers: 380 },
  { month: 'Oct', newCustomers: 48, activeCustomers: 360 },
  { month: 'Nov', newCustomers: 70, activeCustomers: 420 },
  { month: 'Dec', newCustomers: 85, activeCustomers: 480 },
];

export default function Customers() {
  const [customers] = useState(generateCustomerData());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('totalSpent');

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'Active').length;
    const newCustomers = customers.filter(c => c.status === 'New').length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgOrderValue = customers.reduce((sum, c) => sum + c.avgOrderValue, 0) / customers.length;
    const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0);

    return {
      totalCustomers,
      activeCustomers,
      newCustomers,
      totalRevenue,
      avgOrderValue: Math.floor(avgOrderValue),
      totalOrders,
      activePercentage: ((activeCustomers / totalCustomers) * 100).toFixed(1),
    };
  }, [customers]);

  // Customer segmentation by spend
  const customerSegments = useMemo(() => {
    const segments = [
      { name: 'VIP (>₹20K)', min: 20000, max: Infinity, color: '#6366f1' },
      { name: 'Premium (₹10K-₹20K)', min: 10000, max: 20000, color: '#8b5cf6' },
      { name: 'Regular (₹5K-₹10K)', min: 5000, max: 10000, color: '#10b981' },
      { name: 'New (<₹5K)', min: 0, max: 5000, color: '#f59e0b' },
    ];

    return segments.map(seg => ({
      ...seg,
      count: customers.filter(c => c.totalSpent >= seg.min && c.totalSpent < seg.max).length,
    }));
  }, [customers]);

  // Top customers by spend
  const topCustomers = useMemo(() => {
    return [...customers]
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);
  }, [customers]);

  // City distribution
  const cityDistribution = useMemo(() => {
    const cityMap = {};
    customers.forEach(c => {
      cityMap[c.city] = (cityMap[c.city] || 0) + 1;
    });
    return Object.entries(cityMap)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [customers]);

  // Filter and sort customers
  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter(c => {
      const matchesSearch = 
        c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });

    if (sortBy === 'totalSpent') {
      filtered.sort((a, b) => b.totalSpent - a.totalSpent);
    } else if (sortBy === 'totalOrders') {
      filtered.sort((a, b) => b.totalOrders - a.totalOrders);
    } else if (sortBy === 'joinDate') {
      filtered.sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
    }

    return filtered;
  }, [customers, searchTerm, filterStatus, sortBy]);


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Customer Management
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Manage and analyze your customer base
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Last 30 days</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <Download className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Export</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-br from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:-translate-y-0.5">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Customer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-emerald-500/10 to-teal-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/50">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <TrendingUp className="w-4 h-4" />
                {metrics.activePercentage}%
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900">{metrics.totalCustomers}</p>
              <p className="text-xs text-gray-500">{metrics.activeCustomers} active</p>
            </div>
          </div>
        </div>

        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg shadow-indigo-500/50">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">₹{(metrics.totalRevenue / 1000).toFixed(1)}K</p>
              <p className="text-xs text-gray-500">From {metrics.totalOrders} orders</p>
            </div>
          </div>
        </div>

        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/50">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-3xl font-bold text-gray-900">₹{metrics.avgOrderValue}</p>
              <p className="text-xs text-gray-500">Per transaction</p>
            </div>
          </div>
        </div>

        <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-amber-500/10 to-orange-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-linear-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/50">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">New Customers</p>
              <p className="text-3xl font-bold text-gray-900">{metrics.newCustomers}</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Customer Activity Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Customer Activity Trend</h3>
            <p className="text-sm text-gray-500 mt-1">New vs Active customers</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={activityTrend}>
              <defs>
                <linearGradient id="newCustomers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="activeCustomers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area type="monotone" dataKey="newCustomers" stroke="#10b981" strokeWidth={2} fill="url(#newCustomers)" />
              <Area type="monotone" dataKey="activeCustomers" stroke="#6366f1" strokeWidth={2} fill="url(#activeCustomers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Segmentation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Customer Segments</h3>
            <p className="text-sm text-gray-500 mt-1">By total spend</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({  count }) => `${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {customerSegments.map((seg, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }}></div>
                  <span className="text-gray-700">{seg.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{seg.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Customers */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Top Customers</h3>
              <p className="text-sm text-gray-500 mt-1">By total spend</p>
            </div>
            <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View all
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {topCustomers.map((customer, idx) => (
              <div key={customer.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="shrink-0 w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  #{idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {customer.firstName} {customer.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{customer.totalOrders} orders</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">₹{(customer.totalSpent / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-gray-500">{customer.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* City Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Top Cities</h3>
            <p className="text-sm text-gray-500 mt-1">Customer distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cityDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="city" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers by name, email, or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="New">New</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="totalSpent">Sort by Spend</option>
            <option value="totalOrders">Sort by Orders</option>
            <option value="joinDate">Sort by Join Date</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Customers List ({filteredCustomers.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.slice(0, 20).map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="shrink-0 h-10 w-10 bg-linear-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {customer.firstName[0]}{customer.lastName[0]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center text-xs text-gray-600">
                        <Mail className="w-3 h-3 mr-1" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Phone className="w-3 h-3 mr-1" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      {customer.city}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{customer.totalOrders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">₹{(customer.totalSpent / 1000).toFixed(1)}K</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">₹{customer.avgOrderValue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-700' :
                      customer.status === 'New' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-emerald-600 hover:text-emerald-900">
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

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing 1 to {Math.min(20, filteredCustomers.length)} of {filteredCustomers.length} customers
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-emerald-600 text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

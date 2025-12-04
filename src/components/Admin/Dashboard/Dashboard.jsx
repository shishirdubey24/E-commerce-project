// src/components/Admin/Dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import useChartData from "./Charts"
export default function Dashboard() {
  const items = useSelector((store) => store.items || []);
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    customers: 0,
    alerts: 0,
  });

  useEffect(() => {
    const totalProducts = Array.isArray(items) ? items.length : 0;
    const uniqueCategories = new Set((items || []).map((it) => it?.category || "Uncategorized")).size;
    // keep placeholders for customers/alerts until real data available
    setStats({
      products: totalProducts,
      categories: uniqueCategories,
      customers: 1200,
      alerts: 5,
    });
  }, [items]);

  // chart hook returns { categoryChart, discountChart, ratingChart }
  const { categoryChart, discountChart, ratingChart } = useChartData();

  // Guard: don't render charts until we actually have data
  const chartsReady =
    Array.isArray(categoryChart) &&
    categoryChart.length > 0 &&
    Array.isArray(discountChart) &&
    Array.isArray(ratingChart);

  if (!chartsReady) {
    return (
      <main className="max-w-[1400px] mx-auto p-6">
        <h3 className="text-2xl font-bold mb-6">Dashboard</h3>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-gray-500">PRODUCTS</h4>
                <p className="text-2xl font-bold mt-2">{stats.products}</p>
              </div>
              <BsFillArchiveFill className="w-8 h-8 text-indigo-600" />
            </div>
            <p className="mt-3 text-sm text-gray-500">Total products in catalog</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-gray-500">CATEGORIES</h4>
                <p className="text-2xl font-bold mt-2">{stats.categories}</p>
              </div>
              <BsFillGrid3X3GapFill className="w-8 h-8 text-green-600" />
            </div>
            <p className="mt-3 text-sm text-gray-500">Distinct product categories</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-gray-500">CUSTOMERS</h4>
                <p className="text-2xl font-bold mt-2">{stats.customers}</p>
              </div>
              <BsPeopleFill className="w-8 h-8 text-amber-500" />
            </div>
            <p className="mt-3 text-sm text-gray-500">Active customers (est.)</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-gray-500">ALERTS</h4>
                <p className="text-2xl font-bold mt-2">{stats.alerts}</p>
              </div>
              <BsFillBellFill className="w-8 h-8 text-red-500" />
            </div>
            <p className="mt-3 text-sm text-gray-500">Pending system alerts</p>
          </div>
        </section>

        <div className="py-10 text-center text-gray-500">Loading chart data…</div>
      </main>
    );
  }

  return (
    <main className="max-w-[1400px] mx-auto p-6">
      <h3 className="text-2xl font-bold mb-6">Dashboard</h3>

      {/* Summary cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-gray-500">PRODUCTS</h4>
              <p className="text-2xl font-bold mt-2">{stats.products}</p>
            </div>
            <BsFillArchiveFill className="w-8 h-8 text-indigo-600" />
          </div>
          <p className="mt-3 text-sm text-gray-500">Total products in catalog</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-gray-500">CATEGORIES</h4>
              <p className="text-2xl font-bold mt-2">{stats.categories}</p>
            </div>
            <BsFillGrid3X3GapFill className="w-8 h-8 text-green-600" />
          </div>
          <p className="mt-3 text-sm text-gray-500">Distinct product categories</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-gray-500">CUSTOMERS</h4>
              <p className="text-2xl font-bold mt-2">{stats.customers}</p>
            </div>
            <BsPeopleFill className="w-8 h-8 text-amber-500" />
          </div>
          <p className="mt-3 text-sm text-gray-500">Active customers (est.)</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-gray-500">ALERTS</h4>
              <p className="text-2xl font-bold mt-2">{stats.alerts}</p>
            </div>
            <BsFillBellFill className="w-8 h-8 text-red-500" />
          </div>
          <p className="mt-3 text-sm text-gray-500">Pending system alerts</p>
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border">
          <h4 className="text-lg font-semibold mb-3">Items per Category</h4>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border">
          <h4 className="text-lg font-semibold mb-3">Discount Distribution</h4>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={discountChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="discountRange" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border lg:col-span-2">
          <h4 className="text-lg font-semibold mb-3">Average Rating by Category</h4>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ratingChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgRating" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Latest products table + inventory snapshot */}
      <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border col-span-2">
          <h4 className="text-lg font-semibold mb-3">Latest Products</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500">
                  <th className="py-2">Product</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Discount</th>
                  <th className="py-2">Rating</th>
                </tr>
              </thead>
              <tbody>
                {(items || []).slice(0, 8).map((it) => (
                  <tr key={it.id} className="border-t border-gray-100">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-50 rounded overflow-hidden flex items-center justify-center">
                          {it.image ? (
                            <img src={it.image} alt={it.item_name || it.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-xs text-gray-400">No image</div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{it.item_name || it.name}</div>
                          <div className="text-xs text-gray-500">{it.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">{it.category}</td>
                    <td className="py-3">₹{it.current_price}</td>
                    <td className="py-3">{it.discount_percentage}%</td>
                    <td className="py-3">{it.rating?.stars ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border">
          <h4 className="text-lg font-semibold mb-3">Inventory Snapshot</h4>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>
              <div className="flex justify-between">
                <span>Low stock products</span>
                <span className="font-medium text-red-600">12</span>
              </div>
            </li>
            <li>
              <div className="flex justify-between">
                <span>Out of stock</span>
                <span className="font-medium text-red-600">3</span>
              </div>
            </li>
            <li>
              <div className="flex justify-between">
                <span>Pending restock</span>
                <span className="font-medium">7</span>
              </div>
            </li>
          </ul>

          <div className="mt-4">
            <button className="w-full px-3 py-2 bg-indigo-600 text-white rounded-md">Open inventory</button>
          </div>
        </div>
      </section>
    </main>
  );
}

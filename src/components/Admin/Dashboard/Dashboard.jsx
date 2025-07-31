// src/components/Dashboard.jsx

import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill
} from 'react-icons/bs';
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
  Line
} from 'recharts';
import useChartData from './Charts';

function Dashboard() {
  // get raw items from Redux store
  const items = useSelector((store) => store.items);

  // compute summary stats
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    customers: 0,
    alerts: 0,
  });

  useEffect(() => {
    const totalProducts = items.length;
    const uniqueCategories = new Set(items.map((item) => item.category)).size;
    // placeholder values; swap with real logic if available
    const customers = 1200;
    const alerts = 5;

    setStats({
      products: totalProducts,
      categories: uniqueCategories,
      customers,
      alerts,
    });
  }, [items]);

  const { products, categories, customers, alerts } = stats;

  // get processed chart data
  const { categoryChart, discountChart, ratingChart } = useChartData();

  return (
    <main className="dashboard-container">
      <h3 className="dashboard-title">DASHBOARD</h3>

      {/* Summary Cards */}
      <section className="dashboard-cards">
        <div className="card">
          <div className="card-header">
            <h4>PRODUCTS</h4>
            <BsFillArchiveFill className="card-icon" />
          </div>
          <p className="card-value">{products}</p>
        </div>
        <div className="card">
          <div className="card-header">
            <h4>CATEGORIES</h4>
            <BsFillGrid3X3GapFill className="card-icon" />
          </div>
          <p className="card-value">{categories}</p>
        </div>
        <div className="card">
          <div className="card-header">
            <h4>CUSTOMERS</h4>
            <BsPeopleFill className="card-icon" />
          </div>
          <p className="card-value">{customers}</p>
        </div>
        <div className="card">
          <div className="card-header">
            <h4>ALERTS</h4>
            <BsFillBellFill className="card-icon" />
          </div>
          <p className="card-value">{alerts}</p>
        </div>
      </section>

      {/* Charts Section */}
      <section className="dashboard-charts">
        {/* Items per Category */}
        <div className="chart-wrapper">
          <h4>Items per Category</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Discount Distribution */}
        <div className="chart-wrapper">
          <h4>Discount Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={discountChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="discountRange" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Average Rating by Category */}
        <div className="chart-wrapper">
          <h4>Average Rating by Category</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ratingChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgRating" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;

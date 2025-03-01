import React, { useState, useEffect } from 'react';
import api from '../utils/axiosConfig';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalListValue: 0,
    totalCostValue: 0,
    potentialProfit: 0,
    lowStock: 0,
    outOfStock: 0,
    categoryBreakdown: [],
    locationBreakdown: [],
    topProducts: []
  });


  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/products');
      const products = response.data;
      
      // Calculate statistics
      const stats = {
        totalProducts: products.length,
        totalListValue: products.reduce((sum, p) => sum + (p.listPrice * p.quantity), 0),
        totalCostValue: products.reduce((sum, p) => sum + (p.costPrice * p.quantity), 0),
        potentialProfit: products.reduce((sum, p) => sum + ((p.listPrice - p.costPrice) * p.quantity), 0),
        lowStock: products.filter(p => p.quantity > 0 && p.quantity < 10).length,
        outOfStock: products.filter(p => p.quantity === 0).length,
        
        // Category breakdown
        categoryBreakdown: Object.entries(
          products.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + p.quantity;
            return acc;
          }, {})
        ).sort((a, b) => b[1] - a[1]),

        // Location breakdown
        locationBreakdown: Object.entries(
          products.reduce((acc, p) => {
            acc[p.location] = (acc[p.location] || 0) + p.quantity;
            return acc;
          }, {})
        ).sort((a, b) => b[1] - a[1]),

        // Top products by value
        topProducts: products
          .map(p => ({
            ...p,
            totalValue: p.listPrice * p.quantity
          }))
          .sort((a, b) => b.totalValue - a.totalValue)
          .slice(0, 5)
      };

      setStats(stats);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

 

  const StatCard = ({ title, value, subtext, color }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 ${color}`}>
      <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900">
          {typeof value === 'number' && title.toLowerCase().includes('price') || title.toLowerCase().includes('value') || title.toLowerCase().includes('profit') || title.toLowerCase().includes('cost')
            ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : value.toLocaleString()}
        </p>
        {subtext && <p className="ml-2 text-sm text-gray-500">{subtext}</p>}
      </div>
    </div>
  );

  return (
<div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

    {/* Main Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Products"
        value={stats.totalProducts}
        subtext="items"
        color="border-l-4 border-blue-500"
      />
      <StatCard
        title="Total Inventory Value"
        value={stats.totalListValue}
        subtext="at list price"
        color="border-l-4 border-green-500"
      />
      <StatCard
        title="Total Cost"
        value={stats.totalCostValue}
        subtext="at cost price"
        color="border-l-4 border-yellow-500"
      />
      <StatCard
        title="Potential Profit"
        value={stats.potentialProfit}
        subtext="if all sold"
        color="border-l-4 border-purple-500"
      />
    </div>

    {/* Inventory Alerts and Top Products Section */}
    <div className="mb-8">
      <div className={`grid grid-cols-1 ${stats.lowStock > 0 || stats.outOfStock > 0 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6`}>
        {(stats.lowStock > 0 || stats.outOfStock > 0) && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Inventory Alerts</h2>
            <div className="grid grid-cols-2 gap-4">
              {stats.lowStock > 0 && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm font-medium">Low Stock Items</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.lowStock}</p>
                  <p className="text-yellow-600 text-sm">Less than 10 units</p>
                </div>
              )}
              {stats.outOfStock > 0 && (
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-red-800 text-sm font-medium">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-900">{stats.outOfStock}</p>
                  <p className="text-red-600 text-sm">Needs restock</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Products by Value</h2>
          <div className="space-y-4">
            {stats.topProducts.map((product, index) => (
              <div key={product._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 w-8">{index + 1}.</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${product.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  <p className="text-sm text-gray-500">{product.quantity} units</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Category and Location Breakdown */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Category Breakdown</h2>
        <div className="space-y-4">
          {stats.categoryBreakdown.slice(0, 5).map(([category, quantity]) => (
            <div key={category} className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{category}</span>
                  <span className="text-sm text-gray-500">{quantity} units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{
                      width: `${(quantity / Math.max(...stats.categoryBreakdown.map(([, q]) => q))) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Location Breakdown</h2>
        <div className="space-y-4">
          {stats.locationBreakdown.slice(0, 5).map(([location, quantity]) => (
            <div key={location} className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{location}</span>
                  <span className="text-sm text-gray-500">{quantity} units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 rounded-full h-2"
                    style={{
                      width: `${(quantity / Math.max(...stats.locationBreakdown.map(([, q]) => q))) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
    
  );
};

export default Dashboard;

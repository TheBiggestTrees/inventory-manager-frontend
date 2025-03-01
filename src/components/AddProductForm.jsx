// src/components/AddProductForm.jsx
import React, { useState } from 'react';
import api from '../utils/axiosConfig';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    location: '',
    category: '',
    sku: '',
    listPrice: '',
    costPrice: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert quantity and prices to numbers
      const newProduct = {
        ...formData,
        quantity: parseInt(formData.quantity),
        listPrice: parseFloat(formData.listPrice),
        costPrice: parseFloat(formData.costPrice)
      };

      const res = await api.post('/products', newProduct);
      
      if (res.status === 200) {
        setSuccess(true);
        setFormData({
          name: '',
          quantity: '',
          location: '',
          category: '',
          sku: '',
          listPrice: '',
          costPrice: ''
        });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('Failed to add product');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add product');
      console.error('Error adding product:', error);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h2>
      
      {error && <p className="text-red-500 mb-4 p-3 bg-red-50 rounded">{error}</p>}
      {success && <p className="text-green-500 mb-4 p-3 bg-green-50 rounded">Product added successfully!</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">List Price ($)</label>
          <input
            type="number"
            name="listPrice"
            value={formData.listPrice}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Cost Price ($)</label>
          <input
            type="number"
            name="costPrice"
            value={formData.costPrice}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;

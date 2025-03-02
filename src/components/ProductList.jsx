// src/components/ProductList.jsx
import React, { useState } from 'react';
import api from '../utils/axiosConfig';
import FilterBox from './FilterBox';
import ProductTable from './ProductTable';
import AddProductModal from './AddProductModal';
import { useProducts } from '../hooks/useProducts';
import { convertToCSV, downloadCSV } from '../utils/productUtils';
import { Button } from 'antd';

const ProductList = () => {
  const {
    products,
    error,
    success,
    editingProduct,
    selectedProducts,
    sortConfig,
    uniqueValues,
    quantityRange,
    setError,
    setSuccess,
    setEditingProduct,
    setSelectedProducts,
    fetchProducts,
    handleSort,
    getSortedProducts
  } = useProducts();

  const [editedValues, setEditedValues] = useState({
    name: '',
    quantity: '',
    location: '',
    category: '',
    sku: '',
    listPrice: '',
    costPrice: ''
  });

  const [filters, setFilters] = useState({
    name: '',
    quantity: '',
    quantityMin: '',
    location: '',
    category: '',
    sku: '',
    listPrice: '',
    costPrice: ''
  });

  const [bulkActionOpen, setBulkActionOpen] = useState(false);
  const [bulkEditValues, setBulkEditValues] = useState({
    category: '',
    location: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setEditedValues({
      name: product.name,
      quantity: product.quantity,
      location: product.location,
      category: product.category,
      sku: product.sku,
      listPrice: product.listPrice,
      costPrice: product.costPrice
    });
  };

  const handleChange = (e, field) => {
    setEditedValues({
      ...editedValues,
      [field]: e.target.value
    });
  };

  const handleSave = async (productId) => {
    try {
      const updatedProduct = {
        ...editedValues,
        quantity: parseInt(editedValues.quantity),
        listPrice: parseFloat(editedValues.listPrice),
        costPrice: parseFloat(editedValues.costPrice)
      };

      const response = await api.put(`/products/${productId}`, updatedProduct);
      
      if (response.status === 200) {
        await fetchProducts();
        setEditingProduct(null);
        setSuccess('Product updated successfully!');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error) {
      setError('Failed to update product');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setEditedValues({
      name: '',
      quantity: '',
      location: '',
      category: '',
      sku: '',
      listPrice: '',
      costPrice: ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        await fetchProducts();
        setSuccess("Product deleted successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } catch (error) {
        setError('Failed to delete product');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleSelectAll = () => {
    const filteredProductIds = getFilteredProducts().map(product => product._id);
    setSelectedProducts(prev => 
      prev.length === filteredProductIds.length ? [] : filteredProductIds
    );
  };

  const handleFilterChange = (field, value) => {
    if (field === 'clear') {
      setFilters({
        name: '',
        quantity: '',
        quantityMin: '',
        location: '',
        category: '',
        sku: '',
        listPrice: '',
        costPrice: ''
      });
      return;
    }
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getFilteredProducts = () => {
    return products.filter(product => {
      const conditions = {
        name: !filters.name || product.name.toLowerCase().includes(filters.name.toLowerCase()),
        location: !filters.location || product.location.toLowerCase().includes(filters.location.toLowerCase()),
        quantity: (filters.quantity === '' || product.quantity <= parseInt(filters.quantity)) &&
                 (filters.quantityMin === '' || product.quantity >= parseInt(filters.quantityMin)),
        sku: !filters.sku || product.sku.toLowerCase().includes(filters.sku.toLowerCase()),
        category: !filters.category || product.category.toLowerCase().includes(filters.category.toLowerCase()),
        listPrice: (!filters.listPrice || filters.listPrice === '') || product.listPrice <= parseFloat(filters.listPrice),
        costPrice: (!filters.costPrice || filters.costPrice === '') || product.costPrice <= parseFloat(filters.costPrice)
      };
      
      return Object.values(conditions).every(Boolean);
    });
  };

  const handleBulkAction = async (action) => {
    try {
      switch (action) {
        case 'delete':
          await Promise.all(selectedProducts.map(id => api.delete(`/products/${id}`)));
          break;
        case 'update':
          await Promise.all(selectedProducts.map(id => api.put(`/products/${id}`, bulkEditValues)));
          break;
        case 'export':
          const selectedData = products.filter(p => selectedProducts.includes(p._id));
          const csv = convertToCSV(selectedData);
          downloadCSV(csv, 'selected_products.csv');
          break;
      }
      await fetchProducts();
      setSelectedProducts([]);
      setBulkActionOpen(false);
      setSuccess(`Bulk ${action} completed successfully!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Failed to perform bulk ${action}`);
      setTimeout(() => setError(null), 3000);
    }
  };

  const filteredProducts = getFilteredProducts();
  const sortedProducts = getSortedProducts(filteredProducts);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Product List</h2>
      {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      
      <Button type="primary" onClick={() => setIsModalOpen(true)} className="mb-4">
        Add Product
      </Button>

      <AddProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        fetchProducts={fetchProducts}
      />

      {selectedProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Bulk Actions ({selectedProducts.length} items selected)</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setBulkActionOpen(!bulkActionOpen)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Selected
              </button>
              <button
                onClick={() => handleBulkAction('export')}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Export CSV
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete Selected
              </button>
            </div>
          </div>

          {bulkActionOpen && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={bulkEditValues.category}
                  onChange={(e) => setBulkEditValues({...bulkEditValues, category: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  placeholder="New category for selected items"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={bulkEditValues.location}
                  onChange={(e) => setBulkEditValues({...bulkEditValues, location: e.target.value})}
                  className="w-full border rounded px-3 py-2"
                  placeholder="New location for selected items"
                />
              </div>
              <button
                onClick={() => handleBulkAction('update')}
                className="col-span-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update Selected Items
              </button>
            </div>
          )}
        </div>
      )}

      <FilterBox
        filters={filters}
        onFilterChange={handleFilterChange}
        quantityRange={quantityRange}
        uniqueNames={uniqueValues.names}
        uniqueLocations={uniqueValues.locations}
        uniqueCategories={uniqueValues.categories}
        uniqueSkus={uniqueValues.skus}
      />

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={handleSelectAll}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {selectedProducts.length === filteredProducts.length ? "Deselect All" : "Select All"}
        </button>
      </div>

      <ProductTable
        products={sortedProducts}
        selectedProducts={selectedProducts}
        onSelectProduct={handleSelectProduct}
        sortConfig={sortConfig}
        onSort={handleSort}
        editingProduct={editingProduct}
        editedValues={editedValues}
        handleChange={handleChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ProductList;

import { useState, useEffect } from 'react';
import api from '../utils/axiosConfig';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [uniqueValues, setUniqueValues] = useState({
    names: [],
    locations: [],
    categories: [],
    skus: []
  });
  const [quantityRange, setQuantityRange] = useState({
    min: 0,
    max: 0,
    current: 0
  });

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setSelectedProducts([]);
      updateUniqueValues(response.data);
      updateQuantityRange(response.data);
    } catch (error) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', error);
    }
  };

  const updateQuantityRange = (productData) => {
    const quantities = productData.map(p => p.quantity);
    const min = Math.min(...quantities);
    const max = Math.max(...quantities);
    setQuantityRange(prev => ({
      min,
      max,
      current: prev.current || min
    }));
  };

  const updateUniqueValues = (productData) => {
    setUniqueValues({
      names: [...new Set(productData.map(p => p.name))],
      locations: [...new Set(productData.map(p => p.location))],
      categories: [...new Set(productData.map(p => p.category))],
      skus: [...new Set(productData.map(p => p.sku))]
    });
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  };

  const getSortedProducts = (filteredProducts) => {
    const sortedProducts = [...filteredProducts];
    sortedProducts.sort((a, b) => {
      const isNumeric = ['quantity', 'listPrice', 'costPrice'].includes(sortConfig.key);
      const aValue = isNumeric ? parseFloat(a[sortConfig.key]) || 0 : (a[sortConfig.key] || '').toLowerCase();
      const bValue = isNumeric ? parseFloat(b[sortConfig.key]) || 0 : (b[sortConfig.key] || '').toLowerCase();
      
      const comparison = isNumeric
        ? aValue - bValue
        : aValue.localeCompare(bValue);
        
      return sortConfig.direction === 'ascending' ? comparison : -comparison;
    });
    return sortedProducts;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['x-auth-token'] = token;
    }
    fetchProducts();
  }, []);

  return {
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
  };
};

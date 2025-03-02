import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import AddProductForm from './AddProductForm';

const AddProductModal = ({ isModalOpen, setIsModalOpen, fetchProducts }) => {
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
        fetchProducts();
        setIsModalOpen(false);
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
    <Modal
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <AddProductForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
        success={success}
      />
    </Modal>
  );
};

export default AddProductModal;
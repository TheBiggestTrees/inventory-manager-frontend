import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import api from '../utils/axiosConfig';
import CustomerModal from './CustomerModal';
import CustomerTable from './CustomerTable';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [editedValues, setEditedValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: ''
  });

  // Fetch customers
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Failed to fetch customers');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (values) => {
    try {
      if (editingId) {
        await api.put(`/customers/${editingId}`, values);
        setSuccess('Customer updated successfully!');
      } else {
        await api.post('/customers', values);
        setSuccess('Customer added successfully!');
      }
      fetchCustomers();
      setFormData({ first_name: '', last_name: '', email: '', phone_number: '', address: '' });
      setEditingId(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error saving customer:', error);
      setError('Failed to save customer');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setEditingId(customer._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await api.delete(`/customers/${id}`);
        fetchCustomers();
        setSuccess('Customer deleted successfully!');
        setTimeout(() => setSuccess(null), 3000);
      } catch (error) {
        console.error('Error deleting customer:', error);
        setError('Failed to delete customer');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const openModal = () => {
    setFormData({ first_name: '', last_name: '', email: '', phone_number: '', address: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedCustomers = (customers) => {
    if (sortConfig.key) {
      return [...customers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return customers;
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(customerId)
        ? prevSelected.filter((id) => id !== customerId)
        : [...prevSelected, customerId]
    );
  };

  const handleChange = (e, field) => {
    setEditedValues({
      ...editedValues,
      [field]: e.target.value
    });
  };

  const handleSave = async (customerId) => {
    try {
      await api.put(`/customers/${customerId}`, editedValues);
      fetchCustomers();
      setEditingId(null);
      setEditedValues({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: ''
      });
    } catch (error) {
      console.error('Error saving customer:', error);
      setError('Failed to save customer');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedValues({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: ''
    });
  };

  const sortedCustomers = getSortedCustomers(customers);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Customers</h2>
      {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      
      <Button type="primary" onClick={openModal} className="mb-4">
        Add Customer
      </Button>

      {/* Add/Edit Form Modal */}
      <CustomerModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        editingId={editingId}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      {/* Customers Table */}
      <CustomerTable
        customers={sortedCustomers}
        selectedCustomers={selectedCustomers}
        onSelectCustomer={handleSelectCustomer}
        sortConfig={sortConfig}
        onSort={handleSort}
        editingCustomer={editingId}
        editedValues={editedValues}
        handleChange={handleChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Customers;
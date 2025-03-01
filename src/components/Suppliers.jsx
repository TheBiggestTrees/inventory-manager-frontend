import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import api from '../utils/axiosConfig';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingSupplier, setEditingSupplier] = useState(null);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact Person',
      dataIndex: 'contact_person',
      key: 'contact_person',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/suppliers');
      setSuppliers(response.data);
    } catch (error) {
      message.error('Failed to fetch suppliers');
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setEditingSupplier(null);
    setIsModalVisible(true);
  };

  const handleEdit = (supplier) => {
    form.setFieldsValue(supplier);
    setEditingSupplier(supplier);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/suppliers/${id}`);
      message.success('Supplier deleted successfully');
      fetchSuppliers();
    } catch (error) {
      message.error('Failed to delete supplier');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingSupplier) {
        await api.put(`/suppliers/${editingSupplier._id}`, values);
        message.success('Supplier updated successfully');
      } else {
        await api.post('/suppliers', values);
        message.success('Supplier added successfully');
      }
      setIsModalVisible(false);
      fetchSuppliers();
    } catch (error) {
      message.error('Failed to save supplier');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Suppliers</h2>
        <Button type="primary" onClick={handleAdd}>
          Add Supplier
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={suppliers}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingSupplier ? 'Edit Supplier' : 'Add Supplier'}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input supplier name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contact_person"
            label="Contact Person"
            rules={[{ required: true, message: 'Please input contact person!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input email address!' },
              { type: 'email', message: 'Please input a valid email address!' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Suppliers;

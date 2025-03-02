import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CustomerModal = ({ isModalOpen, setIsModalOpen, formData, editingId, handleInputChange, handleSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingId) {
      form.setFieldsValue(formData);
    } else {
      form.resetFields();
    }
  }, [editingId, formData, form]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    await handleSubmit(values);
    closeModal();
  };

  return (
    <Modal
      title={editingId ? 'Edit Customer' : 'Add Customer'}
      visible={isModalOpen}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          {editingId ? 'Update Customer' : 'Add Customer'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={formData}
      >
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: 'Please input the first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: 'Please input the last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input the email address!' },
            { type: 'email', message: 'Please input a valid email address!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Phone"
          rules={[{ required: true, message: 'Please input the phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerModal;
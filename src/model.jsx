import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Model = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [formData, setFormData] = useState({});
  const [form] = useForm();
  const { id } = useParams();
  const BASE_URI = 'https://techosto-backend.onrender.com/api/v1/users';

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${BASE_URI}/${id}`);
      setFormData(res.data.data.user);
      form.setFieldsValue(res.data.data.user); // set the form values
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    const { name, email, phone, website } = form.getFieldsValue(); // get updated form values
    const updatedData = {};
    // update only fields that have changed
    name !== formData.name && (updatedData.name = name);
    email !== formData.email && (updatedData.email = email);
    phone !== formData.phone && (updatedData.phone = phone);
    website !== formData.website && (updatedData.website = website);

    if (Object.keys(updatedData).length === 0) {
      notification.error({
        message: 'Error',
        description: 'Please update at least one field',
      });
    } else {
      await axios.patch(`${BASE_URI}/${id}`, updatedData);

      notification.success({
        message: 'Success',
        description: 'User details updated successfully',
      });

      // for reloading the page after updating the data
      window.location.reload();
    }
  };

  return (
    <Modal title="Update User Details" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleSubmit} initialValues={formData}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => setName(e.target.value)} value={formData.name} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} value={formData.email} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => setPhone(e.target.value)} value={formData.phone} />
        </Form.Item>
        <Form.Item
          name="website"
          label="Website"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input value={formData.website} onChange={(e) => setWebsite(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Model;

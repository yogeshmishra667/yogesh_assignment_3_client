import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';
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
    await axios.patch(`${BASE_URI}/${id}`, {
      name,
      email,
      phone,
      website,
    });
    //for reloading the page after updating the data
    return window.location.reload();
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
          <Input
            onChange={(e) =>
              setName({
                ...name,
                name: e.target.value,
              })
            }
            value={name}
          />
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
          <Input onChange={(e) => setEmail(e.target.value)} value={email} />
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
          <Input onChange={(e) => setPhone(e.target.value)} value={phone} />
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
          <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
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

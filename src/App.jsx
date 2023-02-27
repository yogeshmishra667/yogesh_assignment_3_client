import React, { useState, useEffect } from 'react';
import {
  EditOutlined,
  MailOutlined,
  HeartOutlined,
  HeartFilled,
  PhoneOutlined,
  GlobalOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
import axios from 'axios';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';
import Model from './model';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const BASE_URI = 'https://techosto-backend.onrender.com/api/v1/users';

  // for like and dislike
  const [liked, setLiked] = useState(false);

  //for the edit button
  function handleEditClick() {
    setIsModalVisible(true);
  }

  //when the modal is closed
  function handleModalClose() {
    setIsModalVisible(false);
    navigate('/');
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${BASE_URI}`);
      setData(res.data);

      // set the liked array with false values
      setLiked(Array(res.data.data.user.length).fill(false)); // initialize liked array with false values
    };
    fetchData();

    return () => {
      setData([]);
      setLiked([]);
    };
  }, []);

  //function for like and dislike
  const handleLike = (index) => {
    const likedCopy = [...liked];
    likedCopy[index] = !likedCopy[index];
    setLiked(likedCopy);
  };

  //delete data
  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URI}/${id}`);
    return window.location.reload();
  };

  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
      {data?.data?.user.map((item, index) => {
        return (
          <Card
            style={{
              width: 300,
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            }}
            cover={
              <img
                style={{ height: 150 }}
                alt="example"
                src={`https://avatars.dicebear.com/v2/avataaars/${item.username}.svg?options[mood][]=happy`}
              />
            }
            actions={[
              liked[index] ? (
                <HeartFilled
                  key="likes"
                  style={{ fontSize: '16px', color: '#ff3300' }}
                  onClick={() => handleLike(index)}
                />
              ) : (
                <HeartOutlined key="likes" style={{ fontSize: '16px' }} onClick={() => handleLike(index)} />
              ),

              <Link to={`/${item._id}`}>
                <EditOutlined key="edit" onClick={handleEditClick} />
              </Link>,
              <DeleteOutlined key="delete" onClick={() => handleDelete(item._id)} />,
            ]}
          >
            <Meta avatar={<Avatar src="https://joesch.moe/api/v1/random" />} title={item.name} />
            <div style={{ marginLeft: '20px', marginTop: 10 }}>
              <p>
                <MailOutlined /> {item.email}
              </p>
              <p>
                <PhoneOutlined /> {item.phone}
              </p>
              <p>
                <GlobalOutlined /> {item.website}
              </p>
            </div>
          </Card>
        );
      })}
      <Routes>
        <Route path="/:id" element={<Model visible={isModalVisible} onClose={handleModalClose} />} />
      </Routes>
    </div>
  );
};
export default App;

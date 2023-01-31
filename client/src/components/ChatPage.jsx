import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { AppContext, getFromToken } from '../contexts/app-context';
import axios from "axios";


import io from 'socket.io-client';
import Chat from './Chat';
import { useNavigate } from 'react-router-dom';
const socket = io.connect('http://localhost:9000');

const ChatPage = () => {
  const [userName, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const { accessToken, setAccessToken } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) navigate('/')
    const token = localStorage.getItem('token')
    const decodedToken = getFromToken(token);
    const username = decodedToken.name;
    console.log(decodedToken)
    setUsername(username);
  }, []);


  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          {/* <input
            type="text"
            placeholder="John..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          /> */}
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a room</button>
        </div>
      ) : (
        <Chat socket={socket} username={userName} room={room} />
      )}
    </div>
  );
};

export default ChatPage;

import { Chat } from '../components';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../contexts/app-context';
import { useParams } from 'react-router-dom';

const MesMessages = ({ socket }) => {
  const { room } = useParams;
  const { accessToken, loading } = useContext(AppContext);

  const getChatRoom = async () => {
    try {
      const res = await fetch(`${serverUrl}/chatlist/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: room
        })
      });
      if (res.status === 404) { 
        
      }
      const data = await res.json();

    } catch (e) {
      console.log(e);
      return e.message;
    }
  };

    useEffect(() => {
      socket.emit('join_room', room);
    }, []);
  return <>{loading ? <p>Chargement...</p> : <Chat socket={socket} username={accessToken.name} room={room} />}</>;
};

export default MesMessages;

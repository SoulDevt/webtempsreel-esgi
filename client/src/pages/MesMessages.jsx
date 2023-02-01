import { Chat } from '../components';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../contexts/app-context';
import { useParams } from 'react-router-dom';

const MesMessages = ({ socket }) => {
  const { room } = useParams;
  const { accessToken, loading } = useContext(AppContext);
    useEffect(() => {
        socket.emit('join_room', room);
    }, []);
  return <>{loading ? <p>Chargement...</p> : <Chat socket={socket} username={accessToken.name} room={room} />}</>;
};

export default MesMessages;

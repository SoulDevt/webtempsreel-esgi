import { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Error, Login } from './pages';
import { io } from 'socket.io-client';

const App = () => {
  const socket = useMemo(() => io(`http://${process.env.HOST || 'localhost'}:${process.env.PORT_SERVER || 9000}`), []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('client conectado');
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;

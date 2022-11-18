import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Home, Error } from './pages';
import { io } from 'socket.io-client';

const App = () => {
  useEffect(() => {
    const socket = io('ws://localhost:9000');
    socket.on("connect", () => {
      console.log('client conectado');
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default App

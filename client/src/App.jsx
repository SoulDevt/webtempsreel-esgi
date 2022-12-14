import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Home, Error } from './pages';
import { io } from 'socket.io-client';
import Register from './pages/Register';
import Login from './pages/Login';

const socket = io(`http://${process.env.HOST||'localhost'}:${process.env.PORT_SERVER || 9000}`);

const App = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log('client conectado');
    });
  }, [socket]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default App

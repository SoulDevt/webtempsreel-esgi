import { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './components';
import { io } from 'socket.io-client';
import { serverUrl } from './enums';

const { Home, Error, Login, Test } = lazy(() => import('./pages'));

const App = () => {
  const socket = useMemo(() => io(serverUrl), []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('client conectado');
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;

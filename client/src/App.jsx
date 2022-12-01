import { useEffect, useMemo, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './components';
import { io } from 'socket.io-client';
import { serverUrl } from './enums';

const Home = lazy(() => import('./pages/Home'));
const Error = lazy(() => import('./pages/Error'));
const Login = lazy(() => import('./pages/Login'));
const Test = lazy(() => import('./pages/Test'));
const Loader = lazy(() => import('./components/Loader'));

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
    <Suspense fallback={<Loader />}>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
};

export default App;

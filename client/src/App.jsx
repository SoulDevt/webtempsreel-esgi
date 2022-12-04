import { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './components';
import { io } from 'socket.io-client';
import { serverUrl } from './enums';
import { Loader, Toast } from './components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Home = lazy(() => import('./pages/Home'));
const Error = lazy(() => import('./pages/Error'));
const Login = lazy(() => import('./pages/Login'));
const Notification = lazy(() => import('./pages/Notification'));

const App = () => {
  const socket = useMemo(() => io(serverUrl), []);
  const [listenning, setListenning] = useState(false);

  useEffect(() => {
    const source = new EventSource(`${serverUrl}/stream`, { withCredentials: true });
    if (!listenning) {
      socket.on('connect', () => {
        console.log('client conectado');
      });

      source.addEventListener('open', () => {
        console.log('SSE opened!');
      });

      source.addEventListener('notification', async (e) => {
        const { data } = JSON.parse(e.data);
        if (data.status === 'created') {
          toast(<Toast titre={data?.titre} message={data?.message} />, {
            theme: 'dark'
          });
        }
      });

      source.addEventListener('error', (error) => {
        // Prints the information about an error
        console.log(error);
      });

      source.addEventListener('close', () => {
        console.log('SSE closed!');
      });

    }

    setListenning(true);
    return () => {
      socket.disconnect();
      source.removeEventListener('notification', () => {});
      source.close();
    };
  }, [socket]);
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
};

export default App;

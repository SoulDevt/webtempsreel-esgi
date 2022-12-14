import { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './components';
import { io } from 'socket.io-client';
import { serverUrl } from './enums';
import { Loader, Toast } from './components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { requireAuth } from './middlewares';

// pages
const Home = lazy(() => import('./pages/Home'));
const Error = lazy(() => import('./pages/Error'));
const Login = lazy(() => import('./pages/Login'));
const Notification = lazy(() => import('./pages/Notification'));
// pages - admin
const ListeSalon = lazy(() => import('./pages/admin/ListeSalon'));
const Salon = lazy(() => import('./pages/admin/Salon'));
const HomeAdmin = lazy(() => import('./pages/admin/Home'));

const App = () => {
  const socket = useMemo(() => io(serverUrl), []);
  const [listenning, setListenning] = useState(false);
  const [nbConnexion, setNbConnexion] = useState(null);

  useEffect(() => {
    const source = new EventSource(`${serverUrl}/stream`, { withCredentials: true });
    if (!listenning) {
      socket.on('connect', () => {
        console.log('client conectado');
      });

      source.addEventListener('open', () => {
        console.log('SSE opened!');
      });

      source.addEventListener('notification', (e) => {
        const { data } = JSON.parse(e.data);
        if (data.status === 'created') {
          toast(<Toast titre={data?.titre} message={data?.message} />, {
            theme: 'dark'
          });
        }
      });

      source.addEventListener('nb-connexion', (e) => {
        const data = JSON.parse(e.data);
        if (data.nbConnexion && data.nbConnexion !== nbConnexion) setNbConnexion(data.nbConnexion);
      });

      source.addEventListener('error', (error) => {
        // Prints the information about an error
        console.error(error);
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
        <Route path="admin" onEnter={requireAuth}>
          <Route index element={<HomeAdmin />} />
          <Route path="liste-salon" element={<ListeSalon />} />
          <Route path="salon/:id" element={<Salon />} />
        </Route>
        <Route path="/notification" element={<Notification nbConnexion={nbConnexion} />} />
        <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
};

export default App;

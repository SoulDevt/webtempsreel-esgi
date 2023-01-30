import { useState, useMemo, lazy, Suspense, useEffect, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Nav, RequireAuth, ChatPage } from './components';
import { io } from 'socket.io-client';
import { serverUrl } from './enums';
import { Loader, Toast } from './components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AppContextProvider, authInitData } from './contexts/app-context';

// pages
const Home = lazy(() => import('./pages/Home'));
const Error = lazy(() => import('./pages/Error'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ChatBot = lazy(() => import('./pages/ChatBot'));

// pages - admin
const ListeSalon = lazy(() => import('./pages/admin/ListeSalon'));
const Salon = lazy(() => import('./pages/admin/Salon'));
const HomeAdmin = lazy(() => import('./pages/admin/Home'));
const Notification = lazy(() => import('./pages/Notification'));

const App = () => {
  const [listenning, setListenning] = useState(false);
  const [nbConnexion, setNbConnexion] = useState(null);
  const [adminAvailable, setAdminAvailable] = useState([]);

  // const socket = useMemo(() => io(serverUrl), []);
  const socketAdmin = useMemo(() => io(`${serverUrl}/admins`), []);

  useEffect(() => {
    const source = new EventSource(`${serverUrl}/stream`, { withCredentials: true });
    if (!listenning) {
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

      socketAdmin.on('connect', () => {
        socketAdmin.emit('get');
      });
      socketAdmin.on('disconnect', () => {
        const accessToken = authInitData();
        if (accessToken) {
          socketAdmin.emit('disconnect', accessToken.id);
        }
      });
      socketAdmin.on('get', (data) => {
        setAdminAvailable(data);
      });
    }

    setListenning(true);
    return () => {
      source.removeEventListener('notification', () => {});
      source.close();
    };
  }, []);

  const handleStatusAdmin = useCallback(
    ({ id, isAvailable }) => {
      if (isAvailable === 'true') {
        socketAdmin.emit('add', id);
      } else {
        socketAdmin.emit('remove', id);
      }
    },
    [adminAvailable]
  );

  return (
    <Suspense fallback={<Loader />}>
      <AppContextProvider>
        <Nav />
        <ToastContainer />
        {adminAvailable.length > 0 && (
          <p>
            {adminAvailable.map((admin) => (
              <div key={admin.id} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${admin.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{admin.id}</span>
              </div>
            ))}
          </p>
        )}
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="admin">
            <Route
              index
              element={
                <RequireAuth>
                  <HomeAdmin nbConnexion={nbConnexion} usersAdmin={adminAvailable} handleAdmins={handleStatusAdmin} />
                </RequireAuth>
              }
            />
            <Route
              path="liste-salon"
              element={
                <RequireAuth>
                  <ListeSalon />
                </RequireAuth>
              }
            />
            <Route
              path="salon/:id"
              element={
                <RequireAuth>
                  <Salon />
                </RequireAuth>
              }
            />
            <Route
              path="notification"
              element={
                <RequireAuth>
                  <Notification nbConnexion={nbConnexion} />
                </RequireAuth>
              }
            />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AppContextProvider>
    </Suspense>
  );
};

export default App;

import React, { createContext, useMemo, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';

export const getFromToken = (token) => {
  const decoded = jwt_decode(token);
  return decoded;
};

export const authInitData = () => {
  if (localStorage.getItem('token')) {
    return {
      token: localStorage.getItem('token'),
      ...getFromToken(localStorage.getItem('token'))
    };
  } else {
    return null;
  }
};

export const AppContext = createContext({
  accessToken: null,
  loading: true,
  setAccessToken: () => {}
});

export const AppContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const value = useMemo(() => ({ accessToken, loading, setAccessToken }), [accessToken, loading]);
  useEffect(() => {
    if (loading) {
      const init_data = authInitData();
      setAccessToken(init_data);
    }
    setLoading(false);
  }, []);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

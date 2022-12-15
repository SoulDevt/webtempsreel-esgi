import React, { createContext, useContext, useMemo, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';

export const getFromToken = (token) => {
  const decoded = jwt_decode(token);
  return decoded;
};

const authInitData = () => {
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
  setAccessToken: () => {}
});

export const AppContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const value = useMemo(() => ({ accessToken, setAccessToken }), [accessToken]);
  useEffect(() => {
    const init_data = authInitData();
    setAccessToken(init_data);
  }, []);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

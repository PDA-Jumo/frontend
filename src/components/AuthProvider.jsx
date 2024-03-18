import React, { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

const AUTH_KEY = "AUTH_USER";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = sessionStorage.getItem(AUTH_KEY);
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const clientLogin = useCallback((user) => {
    setUser(user);
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }, []);
  const clientLogout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(AUTH_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        clientLogin,
        clientLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

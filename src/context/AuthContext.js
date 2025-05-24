import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (!email || !password) {
      alert('Por favor completa todos los campos');
      return false;
    }
    setUser({ email });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (email, password, confirmPassword) => {
    if (!email || !password || !confirmPassword) {
      alert('Completa todos los campos');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return false;
    }
    setUser({ email });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

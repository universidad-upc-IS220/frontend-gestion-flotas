import { createContext, useContext, useState, ReactNode } from 'react';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(null);
  return <AuthContext.Provider value={[token, setToken]}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

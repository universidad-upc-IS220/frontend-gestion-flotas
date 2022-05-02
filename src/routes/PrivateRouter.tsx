import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

export const PrivateRouter = ({ children }: { children: ReactNode }): any => {
  const { userData } = useContext(UserContext);
  return userData.logged ? children : <Navigate to="/" />;
};

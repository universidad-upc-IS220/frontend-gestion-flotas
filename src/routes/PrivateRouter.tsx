import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

export const PrivateRouter = ({ children }: { children: ReactNode }): any => {
  const { userData } = useContext(UserContext);
  // console.log('PrivateRouter: user Data', userData);
  // debugger;
  return userData.logged ? children : <Navigate to="/" />;
};

import { createContext, useEffect, useState } from 'react';
import { UserStateProps } from '../models';
import { eraseCookie } from '../utils/cookies';

// Higher order component: contains others components
export const UserContext = createContext({} as any);

interface Props {
  children: React.ReactNode;
}

const userInitialState = () => {
  return JSON.parse(localStorage.getItem('user') as string) || { logged: false };
};
// console.log('userInitialState >> ', userInitialState());

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState<UserStateProps>(userInitialState);

  const userLogin = (data: UserStateProps) => {
    // Save user data in local storage
    localStorage.setItem('user', JSON.stringify(data));
    // Save as state
    setUserData(data);
  };

  const userLogout = () => {
    eraseCookie('token');
    localStorage.removeItem('user');
    setUserData({ logged: false });
  };

  useEffect(() => {
    if (!userData) return;
    // console.log('-->', userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (!userData.logged) {
      eraseCookie('token');
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};

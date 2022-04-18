import { useReducer, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme';
import { AuthProvider } from './hooks/useAuth';
import { authReducer } from './auth/authReducer';
import { AuthContext } from './auth/authContext';
import AppRouter from './routes/AppRouter';

const init = () => {
  return JSON.parse(localStorage.getItem('user') as string) || { logged: false };
};

function App() {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        dispatch
      }}
    >
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <AppRouter />
        </ChakraProvider>
      </AuthProvider>
    </AuthContext.Provider>
  );
}

export default App;

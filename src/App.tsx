import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme';
import AppRouter from './routes/AppRouter';

// Contexts
import { UserProvider } from './contexts/userContext';

function App() {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <AppRouter />
      </ChakraProvider>
    </UserProvider>
  );
}

export default App;

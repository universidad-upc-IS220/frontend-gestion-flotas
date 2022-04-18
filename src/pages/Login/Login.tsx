import { types } from '../../types';
import { API_BASE_URL } from '../../constants/global';
import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Alert,
  Text,
  AlertDescription,
  CloseButton
} from '@chakra-ui/react';
import LOGIN_COVER from '../../assets/alert.jpg';
import ICON_OPEN_EYE from '../../assets/icon_open_eye.svg';
import ICON_CLOSE_EYE from '../../assets/icon_close_eye.svg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getToken, saveToken } from '../../utils/tokens';

import { useAuth } from '../../hooks';
import { AuthContext } from '../../auth/authContext';

interface IFormInput {
  user: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount, isValid }
  } = useForm<IFormInput>({
    mode: 'onChange'
  });
  const { dispatch } = useContext(AuthContext);

  const [token, setToken] = useAuth();
  const [saveSession, setSaveSession] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [errorRequest, setErrorRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [networkError, setNetworkError] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const onSubmit = async ({ user, password }: IFormInput) => {
    try {
      var raw = JSON.stringify({
        username: user,
        password: password
      });

      const response = await fetch(`${API_BASE_URL}/login`, {
        mode: 'cors',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: raw,
        redirect: 'follow'
      });
      const data = await response.json();

      // SUCCESS
      console.log('->', response.status, data);

      if (response.status === 201 && data.jwt !== '' && data.roles !== '') {
        console.log('save user data', data);
        const action = {
          type: types.login,
          payload: { name: data.name }
        };
        dispatch(action);

        setToken(data);

        // Guardar token
        if (saveSession) {
          console.log('saveSession >', data);
          saveToken(data.jwt);
        }

        navigate('/dashboard');
      }
      // ROLES
      else if (response.status === 200 && data.jwt !== '' && data.roles === '') {
        setErrorRequest(true);
        setErrorMessage('No tenés un rol asignado, comunicate con el equipo de roles y perfiles');
      }
      // WRONG CREDENTIALS
      else if (response.status === 500 && data.mensajeAlUsuario !== '') {
        setErrorRequest(true);
        setErrorMessage('Los datos ingresados son incorrectos');
      }
      // GENERAL ERROR
      else {
        setNetworkError(true);
      }
    } catch (error: any) {
      setNetworkError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <Grid bg="#FAFAFA" h="100vh" templateColumns="repeat(2, 1fr)">
      <Flex h="100%" alignItems="center" justifyContent="center">
        <Box
          bg="#FFFFFF"
          w="464px"
          minHeight="428px"
          borderRadius={8}
          padding="3rem"
          pos="relative"
        >
          <Heading as="h1" fontSize="24px" fontWeight={600} mb="5px">
            Te damos la bienvenida
          </Heading>
          <Text mb="2rem" color="#9B9B9B">
            Gestioná tasas fácil y rápido
          </Text>
          {networkError && (
            <Alert status="error" color="error" bg="red.50" mb="1rem" borderRadius={8}>
              <AlertDescription>
                Estamos presentando inconvenientes. Por favor, intentá más tarde
              </AlertDescription>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setNetworkError(false)}
              />
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <InputGroup mb="1rem">
              <Input
                borderRadius={8}
                border="1px solid #9B9B9B"
                w="100%"
                variant="outline"
                placeholder="Usuario"
                size="lg"
                isInvalid={errorRequest}
                errorBorderColor="error"
                _focus={{
                  borderColor: '#9B9B9B'
                }}
                {...register('user', { required: true, minLength: 3 })}
              />
            </InputGroup>

            <InputGroup mb="1rem">
              <Input
                type={passwordVisibility ? 'text' : 'password'}
                borderRadius={8}
                border="1px solid #9B9B9B"
                w="100%"
                variant="outline"
                placeholder="Clave"
                size="lg"
                isInvalid={errorRequest}
                errorBorderColor="error"
                {...register('password', { required: true, minLength: 3 })}
              />
              <InputRightElement
                w="24px"
                alignItems="center"
                justifyContent="flex-end"
                right="1rem"
                h="100%"
                children={
                  <Image
                    w="24px"
                    h="24px"
                    src={passwordVisibility ? ICON_OPEN_EYE : ICON_CLOSE_EYE}
                    cursor="pointer"
                    alt=""
                    onClick={() => handlePasswordVisibility()}
                  />
                }
              />
            </InputGroup>

            {errorRequest ? (
              <Text color="error" fontWeight={400} fontSize="1rem" mb="1rem">
                {errorMessage}
              </Text>
            ) : null}

            <Checkbox
              colorScheme="brand"
              defaultChecked
              isChecked={saveSession}
              fontSize="1rem"
              color="#9B9B9B"
              mb="1rem"
              onChange={() => {
                console.log('click');

                setSaveSession(!saveSession);
              }}
            >
              Recordar mi inicio de sesión en este equipo
            </Checkbox>

            <Button
              bg="#28cc9e"
              color="white"
              fontWeight={500}
              fontSize="1rem"
              isLoading={isSubmitting}
              isDisabled={!isValid}
              type="submit"
              w="100%"
              size="lg"
              mt="1rem"
              _disabled={{
                color: '#FFF',
                bg: '#DEDEDE'
              }}
              _hover={{}}
            >
              Iniciar sesión
            </Button>
          </form>
        </Box>
      </Flex>
      <Box>
        <Image src={LOGIN_COVER} alt="Gestión de Flotas" objectFit="cover" h="100vh" w="100%" />
      </Box>
    </Grid>
  );
};

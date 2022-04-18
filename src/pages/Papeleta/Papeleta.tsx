import { DashboardLayout } from '../../components/Layout';
import { Alert, AlertIcon, Box, Divider, Progress } from '@chakra-ui/react';

// Own components
import { PapeletaForm } from './components/PapeletaForm';
import { useState } from 'react';
import { PapeletaInfo } from './components/PapeletaInfo';

export const Papeleta = () => {
  const [userInfo, setUserInfo] = useState<any[]>([]);
  const [requestInit, setRequestInit] = useState<boolean>(false);
  const [requestCompleted, setRequestCompleted] = useState<boolean>(false);

  const submitHandler = (data: any[]) => {
    setUserInfo(data);
    setRequestInit(false);
    setRequestCompleted(true);
  };

  const updateRequestStatus = (status: boolean) => {
    setRequestCompleted(status);
  };

  return (
    <DashboardLayout title={'Consultar papeleta'}>
      <Box>
        <PapeletaForm
          submitHandler={submitHandler}
          updateRequestStatus={updateRequestStatus}
          requestInitHandler={() => {
            setRequestInit(true);
          }}
        />
        <Divider marginY="20px" />
        {requestCompleted === false && requestInit === true && (
          <Progress size="xs" isIndeterminate colorScheme="cyan" />
        )}
        {userInfo.length > 0 && requestCompleted && <PapeletaInfo data={userInfo} />}
        {userInfo.length === 0 && requestCompleted && (
          <Alert status="info">
            <AlertIcon />
            No se encontraron papeletas.
          </Alert>
        )}
      </Box>
    </DashboardLayout>
  );
};

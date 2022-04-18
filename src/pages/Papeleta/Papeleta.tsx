import { DashboardLayout } from '../../components/Layout';
import { Box, Divider } from '@chakra-ui/react';

// Own components
import { PapeletaForm } from './components/PapeletaForm';
import { useState } from 'react';
import { PapeletaInfo } from './components/PapeletaInfo';

export const Papeleta = () => {
  const [userInfo, setUserInfo] = useState<any[]>([]);
  const [requestCompleted, setRequestCompleted] = useState<boolean>(false);

  const submitHandler = (data: any[]) => {
    setUserInfo(data);
    setRequestCompleted(true);
  };

  const updateRequestStatus = (status: boolean) => {
    setRequestCompleted(status);
  };

  return (
    <DashboardLayout title={'Consultar papeleta'}>
      <Box>
        <PapeletaForm submitHandler={submitHandler} updateRequestStatus={updateRequestStatus} />
        <Divider marginY="20px" />
        {userInfo.length > 0 && requestCompleted && <PapeletaInfo data={userInfo} />}
        {userInfo.length === 0 && requestCompleted && <Box>No hubo resultados</Box>}
      </Box>
    </DashboardLayout>
  );
};

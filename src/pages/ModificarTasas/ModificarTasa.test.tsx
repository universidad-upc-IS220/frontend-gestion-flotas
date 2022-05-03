import { Heading, Box, Grid, Button, Flex, Text, useDisclosure, Tag } from '@chakra-ui/react';
import { DashboardLayout } from '../../components/Layout/index';
import { useEffect, useState, useContext } from 'react';
import { NavigationTabs } from './components/NavigationTabs';
// import { useTasasData } from '../../hooks/useTasasData';
import { BAUDisplayTable } from '../../components/BAUDisplayTable/BAUDisplayTable';
import { BAUEditingTable } from '../../components/BAUEditingTable';
import { Filters } from './components/Filters';
import { BsChevronRight } from 'react-icons/bs';
import { FooterButtons } from './components/FooterButtons';
import { useSearchParams } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/global';

// Global components
import { ModalMessageGlobal } from '../../components/ModalMessage';

//  Models
import { SegmentoProps, SolicitudToSendProps } from '../../models';

// Utils
import { getSegmentIdsToRemove, getDraftSegment } from './utils';
import { useFetch } from '../../hooks/useFetch';

// Contexts
import { ModificarTasaContext } from './contexts/ModificarTasaContext';
import { ModificarTasaProvider } from './contexts/ModificarTasaProvider';
import { Skeleton } from '../../components/Skeleton';
type Props = {};

export const ModificarTasaPage: React.FC<Props> = ({}) => {
  console.log('PERFORMANCE re-render ModificarTasaPage');
  const {} = useContext(ModificarTasaContext);
  const list = [1, 2, 3];
  return (
    <>
      {list.map((item, index) => {
        console.log('list');
      })}
      <ModificarTasaProvider>
        <div>Hola</div>
      </ModificarTasaProvider>
    </>
  );
};

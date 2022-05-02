import { Tag } from '@chakra-ui/react';
import { ModificarTasaContext } from '../contexts/ModificarTasaContext';
import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const DraftTag = () => {
  const { modificarTasaState, updateDraftInfo } = useContext(ModificarTasaContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('solicitud_id') || '';

  useEffect(() => {
    if (searchTerm !== '') {
      updateDraftInfo(true, parseFloat(searchTerm));
    }
  }, [searchTerm]);

  return (
    <>
      {modificarTasaState.isDraftDocument ? (
        <Tag
          position="absolute"
          marginTop={'-66px'}
          marginLeft="325px"
          border={'1px solid #C8C7C7'}
          bg="#F2F1F1"
          color="#606162"
          paddingTop="3px"
        >
          Borrador
        </Tag>
      ) : null}
    </>
  );
};

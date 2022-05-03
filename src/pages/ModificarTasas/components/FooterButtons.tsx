import { Box, Button, useDisclosure, useToast, Icon, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { API_BASE_URL } from '../../../constants/global';
import { getCookie } from '../../../utils/cookies';
import { ModificarTasaContext } from '../contexts/ModificarTasaContext';
import { ModalMessageGlobal } from '../../../components/ModalMessage';
import { CustomToast } from './CustomToast';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

type Props = {
  draftSavedHandler: () => void;
};
export const FooterButtons: React.FC<Props> = ({ draftSavedHandler }) => {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { modificarTasaState, updateDraftInfo, updateAreChanges, updateLiveData } =
    useContext(ModificarTasaContext);

  const { doFetch } = useFetch(null);
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDesestimar, setLoadingDesestimar] = useState(false);

  const [modalText, setModalText] = useState({ title: '', description: '', confirmText: '' });
  const navigate = useNavigate();

  const thereAreChanges = modificarTasaState.liveData.areChanges;
  const { isDraftDocument, draftDocumentId } = modificarTasaState;

  const draftHandler = async () => {
    if (!thereAreChanges) return;
    setLoadingDraft(true);

    const token = getCookie('token') || '';

    // Obtiene los datos de session storage
    const liveData = sessionStorage.getItem('liveData') || '{"segmentos":[]}';
    const { segmentos } = JSON.parse(liveData);

    console.log('liveData from session storage', segmentos);

    const url = isDraftDocument
      ? `${API_BASE_URL}/v1/solicitudes/${draftDocumentId}`
      : `${API_BASE_URL}/v1/solicitudes`;

    const method = isDraftDocument ? 'PATCH' : 'POST';
    console.log('URL', url, 'method', method);

    const draftRequest = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        segmentos
      })
    });
    const draftResponse = await draftRequest.json();

    if (draftResponse.solicitudId) {
      console.log('Borrar desde liveData');

      sessionStorage.removeItem('liveData');
      toast({
        position: 'bottom-right',
        isClosable: true,
        duration: 1500,
        render: () => (
          <CustomToast
            closeHandler={() => {
              toast.closeAll();
            }}
          />
        )
      });

      updateAreChanges(false);
      setTimeout(() => {
        // updateDraftInfo(true, draftResponse.solicitudId);
        // setSearchParams({ solicitud_id: draftResponse.solicitudId.toString() });
        searchParams.set('solicitud_id', draftResponse.solicitudId.toString());
        setSearchParams(searchParams);
        draftSavedHandler();
        /* navigate({
          pathname: '/modificar-tasas',
          search: createSearchParams({
            solicitud_id: draftResponse.solicitudId.toString()
          }).toString()
        }); */
      }, 1000);
    } else {
      console.log('No se pudo realizar la operación');
    }

    setLoadingDraft(false);
  };

  const createHandler = async () => {
    const { segmentos } = modificarTasaState.liveData;
    if (!segmentos.length) return;
    setLoadingCreate(true);

    const token = getCookie('token') || '';
    const createRequest = await fetch(`${API_BASE_URL}/v1/solicitudes/enviar`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        segmentos
      })
    });
    const createResponse = await createRequest.json();
    if (createResponse.solicitudId && !createResponse.errors.length) {
      updateAreChanges(false);
      // updateLiveData({ segmentos: [] });
      sessionStorage.removeItem('liveData');
      console.log('enviado', createResponse);
      navigate('/dashboard');
    } else {
      console.log('Hubo un error al tratar de crear la solicitud');
    }
    setLoadingCreate(false);
  };

  const confirmModal = async () => {
    if (isDraftDocument) {
      console.log('data total', modificarTasaState);

      setLoadingDesestimar(true);
      const res = await doFetch(`${API_BASE_URL}/v1/solicitudes/${draftDocumentId}/desestimar`, {
        method: 'PATCH'
      });
      if (res?.solicitudId) {
        console.log('desestimado corrrectamente');
      }
      setLoadingDesestimar(false);
    } else {
      console.log('Cancelar');
    }
    setTimeout(() => {
      onClose();
      navigate('/tasas');
    }, 500);
  };

  return (
    <>
      <Box
        position="fixed"
        left="0"
        bottom={0}
        h="64px"
        backgroundColor="#FFF"
        w="100%"
        boxShadow="0px -2px 10px rgba(0, 0, 0, 0.1);"
        padding="0 32px"
      >
        <Box display="flex" justifyContent="right" alignItems={'center'} h="100%">
          <Button
            isLoading={loadingDesestimar}
            disabled={loadingDraft || loadingCreate}
            onClick={() => {
              const info = {
                title: '',
                description: '',
                confirmText: ''
              };

              if (isDraftDocument) {
                info.title = '¿Querés desestimar la solicitud?';
                info.description = 'Perderás todo el progreso que hayas realizado hasta el momento';
                info.confirmText = 'Sí, desestimar';
              } else {
                info.title = '¿Querés cancelar la solicitud?';
                info.description = 'Perderás todo el progreso que hayas realizado hasta el momento';
                info.confirmText = 'Sí, cancelar';
              }

              setModalText({
                title: info.title,
                description: info.description,
                confirmText: info.confirmText
              });

              const { segmentos: segmentosData } = JSON.parse(
                sessionStorage.getItem('liveData') || '{"segmentos":[]}'
              );
              if (isDraftDocument) {
                onOpen();
              } else if (!isDraftDocument && segmentosData.length) {
                onOpen();
              } else if (!isDraftDocument && !segmentosData.length) {
                navigate('/tasas');
              }
            }}
            color="teal"
            size="md"
            marginRight="auto"
            bg="#FFF"
            w="184px"
            h="48px"
            _hover={{
              bg: 'orange.100',
              border: '1px solid orange'
            }}
            _active={{
              bg: 'orange.100',
              boxShadow: 'none'
            }}
            _focus={{
              boxShadow: 'none'
            }}
            _disabled={{
              cursor: 'not-allowed'
            }}
          >
            {isDraftDocument ? 'Desestimar solicitud' : 'Cancelar'}
          </Button>
          <Button
            isLoading={loadingDraft}
            onClick={() => {
              draftHandler();
            }}
            marginRight="16px"
            disabled={!thereAreChanges || loadingDraft || loadingCreate}
            bg="#FFF"
            w="100px"
            h="48px"
            fontWeight={'normal'}
            border="1px solid teal"
            color="teal"
            _active={{
              bg: 'rgba(254, 149, 82, 0.08)'
            }}
            _focus={{
              boxShadow: 'none'
            }}
            _hover={{
              bg: 'rgba(254, 149, 82, 0.08)',
              _disabled: {
                cursor: 'not-allowed',
                bg: '#FFF',
                color: '#9B9B9B'
              }
            }}
            _disabled={{
              border: '1px solid #9B9B9B',
              bg: '#FFF',
              color: '#9B9B9B'
            }}
          >
            Guardar
          </Button>
          <Button
            isLoading={loadingCreate}
            disabled={
              (!thereAreChanges && !modificarTasaState.liveData.segmentos.length) ||
              loadingCreate ||
              loadingDraft
            }
            color="#FFF"
            bg="teal"
            w="276px"
            h="48px"
            fontWeight={'normal'}
            _hover={{
              _disabled: {
                cursor: 'not-allowed',
                bg: '#9B9B9B',
                color: '#FFF'
              }
            }}
            _disabled={{
              bg: '#9B9B9B',
              color: '#FFF'
            }}
            onClick={() => createHandler()}
          >
            Enviar solicitud de modificación
          </Button>
        </Box>
      </Box>
      <ModalMessageGlobal
        isOpen={isOpen}
        onClose={onClose}
        confirm={() => confirmModal()}
        title={modalText.title}
        description={modalText.description}
        confirmText={modalText.confirmText}
      />
    </>
  );
};

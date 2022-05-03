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
import _, { merge } from 'lodash';

// Global components
import { ModalMessageGlobal } from '../../components/ModalMessage';

//  Models
import { SegmentoProps, SolicitudToSendProps } from '../../models';

// Utils
import { getSegmentIdsToRemove, getDraftSegment, mergeDeep, addModifiedKey } from './utils';
import { useFetch } from '../../hooks/useFetch';

// Contexts

import { Skeleton } from '../../components/Skeleton';
import { DraftTag } from './components/DraftTag';
type Props = {};

export const ModificarTasaPage: React.FC<Props> = ({}) => {
  console.log('PERFORMANCE re-render ModificarTasaPage');

  //Get pararms from navigate
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('solicitud_id') || '';

  const { response: responseTasas, loading: loadingTasas } = useFetch(
    `${API_BASE_URL}/v1/tasas/bau`
  );
  // console.log('responseTasas', responseTasas);

  /* const { modificarTasaState, updateLiveData, saveEditableData, updateAreChanges } =
    useContext(ModificarTasaContext); */
  // console.log('----->', modificarTasaState);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bodyData, setBodyData] = useState<{ segmentos: SegmentoProps[] }>({
    segmentos: []
  });

  const [productionData, setProductionData] = useState<SegmentoProps[]>([]);
  const [editingData, setEditingData] = useState<SegmentoProps[]>([]);

  const [existChanges, setExistChanges] = useState<boolean>(false);
  const [temporalFilter, setTemporalFilter] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [confirmDraftSaved, setConfirmDraftSaved] = useState(false);

  const [modalInfo, setModalInfo] = useState({
    title: '',
    description: ''
  });

  /**
   * Cada vez que se edita un valor en la tabla
   * @param anyChanges
   * @param dataToSave
   */
  const handleChangesFromEditing = (
    anyChanges: boolean,
    dataToSave: SolicitudToSendProps
  ): void => {
    console.log('to save >', dataToSave, selectedOptions);
    const acceptedOptions: number[] = selectedOptions.map((_item: any) => _item.value);

    const validatedData: SegmentoProps[] = dataToSave.segmentos.filter((_item: any) =>
      acceptedOptions.includes(_item.segmentoId)
    );

    const newData = {
      segmentos: validatedData
    };

    // TODO: eliminar el bodyData local
    console.log('guardar ', newData);
    // updateAreChanges(true);
    // updateLiveData(newData);
    setBodyData(newData);
    setExistChanges(anyChanges);
  };

  /**
   * Cada vez que se cambia un filtro o se cierra el modal de confirmación
   */
  const updateTasasDataAndFilters = (_selectedOptions: any) => {
    console.log('PERFORMANCE updateTasasDataAndFilters');
    const selectedOptionsByFilter = _selectedOptions.map((item: any) => item.value);
    const selectedTasasData = responseTasas.filter(
      (tasa: SegmentoProps) => selectedOptionsByFilter.indexOf(tasa.segmentoId) > -1
    );

    // Delete segment from bodyData if user confirm delete from filter
    const segmentIdsToRemove = getSegmentIdsToRemove(_selectedOptions, responseTasas);
    const segmentosFiltered = bodyData.segmentos.filter(
      (segment: SegmentoProps) => segmentIdsToRemove.indexOf(segment.segmentoId) === -1
    );
    const newBodyData = {
      segmentos: segmentosFiltered
    };
    console.log('to save new->', newBodyData);
    const anyChanges = !!newBodyData.segmentos.length;
    setExistChanges(anyChanges);

    // TODO: eliminar el body data local
    setBodyData(newBodyData);

    setSelectedOptions(_selectedOptions);
    setProductionData(selectedTasasData);
  };

  const handleChangesFromFilters = (_selectedOptions: any) => {
    const segmentIdsToRemove = getSegmentIdsToRemove(_selectedOptions, responseTasas);

    // Validate if options were removed have conflicts with body data
    const changesInProgress = bodyData.segmentos.filter(
      (_segmento: SegmentoProps) => segmentIdsToRemove.indexOf(_segmento.segmentoId) > -1
    );

    // Find coincidences in data to save
    if (existChanges && changesInProgress.length) {
      setModalInfo({
        title: '¿Querés elminar este segmento?',
        description: 'Perderás todos los cambios que hayas realizado en dicho segmento'
      });
      onOpen();
      setTemporalFilter(_selectedOptions);
    } else {
      // Refresh tables and filters without validations
      updateTasasDataAndFilters(_selectedOptions);
    }
  };

  const draftSavedHandler = () => {
    setConfirmDraftSaved(true);
  };
  useEffect(() => {
    if (confirmDraftSaved === true) {
      console.log('EDITAR TASA >', confirmDraftSaved);

      const getSolicitudBorrador = async () => {
        const response = await fetch(`${API_BASE_URL}/v1/solicitudes/${searchTerm}`);
        const drafData = await response.json();
        const drafDataParsed = addModifiedKey(drafData.segmentos);

        const productionData = [...responseTasas];
        const mergedData = _.merge([], productionData, drafDataParsed);

        setEditingData(mergedData);
        setProductionData(responseTasas);
        setConfirmDraftSaved(false);
      };
      getSolicitudBorrador();
    }
  }, [confirmDraftSaved]);

  useEffect(() => {
    if (responseTasas?.length && searchTerm !== '') {
      console.log('GATILLAR');
      setConfirmDraftSaved(true);
    }
  }, [responseTasas, searchTerm]);

  useEffect(() => {
    sessionStorage.removeItem('liveData');

    // Data necesaria
    if (responseTasas?.length && searchTerm === '') {
      console.log('CREAR TASA PRIMERA VEZ', responseTasas);

      setEditingData(responseTasas);
      setProductionData(responseTasas);

      const initialOptions: any = responseTasas.map((tasa: SegmentoProps) => ({
        label: tasa.segmentoNombre,
        value: tasa.segmentoId
      }));

      setSelectedOptions(initialOptions);
      setOptions(initialOptions);
    }
  }, [responseTasas]);

  return (
    <DashboardLayout title={'Solicitud de modificación'} fullWidth={true} backToPage={'/tasas'}>
      <DraftTag />
      <ModalMessageGlobal
        isOpen={isOpen}
        onClose={onClose}
        confirm={() => {
          onClose();
          updateTasasDataAndFilters(temporalFilter);
        }}
        title={modalInfo.title}
        description={modalInfo.description}
      />
      <NavigationTabs />
      <Box>
        <Flex alignItems={'center'} mb="20px" mt="-15px">
          <Text marginRight="auto" fontSize="18px" color="#9B9B9B">
            Modificacipon de tasas
          </Text>
          <Button
            h="48px"
            rightIcon={<BsChevronRight />}
            color="teal"
            bg="transparent"
            variant="unstyled"
            w="184px"
            _hover={{
              backgroundColor: 'orange.100'
            }}
          >
            Tasas objetivo
          </Button>
        </Flex>
        <Flex alignItems={'center'} mb="24px">
          <Filters
            options={options}
            selectedOptions={selectedOptions}
            filterChangesHandler={handleChangesFromFilters}
          />
        </Flex>
        <Grid templateColumns="repeat(2, 1fr)" gap="0 16px">
          <Box>
            {productionData?.length > 0 ? (
              productionData.map((tasa: SegmentoProps, index) => {
                console.log('PERFORMANCE Re-Remder MosificarTasaPage Column 1');
                return (
                  <Box mb="40px" key={tasa.segmentoId}>
                    <Heading
                      as={'h2'}
                      size="sm"
                      color="#606162"
                      fontSize="16px"
                      mb="16px"
                      fontWeight={500}
                    >
                      {tasa.segmentoNombre}
                    </Heading>
                    <BAUDisplayTable tasa={tasa} />
                  </Box>
                );
              })
            ) : (
              <Skeleton />
            )}
          </Box>
          <Box>
            {editingData?.length > 0 ? (
              editingData.map((tasa: SegmentoProps, index) => {
                console.log('PERFORMANCE Re-Remder MosificarTasaPage Column 2');
                return (
                  <Box key={tasa.segmentoId} mb="40px">
                    <Heading
                      as={'h2'}
                      size="sm"
                      color="#606162"
                      fontSize="16px"
                      mb="16px"
                      fontWeight={500}
                    >
                      {tasa.segmentoNombre}
                    </Heading>
                    <BAUEditingTable tasa={tasa} />
                  </Box>
                );
              })
            ) : (
              <Skeleton />
            )}
          </Box>
        </Grid>
        {/* {loadingTasas && <Skeleton />} */}
      </Box>
      <FooterButtons draftSavedHandler={draftSavedHandler} />
    </DashboardLayout>
  );
};

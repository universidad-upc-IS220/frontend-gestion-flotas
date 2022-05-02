import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  FormLabel,
  Input,
  Box,
  Stack,
  DrawerHeader,
  DrawerOverlay,
  DrawerFooter,
  FormControl,
  Switch,
  Icon,
  Flex,
  Alert,
  Image
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CHOFER_ICON from '../../../../assets/chofer_icon.png';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { useFetch } from '../../../../hooks/useFetch';
import { PapeletasTable } from '../PapeletasTable';
import { Skeleton } from '../../../../components/Skeleton/Skeleton';
import { ChoferProps } from '../../../../models';
import { BiHappy } from 'react-icons/bi';
import { API_BASE_URL } from '../../../../constants/global';
import { useNavigate } from 'react-router-dom';
type Props = {
  choferDetails: ChoferProps;
  firstField: any;
  isOpen: any;
  onClose: any;
};

export const DrawerDetailComponent: React.FC<Props> = ({
  choferDetails,
  firstField,
  isOpen,
  onClose
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount, isValid }
  } = useForm<any>({
    mode: 'onChange'
  });
  let navigate = useNavigate();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [canDisableUser, setCanDisableUser] = useState<boolean>(false);
  const [papeletaLoading, setPapeletaLoading] = useState(false);
  const [papeletasData, setPapeletasData] = useState([]);
  const [initPapeletaValidation, setInitPapeletaValidation] = useState(false);
  const { doFetch } = useFetch(null);

  const onSubmit = async (data: any) => {
    setUpdateLoading(true);
    const { estado } = data;

    if (estado === undefined) delete data['estado'];
    const requestBody = {
      data: { ...data }
    };
    console.log('data', requestBody);

    try {
      const res = await doFetch(`${API_BASE_URL}/api/choferes/${data.id}`, {
        method: 'PUT',
        body: requestBody
      });
      console.log('response', res);
      if (res.data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
    setUpdateLoading(false);
  };

  const buscarPapeletas = async (documento: string) => {
    setPapeletaLoading(true);
    try {
      const papeletaRes = await doFetch(
        `https://rest-api-papeletas-peru.herokuapp.com/papeletas/${documento}`
      );
      console.log('papeletas', papeletaRes);
      if (papeletaRes.data.length) {
        setPapeletasData(papeletaRes.data);
      }
      setCanDisableUser(true);

      setInitPapeletaValidation(true);
    } catch (error) {
      setInitPapeletaValidation(false);
    }
    setPapeletaLoading(false);
  };
  console.log('veamos', papeletaLoading, papeletasData.length);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
      size={'lg'}
    >
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" color="gray.600">
            <Flex alignItems={'center'}>
              <Image src={CHOFER_ICON} w="36px" h="36px" mr="10px" />
              {choferDetails.nombres} {choferDetails.apellidos}
            </Flex>
          </DrawerHeader>

          <DrawerBody color="gray.600">
            <Stack spacing="24px">
              <Box display="flex">
                <Input
                  id="id"
                  defaultValue={choferDetails.id}
                  type="hidden"
                  {...register('id', { required: true })}
                />
                <FormLabel minWidth={'155'} htmlFor="nombres">
                  Nombres
                </FormLabel>
                <Input
                  size="sm"
                  id="nombres"
                  defaultValue={choferDetails.nombres}
                  {...register('nombres', { required: true, minLength: 3 })}
                />
              </Box>
              <Box display="flex">
                <FormLabel minWidth={'155'} htmlFor="apellidos">
                  Apellidos
                </FormLabel>
                <Input
                  size="sm"
                  id="apellidos"
                  defaultValue={choferDetails.apellidos}
                  {...register('apellidos', { minLength: 3 })}
                />
              </Box>
              <Box display="flex">
                <FormLabel minWidth={'155'} htmlFor="nro_documento">
                  N° Documento
                </FormLabel>
                <Input
                  size="sm"
                  id="nro_documento"
                  defaultValue={choferDetails.nro_documento}
                  type="tel"
                  {...register('nro_documento', { minLength: 8, maxLength: 8 })}
                />
              </Box>
              <Box display="flex">
                <FormLabel minWidth={'155'} htmlFor="fecha_nacimiento">
                  Fecha de nacimiento
                </FormLabel>
                <Input
                  size="sm"
                  id="fecha_nacimiento"
                  type="date"
                  defaultValue={choferDetails.fecha_nacimiento}
                  {...register('fecha_nacimiento')}
                />
              </Box>

              <Box display="flex">
                <FormLabel minWidth={'155'} htmlFor="nro_telefono">
                  N° Teléfono
                </FormLabel>
                <Input
                  size="sm"
                  id="nro_telefono"
                  defaultValue={choferDetails.telefono}
                  type="tel"
                  {...register('nro_telefono', { minLength: 9, maxLength: 12 })}
                />
              </Box>

              <Box display="flex">
                <FormLabel minWidth={'155'} htmlFor="email">
                  Email
                </FormLabel>
                <Input
                  size="sm"
                  id="email"
                  defaultValue={choferDetails.email}
                  type="email"
                  {...register('email')}
                />
              </Box>
              <Box display="flex">
                <FormControl display="flex" alignItems="center">
                  <FormLabel minW="155px" htmlFor="estado" mb="0">
                    Estado:
                  </FormLabel>
                  <Controller
                    name="estado"
                    control={control}
                    render={({ field: { onChange, onBlur, value, name, ref } }) => (
                      <Switch
                        onChange={onChange}
                        checked={value}
                        ref={ref}
                        defaultChecked={choferDetails.estado}
                        size="lg"
                        isDisabled={!canDisableUser || papeletasData.length === 0}
                      />
                    )}
                  />

                  <Button
                    isLoading={papeletaLoading}
                    size={'sm'}
                    bg="teal.400"
                    color="white"
                    fontWeight={'normal'}
                    leftIcon={<Icon as={HiOutlineDocumentSearch} />}
                    marginLeft="10px"
                    _hover={{
                      bg: 'teal.600'
                    }}
                    onClick={() => buscarPapeletas(choferDetails.nro_documento)}
                  >
                    Consultar papeletas
                  </Button>
                </FormControl>
              </Box>
            </Stack>
            {!papeletaLoading && initPapeletaValidation === true && papeletasData.length === 0 && (
              <Alert
                mt="20px"
                borderRadius="8px"
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="150px"
              >
                <Icon
                  as={BiHappy}
                  color={'green.600'}
                  w={12}
                  h={12}
                  mr="10px"
                  bg="white"
                  borderRadius="100%"
                />
                <Box mt="10px">¡No existen papeletas pendientes!</Box>
              </Alert>
            )}
            {!papeletaLoading && papeletasData.length > 0 && (
              <Box mt="20px" borderRadius="8px" border="1px solid #e2e8f0">
                <PapeletasTable data={papeletasData} />
              </Box>
            )}
            {papeletaLoading && (
              <Box mt="20px">
                <Skeleton />
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              disabled={updateLoading}
              variant="outline"
              mr={3}
              onClick={onClose}
              fontWeight={'500'}
            >
              Cancelar
            </Button>
            <Button isLoading={updateLoading} colorScheme="teal" fontWeight={'500'} type="submit">
              Guardar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

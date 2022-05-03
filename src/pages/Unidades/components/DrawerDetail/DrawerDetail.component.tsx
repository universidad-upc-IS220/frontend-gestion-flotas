import {
  useToast,
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
  Flex,
  Image
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CHOFER_ICON from '../../../../assets/chofer_icon.png';
import { useFetch } from '../../../../hooks/useFetch';
import { UnidadProps } from '../../../../models';
import { API_BASE_URL } from '../../../../constants/global';

type Props = {
  choferDetails: UnidadProps;
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
  const toast = useToast({
    position: 'bottom-right',
    duration: 1500,
    isClosable: true,
    containerStyle: {
      marginBottom: '90px'
    }
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount, isValid }
  } = useForm<any>({
    mode: 'onChange'
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const { doFetch } = useFetch(null);

  const onSubmit = async (data: any) => {
    setUpdateLoading(true);
    const { estado } = data;

    if (estado === undefined) delete data['estado'];
    try {
      const res = await doFetch(`${API_BASE_URL}/api/unidades/${data.id}`, {
        method: 'PUT',
        body: { data: { ...data } }
      });
      console.log('response =>', res);

      if (res.data) {
        toast({
          title: '¡Éxito!',
          description: 'Se realizaron los cambios correctamente.',
          status: 'success'
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
    setUpdateLoading(false);
  };

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
              {choferDetails.nro_serie}
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
                <FormLabel minWidth={'155'} htmlFor="marca">
                  Marca
                </FormLabel>
                <Input
                  size="sm"
                  id="marca"
                  defaultValue={choferDetails.marca}
                  {...register('marca', { required: true, minLength: 3 })}
                />
              </Box>
              <Box display="flex">
                <FormLabel minWidth={'155'} htmlFor="modelo">
                  Modelo
                </FormLabel>
                <Input
                  size="sm"
                  id="modelo"
                  defaultValue={choferDetails.modelo}
                  {...register('modelo', { minLength: 3 })}
                />
              </Box>
              <Box display="flex">
                <FormLabel minWidth={'155'} htmlFor="color">
                  Color
                </FormLabel>
                <Input
                  size="sm"
                  id="color"
                  defaultValue={choferDetails.color}
                  type="tel"
                  {...register('color', { minLength: 4 })}
                />
              </Box>
              <Box display="flex">
                <FormLabel minWidth={'155'} htmlFor="kilometraje">
                  Kilometraje
                </FormLabel>
                <Input
                  size="sm"
                  id="kilometraje"
                  type="tel"
                  defaultValue={choferDetails.kilometraje}
                  {...register('kilometraje')}
                />
              </Box>

              <Box display="flex">
                <FormLabel minWidth={'155'} htmlFor="nro_serie">
                  N° Serie
                </FormLabel>
                <Input
                  size="sm"
                  id="nro_serie"
                  defaultValue={choferDetails.nro_serie}
                  type="tel"
                  {...register('nro_serie', { minLength: 9 })}
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
                      />
                    )}
                  />
                </FormControl>
              </Box>
            </Stack>
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

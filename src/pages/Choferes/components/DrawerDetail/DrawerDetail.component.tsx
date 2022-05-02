import {
  Select,
  useDisclosure,
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
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  DrawerFooter,
  FormControl,
  Switch,
  Icon,
  Flex,
  Alert,
  Image
} from '@chakra-ui/react';
import { useState } from 'react';
import CHOFER_ICON from '../../../../assets/chofer_icon.png';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { useFetch } from '../../../../hooks/useFetch';
import { PapeletasTable } from '../PapeletasTable';
import { Skeleton } from '../../../../components/Skeleton/Skeleton';
import { ChoferProps } from '../../../../models';
import { GrUserSettings } from 'react-icons/gr';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { BiHappy } from 'react-icons/bi';
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
  const [canDisableUser, setCanDisableUser] = useState<boolean>(false);
  const [papeletaLoading, setPapeletaLoading] = useState(false);
  const [papeletasData, setPapeletasData] = useState([]);
  const { doFetch } = useFetch(null);

  const buscarPapeletas = async (documento: string) => {
    setPapeletaLoading(true);

    try {
      const papeletaRes = await doFetch(
        `https://rest-api-papeletas-peru.herokuapp.com/papeletas/${documento}`
      );
      console.log(papeletaRes);
      if (papeletaRes.data.length) {
        setPapeletasData(papeletaRes.data);
        setCanDisableUser(true);
      }
    } catch (error) {}
    setPapeletaLoading(false);
  };
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
      size={'lg'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px" color="gray.600">
          <Flex alignItems={'center'}>
            <Image src={CHOFER_ICON} w="40px" h="40px" mr="10px" />
            {choferDetails.nombres} {choferDetails.apellidos}
          </Flex>
        </DrawerHeader>

        <DrawerBody color="gray.600">
          <Stack spacing="24px">
            <Box display="flex">
              <FormLabel minWidth={'155'} htmlFor="username">
                Nombres
              </FormLabel>
              <Input
                size="sm"
                ref={firstField}
                id="username"
                defaultValue={choferDetails.nombres}
              />
            </Box>
            <Box display="flex">
              <FormLabel minWidth={'155'} htmlFor="username">
                Apellidos
              </FormLabel>
              <Input size="sm" id="username" defaultValue={choferDetails.apellidos} />
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
              />
            </Box>

            <Box display="flex">
              <FormLabel minWidth={'155'} htmlFor="nro_telefono">
                N° Teléfono
              </FormLabel>
              <Input size="sm" id="nro_telefono" defaultValue={choferDetails.telefono} type="tel" />
            </Box>

            <Box display="flex">
              <FormLabel minWidth={'155'} htmlFor="email">
                Email
              </FormLabel>
              <Input size="sm" id="email" defaultValue={choferDetails.email} type="email" />
            </Box>
            <Box display="flex">
              <FormControl display="flex" alignItems="center">
                <FormLabel minW="155px" htmlFor="email-alerts" mb="0">
                  Estado:
                </FormLabel>
                <Switch
                  defaultChecked={true}
                  id="email-alerts"
                  size="lg"
                  isDisabled={!canDisableUser}
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
          {!papeletaLoading && papeletasData.length > 0 ? (
            <Box mt="20px" borderRadius="8px" border="1px solid #e2e8f0">
              <PapeletasTable data={papeletasData} />
            </Box>
          ) : (
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
          {papeletaLoading && (
            <Box mt="20px">
              <Skeleton />
            </Box>
          )}
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue">Guardar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

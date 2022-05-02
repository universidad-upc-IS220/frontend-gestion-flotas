import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  ModalFooter,
  Text,
  Image
} from '@chakra-ui/react';

import MODAL_ALERT from '../../assets/modal_alert.svg';
interface ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  confirm: () => void;
}

export const ModalAlert: React.FC<ComponentProps> = ({ isOpen, onClose, confirm }) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width="560px" maxWidth="100%">
        <ModalHeader paddingBottom={'0'} paddingTop="26px">
          <Image margin="0 auto" src={MODAL_ALERT} alt="¿Querés eliminar este segmento?" />
        </ModalHeader>
        <ModalBody pb={6}>
          <Text textAlign={'center'} fontWeight="500" fontSize="24px" color="#4A4A4A" mb="16px">
            No podés realizar esta operación
          </Text>
          <Text
            fontSize="16px"
            color="#808181"
            maxWidth="320px"
            margin="0 auto"
            textAlign={'center'}
          >
            Mientras exista una solicitud en estado Borrador o Pendiente de aprobación no podés
            realizar otra solicitud de modificación
          </Text>
        </ModalBody>

        <ModalFooter paddingBottom="36px">
          <Button
            onClick={onClose}
            variant="unstyled"
            fontSize="16px"
            h="48px"
            color="teal"
            fontWeight={'normal'}
            w="136px"
            mr="16px"
            _focus={{
              boxShadow: 'none'
            }}
          >
            Regresar al inicio
          </Button>
          <Button
            colorScheme="brand"
            fontWeight={'normal'}
            fontSize="16px"
            h="48px"
            mr={3}
            onClick={() => confirm()}
          >
            Entendido
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

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
interface Props {
  isOpen: boolean;
  onClose: () => void;
  confirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
}

export const ModalMessageComponent: React.FC<Props> = ({
  isOpen,
  onClose,
  confirm,
  title,
  description,
  confirmText
}) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width="560px" maxWidth="100%">
        <ModalHeader paddingBottom={'0'} paddingTop="26px">
          <Image margin="0 auto" src={MODAL_ALERT} alt="¿Querés eliminar este segmento?" />
        </ModalHeader>
        <ModalBody pb={6}>
          <Text textAlign={'center'} fontWeight="500" fontSize="24px" color="#4A4A4A" mb="16px">
            {title}
          </Text>
          <Text
            fontSize="16px"
            color="#808181"
            maxWidth="320px"
            margin="0 auto"
            textAlign={'center'}
          >
            {description}
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
            _hover={{
              bg: 'orange.100'
            }}
          >
            No, regresar
          </Button>
          <Button
            colorScheme="brand"
            fontWeight={'normal'}
            fontSize="16px"
            h="48px"
            mr={3}
            onClick={() => confirm()}
          >
            {confirmText || 'Entiendo'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

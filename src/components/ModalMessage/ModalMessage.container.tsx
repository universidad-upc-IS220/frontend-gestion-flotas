import * as React from 'react';

import { ModalMessageComponent } from './ModalMessage.component';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  confirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
}

export const ModalMessageContainer: React.FC<Props> = (props) => {
  return <ModalMessageComponent {...props} />;
};

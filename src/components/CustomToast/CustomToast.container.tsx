import * as React from 'react';

import { CustomToastComponent } from './CustomToast.component';
import { useToast } from '@chakra-ui/react';
import { ComponentProps } from './models';

export const CustomToastContainer: React.FC<ComponentProps> = (props) => {
  const toast = useToast();

  const showToast = (type: string, title: string, message: string) => {
    toast({
      position: 'bottom-right',
      isClosable: true,
      duration: 3000,
      render: () => (
        <CustomToastComponent
          {...props}
          closeHandler={() => {
            toast.closeAll();
          }}
        />
      )
    });
  };
  return null;
  // return <CustomToastComponent {...props} />;
};

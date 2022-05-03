import * as React from 'react';
import { UnidadProps } from '../../../../models';

import { DrawerDetailComponent } from './DrawerDetail.component';

type Props = {
  choferDetails: UnidadProps;
  firstField: any;
  isOpen: any;
  onClose: any;
};

export const DrawerDetailContainer: React.FC<Props> = (props) => {
  return <DrawerDetailComponent {...props} />;
};

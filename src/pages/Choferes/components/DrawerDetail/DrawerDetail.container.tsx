import * as React from 'react';
import { ChoferProps } from '../../../../models';

import { DrawerDetailComponent } from './DrawerDetail.component';

type Props = {
  choferDetails: ChoferProps;
  firstField: any;
  isOpen: any;
  onClose: any;
};

export const DrawerDetailContainer: React.FC<Props> = (props) => {
  return <DrawerDetailComponent {...props} />;
};

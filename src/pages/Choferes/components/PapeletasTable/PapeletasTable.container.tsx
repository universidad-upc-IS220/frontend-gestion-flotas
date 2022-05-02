import * as React from 'react';

import { PapeletasTableComponent } from './PapeletasTable.component';

import { PapeletaProps } from '../../../../models';

type Props = {
  data: PapeletaProps[];
};

export const PapeletasTableContainer: React.FC<Props> = (props) => {
  return <PapeletasTableComponent {...props} />;
};

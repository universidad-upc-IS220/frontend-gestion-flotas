import * as React from 'react';

import { PapeletaInfoComponent } from './PapeletaInfo.component';

type Props = {
  data: any[];
};

export const PapeletaInfoContainer: React.FC<Props> = ({ data }) => {
  return <PapeletaInfoComponent data={data} />;
};

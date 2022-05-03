import * as React from 'react';

import { FiltersComponent } from './Filters.component';

type Props = {
  filtros: any[];
  handleOnChange: Function;
};

export const FiltersContainer: React.FC<Props> = (Props) => {
  return <FiltersComponent {...Props}/>;
};

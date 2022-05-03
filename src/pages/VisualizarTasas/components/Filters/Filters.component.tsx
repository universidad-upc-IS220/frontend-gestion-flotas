import { FormControl, Text } from '@chakra-ui/react';
import { Select, AsyncSelect, CreatableSelect, AsyncCreatableSelect } from 'chakra-react-select';

interface Props {
  filtros: any[];
  handleOnChange: Function;
}

export const FiltersComponent: React.FC<Props> = ({ filtros, handleOnChange }) => {
  return (
    <>
      <Text mr={'20px'} color="#606162">
        Segmentos:
      </Text>

      <FormControl fontSize="14px" bg="white" borderRadius="8px" border="1px solid #9B9B9B">
        <Select
          onChange={(value) => {
            handleOnChange(value);
          }}
          size="lg"
          options={filtros}
          isMulti
          placeholder="Seleccione un segmento"
          closeMenuOnSelect={false}
          selectedOptionStyle="check"
          hideSelectedOptions={false}
        />
      </FormControl>
    </>
  );
};

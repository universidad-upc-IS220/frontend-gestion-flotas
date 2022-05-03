import { FormControl, Text } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useEffect, useState } from 'react';

interface ComponentProps {
  options: any[];
  selectedOptions: any[];
  filterChangesHandler: Function;
}

export const Filters: React.FC<ComponentProps> = ({
  options,
  selectedOptions,
  filterChangesHandler
}) => {
  // const [selected, setSelected] = useState<any[]>(selectedOptions);
  // console.log('options', options);
  // console.log('selectedOptions', selectedOptions);
  useEffect(() => {
    // setSelected(options);
  }, []);

  return (
    <>
      <Text mr={'20px'} color="#606162">
        Segmentos:
      </Text>

      <FormControl fontSize="14px" bg="white" borderRadius="8px" border="1px solid #9B9B9B">
        <Select
          isClearable={false}
          colorScheme="orange"
          isMulti={true}
          onChange={(value: any) => {
            // setFilters(value);
            filterChangesHandler(value);
          }}
          size="lg"
          options={options}
          placeholder="Seleccione un segmento"
          closeMenuOnSelect={false}
          selectedOptionStyle="check"
          value={selectedOptions}
          hideSelectedOptions={false}
          chakraStyles={{
            dropdownIndicator: (provided, state) => ({
              ...provided,
              background: state.isFocused ? 'orange.50' : 'transparent',
              p: 0,
              w: '40px'
            }),
            option: (provided, state) => ({
              ...provided,
              color: '#333333',
              fontSize: '16px'
            }),
            control: (provided, state) => ({
              ...provided,
              color: '#333333'
            }),
            multiValue: (provided, state) => ({
              ...provided,
              color: 'teal',
              background: 'rgba(254, 149, 82, 0.08);'
            })
          }}
        />
      </FormControl>
    </>
  );
};

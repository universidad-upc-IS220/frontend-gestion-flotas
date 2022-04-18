import { Button, FormControl, Input, FormLabel, Box } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

type Props = {
  submitHandler: Function;
  updateRequestStatus: Function;
};

interface IFormInput {
  dni: string;
}

export const PapeletaForm: React.FC<Props> = ({ submitHandler, updateRequestStatus }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount, isValid }
  } = useForm<IFormInput>({
    mode: 'onChange'
  });

  const onSubmit = async ({ dni }: IFormInput) => {
    updateRequestStatus(false);

    const response = await fetch(`https://rest-api-papeletas-peru.herokuapp.com/papeletas/${dni}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    submitHandler(data.data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <FormControl>
          <FormLabel htmlFor="name">Número de DNI</FormLabel>
          <Input
            id="name"
            placeholder="name"
            {...register('dni', { required: true, minLength: 3 })}
          />
        </FormControl>
        <Button
          bg="#28cc9e"
          color="white"
          fontWeight={500}
          fontSize="1rem"
          isLoading={isSubmitting}
          isDisabled={!isValid}
          type="submit"
          w="100%"
          size="lg"
          mt="1rem"
          _disabled={{
            color: '#FFF',
            bg: '#DEDEDE'
          }}
          _hover={{}}
        >
          Buscar
        </Button>
      </form>
    </Box>
  );
};

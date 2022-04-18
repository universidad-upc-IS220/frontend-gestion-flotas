import { Progress, Stack } from '@chakra-ui/react';

interface Props {
  rowsNumber?: number;
}

const Skeleton = ({}: Props) => {
  return (
    <Stack>
      <Progress size="md" isIndeterminate colorScheme={'gray'} height={'64px'} opacity={0.04} />
      <Progress size="md" isIndeterminate colorScheme={'gray'} height={'64px'} opacity={0.06} />
      <Progress size="md" isIndeterminate colorScheme={'gray'} height={'64px'} opacity={0.07} />
      <Progress size="md" isIndeterminate colorScheme={'gray'} height={'64px'} opacity={0.05} />
      <Progress size="md" isIndeterminate colorScheme={'gray'} height={'64px'} opacity={0.09} />
    </Stack>
  );
};

export default Skeleton;

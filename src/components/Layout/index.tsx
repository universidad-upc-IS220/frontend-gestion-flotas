import React from 'react';
import { Box, Container, Heading, Icon } from '@chakra-ui/react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
type Props = {
  children: React.ReactNode;
  title: string;
  fullWidth?: boolean;
  backToPage?: string;
};

export const DashboardLayout = ({ children, title, fullWidth = false, backToPage = '' }: Props) => {
  const navigate = useNavigate();

  const size = fullWidth ? '100%' : 'calc(100% - 192px)';

  return (
    <Container maxWidth="100%" p={0}>
      <Box>
        <Navbar />
        <Box w="100%" d="flex">
          {!fullWidth && (
            <Box w="192px" d={['none', 'none', 'unset']}>
              <Sidebar />
            </Box>
          )}
          <Box w={['100%', '100%', size]} bg="#F5F5F5" minH="calc(100vh - 72px)">
            <Container maxW="100%" padding="32px 68px" marginX={0}>
              <Heading
                fontSize={'24px'}
                fontWeight="400"
                color="#9B9B9B"
                mb="40px"
                display="flex"
                alignItems={'center'}
              >
                {fullWidth && (
                  <Icon
                    cursor="pointer"
                    mr="16px"
                    as={HiOutlineArrowLeft}
                    onClick={() => navigate(backToPage)}
                  />
                )}
                {title}
              </Heading>
              {children}
            </Container>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

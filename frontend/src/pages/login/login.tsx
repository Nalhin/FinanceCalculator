import { Box, Button, Flex, Link, useToast } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginUserRequestDto } from '../../core/api/api.types';
import { useMutation } from 'react-query';
import { postLogin } from '../../core/api/auth/auth.api';
import { useAuth } from '../../shared/context/auth/use-auth/use-auth';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { MAIN_ROUTES } from '../main.routes';
import { RouterLocation } from '../../shared/types/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormControl from '../../shared/components/forms/input-form-control/input-form-control';
import type { AxiosError } from 'axios';
import { onAxiosError } from '../../shared/utils/on-axios-error/on-axios-error';
import { populateFormWithApiErrors } from '../../shared/utils/populate-form-with-api-errors/populate-form-with-api-errors';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

interface Props {
  location?: RouterLocation<{ from: string }>;
}

const Login = ({ location }: Props) => {
  const toast = useToast();
  const history = useHistory();
  const { authenticateUser } = useAuth();
  const {
    handleSubmit,
    register,
    errors,
    setError,
  } = useForm<LoginUserRequestDto>({
    resolver: yupResolver(schema),
  });
  const { mutate, isLoading } = useMutation(postLogin, {
    onError: (error: AxiosError) =>
      onAxiosError(error, {
        403: () =>
          toast({
            title: 'Invalid credentials',
            description: 'Invalid credentials provided.',
            status: 'error',
            isClosable: true,
          }),
        400: () => populateFormWithApiErrors(error, setError),
        '*': () => {
          toast({
            title: 'Unexpected error occurred',
            status: 'error',
            isClosable: true,
          });
        },
      }),
    onSuccess: ({ data }) => {
      toast({
        title: `Welcome ${data.user.username}`,
        status: 'success',
        isClosable: true,
      });
      authenticateUser(
        { user: data.user, token: data.token },
        {
          onAuth: () => {
            if (location?.state?.from) {
              history.push(location.state.from);
            } else {
              history.push(MAIN_ROUTES.HOME);
            }
          },
        },
      );
    },
  });

  const onSubmit = (form: LoginUserRequestDto) => {
    mutate(form);
  };

  return (
    <Flex justify="center" align="center" mt={8}>
      <Box
        as="form"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputFormControl
          label="Username"
          name="username"
          error={errors.username}
          ref={register}
        />
        <InputFormControl
          label="Password"
          name="password"
          type="password"
          error={errors.password}
          ref={register}
        />
        <Link
          my={2}
          display="block"
          as={RouterLink}
          color="blue.500"
          to={{ pathname: MAIN_ROUTES.SIGN_UP, state: location?.state }}
        >
          No account? Sign up
        </Link>
        <Button
          colorScheme="teal"
          size="md"
          type="submit"
          width="100%"
          isLoading={isLoading}
        >
          Login
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;

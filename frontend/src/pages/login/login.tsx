import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginUserRequestDto } from '../../core/api/api.interface';
import { useMutation } from 'react-query';
import { postLogin } from '../../core/api/auth/auth.api';
import { useAuth } from '../../shared/context/auth/use-auth/use-auth';
import { Link, useHistory } from 'react-router-dom';
import { MAIN_ROUTES } from '../main.routes';
import { RouterLocation } from '../../shared/types/router';

interface Props {
  location?: RouterLocation<{ from: string }>;
}

const Login = ({ location }: Props) => {
  const history = useHistory();
  const { authenticateUser } = useAuth();
  const { mutate, isLoading } = useMutation(postLogin, {
    onSuccess: ({ data }) => {
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

  const {
    handleSubmit,
    register,
    errors,
    formState,
  } = useForm<LoginUserRequestDto>({ mode: 'onBlur' });

  const onSubmit = (form: LoginUserRequestDto) => {
    mutate(form);
  };

  return (
    <Flex justify="center" align="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            name="username"
            ref={register({
              required: 'Username is required',
            })}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            ref={register({
              required: 'Password is required',
            })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Link to={{ pathname: MAIN_ROUTES.SIGN_UP, state: location?.state }}>
          No account? Sign up
        </Link>
        <Button
          colorScheme="teal"
          size="md"
          type="submit"
          width="100%"
          mt={4}
          isLoading={isLoading}
          disabled={!formState.isValid}
        >
          Login
        </Button>
      </form>
    </Flex>
  );
};

export default Login;

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

const Login = () => {
  const { authenticateUser } = useAuth();
  const { mutate, isLoading } = useMutation(postLogin, {
    onSuccess: ({ data }) => {
      authenticateUser({ user: data.user, token: data.token });
    },
  });

  const {
    handleSubmit,
    register,
    errors,
    formState,
  } = useForm<LoginUserRequestDto>({ mode: 'onBlur' });

  const onSubmit = async (form: LoginUserRequestDto) => {
    await mutate(form);
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

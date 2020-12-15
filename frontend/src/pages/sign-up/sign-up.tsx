import React from 'react';
import { useAuth } from '../../shared/context/auth/use-auth/use-auth';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { SignUpUserRequestDto } from '../../core/api/api.interface';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { postSignUp } from '../../core/api/auth/auth.api';

const SignUp = () => {
  const { authenticateUser } = useAuth();
  const { mutate, isLoading } = useMutation(postSignUp, {
    onSuccess: ({ data }) => {
      authenticateUser({ user: data.user, token: data.token });
    },
  });
  const {
    handleSubmit,
    register,
    errors,
    formState,
  } = useForm<SignUpUserRequestDto>({ mode: 'onBlur' });

  const onSubmit = (form: SignUpUserRequestDto) => {
    mutate(form);
  };

  return (
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
      <FormControl isInvalid={!!errors.username}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          name="email"
          ref={register({
            required: 'Email is required',
          })}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
        Sign up
      </Button>
    </form>
  );
};

export default SignUp;

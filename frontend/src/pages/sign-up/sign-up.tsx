import React from 'react';
import { useAuth } from '../../shared/context/auth/use-auth/use-auth';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { SignUpUserRequestDto } from '../../core/api/api.interface';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { postSignUp } from '../../core/api/auth/auth.api';
import { useHistory } from 'react-router-dom';
import { MAIN_ROUTES } from '../main.routes';
import { RouterLocation } from '../../shared/types/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 character long'),
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
});

interface Props {
  location?: RouterLocation<{ from: string }>;
}

const SignUp = ({ location }: Props) => {
  const history = useHistory();
  const { authenticateUser } = useAuth();
  const { mutate, isLoading } = useMutation(postSignUp, {
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
  } = useForm<SignUpUserRequestDto>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (form: SignUpUserRequestDto) => {
    mutate(form);
  };

  return (
    <Flex justify="center" align="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input id="username" name="username" ref={register} />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" name="email" ref={register} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" name="password" type="password" ref={register} />
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
    </Flex>
  );
};

export default SignUp;

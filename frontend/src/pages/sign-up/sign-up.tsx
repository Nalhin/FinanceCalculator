import React from 'react';
import { useAuth } from '../../shared/context/auth/use-auth/use-auth';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { SignUpUserRequestDto } from '../../core/api/api.types';
import { Box, Button, Flex, Link, useToast } from '@chakra-ui/react';
import { postSignUp } from '../../core/api/auth/auth.api';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { MAIN_ROUTES } from '../main.routes';
import { RouterLocation } from '../../shared/types/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputFormControl from '../../shared/components/forms/input-form-control/input-form-control';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username must not be longer than 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 character long')
    .max(30, 'Password must not be longer than 30 characters'),
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
});

interface Props {
  location?: RouterLocation<{ from: string }>;
}

const SignUp = ({ location }: Props) => {
  const toast = useToast();
  const history = useHistory();
  const { authenticateUser } = useAuth();
  const { mutate, isLoading } = useMutation(postSignUp, {
    onSuccess: ({ data }) => {
      toast({ title: `Welcome ${data.user.username}`, status: 'success' });
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
  const { handleSubmit, register, errors } = useForm<SignUpUserRequestDto>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (form: SignUpUserRequestDto) => {
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
          label="Email"
          name="email"
          error={errors.email}
          ref={register}
        />
        <InputFormControl
          label="Password"
          name="password"
          error={errors.password}
          type="password"
          ref={register}
        />
        <Link
          my={2}
          display="block"
          as={RouterLink}
          color="blue.600"
          to={{ pathname: MAIN_ROUTES.LOGIN, state: location?.state }}
        >
          Already have an account?
        </Link>
        <Button
          colorScheme="teal"
          size="md"
          type="submit"
          width="100%"
          isLoading={isLoading}
        >
          Sign up
        </Button>
      </Box>
    </Flex>
  );
};

export default SignUp;

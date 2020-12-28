import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginUserRequestDto } from '../../core/api/api.types';
import { useMutation } from 'react-query';
import { postLogin } from '../../core/api/auth/auth.api';
import { useAuth } from '../../shared/context/auth/use-auth/use-auth';
import { Link, useHistory } from 'react-router-dom';
import { MAIN_ROUTES } from '../main.routes';
import { RouterLocation } from '../../shared/types/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormControl from '../../shared/components/forms/input-form-control/input-form-control';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 character long'),
});

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
  } = useForm<LoginUserRequestDto>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (form: LoginUserRequestDto) => {
    mutate(form);
  };

  return (
    <Flex justify="center" align="center">
      <form onSubmit={handleSubmit(onSubmit)}>
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

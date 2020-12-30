import React from 'react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { useAuth } from '../../shared/context/auth/use-auth/use-auth';
import { mocked } from 'ts-jest/utils';
import { renderWithProviders } from '../../../test/render/render-with-providers';
import Login from './login';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginUserRequestDto } from '../../core/api/api.types';
import { loginUserFactory } from '../../../test/factory/api/auth';

jest.mock('../../shared/context/auth/use-auth/use-auth');

describe('loginPage', () => {
  const server = setupServer();
  const mockedUseAuth = {
    authenticateUser: jest.fn(),
    logoutUser: jest.fn(),
  };

  beforeAll(() => server.listen());
  beforeEach(() => {
    mocked(useAuth).mockReturnValue(mockedUseAuth);
  });
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });
  afterAll(() => server.close());

  function submitForm({ username, password }: LoginUserRequestDto) {
    userEvent.type(screen.getByLabelText(/username/i), username);
    userEvent.type(screen.getByLabelText(/password/i), password);
    userEvent.click(screen.getByRole('button', { name: /login/i }));
  }

  it('should authenticate user after successful login', async () => {
    server.use(
      rest.post<LoginUserRequestDto>('/api/auth/login', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            user: { username: req.body.username, email: 'email' },
            token: 'token',
          }),
        );
      }),
    );
    const formState = loginUserFactory.buildOne();
    renderWithProviders(<Login />);

    submitForm(formState);

    await waitFor(() => {
      expect(mockedUseAuth.authenticateUser).toHaveBeenCalledTimes(1);
      expect(mockedUseAuth.authenticateUser).toHaveBeenCalledWith(
        {
          user: { username: formState.username, email: 'email' },
          token: 'token',
        },
        { onAuth: expect.any(Function) },
      );
    });
  });

  it('should not authenticate when login is unsuccessful', async () => {
    server.use(
      rest.post('/api/auth/login', (req, res, ctx) => {
        return res(ctx.status(401));
      }),
    );
    renderWithProviders(<Login />);

    submitForm(loginUserFactory.buildOne());

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /login/i })).not.toBeDisabled();
    });
    expect(mockedUseAuth.authenticateUser).toHaveBeenCalledTimes(0);
  });

  it('should display form errors when form is invalid', async () => {
    renderWithProviders(<Login />);

    userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('should not submit request when form is invalid', async () => {
    expect.assertions(2);
    renderWithProviders(<Login />);

    userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(screen.getByText(/password is required/i)).toBeInTheDocument(),
    );
    expect(mockedUseAuth.authenticateUser).toHaveBeenCalledTimes(0);
  });

  it('should display toast with invalid credentials', async () => {
    server.use(
      rest.post('/api/auth/login', (req, res, ctx) => {
        return res(ctx.status(403));
      }),
    );
    renderWithProviders(<Login />);

    submitForm(loginUserFactory.buildOne());

    await waitFor(() =>
      expect(
        screen.getByText(/Invalid credentials provided/i),
      ).toBeInTheDocument(),
    );
  });

  it('should populate form with errors', async () => {
    server.use(
      rest.post('/api/auth/login', (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errors: [{ field: 'username', message: 'username error' }],
          }),
        );
      }),
    );
    renderWithProviders(<Login />);

    submitForm({ username: 'username', password: 'password' });

    await waitFor(() =>
      expect(screen.getByText(/username error/i)).toBeInTheDocument(),
    );
  });
});

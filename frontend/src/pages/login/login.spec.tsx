import React from 'react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { authResponseFactory } from '../../../test/factory/api/auth';
import { useAuth } from '../../shared/context/auth/use-auth/use-auth';
import { mocked } from 'ts-jest/utils';
import { renderWithProviders } from '../../../test/render/render-with-providers';
import Login from './login';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../../shared/context/auth/use-auth/use-auth');

describe('LoginPage', () => {
  const successfulResponse = authResponseFactory.buildOne();
  const server = setupServer(
    rest.post('/api/auth/login', (req, res, ctx) => {
      return res(ctx.json(successfulResponse));
    }),
  );

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

  it('should authenticate user after successful login', async () => {
    const authenticateUser = jest.fn();
    mocked(useAuth).mockReturnValue({
      authenticateUser,
      logoutUser: jest.fn(),
    });
    renderWithProviders(<Login />);

    userEvent.type(screen.getByLabelText(/username/i), 'username');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(authenticateUser).toBeCalledTimes(1);
      expect(authenticateUser).toBeCalledWith(successfulResponse);
    });
  });

  it('should not authenticate when login is unsuccessful', async () => {
    server.use(
      rest.post('/auth/login', (req, res, ctx) => {
        return res(ctx.status(401));
      }),
    );
    renderWithProviders(<Login />);

    userEvent.type(screen.getByLabelText(/username/i), 'username');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    const submitButton = screen.getByRole('button', { name: /login/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
    expect(mockedUseAuth.authenticateUser).toBeCalledTimes(0);
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
    renderWithProviders(<Login />);

    userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(screen.getByText(/password is required/i)).toBeInTheDocument(),
    );
    expect(mockedUseAuth.authenticateUser).toBeCalledTimes(0);
  });
});

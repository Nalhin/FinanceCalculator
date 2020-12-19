import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mocked } from 'ts-jest/utils';
import { useAuth } from '../../shared/context/auth/use-auth/use-auth';
import { renderWithProviders } from '../../../test/render/render-with-providers';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { SignUpUserRequestDto } from '../../core/api/api.interface';
import SignUp from './sign-up';

jest.mock('../../shared/context/auth/use-auth/use-auth');

describe('signUp page', () => {
  const server = setupServer(
    rest.post<SignUpUserRequestDto>('/api/auth/sign-up', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          user: { username: req.body.username, email: req.body.email },
          token: 'token',
        }),
      );
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
    renderWithProviders(<SignUp />);

    userEvent.type(screen.getByLabelText(/username/i), 'username');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    userEvent.type(screen.getByLabelText(/email/i), 'email@gmail.com');
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockedUseAuth.authenticateUser).toHaveBeenCalledTimes(1);
      expect(mockedUseAuth.authenticateUser).toHaveBeenCalledWith(
        {
          user: { username: 'username', email: 'email@gmail.com' },
          token: 'token',
        },
        { onAuth: expect.any(Function) },
      );
    });
  });

  it('should not authenticate when sign up is unsuccessful', async () => {
    server.use(
      rest.post('/api/auth/sign-up', (req, res, ctx) => {
        return res(ctx.status(401));
      }),
    );
    renderWithProviders(<SignUp />);

    userEvent.type(screen.getByLabelText(/username/i), 'username');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    userEvent.type(screen.getByLabelText(/email/i), 'email@gmail.com');
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
    expect(mockedUseAuth.authenticateUser).toHaveBeenCalledTimes(0);
  });

  it('should display form errors when form is invalid', async () => {
    renderWithProviders(<SignUp />);

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('should not submit request when form is invalid', async () => {
    renderWithProviders(<SignUp />);

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() =>
      expect(screen.getByText(/password is required/i)).toBeInTheDocument(),
    );
    expect(mockedUseAuth.authenticateUser).toHaveBeenCalledTimes(0);
  });
});

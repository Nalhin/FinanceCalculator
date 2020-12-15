import { cookies } from '../../../models/cookies/app-cookies';
import { mocked } from 'ts-jest/utils';
import { getMe } from '../../../../core/api/me/me.api';
import { UserResponseDto } from '../../../../core/api/api.interface';
import { AxiosResponse } from 'axios';
import { act, renderHook } from '@testing-library/react-hooks';
import { useAuthState } from './use-auth-state';
import { userResponseFactory } from '../../../../../test/factory/api/me';
import { AuthenticatedUser } from '../../../models/user/user';

jest.mock('../../../models/cookies/app-cookies');
jest.mock('../../../../core/api/me/me.api');

describe('useAuthState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const user = userResponseFactory.buildOne();

  it('should fetch user and set user as response, if token is present', async () => {
    mocked(getMe).mockResolvedValueOnce({
      data: user,
    } as AxiosResponse<UserResponseDto>);
    mocked(cookies).getAuthCookie.mockReturnValue('token');

    const { result, waitForNextUpdate } = renderHook(() => useAuthState());

    await waitForNextUpdate();

    expect(cookies.getAuthCookie).toBeCalledTimes(1);
    expect(getMe).toBeCalledTimes(1);
    expect(result.current.user.isAuthenticated).toBeTruthy();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('should remove token, if request is not successful', async () => {
    mocked(getMe).mockRejectedValueOnce({});
    mocked(cookies).getAuthCookie.mockReturnValue('token');

    const { result, waitForNextUpdate } = renderHook(() => useAuthState());

    await waitForNextUpdate();

    expect(cookies.getAuthCookie).toBeCalledTimes(1);
    expect(getMe).toBeCalledTimes(1);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.user.isAuthenticated).toBeFalsy();
  });

  it('should set loading to false, if token is falsy', () => {
    mocked(cookies).getAuthCookie.mockReturnValue('');

    const { result } = renderHook(() => useAuthState());

    expect(cookies.getAuthCookie).toBeCalledTimes(1);
    expect(result.current.isLoading).toBeFalsy();
  });

  it('should logout current user and remove auth cookie', () => {
    const { result } = renderHook(() =>
      useAuthState(new AuthenticatedUser(user)),
    );

    act(() => {
      result.current.logoutUser();
    });

    expect(cookies.removeAuthCookie).toBeCalledTimes(1);
    expect(result.current.user.isAuthenticated).toBeFalsy();
  });

  it('should authenticate current user', () => {
    const { result } = renderHook(() =>
      useAuthState(new AuthenticatedUser(user)),
    );

    act(() => {
      result.current.authenticateUser({ user, token: 'token' });
    });

    expect(cookies.setAuthCookie).toBeCalledTimes(1);
    expect(result.current.user.isAuthenticated).toBeTruthy();
  });

  it('should call onAuth function after authentication', () => {
    const onAuth = jest.fn();
    const { result } = renderHook(() =>
      useAuthState(new AuthenticatedUser(user)),
    );

    act(() => {
      result.current.authenticateUser({ user, token: 'token' }, { onAuth });
    });

    expect(onAuth).toBeCalledTimes(1);
    expect(onAuth).toBeCalledWith(user);
  });
});

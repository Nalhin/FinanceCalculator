import type { AxiosError } from 'axios';

type ErrorStatus = 400 | 401 | 403 | 404 | 409 | 500 | '*';

type ErrorActions = {
  [key in ErrorStatus]?: () => void;
};

export function onAxiosError(error: AxiosError, actions: ErrorActions) {
  const status = error.response?.status as ErrorStatus;
  if (actions[status]) {
    actions[status]?.();
    return;
  }
  if (actions['*']) {
    actions['*']();
  }
}

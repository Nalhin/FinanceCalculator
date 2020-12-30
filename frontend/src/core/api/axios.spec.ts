import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { axios } from './axios';
import { cookies } from '../../shared/models/cookies/app-cookies';
import { mocked } from 'ts-jest/utils';

jest.mock('../../shared/models/cookies/app-cookies');

describe('axios middleware', () => {
  const server = setupServer();
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });
  afterAll(() => server.close());

  it('should append auth header when cookie is present', async () => {
    expect.assertions(1);
    mocked(cookies).getAuthCookie.mockReturnValue('cookie');

    server.use(
      rest.get('/api/example', (req, res, ctx) => {
        expect(req.headers.get('Authorization')).toBe('Bearer cookie');
        return res(ctx.status(200));
      }),
    );

    await axios.get('/example');
  });

  it('should not append header when cookie is not set', async () => {
    expect.assertions(1);
    mocked(cookies).getAuthCookie.mockReturnValue(undefined);

    server.use(
      rest.get('/api/example', (req, res, ctx) => {
        expect(req.headers.has('Authorization')).toBeFalse();
        return res(ctx.status(200));
      }),
    );

    await axios.get('/example');
  });
});

import { AnonymousUser, AuthenticatedUser } from './user';

describe('anonymousUser', () => {
  describe('constructor', () => {
    it('should initialize empty values', () => {
      const anonymousUser = new AnonymousUser();

      expect(anonymousUser.email).toBe('');
      expect(anonymousUser.username).toBe('');
    });
  });

  describe('isAuthenticated()', () => {
    it('should return false', () => {
      const anonymousUser = new AnonymousUser();

      expect(anonymousUser.isAuthenticated).toBeFalsy();
    });
  });
});

describe('authenticatedUser', () => {
  describe('constructor', () => {
    it('should initialize user interface properties', () => {
      const authenticatedUser = new AuthenticatedUser({
        username: 'username',
        email: 'email',
      });

      expect(authenticatedUser.email).toBe('email');
      expect(authenticatedUser.username).toBe('username');
    });
  });
  describe('isAuthenticated()', () => {
    it('should return true', () => {
      const authenticatedUser = new AuthenticatedUser({
        username: 'username',
        email: 'email',
      });

      expect(authenticatedUser.isAuthenticated).toBeTruthy();
    });
  });
});

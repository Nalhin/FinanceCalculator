import Cookies from 'universal-cookie';

const AUTH_COOKIE = 'auth';

class AppCookies extends Cookies {
  getAuthCookie(): string | undefined {
    return this.get(AUTH_COOKIE);
  }

  setAuthCookie(token: string) {
    this.set(AUTH_COOKIE, token);
  }

  removeAuthCookie() {
    this.remove(AUTH_COOKIE);
  }
}

const cookies = new AppCookies();

export { cookies };

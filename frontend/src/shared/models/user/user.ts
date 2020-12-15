export interface UserProperties {
  readonly username: string;
  readonly email: string;
}

export abstract class BaseUser implements UserProperties {
  protected constructor(
    public readonly username: string,
    public readonly email: string,
  ) {}

  abstract get isAuthenticated(): boolean;
}

export class AnonymousUser extends BaseUser {
  constructor() {
    super('', '');
  }

  get isAuthenticated() {
    return false;
  }
}

export class AuthenticatedUser extends BaseUser {
  constructor({ username, email }: UserProperties) {
    super(username, email);
  }

  get isAuthenticated() {
    return true;
  }
}

export type User = AnonymousUser | AuthenticatedUser;

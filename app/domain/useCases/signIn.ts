import { AuthUser } from '../models';

export interface SignIn {
  post(params: SignIn.Params): Promise<SignIn.Response>;
}

export namespace SignIn {
  export type Params = {
    email: string;
    password: string;
  };

  export type Response = {
    error: boolean;
    message: string;
    authUser: AuthUser | undefined;
  };
}

import { ReactNode } from 'react';
import { AuthUser, User } from '../models';
import { GetToken, SignIn, SignOut, SignUp } from '../useCases';

export interface AuthProviderProps {
  children: ReactNode;
  remoteGetToken: GetToken;
  remoteSignIn: SignIn;
  remoteSignOut: SignOut;
  remoteSignUp: SignUp;
}

export interface AuthContextData {
  authUser: AuthUser | undefined;
  user: User | undefined;
  loading: boolean;
  error: boolean;
  message: string;
  token: string | undefined;
  signIn: (params: SignIn.Params) => Promise<SignIn.Response>;
  signOut: () => Promise<SignOut.Response>;
  signUp: (params: SignUp.Params) => Promise<SignUp.Response>;
  getToken: () => Promise<GetToken.Response>;
}

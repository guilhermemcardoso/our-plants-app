import React, { createContext, useState } from 'react';
import { AuthContextData, AuthProviderProps } from '~/domain/contexts';
import { AuthUser, User } from '~/domain/models';
import { SignIn, SignUp } from '~/domain/useCases';

export const RestaurantContext = createContext({} as AuthContextData);

export function RestaurantProvider({
  remoteGetToken,
  remoteSignIn,
  remoteSignOut,
  remoteSignUp,
  children,
}: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser>();
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  async function getToken() {
    setLoading(true);
    const response = await remoteGetToken.get();
    setToken(response.token);
    setError(response.error);
    setMessage(response.message);
    setLoading(false);

    return response;
  }

  async function signIn(params: SignIn.Params) {
    setLoading(true);
    const response = await remoteSignIn.post(params);
    setAuthUser(response.authUser);
    setError(response.error);
    setMessage(response.message);
    setLoading(false);

    return response;
  }

  async function signOut() {
    setLoading(true);
    const response = await remoteSignOut.post();
    setAuthUser(undefined);
    setUser(undefined);
    setError(response.error);
    setMessage(response.message);
    setLoading(false);

    return response;
  }

  async function signUp(params: SignUp.Params) {
    setLoading(true);
    const response = await remoteSignUp.post(params);
    setUser(response.user);
    setError(response.error);
    setMessage(response.message);
    setLoading(false);

    return response;
  }

  return (
    <RestaurantContext.Provider
      value={{
        authUser,
        error,
        loading,
        message,
        user,
        token,
        getToken,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

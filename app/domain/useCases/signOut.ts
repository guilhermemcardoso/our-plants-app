export interface SignOut {
  post(): Promise<SignOut.Response>;
}

export namespace SignOut {
  export type Response = {
    error: boolean;
    message: string;
  };
}

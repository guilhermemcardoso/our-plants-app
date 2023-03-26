export interface GetToken {
  get(): Promise<GetToken.Response>;
}

export namespace GetToken {
  export type Response = {
    error: boolean;
    message: string;
    token: string | undefined;
  };
}

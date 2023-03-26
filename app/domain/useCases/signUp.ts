import { User } from '../models';

export interface SignUp {
  post(params: SignUp.Params): Promise<SignUp.Response>;
}

export namespace SignUp {
  export type Params = {
    name: string;
    lastName: string;
    profileImageUrl: string;
    email: string;
    bio: string;
    address: {
      streetName: string;
      neighbourhood: string;
      zipCode: string;
      houseNumber: string;
      city: string;
      stateOrProvince: string;
      country: string;
    };
  };

  export type Response = {
    error: boolean;
    message: string;
    user: User | undefined;
  };
}

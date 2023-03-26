interface User {
  name: string;
  lastName: string;
  profileImageUrl?: string;
  email: string;
  bio?: string;
  address?: {
    streetName?: string;
    neighbourhood?: string;
    zipCode?: string;
    houseNumber?: string;
    city?: string;
    stateOrProvince?: string;
    country?: string;
  };
}

export default User;

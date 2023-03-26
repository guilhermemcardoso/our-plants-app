interface AuthUser {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  uid: string;
}

export default AuthUser;

import {
  ForgotPasswordData,
  ResendEmailConfirmationData,
  SignInData,
  SignUpData,
} from '~/domains/auth/types';
import { Api } from '~/services/api';

export async function signIn(signInData: SignInData) {
  return await Api({
    method: 'post',
    url: 'auth/login',
    data: signInData,
  });
}

export async function signUp(signUpData: SignUpData) {
  return await Api({
    method: 'post',
    url: 'auth/register',
    data: signUpData,
  });
}

export async function forgotPassword(forgotPasswordData: ForgotPasswordData) {
  return await Api({
    method: 'get',
    url: `auth/forgot-password?email=${forgotPasswordData.email}`,
  });
}

export async function resendEmailConfirmation(
  resendEmailConfirmationData: ResendEmailConfirmationData
) {
  return await Api({
    method: 'get',
    url: `auth/resend-email-confirmation?email=${resendEmailConfirmationData.email}`,
  });
}

import { z } from 'zod';
import { SignUpSchema } from './sign-up/validations';
import { SignInSchema } from './sign-in/validations';
import { ForgotPasswordSchema } from './forgot-password/validations';

export type SignInData = z.infer<typeof SignInSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;
export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;
export interface ResendEmailConfirmationData {
  email: string;
}

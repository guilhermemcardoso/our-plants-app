import { ZodError, z } from 'zod';
import { ForgotPasswordData } from '../types';

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

export interface ForgotPasswordValidationErrors {
  email: string;
}

export function validate(data: ForgotPasswordData) {
  return ForgotPasswordSchema.safeParse(data);
}

export function getErrorByField(
  errors: ZodError,
  field: keyof ForgotPasswordValidationErrors
) {
  const errorMessages: string[] = [];
  errors.issues.forEach((error) => {
    if (error.path.includes(field)) {
      errorMessages.push(error.message);
    }
  });

  return errorMessages.join(', ');
}

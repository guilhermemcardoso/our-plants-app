import { ZodError, z } from 'zod';
import { SignInData } from '../types';

export const SignInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'A senha precisa ter no mínimo 8 caracteres'),
});

export interface SignInValidationErrors {
  email: string;
  password: string;
}

export function validate(data: SignInData) {
  return SignInSchema.safeParse(data);
}

export function getErrorByField(
  errors: ZodError,
  field: keyof SignInValidationErrors
) {
  const errorMessages: string[] = [];
  errors.issues.forEach((error) => {
    if (error.path.includes(field)) {
      errorMessages.push(error.message);
    }
  });

  return errorMessages.join(', ');
}

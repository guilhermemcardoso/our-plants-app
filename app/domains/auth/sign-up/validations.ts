import { ZodError, z } from 'zod';
import { SignUpData } from '../types';

export const SignUpSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'A senha precisa ter no mínimo 8 caracteres'),
  repassword: z.string().min(8, 'A senha precisa ter no mínimo 8 caracteres'),
  name: z
    .string()
    .min(2, 'O nome precisa ter no mínimo 2 caracteres')
    .max(25, 'O nome precisa ter no máximo 25 caracteres'),
  lastname: z
    .string()
    .min(2, 'O sobrenome precisa ter no mínimo 2 caracteres')
    .max(25, 'O sobrenome precisa ter no máximo 25 caracteres'),
});

export interface SignUpValidationErrors {
  email: string;
  password: string;
  repassword: string;
  name: string;
  lastname: string;
}

export function validate(data: SignUpData) {
  return SignUpSchema.safeParse(data);
}

export function getErrorByField(
  errors: ZodError,
  field: keyof SignUpValidationErrors
) {
  const errorMessages: string[] = [];
  errors.issues.forEach((error) => {
    if (error.path.includes(field)) {
      errorMessages.push(error.message);
    }
  });

  return errorMessages.join(', ');
}

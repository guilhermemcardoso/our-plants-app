import { ZodError, z } from 'zod';
import { ChangePasswordData } from './types';
import { passwordRegex } from '~/shared/constants/regex';

export const ChangePasswordSchema = z.object({
  current: z
    .string()
    .min(8, 'A senha precisa ter no mínimo 8 caracteres')
    .regex(
      passwordRegex,
      'A senha precisa ter no mínimo uma letra maiúscula, uma letra minúscula e um número'
    ),
  password: z
    .string()
    .min(8, 'A senha precisa ter no mínimo 8 caracteres')
    .regex(
      passwordRegex,
      'A senha precisa ter no mínimo uma letra maiúscula, uma letra minúscula e um número'
    ),
  repassword: z
    .string()
    .min(8, 'A senha precisa ter no mínimo 8 caracteres')
    .regex(
      passwordRegex,
      'A senha precisa ter no mínimo uma letra maiúscula, uma letra minúscula e um número'
    ),
});

export interface ChangePasswordValidationErrors {
  current: string;
  password: string;
  repassword: string;
}

export function validate(data: ChangePasswordData) {
  return ChangePasswordSchema.safeParse(data);
}

export function getErrorByField(
  errors: ZodError,
  field: keyof ChangePasswordValidationErrors
) {
  const errorMessages: string[] = [];
  errors.issues.forEach((error) => {
    if (error.path.includes(field)) {
      errorMessages.push(error.message);
    }
  });

  return errorMessages.join(', ');
}

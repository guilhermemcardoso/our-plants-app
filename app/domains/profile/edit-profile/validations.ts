import { ZodError, z } from 'zod';
import { EditProfileData } from '../types';

export const EditProfileSchema = z.object({
  _id: z.string(),
  email: z.string().email('Email inválido'),
  name: z
    .string()
    .min(2, 'O nome precisa ter no mínimo 2 caracteres')
    .max(25, 'O nome precisa ter no máximo 25 caracteres'),
  lastname: z
    .string()
    .min(2, 'O sobrenome precisa ter no mínimo 2 caracteres')
    .max(25, 'O sobrenome precisa ter no máximo 25 caracteres'),
});

export interface EditProfileValidationErrors {
  _id: string;
  email: string;
  name: string;
  lastname: string;
}

export function validate(data: EditProfileData) {
  return EditProfileSchema.safeParse(data);
}

export function getErrorByField(
  errors: ZodError,
  field: keyof EditProfileValidationErrors
) {
  const errorMessages: string[] = [];
  errors.issues.forEach((error) => {
    if (error.path.includes(field)) {
      errorMessages.push(error.message);
    }
  });

  return errorMessages.join(', ');
}

import { ZodError, z } from 'zod';
import { CreateEditSpecieData } from './types';

export const CreateEditSpecieSchema = z.object({
  popular_name: z
    .string()
    .min(3, 'O nome popular da espécie não pode ser menor que 3 caracteres'),
  scientific_name: z.string().optional(),
});

export interface CreateEditSpecieValidationErrors {
  popular_name: string;
  scientific_name: string;
}

export function validate(data: CreateEditSpecieData) {
  return CreateEditSpecieSchema.safeParse(data);
}

export function getErrorByField(
  errors: ZodError,
  field: keyof CreateEditSpecieValidationErrors
) {
  const errorMessages: string[] = [];
  errors.issues.forEach((error) => {
    if (error.path.includes(field)) {
      errorMessages.push(error.message);
    }
  });

  return errorMessages.join(', ');
}

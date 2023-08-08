import { ZodError, z } from 'zod';
import { CreateComplaintData } from './types';

export const CreateComplaintSchema = z.object({
  reason: z.string().min(3, 'A razão não pode estar em branco'),
  description: z.string().min(3, 'A descrição não pode estar em branco'),
  plant_id: z.string().nonempty('Selecione a planta a ser denunciada.'),
});

export interface CreateComplaintValidationErrors {
  reason: string;
  description: string;
  plant_id: string;
}

export function validate(data: CreateComplaintData) {
  return CreateComplaintSchema.safeParse(data);
}

export function getErrorByField(
  errors: ZodError,
  field: keyof CreateComplaintValidationErrors
) {
  const errorMessages: string[] = [];
  errors.issues.forEach((error) => {
    if (error.path.includes(field)) {
      errorMessages.push(error.message);
    }
  });

  return errorMessages.join(', ');
}

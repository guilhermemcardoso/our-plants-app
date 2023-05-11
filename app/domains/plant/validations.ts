import { ZodError, z } from 'zod';
import { CreateEditPlantData } from './types';

export const CreateEditPlantSchema = z.object({
  description: z.string().min(3, 'A descrição não pode estar em branco'),
  specie_id: z
    .string()
    .nonempty('Selecione ou cadastre uma espécie para a planta'),
  latitude: z.string().nonempty('Selecione a localização da planta'),
  longitude: z.string().nonempty('Selecione a localização da planta'),
  images: z.array(z.string()).optional(),
});

export interface CreateEditPlantValidationErrors {
  description: string;
  specie_id: string;
  latitude: string;
  longitude: string;
  images: string;
}

export function validate(data: CreateEditPlantData) {
  return CreateEditPlantSchema.safeParse(data);
}

export function getErrorByField(
  errors: ZodError,
  field: keyof CreateEditPlantValidationErrors
) {
  const errorMessages: string[] = [];
  errors.issues.forEach((error) => {
    if (error.path.includes(field)) {
      errorMessages.push(error.message);
    }
  });

  return errorMessages.join(', ');
}

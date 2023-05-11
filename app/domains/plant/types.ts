import { z } from 'zod';
import { CreateEditPlantSchema } from './validations';

export type CreateEditPlantData = z.infer<typeof CreateEditPlantSchema>;

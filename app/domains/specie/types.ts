import { z } from 'zod';
import { CreateEditSpecieSchema } from './validations';

export type CreateEditSpecieData = z.infer<typeof CreateEditSpecieSchema>;

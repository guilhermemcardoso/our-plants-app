import { z } from 'zod';
import { CreateComplaintSchema } from './validations';

export type CreateComplaintData = z.infer<typeof CreateComplaintSchema>;

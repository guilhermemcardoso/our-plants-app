import { z } from 'zod';
import { ChangePasswordSchema } from './validations';

export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;

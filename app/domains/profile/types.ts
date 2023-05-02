import { z } from 'zod';
import { EditProfileSchema } from './edit-profile/validations';

export type EditProfileData = z.infer<typeof EditProfileSchema>;

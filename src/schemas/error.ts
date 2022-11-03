import { z } from 'zod';

export const apiErrorSchema = z.object({
  messages: z.array(z.string()),
});

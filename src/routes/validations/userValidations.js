import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(5),
});

import { z } from "zod";

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

import { email, z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters"),
  email: z.string().email("Email invalid format").toLowerCase().trim(),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});

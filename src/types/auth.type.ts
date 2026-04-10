import { z } from "zod";

export const LoginSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name too long").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});
export type LoginBodyType = z.infer<typeof LoginSchema>;

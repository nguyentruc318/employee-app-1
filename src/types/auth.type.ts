import { z } from "zod";

export const LoginSchema = z.object({
  name: z
    .string()
    .min(1, "validation.nameRequired")
    .max(50, "validation.nameTooLong")
    .trim(),
  password: z
    .string()
    .min(8, "validation.passwordMin")
    .max(50, "validation.passwordRequired")
    .regex(/[A-Z]/, "validation.passwordUppercase")
    .regex(/[a-z]/, "validation.passwordLowercase")
    .regex(/[0-9]/, "validation.passwordNumber")
    .regex(/[^A-Za-z0-9]/, "validation.passwordSpecial"),
});
export type LoginBodyType = z.infer<typeof LoginSchema>;

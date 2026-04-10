import { z } from "zod";
export interface Employee {
  id: string;
  name: string;
  age: number;
  phone: string;
  country: string;
  isAvailable: boolean;
  avatar: string;
}
export interface AuthUser {
  name: string;
  email: string;
  picture: string;
  sub: string;
}
export type EmployeeActionType = "add" | "update" | "delete";

export interface SocketEmployeeEvent {
  type: EmployeeActionType;
  name: string;
}
export const EmployeeSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name too long").trim(),
  age: z
    .number("Age must be a number")
    .nonnegative("Age must be a non-negative number")
    .min(18, "Age must be at least 18"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(10, "Phone too long"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(50, "Country too long")
    .trim(),
  isAvailable: z.boolean(),
  avatar: z.string().optional(),
});
export type EmployeeBodyType = z.infer<typeof EmployeeSchema>;

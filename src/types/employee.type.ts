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
  name: z
    .string()
    .min(1, "validation.nameRequired")
    .max(50, "validation.nameTooLong")
    .trim(),
  age: z
    .number({ error: "validation.ageRequired" })
    .nonnegative("validation.ageNegative")
    .min(18, "validation.ageMin"),
  phone: z
    .string()
    .min(10, "validation.phoneRequired")
    .max(10, "validation.phoneRequired"),
  country: z
    .string()
    .min(1, "validation.countryRequired")
    .max(50, "validation.countryTooLong")
    .trim(),
  isAvailable: z.boolean(),
  avatar: z.string().optional(),
});
export type EmployeeBodyType = z.infer<typeof EmployeeSchema>;

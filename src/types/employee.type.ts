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

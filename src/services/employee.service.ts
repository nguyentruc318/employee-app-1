import type { Employee } from "../types/employee.type";
import axiosHttp from "../utils/axios";

const employeeApi = {
  list: () => axiosHttp.get<Employee[]>("/employees"),
  create: (data: Omit<Employee, "id">) =>
    axiosHttp.post<Employee>("/employees", data),
  update: (id: string, data: Omit<Employee, "id">) =>
    axiosHttp.put<Employee>(`/employees/${id}`, data),
  delete: (id: string) => axiosHttp.delete(`/employees/${id}`),
};

export default employeeApi;

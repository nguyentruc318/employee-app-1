import type { Employee } from "../types/employee.type";
import axiosHttp from "../utils/axios";

const employeeApi = {
  list: () => axiosHttp.get<Employee[]>("api/employees"),
  create: (data: Omit<Employee, "id">) =>
    axiosHttp.post<Employee>("api/employees", data),
  update: (id: string, data: Omit<Employee, "id">) =>
    axiosHttp.put<Employee>(`api/employees/${id}`, data),
  delete: (id: string) => axiosHttp.delete(`api/employees/${id}`),
};

export default employeeApi;

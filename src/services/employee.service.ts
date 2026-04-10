import type { Employee, EmployeeBodyType } from "../types/employee.type";
import axiosHttp from "../configs/axios";

const employeeApi = {
  list: () => axiosHttp.get<Employee[]>("api/employees"),
  create: (data: EmployeeBodyType) =>
    axiosHttp.post<Employee>("api/employees", data),
  update: (id: string, data: EmployeeBodyType) =>
    axiosHttp.put<Employee>(`api/employees/${id}`, data),
  delete: (id: string) => axiosHttp.delete(`api/employees/${id}`),
};

export default employeeApi;

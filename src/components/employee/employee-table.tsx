import { useTranslation } from "react-i18next";
import type { Employee } from "../../types/employee.type";
import EmployeeRow from "./employee-row";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}
export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}: EmployeeTableProps) {
  const { t } = useTranslation();
  return (
    <div className=" rounded-2xl overflow-hidden  shadow-sm  ">
      <div className="overflow-x-auto">
        <table className="divide-y divide-gray-200  w-full ">
          <thead className="bg-gray-50 ">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                Avatar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                {t("employee.table.headerName")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                {t("employee.table.headerAge")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                {t("employee.table.headerPhone")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                {t("employee.table.headerCountry")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                {t("employee.table.headerIsAvailable")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ">
                {t("employee.table.headerActions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-200 ">
            {employees.map((employee) => (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

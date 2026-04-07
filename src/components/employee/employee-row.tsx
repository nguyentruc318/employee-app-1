import { useTranslation } from "react-i18next";
import type { Employee } from "../../types/employee.type";
import Button from "../button";

interface EmployeeRowProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export default function EmployeeRow({
  employee,
  onEdit,
  onDelete,
}: EmployeeRowProps) {
  const { t } = useTranslation();
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={employee.avatar}
              alt={employee.name}
            />
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {employee.name}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{employee.age}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{employee.phone}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{employee.country}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs  font-semibold rounded-full ${
              employee.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {employee.isAvailable ? "Available" : "Not Available"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
          <Button variant="primary" onClick={() => onEdit(employee)}>
            {t("employee.edit")}
          </Button>
          <Button variant="danger" onClick={() => onDelete(employee.id)}>
            {t("employee.delete")}
          </Button>
        </td>
      </tr>
    </>
  );
}

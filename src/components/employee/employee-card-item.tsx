import { useTranslation } from "react-i18next";
import type { Employee } from "../../types/employee.type";
import Button from "../button";

interface EmployeeCardItemProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export default function EmployeeCardItem({
  employee,
  onEdit,
  onDelete,
}: EmployeeCardItemProps) {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-100 p-4 rounded-xl flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col items-start gap-1">
            <h3 className="font-semibold text-gray-900 leading-none">
              {employee.name}
            </h3>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                employee.isAvailable
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {employee.isAvailable ? "Available" : "Not Available"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
        <div>
          <span className="font-medium text-gray-800">Age:</span> {employee.age}
        </div>
        <div>
          <span className="font-medium text-gray-800">Phone:</span>{" "}
          {employee.phone}
        </div>
        <div className="col-span-2 shadow-none">
          <span className="font-medium text-gray-800">Country:</span>{" "}
          {employee.country}
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-1">
        <Button variant="primary" onClick={() => onEdit(employee)}>
          {t("employee.edit")}
        </Button>
        <Button variant="danger" onClick={() => onDelete(employee.id)}>
          {t("employee.delete")}
        </Button>
      </div>
    </div>
  );
}

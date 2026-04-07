import type { Employee } from "../../types/employee.type";

import EmployeeCardItem from "./employee-card-item";

interface EmployeeCardProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export default function EmployeeCard({
  employees,
  onEdit,
  onDelete,
}: EmployeeCardProps) {
  return (
    <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2 pb-2">
      {employees.map((employee) => (
        <EmployeeCardItem
          key={employee.id}
          employee={employee}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

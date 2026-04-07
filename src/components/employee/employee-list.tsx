import { useCallback, useEffect, useState } from "react";
import type { Employee, SocketEmployeeEvent } from "../../types/employee.type";
import employeeApi from "../../services/employee.service";
import EmployeeTable from "./employee-table";
import Button from "../button";
import EmployeeForm from "./employee-form";
import { genAvatar } from "../../utils/generate-avatar";
import EmployeeSearch from "./employee-search";
import socket from "../../utils/socket";
import toast from "react-hot-toast";
import EmployeeCard from "./employee-card";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../language-switcher";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [textSearch, setTextSearch] = useState<string>("");
  const { t } = useTranslation();
  const fetchEmployee = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await employeeApi.list();
      if (response.data) {
        setEmployees(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);
  useEffect(() => {
    const handleEmployeeChange = (data: SocketEmployeeEvent) => {
      if (data.type === "add") {
        toast.success(`Employee ${data.name} has been added`, {
          position: "bottom-right",
          className: "bg-green-500 text-white",
        });
      } else if (data.type === "update") {
        toast.success(`Employee ${data.name} has been updated `, {
          position: "bottom-right",
          className: "bg-green-500 text-white",
        });
      } else if (data.type === "delete") {
        toast.success(`Employee ${data.name} has been deleted`, {
          position: "bottom-right",
          className: "bg-green-500 text-white",
        });
      }
      fetchEmployee();
    };
    socket.on("employee_changed", handleEmployeeChange);
    return () => {
      socket.off("employee_changed", handleEmployeeChange);
    };
  }, [fetchEmployee]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleOpenAddForm = () => {
    setIsOpenForm(true);
    setSelectedEmployee(null);
  };
  const handleCloseForm = () => {
    setIsOpenForm(false);
  };
  const handleEditForm = (employee: Employee) => {
    setIsOpenForm(true);
    setSelectedEmployee(employee);
  };
  const handleDelete = async (id: string) => {
    try {
      await employeeApi.delete(id);
      socket.emit("notify_change", {
        type: "delete",
        name: selectedEmployee?.name,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (data: Omit<Employee, "id">) => {
    try {
      if (selectedEmployee) {
        await employeeApi.update(selectedEmployee.id, data);
        socket.emit("notify_change", {
          type: "update",
          name: selectedEmployee?.name,
        });
      } else {
        const newEmployee = { ...data, avatar: genAvatar(employees.length) };
        await employeeApi.create(newEmployee);
        socket.emit("notify_change", {
          type: "add",
          name: newEmployee.name,
        });
      }
      setIsOpenForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  const filterEmployee = employees.filter((employee) =>
    employee.name.toLowerCase().includes(textSearch.toLowerCase()),
  );
  return (
    <>
      <>
        <div className="flex gap-4 mx-4 sm:mx-10 lg:mx-20 mt-6 sm:mt-10 items-center">
          <Button variant="primary" onClick={handleOpenAddForm}>
            {t("employee.add")}
          </Button>
          <EmployeeSearch onSearch={setTextSearch} />
          <LanguageSwitcher />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 mx-2 sm:mx-10 lg:mx-15 mt-5 gap-6 mb-5">
          <div className="lg:col-span-3 order-2 lg:order-1">
            {employees.length > 0 ? (
              <>
                <div className="hidden lg:block">
                  <EmployeeTable
                    employees={filterEmployee}
                    onEdit={handleEditForm}
                    onDelete={handleDelete}
                  />
                </div>
                <div className="block lg:hidden">
                  <EmployeeCard
                    employees={filterEmployee}
                    onEdit={handleEditForm}
                    onDelete={handleDelete}
                  />
                </div>
              </>
            ) : (
              <div>{t("employee.noEmployeeFound")}</div>
            )}
          </div>

          {isOpenForm && (
            <div className="col-span-1 rounded-2xl bg-gray-100  px-4 py-4 order-1 lg:order-2 h-fit">
              <EmployeeForm
                onClose={handleCloseForm}
                initialData={selectedEmployee}
                key={selectedEmployee?.id}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </>
    </>
  );
}

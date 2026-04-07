import { useState } from "react";
import Button from "../button";
import type { Employee } from "../../types/employee.type";
import { useTranslation } from "react-i18next";

interface EmployeeFormProps {
  onClose: () => void;
  onSubmit: (data: Omit<Employee, "id">) => void;
  initialData: Employee | null;
}
const validateForm = (data: Omit<Employee, "id">) => {
  const errors: Record<string, string> = {};
  if (!data.name.trim()) errors.name = "Tên không được để trống";
  if (data.age < 18 || data.age > 100) errors.age = "Tuổi phải từ 18 ";
  if (!data.phone.match(/^[0-9]{10}$/))
    errors.phone = "Số điện thoại phải chứa 10 chữ số";
  if (!data.country.trim()) errors.country = "Quốc gia không được để trống";
  return errors;
};
export default function EmployeeForm({
  onClose,
  onSubmit,
  initialData,
}: EmployeeFormProps) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Omit<Employee, "id">>({
    name: initialData?.name || "",
    age: initialData?.age || 0,
    phone: initialData?.phone || "",
    country: initialData?.country || "",
    isAvailable: initialData?.isAvailable || false,
    avatar: initialData?.avatar || "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };
  const isEdit = !!initialData;
  return (
    <>
      <div className="text-2xl font-bold mb-4 flex justify-between">
        <span>{isEdit ? "Edit Employee" : "Add Employee"}</span>
        <Button variant="danger" onClick={onClose}>
          X
        </Button>
      </div>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 "
        onSubmit={handleSubmit}
      >
        <div className="sm:col-span-2 flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            {t("employee.form.labelName")}
          </label>
          <input
            onChange={handleChange}
            value={formData.name}
            name="name"
            placeholder={t("employee.form.placeholderName")}
            type="text"
            className="border border-gray-300 rounded-md px-2 py-1 h-12 text-sm bg-white"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className=" flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            {t("employee.form.labelAge")}
          </label>
          <input
            onChange={handleChange}
            placeholder="0"
            value={formData.age}
            name="age"
            type="number"
            className="border border-gray-300 rounded-md px-2 py-1 h-12 text-sm bg-white"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
        <div className=" flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            {t("employee.form.labelPhone")}
          </label>
          <input
            onChange={handleChange}
            placeholder={t("employee.form.placeholderPhone")}
            value={formData.phone}
            type="text"
            name="phone"
            className="border border-gray-300 rounded-md px-2 py-1 h-12 text-sm bg-white"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
        <div className="sm:col-span-2 flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            {t("employee.form.labelCountry")}
          </label>
          <input
            onChange={handleChange}
            placeholder={t("employee.form.placeholderCountry")}
            value={formData.country}
            type="text"
            name="country"
            className="sm:col-span-2 border border-gray-300 rounded-md px-2 py-1 h-12 text-sm bg-white"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isAvailable"
            id="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label
            htmlFor="isAvailable"
            className="text-sm font-medium text-gray-700 cursor-pointer sm:col-span-2"
          >
            Available
          </label>
        </div>

        <Button variant="primary" type="submit">
          {isEdit ? t("employee.form.update") : t("employee.form.create")}
        </Button>
      </form>
    </>
  );
}

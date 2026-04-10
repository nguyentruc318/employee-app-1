import Button from "../button";
import {
  EmployeeSchema,
  type Employee,
  type EmployeeBodyType,
} from "../../types/employee.type";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface EmployeeFormProps {
  onClose: () => void;
  onSubmit: (data: EmployeeBodyType) => void;
  initialData: Employee | null;
}
export default function EmployeeForm({
  onClose,
  onSubmit,
  initialData,
}: EmployeeFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeBodyType>({
    resolver: zodResolver(EmployeeSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: initialData?.name || "",
      age: initialData?.age || 0,
      phone: initialData?.phone || "",
      country: initialData?.country || "",
      isAvailable: initialData?.isAvailable || false,
      avatar: initialData?.avatar || "",
    },
  });
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="sm:col-span-2 flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            {t("employee.form.labelName")}
          </label>
          <input
            {...register("name")}
            placeholder={t("employee.form.placeholderName")}
            type="text"
            className="border border-gray-300 rounded-md px-2 py-1 h-12 text-sm bg-white"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">
              {t(errors.name.message!)}
            </span>
          )}
        </div>
        <div className=" flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            {t("employee.form.labelAge")}
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            placeholder="0"
            type="number"
            className="border border-gray-300 rounded-md px-2 py-1 h-12 text-sm bg-white"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{t(errors.age.message!)}</p>
          )}
        </div>
        <div className=" flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            {t("employee.form.labelPhone")}
          </label>
          <input
            {...register("phone")}
            placeholder={t("employee.form.placeholderPhone")}
            type="text"
            className="border border-gray-300 rounded-md px-2 py-1 h-12 text-sm bg-white"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{t(errors.phone.message!)}</p>
          )}
        </div>
        <div className="sm:col-span-2 flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            {t("employee.form.labelCountry")}
          </label>
          <input
            {...register("country")}
            placeholder={t("employee.form.placeholderCountry")}
            type="text"
            className="sm:col-span-2 border border-gray-300 rounded-md px-2 py-1 h-12 text-sm bg-white"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{t(errors.country.message!)}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("isAvailable")}
            id="isAvailable"
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

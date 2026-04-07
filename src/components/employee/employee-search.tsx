import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EmployeeSearchProps {
  onSearch: (search: string) => void;
}
export default function EmployeeSearch({ onSearch }: EmployeeSearchProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2 relative">
      <input
        type="text"
        placeholder={t("employee.search")}
        className="border border-gray-300 rounded-md px-2 py-1 h-12 text-sm bg-white w-full"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="w-5 h-5 text-gray-500 hover:cursor-pointer absolute right-2" />
    </div>
  );
}

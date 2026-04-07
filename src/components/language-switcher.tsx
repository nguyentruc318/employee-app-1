import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="flex items-center">
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        className="bg-white border border-gray-300 text-gray-700 py-1 px-2 rounded-md shadow-sm focus:outline-none h-12 cursor-pointer transition-all text-sm"
      >
        <option value="vi">Tiếng Việt</option>
        <option value="en">English (US)</option>
      </select>
    </div>
  );
}

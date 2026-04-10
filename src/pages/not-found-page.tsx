import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="text-center">
        <h1 className="text-9xl font-black text-blue-600 opacity-20">404</h1>
        <div className="relative -mt-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("not_found.title")}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            {t("not_found.description")}
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-200/50"
          >
            {t("not_found.back_home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

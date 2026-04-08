import { useState } from "react";
import Button from "../button";
import useGoogleOAuth from "../../hooks/use-google-oauth";
import type { AuthUser } from "../../types/employee.type";
import { useAppStore } from "../../stores";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useTranslation } from "react-i18next";
const FacebookLoginComponent = (FacebookLogin as any).default;
export default function LoginForm() {
  const { loginWithGoogle } = useGoogleOAuth();
  const login = useAppStore((s) => s.login);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    navigate("/");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md bg-gray-100 rounded-2xl px-6 py-8 mx-auto mt-10 sm:mt-20"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name">{t("login.name")}</label>
        <input
          onChange={handleChange}
          value={formData.name}
          name="name"
          placeholder={t("login.name")}
          type="text"
          className="border border-gray-300 rounded-md px-2 py-1 h-12 text-sm bg-white"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">{t("login.password")}</label>
        <input
          onChange={handleChange}
          placeholder="********"
          value={formData.password}
          name="password"
          type="password"
          className="border border-gray-300 rounded-md px-2 py-1 h-12 text-sm bg-white"
        />
      </div>
      <Button type="submit">{t("login.login")}</Button>
      <Button type="button" variant="outline" onClick={() => loginWithGoogle()}>
        {t("login.loginWithGoogle")}
      </Button>
      <FacebookLoginComponent
        appId={import.meta.env.VITE_FACEBOOK_APP_ID}
        onFail={(error: any) => {
          console.log("Đăng nhập thất bại!", error);
        }}
        onProfileSuccess={(response: any) => {
          console.log("Lấy Profile thành công!", response);
          const user = {
            name: response.name,
            email: response.email,
            picture: response.picture?.data?.url,
            sub: response.id,
          };

          if (user) {
            login(user as AuthUser);
            navigate("/employee");
          }
        }}
        render={({ onClick }: { onClick: () => void }) => (
          <Button type="button" variant="outline" onClick={onClick}>
            {t("login.loginWithFacebook")}
          </Button>
        )}
      />
    </form>
  );
}

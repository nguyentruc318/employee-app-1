import Button from "../button";
import useGoogleOAuth from "../../hooks/use-google-oauth";
import type { AuthUser } from "../../types/employee.type";
import { useAppStore } from "../../stores";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useTranslation } from "react-i18next";
import { LoginSchema, type LoginBodyType } from "../../types/auth.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../utils/cn";

const FacebookLoginComponent = (FacebookLogin as any).default;

export default function LoginForm() {
  const { loginWithGoogle } = useGoogleOAuth();
  const login = useAppStore((s) => s.login);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      password: "",
    },
  });
  const onSubmit = (data: LoginBodyType) => {
    console.log(data);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-md bg-gray-100 rounded-2xl px-6 py-8 mx-auto mt-10 sm:mt-20"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name">{t("login.name")}</label>
        <input
          {...register("name")}
          id="name"
          placeholder={t("login.name")}
          type="text"
          className={cn(
            "border rounded-md px-2 py-1 h-12 text-sm bg-white",
            errors.name ? "border-red-500" : "border-gray-300",
          )}
        />
        {errors.name && (
          <span className="text-red-500 text-xs">
            {t(errors.name.message!)}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">{t("login.password")}</label>
        <input
          {...register("password")}
          id="password"
          placeholder="********"
          type="password"
          className={cn(
            "border rounded-md px-2 py-1 h-12 text-sm bg-white",
            errors.password ? "border-red-500" : "border-gray-300",
          )}
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {t(errors.password.message!)}
          </span>
        )}
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

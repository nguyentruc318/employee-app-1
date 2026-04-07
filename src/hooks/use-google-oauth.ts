import { useNavigate } from "react-router-dom";
import { useAppStore } from "../stores";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function useGoogleOAuth() {
  const loginApp = useAppStore((state) => state.login);
  const navigate= useNavigate()
    const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );
        loginApp({
          name: data.name,
          email: data.email,
          picture: data.picture,
          sub: data.sub,
        });
        navigate("/employee");
      } catch (error) {
        console.error("Lỗi khi xử lý login Google:", error);
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
    },
  });
  return {loginWithGoogle}
}
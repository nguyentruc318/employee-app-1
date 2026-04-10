import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "../stores";

interface AuthGuardProps {
  reverse?: boolean;
}
const Authguard = ({ reverse }: AuthGuardProps) => {
  const user = useAppStore((state) => state.user);

  if (reverse) {
    return user ? <Navigate to="/employee" replace /> : <Outlet />;
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Authguard;

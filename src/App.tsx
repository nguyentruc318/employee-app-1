import { Navigate, Route, Routes } from "react-router-dom";
import EmployeePage from "./pages/employee-page";
import LoginPage from "./pages/login-page";
import Authguard from "./guards/protected-route";
import NotFoundPage from "./pages/not-found-page";

function App() {
  return (
    <Routes>
      <Route element={<Authguard />}>
        <Route path="/employee" element={<EmployeePage />} />
      </Route>
      <Route path="/" element={<Navigate to="/employee" replace />} />
      <Route element={<Authguard reverse />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

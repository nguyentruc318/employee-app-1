import { Navigate, Route, Routes } from "react-router-dom";
import EmployeePage from "./pages/employee-page";
import LoginPage from "./pages/login-page";

function App() {
  return (
    <Routes>
      <Route path="/employee" element={<EmployeePage />} />
      <Route path="/" element={<Navigate to="/employee" replace />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

import { render, screen } from "@testing-library/react";
import LoginForm from "./login-form";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();
const mockLoginWithGoogle = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));
vi.mock("axios", () => ({
  post: vi.fn(),
}));
vi.mock("../../stores", () => ({
  useAppStore: (selector: any) => selector({ login: mockLogin }),
}));
vi.mock("../../hooks/use-google-oauth", () => ({
  default: () => ({ loginWithGoogle: mockLoginWithGoogle }),
}));
vi.mock("@greatsumini/react-facebook-login", () => {
  // 1. Định nghĩa component giả ở đây
  const MockFB = ({ onProfileSuccess, render }: any) => (
    <div data-testid="mock-fb">
      {render({
        onClick: () =>
          onProfileSuccess({ name: "Felix", email: "test@gmail.com" }),
      })}
    </div>
  );
  return {
    default: {
      default: MockFB,
    },
  };
});
vi.mock("../button", () => ({
  default: ({ children, onClick, type }: any) => (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  ),
}));
describe("Login Form Component", () => {
  it("Display login form ", () => {
    render(<LoginForm />);
    expect(screen.getByText("login.name")).toBeInTheDocument();
    expect(screen.getByText("login.password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "login.login" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "login.loginWithGoogle" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "login.loginWithFacebook" }),
    ).toBeInTheDocument();
  });
  it("should navigate to home page when user login successfully", async () => {
    render(<LoginForm />);
    const nameInput = screen.getByText("login.name");
    const passwordInput = screen.getByText("login.password");
    const loginButton = screen.getByRole("button", { name: "login.login" });
    await userEvent.type(nameInput, "Felix");
    await userEvent.type(passwordInput, "123456");
    await userEvent.click(loginButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
  it("should update the value when the user types in the Name and Password", async () => {
    render(<LoginForm />);

    const nameInput = screen.getByPlaceholderText("login.name");
    const passwordInput = screen.getByPlaceholderText("********");

    await userEvent.type(nameInput, "Felix");
    await userEvent.type(passwordInput, "123456");

    expect(nameInput).toHaveValue("Felix");
    expect(passwordInput).toHaveValue("123456");
  });
});

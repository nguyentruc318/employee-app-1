import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import EmployeeSearch from "../components/employee/employee-search";
import userEvent from "@testing-library/user-event";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));
describe("Employee Search Component", () => {
  it("should render employee search component", () => {
    render(<EmployeeSearch onSearch={() => {}} />);
    expect(screen.getByPlaceholderText("employee.search")).toBeInTheDocument();
  });
  it("should active onSearch function when user types in search input", async () => {
    const mockOnsearch = vi.fn();
    render(<EmployeeSearch onSearch={mockOnsearch} />);
    const searchInput = screen.getByPlaceholderText("employee.search");
    await userEvent.type(searchInput, "John");
    expect(mockOnsearch).toHaveBeenCalledWith("John");
  });
});

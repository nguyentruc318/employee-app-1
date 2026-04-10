import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import EmployeeCardItem from "../components/employee/employee-card-item";
import type { Employee } from "../types/employee.type";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));
describe("Employee Card Item Component", () => {
  const fakeEmployee: Employee = {
    id: "999",
    name: "Kratos",
    age: 1050,
    phone: "0123456789",
    country: "Sparta",
    avatar: "http://image.com/kratos.jpg",
    isAvailable: true,
  };

  it("should render exactly employee information to card item component", () => {
    render(
      <EmployeeCardItem
        employee={fakeEmployee}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("Kratos")).toBeInTheDocument();
    expect(screen.getByText("1050")).toBeInTheDocument();
    expect(screen.getByText("0123456789")).toBeInTheDocument();
    expect(screen.getByText("Sparta")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
  });
  it("should call onEdit when user click edit button ", async () => {
    const mockOnEdit = vi.fn();
    render(
      <EmployeeCardItem
        employee={fakeEmployee}
        onEdit={mockOnEdit}
        onDelete={vi.fn()}
      />,
    );
    const editButton = screen.getByRole("button", { name: "employee.edit" });
    await userEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalledWith(fakeEmployee);
  });
  it("should call onDelete when user click delete button ", async () => {
    const mockOnDelete = vi.fn();
    render(
      <EmployeeCardItem
        employee={fakeEmployee}
        onEdit={vi.fn()}
        onDelete={mockOnDelete}
      />,
    );
    const deleteButton = screen.getByRole("button", {
      name: "employee.delete",
    });
    await userEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(fakeEmployee.id);
  });
  it("should display available status when employee is available", () => {
    render(
      <EmployeeCardItem
        employee={fakeEmployee}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("Available")).toBeInTheDocument();
  });
  it("should display not available status when employee is not available", () => {
    const notAvailableEmployee: Employee = {
      ...fakeEmployee,
      isAvailable: false,
    };
    render(
      <EmployeeCardItem
        employee={notAvailableEmployee}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("Not Available")).toBeInTheDocument();
  });
});

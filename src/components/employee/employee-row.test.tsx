import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import EmployeeRow from "./employee-row";
import type { Employee } from "../../types/employee.type";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const fakeEmployee: Employee = {
  id: "1",
  name: "Kratos",
  age: 30,
  phone: "0123456789",
  country: "Sparta",
  avatar: "https://image.com/avatar.jpg",
  isAvailable: true,
};

describe("EmployeeRow Component", () => {
  const setup = (employee = fakeEmployee) => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(
      <table>
        <tbody>
          <EmployeeRow
            employee={employee}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </tbody>
      </table>,
    );
    return { onEdit, onDelete };
  };

  it("should display full employee information in the row", () => {
    setup();
    expect(screen.getByText("Kratos")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("0123456789")).toBeInTheDocument();
    expect(screen.getByText("Sparta")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();

    const img = screen.getByAltText("Kratos");
    expect(img).toHaveAttribute("src", fakeEmployee.avatar);
  });

  it("should display 'Not Available' when isAvailable is false", () => {
    setup({ ...fakeEmployee, isAvailable: false });
    expect(screen.getByText("Not Available")).toBeInTheDocument();
  });

  it("should call onEdit with correct data when Edit button is clicked", async () => {
    const { onEdit } = setup();
    await userEvent.click(screen.getByText("employee.edit"));
    expect(onEdit).toHaveBeenCalledWith(fakeEmployee);
  });

  it("should call onDelete with correct ID when Delete button is clicked", async () => {
    const { onDelete } = setup();
    await userEvent.click(screen.getByText("employee.delete"));
    expect(onDelete).toHaveBeenCalledWith("1");
  });
});

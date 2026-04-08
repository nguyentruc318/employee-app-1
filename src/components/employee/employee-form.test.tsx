import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, it, expect, vi } from "vitest";
import EmployeeForm from "./employee-form";
import type { Employee } from "../../types/employee.type";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Employee Component", () => {
  const mockOnSubmit = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Display", () => {
    it("should display Add Employee when initialData is null", () => {
      render(
        <EmployeeForm
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          initialData={null}
        />,
      );
      expect(screen.getByText("Add Employee")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "employee.form.create" }),
      ).toBeInTheDocument();
    });

    it("should display Edit Employee when initialData is not null", () => {
      const mockInitialData: Employee = {
        id: "999",
        name: "Kratos",
        age: 1050,
        phone: "0123456789",
        country: "Sparta",
        avatar: "http://image.com/kratos.jpg",
        isAvailable: true,
      };
      render(
        <EmployeeForm
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          initialData={mockInitialData}
        />,
      );
      expect(screen.getByText("Edit Employee")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "employee.form.update" }),
      ).toBeInTheDocument();
      const nameInput = screen.getByPlaceholderText(
        "employee.form.placeholderName",
      );
      expect(nameInput).toHaveValue("Kratos");

      const updateBtn = screen.getByRole("button", {
        name: "employee.form.update",
      });
      expect(updateBtn).toBeInTheDocument();
    });
  });
  describe("behavior", () => {
    it("should close when user click close button", async () => {
      render(
        <EmployeeForm
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          initialData={null}
        />,
      );
      const closeButton = screen.getByText("X");
      await userEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalled();
    });
    it("can not submit when name is empty", async () => {
      render(
        <EmployeeForm
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          initialData={null}
        />,
      );
      const submitButton = screen.getByRole("button", {
        name: "employee.form.create",
      });
      await userEvent.click(submitButton);
      expect(mockOnSubmit).not.toHaveBeenCalled();
      expect(screen.getByText("Tên không được để trống")).toBeInTheDocument();
    });

    it("can not submit when phone is empty", async () => {
      render(
        <EmployeeForm
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          initialData={null}
        />,
      );
      const submitButton = screen.getByRole("button", {
        name: "employee.form.create",
      });
      await userEvent.click(submitButton);
      expect(mockOnSubmit).not.toHaveBeenCalled();
      expect(
        screen.getByText("Số điện thoại phải chứa 10 chữ số"),
      ).toBeInTheDocument();
    });
    it("can not submit when country is empty", async () => {
      render(
        <EmployeeForm
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          initialData={null}
        />,
      );
      const submitButton = screen.getByRole("button", {
        name: "employee.form.create",
      });
      await userEvent.click(submitButton);
      expect(mockOnSubmit).not.toHaveBeenCalled();
      expect(
        screen.getByText("Quốc gia không được để trống"),
      ).toBeInTheDocument();
    });
    it("can not submit when age is less than 18", async () => {
      render(
        <EmployeeForm
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          initialData={null}
        />,
      );
      const submitButton = screen.getByRole("button", {
        name: "employee.form.create",
      });
      const ageInput = screen.getByPlaceholderText("0");
      await userEvent.clear(ageInput);
      await userEvent.type(ageInput, "17");
      await userEvent.click(submitButton);
      expect(mockOnSubmit).not.toHaveBeenCalled();
      expect(screen.getByText("Tuổi phải từ 18")).toBeInTheDocument();
    });
    it("should toggle isAvailable checkbox", async () => {
      render(
        <EmployeeForm
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          initialData={null}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
    it("should call onSubmit with updated data in edit mode", async () => {
      const fakeEmployee = {
        id: "1",
        name: "Kratos",
        age: 30,
        phone: "0123456789",
        country: "Sparta",
        avatar: "",
        isAvailable: true,
      };
      render(
        <EmployeeForm
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          initialData={fakeEmployee}
        />,
      );
      const nameInput = screen.getByPlaceholderText(
        "employee.form.placeholderName",
      );
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, "Zeus");
      await userEvent.click(
        screen.getByRole("button", { name: "employee.form.update" }),
      );
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ name: "Zeus" }),
      );
    });
    it("should submit when form is valid", async () => {
      render(
        <EmployeeForm
          onSubmit={mockOnSubmit}
          onClose={mockOnClose}
          initialData={null}
        />,
      );

      await userEvent.type(
        screen.getByPlaceholderText("employee.form.placeholderName"),
        "Thor",
      );

      const ageInput = screen.getByDisplayValue("0");
      await userEvent.clear(ageInput);
      await userEvent.type(ageInput, "25");

      await userEvent.type(
        screen.getByPlaceholderText("employee.form.placeholderPhone"),
        "0123456789",
      );
      await userEvent.type(
        screen.getByPlaceholderText("employee.form.placeholderCountry"),
        "Asgard",
      );

      const submitButton = screen.getByRole("button", {
        name: "employee.form.create",
      });
      await userEvent.click(submitButton);
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});

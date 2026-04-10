import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import EmployeeList from "../components/employee/employee-list";
import employeeApi from "../services/employee.service";
import type { Employee } from "../types/employee.type";
import socket from "../configs/socket";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
vi.mock("../../services/employee.service", () => ({
  default: {
    list: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));
vi.mock("../../utils/socket", () => ({
  default: { on: vi.fn(), off: vi.fn(), emit: vi.fn() },
}));
vi.mock("react-hot-toast", () => ({
  default: { success: vi.fn() },
}));
vi.mock("./employee-table", () => ({
  default: ({ employees, onEdit, onDelete }: any) => (
    <div>
      {employees.map((e: Employee) => (
        <div key={e.id}>
          <span>{e.name}</span>
          <button onClick={() => onEdit(e)}>edit-{e.id}</button>
          <button onClick={() => onDelete(e.id)}>delete-{e.id}</button>
        </div>
      ))}
    </div>
  ),
}));
vi.mock("./employee-card", () => ({
  default: ({ employees }: { employees: Employee[] }) => (
    <div>
      {employees.map((e: Employee) => (
        <span key={e.id}>{e.name}</span>
      ))}
    </div>
  ),
}));
vi.mock("../language-switcher", () => ({
  default: () => <div />,
}));
const fakeEmployees: Employee[] = [
  {
    id: "1",
    name: "Kratos",
    age: 30,
    phone: "0123456789",
    country: "Sparta",
    avatar: "",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Thor",
    age: 25,
    phone: "0987654321",
    country: "Asgard",
    avatar: "",
    isAvailable: false,
  },
];

describe("Employee List Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Display employee list after API call", async () => {
    (employeeApi.list as Mock).mockResolvedValue({ data: fakeEmployees });
    render(<EmployeeList />);
    expect((await screen.findAllByText("Kratos")).length).toBeGreaterThan(0);
    expect((await screen.findAllByText("Thor")).length).toBeGreaterThan(0);
  });
  it("should show empty state when API returns empty array", async () => {
    (employeeApi.list as Mock).mockResolvedValue({ data: [] });
    render(<EmployeeList />);
    expect(
      await screen.findByText("employee.noEmployeeFound"),
    ).toBeInTheDocument();
  });
  it("should open Add form when clicking Add button", async () => {
    (employeeApi.list as Mock).mockResolvedValue({ data: [] });
    render(<EmployeeList />);
    await screen.findByText("employee.noEmployeeFound");
    await userEvent.click(screen.getByRole("button", { name: "employee.add" }));
    expect(screen.getByText("Add Employee")).toBeInTheDocument();
  });
  it("should filter employees by search text", async () => {
    (employeeApi.list as Mock).mockResolvedValue({ data: fakeEmployees });
    render(<EmployeeList />);
    await screen.findAllByText("Kratos");
    await userEvent.type(
      screen.getByPlaceholderText("employee.search"),
      "Thor",
    );
    expect(screen.queryAllByText("Kratos").length).toBe(0);
    expect(screen.getAllByText("Thor").length).toBeGreaterThan(0);
  });
  it("should call employeeApi.delete when delete button is clicked", async () => {
    (employeeApi.list as Mock).mockResolvedValue({ data: fakeEmployees });
    (employeeApi.delete as Mock).mockResolvedValue({});
    render(<EmployeeList />);
    await screen.findAllByText("Kratos");
    await userEvent.click(screen.getByRole("button", { name: "delete-1" }));
    expect(employeeApi.delete).toHaveBeenCalledWith("1");
    expect(socket.emit).toHaveBeenCalledWith("notify_change", {
      type: "delete",
      name: undefined,
    });
  });
  it("should call employeeApi.create when submitting Add form", async () => {
    (employeeApi.list as Mock).mockResolvedValue({ data: [] });
    (employeeApi.create as Mock).mockResolvedValue({});
    render(<EmployeeList />);
    await screen.findByText("employee.noEmployeeFound");
    await userEvent.click(screen.getByRole("button", { name: "employee.add" }));
    await userEvent.type(
      screen.getByPlaceholderText("employee.form.placeholderName"),
      "Hehe",
    );
    const ageInput = screen.getByPlaceholderText("0");
    await userEvent.clear(ageInput);
    await userEvent.type(ageInput, "30");
    await userEvent.type(
      screen.getByPlaceholderText("employee.form.placeholderPhone"),
      "0123456789",
    );
    await userEvent.type(
      screen.getByPlaceholderText("employee.form.placeholderCountry"),
      "Asgard",
    );
    await userEvent.click(
      screen.getByRole("button", { name: "employee.form.create" }),
    );
    expect(employeeApi.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Hehe",
        age: "30",
        phone: "0123456789",
        country: "Asgard",
        isAvailable: false,
      }),
    );
    expect(socket.emit).toHaveBeenCalledWith("notify_change", {
      type: "add",
      name: "Hehe",
    });
  });
  it("should call employeeApi.update when submitting Edit form", async () => {
    (employeeApi.list as Mock).mockResolvedValue({ data: fakeEmployees });
    (employeeApi.update as Mock).mockResolvedValue({});
    render(<EmployeeList />);
    await screen.findAllByText("Kratos");
    await userEvent.click(screen.getByRole("button", { name: "edit-1" }));
    expect(screen.getByText("Edit Employee")).toBeInTheDocument();
    const nameInput = screen.getByDisplayValue("Kratos");
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Felix");
    await userEvent.click(
      screen.getByRole("button", { name: "employee.form.update" }),
    );
    expect(employeeApi.update).toHaveBeenCalledWith(
      "1",
      expect.objectContaining({ name: "Felix" }),
    );
    expect(socket.emit).toHaveBeenCalledWith("notify_change", {
      type: "update",
      name: "Kratos",
    });
  });
  it("should close form when onClose is called", async () => {
    (employeeApi.list as Mock).mockResolvedValue({ data: [] });
    render(<EmployeeList />);
    await screen.findByText("employee.noEmployeeFound");
    await userEvent.click(screen.getByRole("button", { name: "employee.add" }));
    await userEvent.click(screen.getByText("X"));
    expect(screen.queryByText("Add Employee")).not.toBeInTheDocument();
  });
});

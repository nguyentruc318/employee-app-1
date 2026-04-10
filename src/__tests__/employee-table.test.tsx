import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EmployeeTable from "../components/employee/employee-table";
import type { Employee } from "../types/employee.type";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock("./employee-row", () => ({
  default: ({ employee }: { employee: Employee }) => (
    <tr data-testid="mock-row">
      <td>{employee.name}</td>
    </tr>
  ),
}));

const fakeEmployees: Employee[] = [
  {
    id: "1",
    name: "Kratos",
    age: 30,
    phone: "1",
    country: "S",
    avatar: "",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Thor",
    age: 25,
    phone: "2",
    country: "A",
    avatar: "",
    isAvailable: false,
  },
];

describe("EmployeeTable Component", () => {
  it("should display table headers correctly", () => {
    render(
      <EmployeeTable employees={[]} onEdit={vi.fn()} onDelete={vi.fn()} />,
    );
    expect(screen.getByText("Avatar")).toBeInTheDocument();
    expect(screen.getByText("employee.table.headerName")).toBeInTheDocument();
    expect(screen.getByText("employee.table.headerAge")).toBeInTheDocument();
    expect(screen.getByText("employee.table.headerPhone")).toBeInTheDocument();
    expect(
      screen.getByText("employee.table.headerCountry"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("employee.table.headerIsAvailable"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("employee.table.headerActions"),
    ).toBeInTheDocument();
  });

  it("should render the correct number of EmployeeRow corresponding to the data", () => {
    render(
      <EmployeeTable
        employees={fakeEmployees}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    const rows = screen.getAllByTestId("mock-row");
    expect(rows).toHaveLength(2);

    expect(screen.getByText("Kratos")).toBeInTheDocument();
    expect(screen.getByText("Thor")).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";
import { describe } from "vitest";
import EmployeeCard from "./employee-card";
import type { Employee } from "../../types/employee.type";

describe("Employee Card Component", () => {
  it("should not render employee card when employee is empty", () => {
    const { container } = render(
      <EmployeeCard employees={[]} onEdit={vi.fn()} onDelete={vi.fn()} />,
    );
    expect(container.firstChild).toBeEmptyDOMElement();
  });
  it("should render employee card when employee is not empty", () => {
    const employees: Employee[] = [
      {
        id: "1",
        name: "John Doe",
        age: 30,
        phone: "1234567890",
        country: "USA",
        avatar: "https://example.com/avatar.jpg",
        isAvailable: true,
      },
    ];
    const { container } = render(
      <EmployeeCard
        employees={employees}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(container.firstChild).not.toBeEmptyDOMElement();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./button";

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);

    // Tìm button thông qua chữ hiển thị và kiểm tra có trong document không
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("runs onClick when clicked", async () => {
    // Tạo 1 function giả (mock function)
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Submit</Button>);

    // Giả lập người dùng click
    const buttonElement = screen.getByText("Submit");
    await userEvent.click(buttonElement);

    // Kiểm tra xem hàm có được gọi chưa
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import LanguageSwitcher from "./language-switcher";
import userEvent from "@testing-library/user-event";

const mockChangeLanguage = vi.fn();
vi.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      i18n: {
        changeLanguage: mockChangeLanguage,
        language: "vi",
      },
    };
  },
}));
describe("Language Switcher Component", () => {
  it("Display a language switcher (Vietnamese & English)", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText("Tiếng Việt")).toBeInTheDocument();
    expect(screen.getByText("English (US)")).toBeInTheDocument();
  });
  it("should change language to English when user select English (US)", async () => {
    render(<LanguageSwitcher />);
    const selectELement = screen.getByRole("combobox");
    await userEvent.selectOptions(selectELement, "en");
    expect(mockChangeLanguage).toHaveBeenCalledWith("en");
  });
  it("should change language to Vietnamese when user select Vietnamese", async () => {
    render(<LanguageSwitcher />);
    const selectELement = screen.getByRole("combobox");
    await userEvent.selectOptions(selectELement, "vi");
    expect(mockChangeLanguage).toHaveBeenCalledWith("vi");
  });
});

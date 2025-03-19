import CheckBox from "@/components/atoms/CheckBox";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("CheckBox", () => {
  test("renders a checkbox element with the correct id", () => {
    render(<CheckBox id="test-checkbox" checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole("checkbox", { name: "test-checkbox" });
    expect(checkbox).toBeInTheDocument();
  });

  test('renders checked state when "checked" prop is true', () => {
    render(<CheckBox id="test-checkbox" checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole("checkbox", { name: "test-checkbox" });
    expect(checkbox).toBeChecked();
  });

  test('renders unchecked state when "checked" prop is false', () => {
    render(<CheckBox id="test-checkbox" checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole("checkbox", { name: "test-checkbox" });
    expect(checkbox).not.toBeChecked();
  });

  test("calls onChange when clicked", async () => {
    const handleChange = jest.fn();
    render(
      <CheckBox id="test-checkbox" checked={false} onChange={handleChange} />
    );
    const checkbox = screen.getByRole("checkbox", { name: "test-checkbox" });
    await userEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("renders a check icon when checked", () => {
    render(<CheckBox id="test-checkbox" checked={true} onChange={() => {}} />);
    const icon = screen.getByLabelText("test-check-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("text-black");
  });

  test("has the correct aria-checked attribute", () => {
    render(<CheckBox id="test-checkbox" checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole("checkbox", { name: "test-checkbox" });
    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });
});

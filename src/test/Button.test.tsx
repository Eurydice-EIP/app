import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/atoms/Button";

describe("Button", () => {
  it("renders a button element with children", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders a button element with an icon", () => {
    render(<Button icon={<svg />} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    const icon = screen.getByRole("img", { name: "icon" });
    expect(icon).toBeInTheDocument();
  });

  it("renders a button element with an icon on the right", () => {
    render(<Button icon={<svg />} iconPosition="right" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    const icon = screen.getByRole("img", { name: "icon" });
    expect(icon).toBeInTheDocument();
  });

  it("renders a button element with a custom class name", () => {
    render(<Button className="custom-class" />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("custom-class");
  });

  it("renders a button element with a custom type", () => {
    render(<Button type="submit" />);

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "submit");
  });
});

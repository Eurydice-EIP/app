---
sidebar_position: 3
---

# Writing Jest Tests

## Introduction

Writing Jest tests ensures that our components behave as expected and helps us maintain a reliable codebase. By following structured testing practices, we can catch bugs early, improve code quality, and create a better developer experience for our team.

---

## Test Structure

Each test should follow this structure:

```javascript
describe("Component Name", () => {
  test("Description of test case", () => {
    // Arrange: Set up the component or dependencies.
    // Act: Simulate user interaction or changes.
    // Assert: Verify the expected outcome.
  });
});
```

### Breakdown:

1. **Arrange**: Prepare the component, props, or mock dependencies required for the test.
2. **Act**: Simulate user interactions or trigger state changes.
3. **Assert**: Use Jest assertions to validate the expected outcome.

---

## Common Test Cases

### 1. Rendering the Component

Test that the component renders correctly with default or required props.

- **Example**:  
  Verify that the `Button` component renders with default props.

  ```javascript
  test("renders with default props", () => {
    render(<Button />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });
  ```

---

### 2. Handling Events

Test that user interactions, like clicks, behave as expected.

- **Example**:  
  Check if the `onClick` event handler is called when the button is clicked.

  ```javascript
  test("triggers onClick event handler", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  ```

---

### 3. Rendering Children

Test that the component correctly displays its children.

- **Example**:  
  Ensure the button displays the provided text.

  ```javascript
  test("renders children", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });
  ```

---

### 4. Testing Props

Test how the component behaves with various props, such as custom classes or additional features.

- **Example**:  
  Check that custom class names are applied.

  ```javascript
  test("applies custom class names", () => {
    render(<Button className="custom-class">Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
  ```

---

### 5. Validating Conditional Rendering

Test that conditional logic, like rendering icons, works as expected.

- **Example**:  
  Ensure an icon is rendered on the left.

  ```javascript
  test("renders an icon on the left", () => {
    render(<Button icon="⭐">Click Me</Button>);
    const icon = screen.getByRole("img", { name: "icon" });
    expect(icon).toBeInTheDocument();
    expect(icon.textContent).toBe("⭐");
  });
  ```

---

## Best Practices

1. **Be Specific**: Each test should focus on a single behavior or feature.
2. **Use Meaningful Test Names**: Clearly describe what the test is verifying.
3. **Mock Unnecessary Dependencies**: Use `jest.fn()` to mock callbacks or dependencies that are not under test.
4. **Test Accessibility**: Verify ARIA roles and labels to ensure the component is accessible.
5. **Debug with `screen.debug()`**: Use `screen.debug()` to inspect the rendered DOM during testing.

---

## Example Test File

Here is a complete test suite for the `Button` component:

```javascript
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders with default props", () => {
    render(<Button />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  test("renders children", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test("triggers onClick event handler", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders an icon on the left", () => {
    render(<Button icon="⭐">Click Me</Button>);
    const icon = screen.getByRole("img", { name: "icon" });
    expect(icon).toBeInTheDocument();
    expect(icon.textContent).toBe("⭐");
  });

  test("applies custom class names", () => {
    render(<Button className="custom-class">Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
```

---

## Benefits

- **Reliability**: Catch bugs early before they reach production.
- **Collaboration**: Ensure teammates understand how components should behave.
- **Confidence**: Refactor with confidence, knowing existing behavior is covered.

## More Documentation

- [Jest Documentation](https://jestjs.io/fr/docs/getting-started)

By adhering to these guidelines, we can write robust, maintainable, and consistent tests for our Next.js project.

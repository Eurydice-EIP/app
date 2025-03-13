---
sidebar_position: 2
---

# Atomic Design

## Introduction

Atomic Design is a methodology for creating design systems in a structured and scalable way. By breaking down interfaces into their fundamental building blocks, we can create consistent, reusable, and maintainable components that simplify development and design collaboration.

This document will guide you through the principles of Atomic Design, its structure, and how to implement it in our projects.

---

## What is Atomic Design?

Atomic Design organizes components into five distinct levels:

1. **Atoms**
2. **Molecules**
3. **Organisms**
4. **Templates**
5. **Pages**

### 1. Atoms

Atoms are the basic building blocks of the UI. They include:

- HTML elements like buttons, inputs, labels, etc.
- Small, reusable styles like colors or fonts.

**Examples:**

- A `Button` component.
- A `TextField` component.

### 2. Molecules

Molecules are simple groups of atoms working together to form a cohesive unit. They usually represent smaller, reusable pieces of functionality.

**Examples:**

- A `SearchBar` made up of an `Input` and a `Button`.
- A `LabelInput` combining a label and an input field.

### 3. Organisms

Organisms are relatively complex components made up of molecules and atoms. They form distinct sections of an interface.

**Examples:**

- A `Header` component containing a logo, navigation links, and a search bar.
- A `Card` component with an image, title, and description.

### 4. Templates (<u>You may not always need it</u>)

Templates define the layout and structure of a page without containing actual content. They use organisms, molecules, and atoms to arrange the UI.

**Examples:**

- A dashboard layout with placeholder components for navigation, main content, and a sidebar.
- A login page layout with a form and branding.

### 5. Pages

Pages are the most specific level. They apply templates with real content to create a complete user interface.

**Examples:**

- A `HomePage` filled with specific content like articles or banners.
- A `ProfilePage` showing user-specific data.

---

## Benefits of Atomic Design

1. **Consistency:** Reuse standardized components to ensure a uniform look and feel.
2. **Scalability:** Easily extend and adapt components for new features.
3. **Maintainability:** Centralized and modular components simplify debugging and updates.
4. **Collaboration:** A clear structure bridges the gap between designers and developers.

---

## How to Use Atomic Design in Our Project

### Folder Structure

Organize components in the following hierarchy:

```
src/
├── app
│   ├── layout.tsx
│   ├── page.tsx
│   └── profile
│       └── page.tsx
├── components
│   ├── atoms
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Label.tsx
│   ├── molecules
│   │   ├── SearchBar.tsx
│   │   └── LabelInput.tsx
│   ├── organisms
│   │   ├── Header.tsx
│   │   └── Card.tsx
│   └── templates
│       └── Dashboard.tsx
└── utils
    └── date.tsx
```

### Naming Conventions

1. Use **PascalCase** for component files (e.g., `Button.tsx`).
2. Use descriptive names for folders and files.

### Development Workflow

1. **Start with Atoms**:

   - Identify the smallest building blocks.
   - Create reusable and style-agnostic components.

2. **Combine into Molecules**:

   - Group atoms into simple, reusable units.
   - Ensure proper props are passed for flexibility.

3. **Build Organisms**:

   - Combine molecules and atoms to form meaningful sections.
   - Ensure components are responsive and accessible.

4. **Design Templates (<u>You may not always need a Template</u>)**:

   - Use organisms, molecules, and atoms to define layouts.
   - Avoid adding specific content; focus on structure.

5. **Finalize Pages**:
   - Add real content to templates.
   - Customize as needed for the specific page.

### Best Practices

1. **Keep It Reusable**:

   - Avoid hardcoding content in components.
   - Use props for flexibility.

2. **Document Components**:

   - Use comments and storybooks (e.g., Storybook.js) for documentation.

3. **Test Components**:

   - Write unit tests for critical components.

4. **Collaborate**:
   - Work closely with designers to ensure fidelity between designs and components.

---

## Examples

### Atom Example: Button

```tsx
const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

### Molecule Example: SearchBar

```tsx
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center space-x-2">
      <Input value={query} onChange={(e) => setQuery(e.target.value)} />
      <Button onClick={() => onSearch(query)}>Search</Button>
    </div>
  );
};

export default SearchBar;
```

---

## Conclusion

Atomic Design provides a robust framework for creating consistent and maintainable design systems. By following its principles and adhering to the guidelines in this document, we can build scalable and efficient interfaces as a team.

Let’s strive for clean, reusable, and beautiful components!

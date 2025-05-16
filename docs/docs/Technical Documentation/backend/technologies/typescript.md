---
sidebar_position: 2
---

# TypeScript

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

## Key Features

- **Code safety:** Static typing helps prevent common runtime errors.
- **Improved developer experience:** Features like IntelliSense, autocomplete, and error-checking boost productivity.
- **Scalability:** TypeScript makes it easier to maintain and scale the codebase in large projects.

## Simple Example

Here's an example of TypeScript's static typing in action:

```typescript
function add(a: number, b: number): number {
    return a + b;
}

console.log(add(5, 10));
```

What it would look like in JavaScript:

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(5, 10));
```

By defining the types of the function parameters and return value, TypeScript catches type-related errors at compile time, leading to more robust code.

## Advanced Example

We can also declare custom types and interfaces to define complex data structures and ensure consistency across the codebase.

Here's an example of defining a custom type in TypeScript:

```typescript
//Define a custom type
type Status = "pending" | "completed" | "failed";

const status: Status = "completed";

//Define generic custom type
type Response<T> = {
  data: T | null;
  error: string | null;
};

const apiResponse: Response<number> = {
  data: 42,
  error: null,
};
```

Here's an example of defining an interface in TypeScript:

```typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: 'Alice',
  age: 30,
};
```

TypeScript's type system helps catch errors early, making it easier to maintain and refactor code as the project grows.

## Error Prevention Example

Here's an example of how TypeScript can help catch errors early:

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
}

const getProduct = (productId: number): Product => {
    return {
        id: productId,
        name: 'Sample Product',
        price: 100,
    };
};

const product: Product = getProduct(1);
product.price = '200';
```

In this example, TypeScript will throw an error at compile time because we are trying to assign a string to a property that expects a number. This helps catch potential bugs before they make it to production.

## Complex Example

Here's is a more complex example of TypeScript in action:

```typescript

type Status = "pending" | "completed" | "failed";

interface Task {
  id: number;
  title: string;
  status: Status;
  dueDate?: Date;
}

function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return originalMethod.apply(this, args);
  };
}

class TaskManager<T extends Task> {
  private tasks: T[] = [];

  @Log
  addTask(task: T): void {
    this.tasks.push(task);
  }

  getTasks(status?: Status): T[] {
    if (!status) return this.tasks;
    return this.tasks.filter((task) => task.status === status);
  }
}

const manager = new TaskManager<Task>();

manager.addTask({
  id: 1,
  title: "Learn TypeScript",
  status: "pending",
});

manager.addTask({
  id: 2,
  title: "Build a project",
  status: "completed",
  dueDate: new Date(),
});

console.log(manager.getTasks("pending"));
```

In this example, we define a `Task` interface with a `Status` type that can only be one of three values. We also define a `TaskManager` class that uses a decorator to log method calls. This example showcases TypeScript's ability to define complex types, enforce constraints, and provide additional features like decorators.

What it would look like in JavaScript:

```javascript
function Log(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    console.log(`Calling ${propertyKey} with`, args);
    return originalMethod.apply(this, args);
  };
}

class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  getTasks(status) {
    if (!status) return this.tasks;
    return this.tasks.filter((task) => task.status === status);
  }
}

Object.defineProperty(TaskManager.prototype, "addTask", {
  value: Log(TaskManager.prototype, "addTask", {
    value: TaskManager.prototype.addTask,
  }).value,
});

const manager = new TaskManager();

manager.addTask({
  id: 1,
  title: "Learn TypeScript",
  status: "pending",
});

manager.addTask({
  id: 2,
  title: "Build a project",
  status: "completed",
  dueDate: new Date(),
});

console.log(manager.getTasks("pending"));
```

TypeScript's static typing, interfaces, and advanced features like decorators make it a powerful tool for building scalable and maintainable applications.
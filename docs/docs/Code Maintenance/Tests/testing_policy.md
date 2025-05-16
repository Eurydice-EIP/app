# Testing Policy

## **1. Objectives of the Testing Policy**

The purpose of this document is to define the test policies and strategies for the Eurydice project. It ensures that the project maintains high code quality, reduces bugs, improves stability, and delivers a secure and smooth user experience.

## **2. Test Types**

The following categories of tests will be implemented:

### **2.1 Unit Tests**

- **Scope**: Test isolated functions or components.
- **Tools**:
  - NestJS : Jest.
  - Flutter : flutter_test which is the default testing library for Dart.
- **Targeted Features**: Logic for task creation, XP calculation, character leveling.

### **2.2 Integration Tests**

- **Scope**: Validate that multiple components/modules interact correctly.
- **Tools**:
  - NestJS : Jest with testing utilities (e.g., Supertest for NestJS).
  - Flutter : flutter_test with mock tools such as mockito.
- **Targeted Features**: API routes handling task completion, data flow between project and dashboard.

### **2.3 End-to-End (E2E) Tests**

- **Scope**: Simulate real user behavior.
- **Tools**: Playwright (or Cypress).
- **Targeted Features**: Full journey: login → create project → add task → mark task as complete → receive reward.

### **2.4 Security and Performance Tests**

- **Security**: Manual and automated checks for authentication flow and permission management.
- **Performance**: Load testing on chat features and WebSocket communication (tools: k6 or Artillery).

## **3. Testing Integration in CI/CD Pipeline**

- **Trigger Points**: All tests are automatically executed via GitHub Actions during pull requests and pushes on the `develop` and `main` branches.
- **Build Fails**: Any failed test (unit, integration, or E2E) blocks the merge.

## **4. Code Coverage Expectations**

- **Coverage Target**: Minimum 80% line and branch coverage.
- **Tools**: Jest coverage reports; integrated into CI logs. For Flutter, use the flutter test --coverage command and tools like lcov for report visualization.
- **Reporting**: Coverage results pushed to a badge in the project README.

## **5. Deployment & Release Validation Strategy**

Before any deployment:

- Run all automated tests.
- Conduct manual exploratory tests on new features.
- Perform regression testing on key business logic and chat/guild interactions.

## **6. Documentation & Test Management**

- All test cases are versioned in the repository under `/tests` with the following structure:
  - `/unit`
  - `/integration`
  - `/e2e`
- Test instructions and conventions are documented in a `README.md` inside the `/tests` directory.
- Manual test plans and edge case documentation maintained in the shared team space (Google Docs or Notion).

---

This policy will be updated throughout the development lifecycle as the application and its features evolve.

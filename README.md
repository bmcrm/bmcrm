# BMCRM

BMCRM is a web application designed for customer relationship management. The application is built using React, TypeScript, Vite, and other modern technologies.

## Requirements

- **Node.js**: >= 18.18.0
- **npm**: >= 10.0.0

## Getting Started

### Installation

To install the dependencies, run:

```bash
npm install
```

### Development Server
To start the development server, run:

```bash
npm run dev
```

Navigate to http://localhost:5173/. The app will automatically reload if you change any of the source files.

### Build
To build the project, run:

```bash
npm run build
```

The build artifacts will be stored in the dist/ directory.

### Preview
To preview the built project, run:

```bash
npm run preview
```

### Linting
To check for linting errors, run:

```bash
npm run lint
```

To automatically fix linting errors, run:

```bash
npm run lint:fix
```

## Testing

### Unit Tests
To run unit tests, run:

```bash
npm run test:unit
```

### Component Tests
To run component tests using Playwright, run:

```bash
npm run test-ct
```

## Project Structure

The project follows the Feature-Sliced Design (FSD) methodology, as well as the BEM (Block Element Modifier) methodology for SCSS.

### Advantages of FSD

- Uniformity: Since the structure is standardized, projects become more uniform, which makes onboarding new members easier for the team.
- Stability in face of changes and refactoring: A module on one layer cannot use other modules on the same layer, or the layers above.
  This allows you to make isolated modifications without unforeseen consequences to the rest of the app.
- Controlled reuse of logic: Depending on the layer, you can make code very reusable or very local.
  This keeps a balance between following the DRY principle and practicality.
- Orientation to business and users needs: The app is split into business domains and usage of the business language is encouraged in naming, so that you can do useful product work without fully understanding all other unrelated parts of the project.

### Directory Structure

```bash
src/
├── app/               # Everything that makes the app run — routing, entrypoints, global styles, providers
├── pages/             # Full pages or large parts of a page in nested routing
├── widgets/           # Large self-contained chunks of functionality or UI
├── features/          # Reused implementations of entire product features
├── entities/          # Business entities that the project works with, like user or product
├── shared/            # Reusable functionality
├── __tests__/         # Global app tests
└── index.tsx          # Entry point
```

## License

This project is licensed under the MIT License.

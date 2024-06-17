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

### Core Principles of FSD

- Entities: Domain models and business logic.
- Features: User actions and business processes.
- Shared: Reusable components and utilities.
- App: Application-level initialization and configuration.

### Directory Structure

```bash
src/
├── app/               # Application initialization and configuration
├── entities/          # Domain models and business logic
├── features/          # User actions and business processes
├── shared/            # Reusable components and utilities
├── styles/            # Global styles and design tokens
├── index.tsx          # Entry point
└── assets/            # Static assets (e.g., images, fonts)
```

## License

This project is licensed under the MIT License.

# Agent Instructions

This repository contains a website for Rakesh Electronics. It is built using React (with typescript) and Vite, and includes a built-in CMS admin panel for content management. The website is designed to be modern and responsive, showcasing the products and services offered by Rakesh Electronics.

## Code Style & Conventions

### TypeScript
- Use **TypeScript** for all new code
- Prefer `interface` for object type definitions until `type` is specifically needed
- **Prefer type inference** over explicit typing when types can be inferred
- Use proper type annotations and avoid `any` when possible
- **Avoid importing/exporting types from other components** - use utilities like `ComponentProps` instead

### React
- Write components using **React** with TypeScript
- Use **arrow functions** for component definitions and helper functions
- Prefer functional components with hooks over class components
- **NEVER** use `React.FC` - type props directly in the function parameters
- **NEVER** import React (`import React from 'react'`) - not needed in modern React


### Imports
- Use **relative imports** instead of absolute imports
- Order imports logically: external dependencies first, then internal modules
- **NEVER** import React directly (`import React from 'react'`)
- **Always use `type` keyword** when importing types to distinguish them from runtime imports

Example:
```typescript
import type { ComponentProps } from 'react';
import { useState, type RefObject } from 'react';
import { Button } from '../components/Button';
import { helper } from './utils';
```

### ESLint
- Follow all **ESLint rules** configured in the repository
- Ensure code passes linting before suggesting it

### Styling
- Create separate `.module.css` files for component styles
- Use **CSS Modules** for scoped styles

## Project Structure

- **src/**: Main source code directory
  - **components/**: Reusable React components
  - **data/**: Static data and default values
  - **utils/**: Utility functions and helpers
  - **types/**: TypeScript type definitions
  - **hooks/**: Custom React hooks
  - **context/**: React context providers
  - **pages/**: Page components corresponding to routes 

- **server/**: Express API server for content management
  - `index.js`: Main server file with API endpoints
  - `data/`: Directory for storing data using sqlite
  - `routes/`: Directory for route handlers

## Best Practices

- Write **clean, composable code** that is easy to understand and maintain
- **Design for composability over configuration** - components should be flexible and handle diverse use-cases through composition rather than extensive configuration options
- Prefer **WET (Write Everything Twice)** code over making hasty abstractions
- Only create abstractions when patterns are well-established and clearly beneficial
- Include proper TypeScript types for all props and function parameters
- Follow React best practices and hooks guidelines
- Write self-documenting code with clear variable and function names
- Follow existing patterns in the repository
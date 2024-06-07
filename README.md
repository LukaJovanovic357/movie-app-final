# movie-app-final

## Overview

The Movie App is a Vue 3 application that allows users to browse and explore popular movies. It utilizes several modern technologies and libraries to provide a seamless and interactive user experience. Users can view detailed information about each movie, including overviews, ratings, and genres. Additionally, users can favorite movies and navigate through pages of movie listings.

## Features

- Browse popular movies with detailed overviews and ratings.
- View more details about each movie by navigating to a dedicated movie page.
- Add or remove movies from favorites.
- Pagination to navigate through different pages of movies.
- Responsive design for an optimal viewing experience on various devices.

## Dependencies

The Movie App leverages a range of dependencies to provide its functionality and improve development workflow:

### Core Dependencies

- **[Vue 3](https://vuejs.org/)**: A progressive JavaScript framework for building user interfaces.
- **Pinia**: A state management library for Vue.
- **Vue Router**: The official router for Vue.js, enabling navigation and routing in the app.

### UI and Styling

- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[Iconify](https://iconify.design/)**: An icon library with thousands of icons available for use in the app.

### API Integration

- **[The Movie Database (TMDb) API](https://developer.themoviedb.org/docs/getting-started)**: The app fetches movie data from the TMDb API. An API key is required to access the data. Follow this link to get API key: https://developer.themoviedb.org/docs/getting-started, **create** **API KEY** and add it to '.env.local' variable.

### Development and Build Tools

- **[Vite](https://vitejs.dev/)**: A build tool that provides a fast development server and optimizes the build process.
- **[TypeScript](https://www.typescriptlang.org/)**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **[ESLint](https://eslint.org/)**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- **[Prettier](https://prettier.io/)**: An opinionated code formatter to enforce a consistent style.
- **[Stylelint](https://stylelint.io/)**: A linter for CSS to help avoid errors and enforce conventions.

### Testing

- **[Vitest](https://vitest.dev/)**: A Vite-native unit testing framework.
- **@vue/test-utils**: Official Vue.js utilities for unit testing Vue components.
- **[Playwright](https://playwright.dev/)**: A framework for end-to-end testing.

### Environment Variables

- **[Dotenv](https://github.com/motdotla/dotenv)**: A zero-dependency module that loads environment variables from a `.env` file.

### TypeScript Support

- **[@tsconfig/node21](https://github.com/tsconfig/bases)**: A base TSConfig for Node.js 21.
- **[@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node)**: TypeScript definitions for Node.js.

## Scripts

The following scripts are defined in the `package.json` file:

- `dev`: Start the development server using Vite.
- `build`: Build the application for production.
- `preview`: Preview the production build locally.
- `test`: Run tests using Vitest.
- `lint:style`: Lint CSS and Vue files using Stylelint.
- `format`: Format the code using Prettier.
- `lint`: Lint JavaScript, TypeScript, and Vue files using ESLint and automatically fix issues.

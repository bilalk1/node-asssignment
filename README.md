# Node TypeScript

![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![License](https://img.shields.io/badge/License-Apache%202.0-yellow)

# **Backend Developer Assignment**

### **Overview:**

Design a RESTful API for a simple task management system. Users can create tasks, assign them to other users, mark tasks as complete, and categorize tasks.

## Features

- Node.js and TypeScript integration.
- Express.js for building RESTful APIs.
- MongoDB with Mongoose for database interactions.
- Comprehensive error handling with HTTP status codes.
- Secure your app with Helmet and CORS.
- Logging with Winston for better debugging.
- Pre-configured linting and formatting with ESLint and Prettier.
- Unit testing with Jest and Supertest.
- Postman for API documentation.
- PM2 support for production deployment.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 14.x installed.
- MongoDB (update the connection URL in the `.env` file).
- create the envirenment file using `.env.example` file.

### Installation

1. Clone the repository:

   ```bash
    git clone git@github.com:bilalk1/node-asssignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd node-asssignment
   ```

3. Install project dependencies:

   ```
   create .env file
   ```
4. Install project dependencies:

   ```bash
   npm install
   ```

### Development

To run the project in development mode, use:

```bash
npm run dev
```

This will start the server with Nodemon, which will automatically restart when you make changes to your code.

### Building for Production

To build the project for production:

```bash
npm run build
```

This will compile the TypeScript code and copy the `.env` file to the `build` folder.

To start the production server, use:

```bash
npm run start:prod
```

### Testing

To run unit tests, use:

```bash
npm test
```

To watch for changes and re-run tests, use:

```bash
npm run test:watch
```

## Linting and Formatting

- Lint your code with ESLint:

  ```bash
  npm run lint
  ```

- Automatically fix linting issues:

  ```bash
  npm run lint-fix
  ```

- Format your code with Prettier:

  ```bash
  npm run pretty
  ```
  ## Documentation

- You can find API documentation in the `docs` folder.

  ## Bonus Task

1. Switch Branch 
   ```bash
   git checkout bonus-task
   ```
2. Install project dependencies:

   ```bash
   npm install
   ```
3. Run the project 
   ```bash
   npm run dev
   ```


## Author

- [Bilal Iftikhar](https://github.com/bilalk1)

## License

This project is licensed under the [Apache License 2.0](LICENSE).

---

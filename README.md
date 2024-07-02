# Book Challenge API

## Overview

The Book Challenge API is a RESTful service for managing books, authors, and borrow records in a library system. It provides endpoints for creating, reading, updating, and deleting (CRUD) operations on books and authors, as well as managing borrow records.

---

## Features

- User authentication and authorization
- CRUD operations for books and authors
- Borrow record management
- Comprehensive error handling
- Docker Usage setup
- Unit & Integration tests for services and API endpoints

---

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Validation & Error Handling](#validation-&-error-handling)
- [Running on Docker Container](#running-on-docker-container)
- [Running Tests](#running-tests)
- [Contributing](#contributing)

---

## Getting Started

Follow these instructions to set up the project on your local machine.

## Prerequisite

- node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)
- postgreSQL (>= 12.x)
- docker (optional, for running PostgreSQL in a container)
- JWT
- express
- prisma
- moment
- typescript
- cookie parser
- cors
- dotenv

## Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/peterihimire/book-challenge-api.git
    ```
2.  Change directory into the project folder:
    ```sh
    cd book-challenge-api
    ```
3.  Install dependencies:
    ```sh
    npm install
    ```
4.  Set up the environment variables (See Environment Variables):
    Create a .env file in the root directory and add the necessary environment variables.
    ```env
    DATABASE_URL=postgresql://postgres:testing123@localhost:5432/book_app?schema=public
    PORT=8083
    JWT_KEY=evilsecret123
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=testing123
    POSTGRES_DB=book_app
    ```
5.  Run database migration:
    ```sh
    npx prisma migrate dev
    ```

## Running the Server

1.  Start the server:
    ```sh
    npm start
    # or
    yarn start
    ```
2.  Access the API documentation:
    Open your browser and navigate to  `http://localhost:8083/api/bookchallenge/v1/api-docs` to view the API documentation once connected to the localhost server or visit postman documentation [Link](https://documenter.getpostman.com/view/12340633/2sA3duGDGB) to this app.

## API Endpoints

### Authentication

- **Sign Up**: `POST /api/bookchallenge/v1/auth/signup`
- **Sign In**: `POST /api/bookchallenge/v1/auth/signin`
- **Sign Out**: `POST /api/bookchallenge/v1/auth/signout`

### Authors

- **Create Author**: `POST /api/bookchallenge/v1/authors`
- **Get All Authors**: `GET /api/bookchallenge/v1/authors`
- **Get Author by ID**: `GET /api/bookchallenge/v1/authors/:id`
- **Update Author by ID**: `PATCH /api/bookchallenge/v1/authors/:id`
- **Delete Author by ID**: `DELETE /api/bookchallenge/v1/authors/:id`

### Books

- **Create Book**: `POST /api/bookchallenge/v1/books`
- **Get All Books**: `GET /api/bookchallenge/v1/books`
- **Get Book by ID**: `GET /api/bookchallenge/v1/books/:id`
- **Update Book by ID**: `PATCH /api/bookchallenge/v1/books/:id`
- **Delete Book by ID**: `DELETE /api/bookchallenge/v1/books/:id`

### Borrow Records

- **Create Borrow Record**: `POST /api/bookchallenge/v1/borrow-records`
- **Get All Borrow Records**: `GET /api/bookchallenge/v1/borrow-records`
- **Get Borrow Record by ID**: `GET /api/bookchallenge/v1/borrow-records/:id`
- **Update Borrow Record by ID**: `PATCH /api/bookchallenge/v1/borrow-records/:id`
- **Delete Borrow Record by ID**: `DELETE /api/bookchallenge/v1/borrow-records/:id`

## Validation & Error Handling

Input validation was integrated for adding book, author and borrow record. Also the API uses a centralized error handling mechanism to ensure consistent error responses. Errors are categorized by HTTP status codes and include descriptive messages.

## Running on Docker Container

1.  Modify the env file : Replace the DATABASE_URL host `@localhost:5432`, with this `@db:5432`. `db` refers to the service name where the postgres is running in the docker container.:

```env
DATABASE_URL=postgresql://postgres:testing123@db:5432/book_app?schema=public
JWT_KEY=evilsecret123
POSTGRES_USER=postgres
POSTGRES_PASSWORD=testing123
POSTGRES_DB=book_app
```

2. Run the below command:

```sh
docker compose up --build -d
```

3. Access the Container: Open a shell in your API container.

```sh
docker exec -it book-app-challenge-api-1 /bin/bash

```

4. Run Prisma Migrate: Inside the container, navigate to the directory where your prisma folder is located and run the migration command.

```sh
npx prisma migrate deploy

```

4b. Exit from the `book-app-challenge-api-1` container

```sh
exit

```

5. Access the PostgreSQL Container: Open a shell in your PostgreSQL container.

```sh
docker exec -it book-app-challenge-db-1 /bin/bash
```

6. Use psql to Run the Script: Assuming your SQL scripts are mounted in the container, you can run them using psql.

```sh
psql -U postgres -d book_app
```

7. List all the tables.

```sh
\dt
```

8. I plan to extend the app to run on port 8080 with nginx.

## Running Test

Unit test with jest and integration test with Supertest was integrated to test both the services and the API endpooints for books, authors and borrow reports:

**NOTE:** Because all the create, update and delete routes are protected, make sure to add authentication credentials during the API integration test. You will find example usage withing the test code.

```sh
npm test
# or
yarn test
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request.

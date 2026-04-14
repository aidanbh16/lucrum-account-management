# Lucrum Account Management Service

This repository contains the Account Management Service (AMS) for Lucrum.  
It is an Express-based backend responsible for user authentication and account management.

---

## Overview

The service provides REST API endpoints for:

- User signup
- User login
- Retrieving the authenticated user
- User logout

Authentication is handled using JWT tokens stored in HTTP-only cookies.

---

## Tech Stack

- Node.js
- Express
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- Docker

---

## API Routes

### Authentication

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | /auth/signup   | Create a new user        |
| POST   | /auth/login    | Authenticate a user      |
| GET    | /auth/user     | Get current user         |
| POST   | /auth/logout   | Logout user              |

---

## Authentication Flow

- Passwords are hashed using bcrypt before storage 
- On login, a JWT is generated and stored in a cookie
- The `/auth/user` route verifies the token from cookies to return the current user

---

## Database

The service connects to PostgreSQL using a connection pool:

```ts
export const pool = new Pool({
  connectionString: env.DEV_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
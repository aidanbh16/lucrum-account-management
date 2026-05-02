# Lucrum Account Management Service

This repository contains the Account Management Service (AMS) for Lucrum, a personal finance management application. Built with Node.js, Express, and TypeScript, it is the authentication backbone of the Lucrum platform — handling user registration, login, logout, and session validation. Passwords are hashed with bcrypt before storage and validated for strength at signup. On login, a signed JWT is issued and stored in a secure HTTP-only cookie with a 7-day expiry, which the frontend and other services rely on to identify the current user. The service connects to a PostgreSQL database via a connection pool and exposes a small REST API consumed by the Lucrum frontend. It is containerized with Docker and deployed on an AWS EC2 instance, with HTTPS enforced via Nginx as a reverse proxy and SSL certificates managed by Certbot.

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
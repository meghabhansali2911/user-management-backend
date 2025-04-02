# User Management System - Backend

This is the backend for the User Management System, built with **Node.js, Express.js, MongoDB, and JWT authentication**. It includes **role-based access control (RBAC)** for Admins, Users, and Moderators.

## Features
- **User Authentication**: Register, login, and JWT-based authentication.
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Can view all users.
  - **User**: Can only view their profile.
  - **Moderator**: Can search and view users but cannot modify them.
- **Protected Routes**: Access control based on user roles.
- **Error Handling**: Proper error messages for incorrect credentials and unauthorized access.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Others**: bcrypt for password hashing, dotenv for environment variables, CORS

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/meghabhansali2911/user-management-backend.git
   cd user-management-backend

 2. Install dependencies:
   ```sh
   npm install

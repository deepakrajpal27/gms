# Grocery Management System (GMS)

A modern, full-stack web application for managing grocery inventory, categories, and orders.

## Project Structure

```
gms/
├── gms-frontend/   # React + TypeScript + Material UI frontend
├── GMSBackend/     # Java Spring Boot backend (PostgreSQL)
```

## Features
- Responsive frontend with React, TypeScript, and Material UI
- Inventory, product, category, and order management
- RESTful API backend with Spring Boot
- PostgreSQL database
- Global notifications, persistent cart, and sidebar state
- Modular, extensible codebase

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (v8+ recommended)
- Java 17+
- Maven 3.6+
- PostgreSQL

### Setup

#### 1. Backend
- See `GMSBackend/README.md` for backend setup, database configuration, and API details.

#### 2. Frontend
- See `gms-frontend/README.md` for frontend setup and usage.

### Quick Start

1. **Start PostgreSQL and create the database:**
   ```sh
   createdb -U postgres gms_db
   ```
2. **Start the backend:**
   ```sh
   cd GMSBackend
   mvn spring-boot:run
   ```
3. **Start the frontend:**
   ```sh
   cd gms-frontend
   npm install
   npm start
   ```
4. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

## Authors
- Deepak Heman Das

---
For detailed documentation, see the README files in each subproject.

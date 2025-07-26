# GMS Backend

This is the backend for the Grocery Management System (GMS), built with Java and Spring Boot.

## Features
- RESTful API for managing products, categories, inventory, and orders
- Modular architecture with service, repository, and controller layers
- CORS configuration for frontend integration
- Exception handling and validation
- Maven-based build

## Project Structure
```
GMSBackend/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/com/gms/
│   │   │   ├── config/           # CORS, data initialization, etc.
│   │   │   ├── controller/       # REST controllers
│   │   │   ├── dto/              # Data transfer objects
│   │   │   ├── model/            # JPA entities
│   │   │   ├── repository/       # Spring Data repositories
│   │   │   └── service/          # Business logic
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
└── target/
```

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Build & Run

1. **Build the project:**
   ```sh
   mvn clean install
   ```
2. **Run the application:**
   ```sh
   mvn spring-boot:run
   ```
   or
   ```sh
   java -jar target/GMSBackend-1.0-SNAPSHOT.jar
   ```

3. **API will be available at:**
   - http://localhost:8080/api

### API Endpoints
- `/api/products` - CRUD for products
- `/api/categories` - CRUD for categories
- `/api/inventory` - Inventory management
- `/api/orders` - Order management

### Configuration
- Edit `src/main/resources/application.properties` for DB and server settings.

## Database
This project uses **PostgreSQL** as its database. You can configure the connection in `src/main/resources/application.properties`.

**Default settings:**
- URL: `jdbc:postgresql://localhost:5432/gms_db`
- Username: `postgres`
- Password: `postgres`

**To get started:**
1. Make sure PostgreSQL is installed and running on your system.
2. Create the database:
   ```sh
   createdb -U postgres gms_db
   ```
   (You may need to adjust the username/password as per your setup.)
3. The application will auto-create tables on startup (see `spring.jpa.hibernate.ddl-auto=update`).

You can change the database settings in `application.properties` to match your environment.

## Development
- Uses Spring Boot DevTools for hot reload (if included in pom.xml)
- Modular code for easy extension

## Author
- Deepak Heman Das

---
For the frontend, see the `gms-frontend` directory.

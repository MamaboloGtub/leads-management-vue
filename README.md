# leads-management-vue

A comprehensive leads management system built with Vue 3 frontend and multiple backend implementation options. This application provides a modern, reactive interface for managing leads with support for both PHP and Spring WebFlux backend services.

## Architecture Overview

This leads management system follows a modern microservices architecture with multiple backend implementation options:

### Frontend
- **Vue 3** with Composition API for reactive user interfaces
- **Vite** for fast development and optimized builds
- **Pinia** for state management
- **Vue Router** for client-side routing

### Backend Options

#### PHP Backend
The PHP backend provides a traditional REST API implementation:
- **Laravel/Symfony Framework** for robust API development
- **MySQL/PostgreSQL** database support
- **JWT Authentication** for secure user sessions
- **RESTful endpoints** for CRUD operations on leads
- **Validation and sanitization** of input data
- **File upload handling** for lead attachments

**Key PHP Features:**
- Object-oriented design with proper separation of concerns
- Database migrations and seeders
- Middleware for authentication and request validation
- Exception handling and error responses
- Rate limiting and API throttling

#### Spring WebFlux Backend
The Spring WebFlux backend offers a reactive, non-blocking implementation:
- **Spring Boot 3** with WebFlux for reactive programming
- **R2DBC** for reactive database connectivity
- **MongoDB/PostgreSQL** with reactive drivers
- **WebSocket support** for real-time lead updates
- **Reactive streams** for handling high-throughput scenarios
- **JWT Authentication** with reactive security

**Key Spring WebFlux Features:**
- Non-blocking I/O for better resource utilization
- Reactive data processing with Mono and Flux
- WebSocket endpoints for real-time notifications
- Functional routing and handler functions
- Reactive validation and error handling
- Integration with reactive databases

### API Endpoints
Both backend implementations provide the same REST API interface:
```
GET    /api/leads          - List all leads with pagination
POST   /api/leads          - Create a new lead
GET    /api/leads/{id}     - Get specific lead details
PUT    /api/leads/{id}     - Update an existing lead
DELETE /api/leads/{id}     - Delete a lead
POST   /api/auth/login     - User authentication
POST   /api/auth/logout    - User logout
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

## Environment Configuration

This project uses environment variables for configuration. Before running the application:

1. Copy the example environment file:
   ```sh
   copy .env.example .env
   ```

2. Update the `.env` file with your specific configuration:
   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:8888/api
   
   # App Configuration
   VITE_APP_NAME=Leads Management System
   VITE_APP_VERSION=1.0.0
   
   # Development Features
   VITE_DEBUG_MODE=true
   ```

### Available Environment Variables

- `VITE_API_BASE_URL`: Base URL for your API endpoints (PHP: http://localhost:8000/api, Spring WebFlux: http://localhost:8080/api)
- `VITE_APP_NAME`: Application name displayed in the UI
- `VITE_APP_VERSION`: Application version
- `VITE_DEBUG_MODE`: Enable/disable debug features

## Backend Setup

### PHP Backend Setup

1. **Prerequisites:**
   ```sh
   # Install PHP 8.1+, Composer, and MySQL/PostgreSQL
   php --version
   composer --version
   ```

2. **Installation:**
   ```sh
   # Clone the PHP backend repository
   git clone [php-backend](https://github.com/MamaboloGtub/leads-management-php.git)
   cd leads-management-php
   
   # Install dependencies
   composer install
   
   # Setup environment
   cp .env.example .env
   php artisan key:generate
   
   # Run migrations
   php artisan migrate --seed
   
   # Start development server
   php artisan serve --port=8000
   ```

### Spring WebFlux Backend Setup

1. **Prerequisites:**
   ```sh
   # Install Java 17+, Maven/Gradle, and MongoDB/PostgreSQL
   java --version
   mvn --version
   ```

2. **Installation:**
   ```sh
   # Clone the Spring WebFlux backend repository
   git clone [spring-webflux](https://github.com/MamaboloGtub/leads-management-system.git)
   cd leads-management-webflux
   
   # Install dependencies and build
   mvn clean install
   
   # Setup application properties
   cp src/main/resources/application.properties.example src/main/resources/application.properties
   
   # Run the application
   mvn spring-boot:run
   # Or using Gradle: ./gradlew bootRun
   ```

3. **Configuration:**
   ```properties
   # application.properties
   server.port=8080
   spring.r2dbc.url=r2dbc:postgresql://localhost:5432/leads_db
   spring.r2dbc.username=your_username
   spring.r2dbc.password=your_password
   ```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Development Workflow

### Choosing Your Backend

1. **For Traditional Development:**
   - Use the PHP backend for familiar LAMP/LEMP stack development
   - Ideal for teams experienced with Laravel/Symfony
   - Better for applications with moderate traffic

2. **For High-Performance Applications:**
   - Use the Spring WebFlux backend for reactive, non-blocking operations
   - Ideal for applications requiring real-time features
   - Better for high-concurrency scenarios

### Full Stack Development

1. **Start your chosen backend service** (PHP on port 8888 (php -S localhost:8888 -t public) or Spring WebFlux on port 8080)
2. **Update the frontend environment** variables to point to your backend
3. **Run the Vue frontend** in development mode:
   ```sh
   npm run dev
   ```

### API Integration

The Vue frontend communicates with either backend through the same REST API interface. Switch between backends by updating the `VITE_API_BASE_URL` environment variable:

```env
# For PHP backend
VITE_API_BASE_URL=http://localhost:8000/api

# For Spring WebFlux backend
VITE_API_BASE_URL=http://localhost:8080/api
```

## Features

- **Lead Management**: Create, read, update, and delete leads
- **User Authentication**: Secure login/logout functionality
- **Real-time Updates**: Live lead updates (Spring WebFlux backend)
- **Responsive Design**: Mobile-friendly interface
- **Data Validation**: Client and server-side validation
- **Search and Filtering**: Advanced lead search capabilities
- **Export Functionality**: Export leads to various formats

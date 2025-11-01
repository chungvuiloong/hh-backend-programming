# Backend Application

Simple Spring Boot backend for fullstack application.

## Prerequisites

- Java 11 or higher
- Maven (Maven Wrapper included in the project)

## Technology Stack

- Spring Boot 2.7.18
- Spring Web
- Async HTTP Client 2.12.3

## Getting Started

### Starting the Application

From the backend directory:

```bash
./mvnw spring-boot:run
```

Or from the project root directory:

```bash
./backend/mvnw -f backend/pom.xml spring-boot:run
```

The application will start on **port 8080** by default.

### Building the Application

To build the project without running tests:

```bash
./mvnw clean package -DskipTests
```

To build with tests:

```bash
./mvnw clean package
```

### Running Tests

```bash
./mvnw test
```

## Configuration

The application configuration can be found in:
- [src/main/resources/application.properties](src/main/resources/application.properties)

Default configuration:
- Server Port: `8080`

## API Endpoints

Check the controllers in [src/main/java/com/example/backend/controller/](src/main/java/com/example/backend/controller/) for available endpoints.

## Development

### Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/example/backend/
│   │   │   └── controller/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

### Making Changes

1. Make your code changes
2. The application supports hot reload during development
3. Test your changes with `./mvnw test`
4. Run the application with `./mvnw spring-boot:run`

## Troubleshooting

### Port Already in Use

If port 8080 is already in use, you can change it in `application.properties`:

```properties
server.port=8081
```

### Permission Denied on mvnw

If you get a permission denied error, make the Maven Wrapper executable:

```bash
chmod +x mvnw
```

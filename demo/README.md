# Demo Project

A Spring Boot demo application.

## Prerequisites

- Java 11 or higher
- Maven 3.6+ (or use the included Maven wrapper)

## How to Start

### Option 1: Using Maven Wrapper (Recommended)

```bash
./mvnw spring-boot:run
```

On Windows:
```cmd
mvnw.cmd spring-boot:run
```

### Option 2: Using Maven

```bash
mvn spring-boot:run
```

### Option 3: Build and Run JAR

```bash
./mvnw clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

## Access

Once started, the application will be available at: http://localhost:8080

## Development

The application includes Spring Boot DevTools for automatic restart during development.
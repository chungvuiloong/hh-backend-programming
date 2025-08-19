# Homework01

## How to Start the Project

This is a Spring Boot project. To start it, run:

```bash
./mvnw spring-boot:run
```

Or on Windows:
```bash
mvnw.cmd spring-boot:run
```

## Port Configuration

The application runs on port **8081** by default. If you encounter a "port already in use" error:

1. Check what's using port 8080: `lsof -i :8080`
2. Kill the process: `kill <PID>` 
3. Or modify `src/main/resources/application.properties` to use a different port
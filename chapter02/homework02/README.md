# HELLO Thymeleaf Application

Spring Boot web application that handle GET request to the path /hello with two parameters called name and age. Create thymeleaf template which shows welcome message if age is greater than 18. 

IMPORTANT NOTE: I named my folder incorrectly to homework02.

## Getting Started

### Prerequisites
- Java 17 (required)
- Maven (wrapper included)

### Running the Application

1. Set Java 17 as your JAVA_HOME:
   ```bash
   export JAVA_HOME=$(/usr/libexec/java_home -v 17)
   ```

2. Start the application:
   ```bash
   ./mvnw spring-boot:run
   ```

The application will start on http://localhost:8080

### Alternative: Build and Run

```bash
./mvnw clean package
java -jar target/friendlist-0.0.1-SNAPSHOT.jar
```

### Development

The application includes Spring Boot DevTools for hot reload during development.
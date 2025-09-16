# Bookstore Application
Source: https://github.com/chungvuiloong/hh-backend-programming/tree/main/chapter04/bookstore
Spring Boot web application for managing a bookstore.


## Getting Started

### Prerequisites
- Java 17 (required)
- Maven (wrapper included)
- MongoDB Atlas account (for cloud database)
![alt text](image.png)

### Configuration

1. Create a `.env` file in the project root with your MongoDB credentials:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=YourApp
   MONGODB_DATABASE=bookstore
   ```

   **Important:** Never commit the `.env` file to version control. Add it to `.gitignore`.

### Running the Application

1. Set Java 17 as your JAVA_HOME:
   ```bash
   export JAVA_HOME=$(/usr/libexec/java_home -v 17)
   ```

2. Start the application:
   ```bash
   export JAVA_HOME=$(/usr/libexec/java_home -v 17) && ./mvnw spring-boot:run
   ```

The application will start on http://localhost:8080

### Alternative: Build and Run

```bash
./mvnw clean package
java -jar target/friendlist-0.0.1-SNAPSHOT.jar
```

### List and Kill other 
```bash
lsof -ti:8080
```

```bash
kill -9 <PID>
```

### Development

The application includes Spring Boot DevTools for hot reload during development.
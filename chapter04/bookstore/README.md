# Bookstore Application
Source: https://github.com/chungvuiloong/hh-backend-programming/tree/main/chapter04/bookstore
Spring Boot web application for managing a bookstore.


## Features (Whats working)
- Create, Read, Update, and Delete (CRUD) operations for books
![alt text](image-1.png)
- MongoDB Atlas integration (cloud database)
![alt text](image.png)
- Ask Jere for the details in .env

## Getting Started

### Prerequisites
- Java 17 (required)
- Maven (wrapper included)
- MongoDB Atlas account (for cloud database)



### Configuration

1. Create a `.env` file in the project root with your MongoDB credentials: THIS IS A BAD PRACTICE TO PUT THE DETAILS IN README. FOR THIS ASSIGNMENT. I PUT IT HERE FOR MONGODB TO WORK.
   ```
MONGODB_URI=mongodb+srv://cvl:test@bookstorecluster.38jjc1o.mongodb.net/?retryWrites=true&w=majority&appName=BookstoreCluster
MONGODB_DATABASE=bookstore
   ```

   **Important:** Never commit the `.env` file to version control. Add it to `.gitignore`.

2. The application.properties file is configured to use these environment variables:
   ```properties
   spring.data.mongodb.uri=${MONGODB_URI}
   spring.data.mongodb.database=${MONGODB_DATABASE}
   ```

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
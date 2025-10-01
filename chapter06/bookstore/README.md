# Bookstore Application
Source: https://github.com/chungvuiloong/hh-backend-programming/tree/main/chapter06/bookstore
Spring Boot web application for managing a bookstore.


## Features (Whats working)
- Create, Read, Update, and Delete (CRUD) operations for books
![alt text](image-1.png)
- Security
  - Spring Security integration with authentication for all URLs
  - Custom login page and logout functionality
  - User entity with username (unique), password, email, and role attributes
  - UserDetailsService implementation for database authentication
  - BCrypt password hashing
  - Role-based access control (USER and ADMIN roles)
  - Delete book functionality restricted to ADMIN role only
  - Display of authenticated username in the booklist page


## Getting Started

### Prerequisites
- Java 17 (required)
- Maven (wrapper included)
- MongoDB Atlas account (for cloud database)



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

## API Examples

### POST - Create a Book
```bash
curl -H "Content-Type: application/json" -X POST -d '{"title":"Test Title", "author":"Test Author"}' http://localhost:8080/api/books
```

### DELETE - Delete Books
```bash
curl -X DELETE http://localhost:8080/books/1
curl -X DELETE http://localhost:8080/books/2
curl -X DELETE http://localhost:8080/books/3
```

### Search by Author
```bash
http://localhost:8080/api/books/search/findByAuthor?author=Jukka%20Juslin
```

### Search by Title
```bash
http://localhost:8080/api/books/search/findByTitle?title=Jukka's%20Quest
```
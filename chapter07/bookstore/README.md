# Bookstore Application
Source: https://github.com/chungvuiloong/hh-backend-programming/tree/main/chapter07/bookstore
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

---

## Testing

This application includes tests for both REST endpoints and JPA repositories.

### Test Structure

```
src/test/java/bookstore/bookstore/
├── controller/
│   ├── BookControllerTest.java       - REST API tests for Book endpoints
│   └── CategoryControllerTest.java   - REST API tests for Category endpoints
└── repository/
    ├── BookRepositoryTest.java       - JPA tests for BookRepository
    ├── CategoryRepositoryTest.java   - JPA tests for CategoryRepository
    └── UserRepositoryTest.java       - JPA tests for UserRepository
```

### A. REST Test Cases

REST tests verify API endpoints using MockMvc to simulate HTTP requests.

**Example: BookControllerTest**
- Tests GET `/books` endpoint
- Tests GET `/books/{id}` endpoint
- Uses `@SpringBootTest` and `@AutoConfigureMockMvc`
- Uses `@WithMockUser` for security

**Key Annotations:**
- `@SpringBootTest` - Loads full Spring application context
- `@AutoConfigureMockMvc` - Auto-configures MockMvc for testing
- `@WithMockUser` - Mocks authenticated user for security tests
- `@Test` - Marks method as a test case

### B. JPA Repository Tests

Repository tests verify database operations (create, delete, search).

**Each repository test includes:**
- `testCreate*` - Tests entity creation
- `testDelete*` - Tests entity deletion
- `testFindBy*` - Tests search/query methods

**Key Features:**
- Uses in-memory H2 database (no external DB needed)
- Uses AssertJ for assertions
- Verifies create, delete, and search operations

### Running Tests

**Option 1: Set JAVA_HOME in the command (Recommended)**
```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home ./mvnw test -Dtest=BookRepositoryTest,CategoryRepositoryTest,UserRepositoryTest,BookControllerTest,CategoryControllerTest
```

**Option 2: Export JAVA_HOME first**
```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
./mvnw test -Dtest=BookRepositoryTest,CategoryRepositoryTest,UserRepositoryTest,BookControllerTest,CategoryControllerTest
```

**Run All Tests:**
```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home ./mvnw test
```

**Run Individual Repository Tests:**
```bash
# Test BookRepository
JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home ./mvnw test -Dtest=BookRepositoryTest

# Test CategoryRepository
JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home ./mvnw test -Dtest=CategoryRepositoryTest

# Test UserRepository
JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home ./mvnw test -Dtest=UserRepositoryTest
```

**Run REST Controller Tests:**
```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home ./mvnw test -Dtest=BookControllerTest

JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home ./mvnw test -Dtest=CategoryControllerTest
```

**Run All JPA and REST Tests:**
```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home ./mvnw test -Dtest=BookRepositoryTest,CategoryRepositoryTest,UserRepositoryTest,BookControllerTest,CategoryControllerTest
```

**Run Specific Test Method:**
```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home ./mvnw test -Dtest=BookRepositoryTest#testCreateBook

JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home ./mvnw test -Dtest=BookRepositoryTest#testDeleteBook

JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home ./mvnw test -Dtest=BookRepositoryTest#testFindByTitle
```

### Test Coverage

**Repository Tests (JPA):**
- BookRepositoryTest - Create, delete, search for books
- CategoryRepositoryTest - Create, delete, search for categories
- UserRepositoryTest - Create, delete, search for users

**Controller Tests (REST):**
- BookControllerTest - REST endpoints for books
- CategoryControllerTest - REST endpoints for categories

## Screenshot of test
![alt text](image-2.png)
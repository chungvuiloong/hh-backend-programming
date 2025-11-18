# Friendlist

> A full-stack application CRUD with a React frontend and Java Spring Boot backend. It helps users to create a list of friends, track where they meet, and make notes about new friends.

*Important* 
The frontend it is only READ
The backend it is CREATE, UPDATE, DELETE

**Live Demos:**
- Frontend: [https://project-frontend-ten-cyan.vercel.app/](https://project-frontend-ten-cyan.vercel.app/)
- Backend API: [https://friend-list-d047c88faa49.herokuapp.com/](https://friend-list-d047c88faa49.herokuapp.com/)

---

## Table of Contents

- [Technologies](#technologies)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)
  - [Start the Backend](#start-the-backend)
  - [Start Convex Development Server](#start-convex-development-server)
  - [Start the Frontend](#start-the-frontend)
- [Deployment](#deployment)
  - [Frontend Deployment](#frontend-deployment)
  - [Backend Deployment](#backend-deployment)
- [Project Structure](#project-structure)
- [Environment Variables Configuration](#environment-variables-configuration)
  - [Frontend .env File](#frontend-env-file)
  - [Backend .env File](#backend-env-file)
- [Development Notes](#development-notes)
- [Testing](#testing)
- [Challenges and Solutions](#challenges-and-solutions)
  - [Integration Challenges](#integration-challenges)
  - [Development Environment Challenges](#development-environment-challenges)
  - [Build and Deployment Challenges](#build-and-deployment-challenges)
  - [Performance Challenges](#performance-challenges)
- [Support](#support)

## Technologies

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.1 | UI framework |
| TypeScript | 4.9.5 | Type-safe JavaScript |
| Tailwind CSS | 3.4.17 | Utility-first CSS framework |
| Convex | 1.28.0 | Backend-as-a-Service for real-time data sync |
| Clerk | 5.54.0 | Authentication and user management |
| CRACO | 7.1.0 | Create React App Configuration Override |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Java | 11 | Programming language |
| Spring Boot | 2.7.18 | Backend framework |
| Spring Web | - | RESTful API development |
| Spring WebSocket | - | WebSocket support |
| Maven | - | Dependency management and build tool |
| OkHttp | 4.12.0 | HTTP client |
| dotenv-java | 3.0.0 | Environment variable management |

---

## Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Installation |
|------------|---------|--------------|
| Node.js & npm | v16 or higher | [Download](https://nodejs.org/) |
| Java Development Kit (JDK) | 11 | [Download](https://adoptium.net/) |
| Maven | v3.6 or higher | [Download](https://maven.apache.org/download.cgi) |
| Convex CLI | Latest | `npm install -g convex` |

---

## Installation

### Frontend Setup

**Step 1:** Navigate to the frontend directory
```bash
cd frontend
```

**Step 2:** Install dependencies
```bash
npm install
```

**Step 3:** Create environment file

Create a `.env.local` file in the `frontend` directory:
```env
REACT_APP_CONVEX_URL=your_convex_deployment_url
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_JWT_ISSUER_DOMAIN=your_clerk_jwt_issuer_domain
CONVEX_DEPLOYMENT=your_convex_deployment_name
REACT_APP_IP2_LOCATION_API_KEY=your_ip2location_api_key
```

> See [Environment Variables Configuration](#environment-variables-configuration) for details on obtaining these values.

### Backend Setup

**Step 1:** Navigate to the backend directory
```bash
cd backend
```

**Step 2:** Create environment file

Create a `.env` file in the `backend` directory:
```env
# Add your backend environment variables here
```

**Step 3:** Build the project
```bash
mvn clean install
```

---

## Running the Application

You need to run three services simultaneously for the application to work properly.

### 1. Start the Backend

From the `backend` directory:

**Option A: Using Maven**
```bash
mvn spring-boot:run
```

**Option B: Using Java JAR**
```bash
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

✓ Backend will start on **`http://localhost:8080`**

### 2. Start Convex Development Server

From the `frontend` directory:

```bash
npx convex dev
```

✓ This starts the Convex development server and watches for changes in your Convex functions.

### 3. Start the Frontend

From the `frontend` directory:

```bash
npm start
```

✓ Application will open at **`http://localhost:3000`**

> **Note:** The frontend is configured to proxy API requests to the backend at `http://localhost:8080`

---

## Deployment

### Frontend Deployment

1. **Build the production bundle:**
```bash
cd frontend
npm run build
```

2. **Deploy Convex to development:I cant afford paid production**
```bash
npx convex dev
```

3. **Deployed  frontend:**
- **Vercel**:
- https://project-frontend-ten-cyan.vercel.app/

4. **Environment Variables:**

Set these variables in your Vercel deployment settings:
```env
REACT_APP_CONVEX_URL=your_convex_deployment_url
CONVEX_DEPLOYMENT=your_convex_deployment_name
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_JWT_ISSUER_DOMAIN=your_clerk_jwt_issuer_domain
REACT_APP_IP2_LOCATION_API_KEY=your_ip2location_api_key
```

### Backend Deployment

1. **Deployment**
**Heroku**
- https://friend-list-d047c88faa49.herokuapp.com/


2. **Environment Variables:**
Ensure all production environment variables are properly configured on your hosting platform.

## Project Structure

```
project/
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   ├── public/        # Static files
│   ├── convex/        # Convex backend functions
│   └── package.json   # Frontend dependencies
└── backend/           # Spring Boot backend
    ├── src/           # Java source files
    └── pom.xml        # Maven configuration
```

## Environment Variables Configuration

### Frontend .env File

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
# Convex Configuration
REACT_APP_CONVEX_URL=your_convex_deployment_url
CONVEX_DEPLOYMENT=your_convex_deployment_name

# Clerk Authentication
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_JWT_ISSUER_DOMAIN=your_clerk_jwt_issuer_domain

# IP Geolocation API
REACT_APP_IP2_LOCATION_API_KEY=your_ip2location_api_key
```

**How to get these values:**
- **REACT_APP_CONVEX_URL**: Run `npx convex dev` in the frontend directory. The URL will be displayed in the terminal
- **CONVEX_DEPLOYMENT**: Your Convex deployment name (e.g., "dev:friendly-animal-123")
- **REACT_APP_CLERK_PUBLISHABLE_KEY**: Get this from your Clerk dashboard at https://dashboard.clerk.com
- **CLERK_JWT_ISSUER_DOMAIN**: Your Clerk issuer domain (found in Clerk dashboard under JWT Templates)
- **REACT_APP_IP2_LOCATION_API_KEY**: Get this from your IP2Location account at https://www.ip2location.io/

### Backend .env File

Create a `.env` file in the `backend` directory with the following variables:

```env
# OpenWeather API Configuration
OPEN_WEATHER_API_KEY=your_openweather_api_key

# Convex Configuration
CONVEX_URL=your_convex_url

# IP2Location API Configuration
IP2_LOCATION_API_KEY=your_ip2location_api_key

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Auth Configuration
AUTH_GOOGLE_ID=your_google_auth_id
AUTH_GOOGLE_SECRET=your_google_auth_secret

# Site Configuration
SITE_URL=your_site_url
```

**Important Notes:**
- Never commit `.env` or `.env.local` files to version control
- Both files are already included in `.gitignore`
- For production deployments, set these variables in your hosting platform's environment settings

## Development Notes

- The frontend runs on port `3000`
- The backend runs on port `8080`
- API requests from frontend are proxied to the backend
- Convex handles real-time data synchronization
- Clerk manages authentication and user sessions

---

## Testing

### Backend Tests

The backend includes comprehensive unit tests for controllers and services using JUnit 5 and Spring Boot Test.

**Test Files:**
- `UserControllerTest.java`

**Run All Tests:**
```bash
cd backend
mvn test
```

**Run Specific Test Class:**
```bash
mvn test -Dtest=UserControllerTest
```

**Run Tests with Coverage:**
```bash
mvn clean test
```

**Test Coverage:**


---

## Challenges and Solutions

### Frontend 
**Challenge: Database didn't work locally every now and then**
- The local front deploy didn't always work and didn't add, update, delete. 
- Solution: I found the issue where i didnt code it correctly to use the java heroku url. 


Problem: This is the previous code.
```
const response = await fetch(`http://localhost:8080/convex/friend/${userId}
const response = await fetch(`http://localhost:8080/convex/update/friend/${userId}
```

Solution: This is the correct code.
```
const response = await fetch(`${url}/convex/friend/${userId}`,
const response = await fetch(`${url}/convex/update/friend/${userId}`,
```

**Challenge: Calling API in frontend**
- Previously used axios for CRUD operations. Later found out traditional fetch was 2X time quicker Source: https://medium.com/@Krishnajlathi/axios-vs-fetch-4-fetch-api-tricks-that-made-my-front-end-2-faster-fc558d254dba
- Uninstalled Axios. Changed all axios into javascript equivalent.

**Challenge: Authentication Flow with Clerk**
- Synchronizing user authentication state across frontend and backend
- Solution: Use Clerk's JWT tokens and validate them on both the frontend and backend when needed

**Challenge: Real-time Data Synchronization**
- Managing real-time updates efficiently with Convex
- Solution: Optimize Convex queries, use proper indexing, and implement efficient subscription patterns


### Backend
**Challenge: Backend Deployment for heroku**
- Due to unique route in Github for this project (hh/project/backend), deploying was difficult and challenging. It cant be selected from the Heroku dashboard.
- It has be manually setup from the backend folder using terminal with heroku. It was done more than 5 times before deployment via heroku worked.

**Challenge: Calling LOCATION API from Java deployment is always Ireland Dublin.**
- The java is deployed via heroku. It get the location of where the location of server deploying my Java backend. It is always Ireland Dublin.
- Solution: Change the codebase to detect location of external request than location request. it is public static String getClientIpAddress(HttpServletRequest request)

**Challenge: Calling LOCATION API from Java deployment.Country is correct. Inconsistent city.**
- The java is deployed via heroku. Users can get the location of their current location countyr and city. Country has been generally accurate. City is inconsistent. For far, I have been getting Helsinki, Finland but sometimes I get Hamina, Finland
- Solution: In process.

**Challenge: CORS Issues**
- Cross-Origin Resource Sharing errors between frontend and backend
- Solution: Configure CORS in Spring Boot with proxy setting for both local and deployed site.

**Challenge: WebSocket Implementation**
- Difficulty implementing WebSocket in Java backend and frontend to get real-time data from Convex
- Result: code didn't work
- Solution: Websocket is still in process. Instead Used Convex reactive backend as data source. CRUD works reactively. And can get data in real time.

---

## Support
For issues or questions, please refer to the documentation:
- [React Documentation](https://react.dev/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Convex Documentation](https://docs.convex.dev/)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

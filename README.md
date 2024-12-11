# 
# User Authentication Application (Node.js + React)

This is a full-stack web application that allows users to register, log in, and view their details. The frontend is built using React, and the backend is built using Node.js and Express. The app uses JWT (JSON Web Tokens) for secure authentication and MongoDB for storing user data.

### Features Implemented:

-   **User Registration**: Users can create an account by providing their name, email, and password.
-   **User Login**: Registered users can log in with their email and password.
-   **Frontend**: Built using React (with Redux for state management in progress).
-   **Backend**: Built using Node.js, Express, and MongoDB.
-   **JWT Authentication**: JWT tokens are used to secure API endpoints.
-   **Email Validation**: Frontend validates email format, and password length before submission.

### Features to be Implemented (next MVP's):
-   **Unit Testing**: Jest and React Testing Library are used to test the frontend. (in progress)
-   **Redux for State Management** (coming soon): State management for authentication and user details.
-   **Navigation**: Navigation back to the profile page after login.
-   **Password Validation**: Additional password validation such as checking for special characters.
-   **Email Confirmation**: Adding an email confirmation feature to verify email addresses during registration.
-   **Deployment**: The application will be deployed to a hosting platform.
-   **Responsive**: e.g adding media queries, currently desktop first.

### Pages and Components:

-   **Registration Page**: Users can register with their name, email, password, and confirm password.
-   **Login Page**: Users can log in using their email and password.
-   **Landing Page** : Displays user details after successful registration or login.
-   **Homepage**: Displays a welcome message and dummy content, including navigation.
-   **Header component**: Navigation links within header.

### API Endpoints:

-   **POST /user/register**: Registers a new user.
-   **POST /user/login**: Logs in an existing user and returns a JWT token.
-   **GET /user** : Fetches user details after successful login.

### Technologies Used:

-   **Frontend**:
    -   React
    -   Redux (coming soon for state management)
    -   React Router for navigation
    -   Jest and React Testing Library for unit testing (coming soon)
-   **Backend**:
    -   Node.js
    -   Express
    -   MongoDB 
    -   JWT for authentication
    -   Bcrypt for password hashing
-   **Testing**: (coming soon)
    -   Jest
    -   React Testing Library
    -   Supertest for backend testing 
    
## Installation & Setup (local)

### Prerequisites:

-   **Node.js** installed on your machine. 
-   **MongoDB** ( I used mongoDB atlas)

### 1. Clone the repository

Clone the repository to your local machine:

`git clone https://github.com/yourusername/your-repository-name.git
cd your-repository-name` 

### 2. Set up the Backend (Node.js)

1.  Navigate to the backend directory:
    
    `cd backend` 
    
2.  Install dependencies:
    
    
    `npm install` 
    
3.  Create a `.env` file in the `backend` directory with the following environment variables:
    
    `MONGODB_URI=Insert MongoDB URI here
    JWT_SECRET=Create your own secret key here` 
    
    -   **MONGODB_URI**: Insert your MongoDB connection URI (e.g., `mongodb://localhost:27017/your-db-name`).
    -   **JWT_SECRET**: Create a secret key for JWT token generation. This can be any random string (e.g., `mysecretkey`).
    
4.  Create and start the server:
    
    In the `backend` directory, run server.js:
    
    `npm server.js` 
    
    The backend will now be running at `http://localhost:5000`.
    

### 3. Set up the Frontend (React)

1.  Navigate to the frontend directory:
    
    `cd frontend` 
    
2.  Install dependencies:
   
    `npm install` 
    
3.  Start the frontend development server:
    
    `npm start` 
    
    The frontend will now be running at `http://localhost:3000`.
    

### 4. Running Tests (Soon)

To run the tests, use the following command in both the frontend and backend terminals:

`npm test` 

This will run Jest and execute the unit tests.

## Usage

Once both the backend and frontend servers are running, you can open your browser and navigate to:

-   **Frontend**: `http://localhost:3000`
-   **Backend**: `http://localhost:5000`

### Registering a New User

-   Navigate to the registration page and fill out the registration form with your name, email, password, and confirm password.
- Form validation implemented to ensure only valid emails can be submitted, passwords need a minimum of 6 character and both passwords must match. 
-   Upon submission, the frontend will send a `POST` request to the backend's `/user/register` API.

### Logging In

-   Navigate to the login page, enter your email and password, and click "Login."
- Similar form validation to the registration page.
-   Upon successful login, the user will be redirected to the landing page.

### Accessing User Details

-   After logging in, the user's details will be fetched from the backend via the `/user` endpoint (optional feature).
- Can only access user details when you are logged in (protected route).


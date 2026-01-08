# Employee Management System

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for managing employee records with authentication, CRUD operations, and role-based access control.

## Features

### Backend Features
- ✅ RESTful API using Node.js and Express.js
- ✅ MongoDB database with Mongoose for data modeling
- ✅ JWT-based authentication
- ✅ Role-based access control (Admin/User)
- ✅ Complete CRUD operations for employee management
- ✅ Server-side data validation
- ✅ Search and filter functionality
- ✅ Secure password hashing with bcryptjs
- ✅ CORS enabled for cross-origin requests

### Frontend Features
- ✅ Responsive UI built with React.js
- ✅ Bootstrap 5 for styling
- ✅ React Router for navigation
- ✅ Client-side form validation
- ✅ Authentication context for state management
- ✅ Protected routes
- ✅ Employee list, add, edit, and delete functionality
- ✅ Search and filter by department and status
- ✅ Role-based UI rendering

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS
- dotenv

**Frontend:**
- React.js
- React Router DOM
- Axios
- Bootstrap 5

## Project Structure

```
employee-management-system/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── employeeController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Employee.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── employeeRoutes.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── EmployeeForm.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   └── Dashboard.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud database)
- **npm** or **yarn** package manager

## Installation & Setup

### 1. Clone or Navigate to the Project Directory

```bash
cd employee-management-system
```

### 2. Backend Setup

#### Install Backend Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
MONGO_URI=mongodb://localhost:27017/employee-management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```

**MongoDB Options:**
- **Local MongoDB:** `mongodb://localhost:27017/employee-management`
- **MongoDB Atlas:** Get your connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/employee-management?retryWrites=true&w=majority`

**JWT_SECRET:** Change this to a strong, random string in production.

### 3. Frontend Setup

#### Install Frontend Dependencies

Open a new terminal window and run:

```bash
cd frontend
npm install
```

## Running the Application

### Start MongoDB (if using local MongoDB)

```bash
mongod
```

### Start the Backend Server

In the `backend` directory:

```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

The backend server will run on **http://localhost:5000**

### Start the Frontend Development Server

In a new terminal, from the `frontend` directory:

```bash
npm start
```

The frontend will run on **http://localhost:3000** and automatically open in your browser.

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Employee Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/employees` | Get all employees | Private |
| GET | `/api/employees/:id` | Get employee by ID | Private |
| POST | `/api/employees` | Create new employee | Private (Admin) |
| PUT | `/api/employees/:id` | Update employee | Private (Admin) |
| DELETE | `/api/employees/:id` | Delete employee | Private (Admin) |
| GET | `/api/employees/search` | Search employees | Private |

## Usage

### 1. Register a New User

- Navigate to http://localhost:3000/register
- Fill in username, email, and password
- First user should be registered as admin (you can modify the role in the database)

### 2. Login

- Go to http://localhost:3000/login
- Enter your credentials
- You'll be redirected to the dashboard

### 3. Manage Employees (Admin Only)

**Add Employee:**
- Click "Add New Employee" button
- Fill in all required fields
- Submit the form

**Edit Employee:**
- Click "Edit" button on any employee row
- Update the information
- Save changes

**Delete Employee:**
- Click "Delete" button on any employee row
- Confirm the deletion

**Search & Filter:**
- Use the search bar to find employees by name, email, or position
- Filter by department or status
- Click "Reset Filters" to clear all filters

### 4. User Roles

- **Admin:** Can create, read, update, and delete employees
- **User:** Can only view employee list

## Setting Up Admin User

After registering your first user, you need to manually set them as admin:

**Using MongoDB Shell:**
```javascript
use employee-management
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

**Using MongoDB Compass:**
1. Connect to your database
2. Navigate to the `users` collection
3. Find your user document
4. Change the `role` field from "user" to "admin"

## Data Validation

### Employee Schema Validation

- **First Name:** Required, minimum 2 characters
- **Last Name:** Required, minimum 2 characters
- **Email:** Required, valid email format, unique
- **Phone:** Required, 10 digits
- **Department:** Required, must be one of: IT, HR, Finance, Marketing, Sales, Operations, Engineering
- **Position:** Required
- **Salary:** Required, positive number
- **Date of Joining:** Required
- **Status:** Active, Inactive, or On Leave
- **Address:** Optional fields (street, city, state, zipCode)

### User Schema Validation

- **Username:** Required, unique, minimum 3 characters
- **Email:** Required, unique, valid email format
- **Password:** Required, minimum 6 characters (hashed)
- **Role:** admin or user (default: user)

## Security Features

- Password hashing using bcryptjs
- JWT token authentication
- Protected API routes
- Role-based access control
- Input validation (client and server-side)
- CORS configuration
- Secure HTTP headers

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check your `MONGO_URI` in `.env` file
- For MongoDB Atlas, ensure your IP is whitelisted

**Port Already in Use:**
- Change the `PORT` in `.env` file
- Or kill the process using port 5000

### Frontend Issues

**API Connection Error:**
- Ensure backend server is running on port 5000
- Check the proxy configuration in `frontend/package.json`

**Dependencies Error:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Future Enhancements

- Export employee data to Excel/CSV
- Email notifications
- Advanced analytics dashboard
- Employee profile pictures
- Pagination for large datasets
- Advanced search filters
- Department management
- Attendance tracking
- Performance reviews

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any queries or support, please contact the development team.

---

**Note:** This is a portfolio/demonstration project. Ensure proper security measures before deploying to production.


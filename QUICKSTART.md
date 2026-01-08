# Quick Start Guide

Follow these steps to get the Employee Management System running:

## Prerequisites
- Node.js installed
- MongoDB installed (or MongoDB Atlas account)

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd C:\Users\FAIJ\employee-management-system\backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd C:\Users\FAIJ\employee-management-system\frontend
npm install
```

## Running the Application

### Option 1: Using Local MongoDB

**Terminal 1 - Start MongoDB:**
```bash
mongod
```

**Terminal 2 - Start Backend:**
```bash
cd C:\Users\FAIJ\employee-management-system\backend
npm start
```

**Terminal 3 - Start Frontend:**
```bash
cd C:\Users\FAIJ\employee-management-system\frontend
npm start
```

### Option 2: Using MongoDB Atlas

1. Get your MongoDB Atlas connection string
2. Edit `backend\.env` and update `MONGO_URI` with your connection string
3. Run backend and frontend as shown above

## First Time Setup

1. Open browser at http://localhost:3000
2. Click "Register" and create your first user
3. Open MongoDB and set your user role to "admin":
   ```javascript
   use employee-management
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```
4. Log out and log back in
5. You can now add employees!

## Default Ports
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Common Issues

**"Cannot connect to MongoDB":**
- Make sure MongoDB is running
- Check your MONGO_URI in backend\.env

**"Port 5000 is already in use":**
- Change PORT in backend\.env to another port (e.g., 5001)

**Frontend can't connect to backend:**
- Make sure backend is running on port 5000
- Check console for errors

## Testing the Application

1. **Register:** Create a new user account
2. **Login:** Sign in with your credentials
3. **Add Employee:** Click "Add New Employee" (admin only)
4. **Search:** Use the search bar to find employees
5. **Filter:** Filter by department or status
6. **Edit:** Update employee information (admin only)
7. **Delete:** Remove employees (admin only)

## Project Structure Summary

```
employee-management-system/
├── backend/          # Node.js + Express API
├── frontend/         # React application
├── README.md         # Detailed documentation
└── QUICKSTART.md     # This file
```

For more detailed information, see README.md


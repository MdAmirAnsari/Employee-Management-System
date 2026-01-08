const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} = require('../controllers/employeeController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// @route   GET /api/employees/search
// @desc    Search employees
// @access  Private
router.get('/search', searchEmployees);

// @route   GET /api/employees
// @desc    Get all employees
// @access  Private
router.get('/', getAllEmployees);

// @route   GET /api/employees/:id
// @desc    Get employee by ID
// @access  Private
router.get('/:id', getEmployeeById);

// @route   POST /api/employees
// @desc    Create new employee
// @access  Private (Admin only)
router.post('/', adminMiddleware, createEmployee);

// @route   PUT /api/employees/:id
// @desc    Update employee
// @access  Private (Admin only)
router.put('/:id', adminMiddleware, updateEmployee);

// @route   DELETE /api/employees/:id
// @desc    Delete employee
// @access  Private (Admin only)
router.delete('/:id', adminMiddleware, deleteEmployee);

module.exports = router;


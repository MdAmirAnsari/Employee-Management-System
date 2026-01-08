import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import EmployeeForm from '../components/EmployeeForm';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getAll();
      setEmployees(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (employeeData) => {
    try {
      await employeeAPI.create(employeeData);
      setShowForm(false);
      fetchEmployees();
      alert('Employee added successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add employee');
    }
  };

  const handleUpdateEmployee = async (employeeData) => {
    try {
      await employeeAPI.update(editingEmployee._id, employeeData);
      setShowForm(false);
      setEditingEmployee(null);
      fetchEmployees();
      alert('Employee updated successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update employee');
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(id);
        fetchEmployees();
        alert('Employee deleted successfully');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete employee');
      }
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.query = searchQuery;
      if (filterDepartment) params.department = filterDepartment;
      if (filterStatus) params.status = filterStatus;

      const response = await employeeAPI.search(params);
      setEmployees(response.data.data);
    } catch (err) {
      setError('Failed to search employees');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setFilterDepartment('');
    setFilterStatus('');
    fetchEmployees();
  };

  const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Engineering'];
  const statuses = ['Active', 'Inactive', 'On Leave'];

  if (showForm) {
    return (
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h3>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h3>
          </div>
          <div className="card-body">
            <EmployeeForm
              employee={editingEmployee}
              onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
              onCancel={() => {
                setShowForm(false);
                setEditingEmployee(null);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Dashboard</h2>
        {isAdmin() && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Add New Employee
          </button>
        )}
      </div>

      {/* Search and Filter Section */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, or position"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <select
                className="form-select"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2 mb-3">
              <button className="btn btn-primary w-100" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={handleReset}>
            Reset Filters
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Employee List ({employees.length} employees)
            </h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Salary</th>
                    {isAdmin() && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {employees.length === 0 ? (
                    <tr>
                      <td colSpan={isAdmin() ? "8" : "7"} className="text-center">
                        No employees found
                      </td>
                    </tr>
                  ) : (
                    employees.map((employee) => (
                      <tr key={employee._id}>
                        <td>{employee.firstName} {employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.department}</td>
                        <td>{employee.position}</td>
                        <td>
                          <span className={`badge ${
                            employee.status === 'Active' ? 'bg-success' :
                            employee.status === 'Inactive' ? 'bg-danger' : 'bg-warning'
                          }`}>
                            {employee.status}
                          </span>
                        </td>
                        <td>${employee.salary.toLocaleString()}</td>
                        {isAdmin() && (
                          <td>
                            <button
                              className="btn btn-sm btn-info me-2"
                              onClick={() => handleEdit(employee)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteEmployee(employee._id)}
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


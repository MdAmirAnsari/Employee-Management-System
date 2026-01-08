import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    dateOfJoining: '',
    status: 'Active',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        ...employee,
        dateOfJoining: employee.dateOfJoining ? employee.dateOfJoining.split('T')[0] : ''
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    if (!formData.position) {
      newErrors.position = 'Position is required';
    }
    if (!formData.salary || formData.salary <= 0) {
      newErrors.salary = 'Valid salary is required';
    }
    if (!formData.dateOfJoining) {
      newErrors.dateOfJoining = 'Date of joining is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Engineering'];
  const statuses = ['Active', 'Inactive', 'On Leave'];

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">First Name *</label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Last Name *</label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Phone *</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10 digits"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Department *</label>
          <select
            className={`form-select ${errors.department ? 'is-invalid' : ''}`}
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <div className="invalid-feedback">{errors.department}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Position *</label>
          <input
            type="text"
            className={`form-control ${errors.position ? 'is-invalid' : ''}`}
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
          {errors.position && <div className="invalid-feedback">{errors.position}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Salary *</label>
          <input
            type="number"
            className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
          {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Date of Joining *</label>
          <input
            type="date"
            className={`form-control ${errors.dateOfJoining ? 'is-invalid' : ''}`}
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
          />
          {errors.dateOfJoining && <div className="invalid-feedback">{errors.dateOfJoining}</div>}
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <h5 className="mt-3 mb-3">Address (Optional)</h5>
      <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">Street</label>
          <input
            type="text"
            className="form-control"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Zip Code</label>
          <input
            type="text"
            className="form-control"
            name="address.zipCode"
            value={formData.address.zipCode}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {employee ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;


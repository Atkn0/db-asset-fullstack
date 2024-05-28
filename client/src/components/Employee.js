import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeTable from './EmployeeTable';


function Employee() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Employees</h1>
      <EmployeeTable></EmployeeTable>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Employee;

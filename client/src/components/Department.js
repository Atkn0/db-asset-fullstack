import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DepartmentTable from './DepartmentTable';


function Department() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('/api/departments')
      .then(response => setDepartments(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Departments</h1>
      <DepartmentTable></DepartmentTable>
      <ul>
        {departments.map(department => (
          <li key={department.id}>{department.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Department;

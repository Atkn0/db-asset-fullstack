import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SoftwareTable from './SoftwareTable';


function Software() {
  const [software, setSoftware] = useState([]);

  useEffect(() => {
    axios.get('/api/software')
      .then(response => setSoftware(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Software</h1>
      <SoftwareTable></SoftwareTable>
      <ul>
        {software.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Software;

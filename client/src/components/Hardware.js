import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HardwareTable from './HardwareTable';


function Hardware() {
  const [hardware, setHardware] = useState([]);

  useEffect(() => {
    axios.get('/api/hardware')
      .then(response => setHardware(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Hardware</h1>
      <HardwareTable></HardwareTable>
      <ul>
        {hardware.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Hardware;

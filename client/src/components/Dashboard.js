import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardTable from './DashboardTable';


function Dashboard() {
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    axios.get('/api/dashboard')
      .then(response => setDashboard(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardTable></DashboardTable>
      <ul>
        {dashboard.map(dashboard => (
          <li key={dashboard.id}>{dashboard.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

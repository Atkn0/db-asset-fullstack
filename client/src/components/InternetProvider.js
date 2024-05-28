import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProviderTable from './ProviderTable';


function InternetProvider() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    axios.get('/api/internet-providers')
      .then(response => setProviders(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Internet Providers</h1>
      <ProviderTable></ProviderTable>
      <ul>
        {providers.map(provider => (
          <li key={provider.id}>{provider.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default InternetProvider;

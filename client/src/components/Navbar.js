import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Asset Management System
        </Typography>
        
        <Button color="inherit" component={Link} to="/employee">Employee</Button>
        <Button color="inherit" component={Link} to="/hardware">Hardware</Button>
        <Button color="inherit" component={Link} to="/department">Department</Button>
        <Button color="inherit" component={Link} to="/internet-provider">Internet Provider</Button>
        <Button color="inherit" component={Link} to="/software">Software</Button>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>        
      </Toolbar>
    </AppBar>
  );
  
}

export default Navbar;

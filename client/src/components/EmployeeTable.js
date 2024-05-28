import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';

const initialEmployeeData = [
  {
    Employee_id: 1,
    FName: 'John',
    MName: 'A',
    LName: 'Doe',
    Gender: 'Male',
    Phone_number: '123-456-7890',
    Personal_mail: 'john.doe@example.com',
    Hardware_id: 101,
    Software_id: 201
  },
  {
    Employee_id: 2,
    FName: 'Jane',
    MName: 'B',
    LName: 'Smith',
    Gender: 'Female',
    Phone_number: '987-654-3210',
    Personal_mail: 'jane.smith@example.com',
    Hardware_id: 102,
    Software_id: 202
  }
];

function EmployeeTable() {
  const [employees, setEmployees] = useState(initialEmployeeData);
  const [open, setOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleClickOpen = (employee) => {
    setIsEditing(true);
    setCurrentEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEmployee({});
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (isEditing) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.Employee_id === currentEmployee.Employee_id ? currentEmployee : emp))
      );
    } else {
      setEmployees((prev) => [
        ...prev,
        { ...currentEmployee, Employee_id: prev.length + 1 }
      ]);
    }
    handleClose();
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentEmployee({
      Employee_id: '',
      FName: '',
      MName: '',
      LName: '',
      Gender: '',
      Phone_number: '',
      Personal_mail: '',
      Hardware_id: '',
      Software_id: ''
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.Employee_id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" onClick={handleAddNew}>
        Add New Employee
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Middle Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Personal Mail</TableCell>
            <TableCell>Hardware ID</TableCell>
            <TableCell>Software ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.Employee_id}>
              <TableCell>{employee.Employee_id}</TableCell>
              <TableCell>{employee.FName}</TableCell>
              <TableCell>{employee.MName}</TableCell>
              <TableCell>{employee.LName}</TableCell>
              <TableCell>{employee.Gender}</TableCell>
              <TableCell>{employee.Phone_number}</TableCell>
              <TableCell>{employee.Personal_mail}</TableCell>
              <TableCell>{employee.Hardware_id}</TableCell>
              <TableCell>{employee.Software_id}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickOpen(employee)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(employee.Employee_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="FName"
            label="First Name"
            type="text"
            fullWidth
            value={currentEmployee.FName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="MName"
            label="Middle Name"
            type="text"
            fullWidth
            value={currentEmployee.MName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="LName"
            label="Last Name"
            type="text"
            fullWidth
            value={currentEmployee.LName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Gender"
            label="Gender"
            type="text"
            fullWidth
            value={currentEmployee.Gender}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Phone_number"
            label="Phone Number"
            type="text"
            fullWidth
            value={currentEmployee.Phone_number}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Personal_mail"
            label="Personal Mail"
            type="email"
            fullWidth
            value={currentEmployee.Personal_mail}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Hardware_id"
            label="Hardware ID"
            type="text"
            fullWidth
            value={currentEmployee.Hardware_id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Software_id"
            label="Software ID"
            type="text"
            fullWidth
            value={currentEmployee.Software_id}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default EmployeeTable;

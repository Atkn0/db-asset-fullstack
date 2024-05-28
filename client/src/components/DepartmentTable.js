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

const initialDepartmentData = [
  {
    Department_id: 1,
    Department_name: 'Human Resources'
  },
  {
    Department_id: 2,
    Department_name: 'Engineering'
  }
];

function DepartmentTable() {
  const [departments, setDepartments] = useState(initialDepartmentData);
  const [open, setOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleClickOpen = (department) => {
    setIsEditing(true);
    setCurrentDepartment(department);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDepartment({});
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentDepartment((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (isEditing) {
      setDepartments((prev) =>
        prev.map((dept) => (dept.Department_id === currentDepartment.Department_id ? currentDepartment : dept))
      );
    } else {
      setDepartments((prev) => [
        ...prev,
        { ...currentDepartment, Department_id: prev.length + 1 }
      ]);
    }
    handleClose();
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentDepartment({
      Department_id: '',
      Department_name: ''
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setDepartments((prev) => prev.filter((dept) => dept.Department_id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" onClick={handleAddNew}>
        Add New Department
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Department ID</TableCell>
            <TableCell>Department Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((department) => (
            <TableRow key={department.Department_id}>
              <TableCell>{department.Department_id}</TableCell>
              <TableCell>{department.Department_name}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickOpen(department)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(department.Department_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Department' : 'Add New Department'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="Department_name"
            label="Department Name"
            type="text"
            fullWidth
            value={currentDepartment.Department_name}
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

export default DepartmentTable;

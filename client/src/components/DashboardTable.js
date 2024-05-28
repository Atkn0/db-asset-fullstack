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

const initialDashboardData = [
  {
    id: 1,
    question: "What are the oldest and newest hardware in our company?",
    answer: "Oldest: Laptop A, Newest: Desktop B"
  },
  {
    id: 2,
    question: "Which department has the most employees?",
    answer: "Engineering"
  },
  {
    id: 3,
    question: "What is the hardware used actively by an employee for the longest time?",
    answer: "Desktop C used by John Doe"
  },
  {
    id: 4,
    question: "What is the female-to-male ratio of employees in the company?",
    answer: "2:3"
  },
  {
    id: 5,
    question: "What is the most common asset type in the company?",
    answer: "Laptops"
  }
];

function DashboardTable() {
  const [dashboard, setDashboard] = useState(initialDashboardData);
  const [open, setOpen] = useState(false);
  const [currentDashboard, setCurrentDashboard] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleClickOpen = (dashboard) => {
    setIsEditing(true);
    setCurrentDashboard(dashboard);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDashboard({});
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentDashboard((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (isEditing) {
      setDashboard((prev) =>
        prev.map((dash) => (dash.id === currentDashboard.id ? currentDashboard : dash))
      );
    } else {
      setDashboard((prev) => [
        ...prev,
        { ...currentDashboard, id: prev.length + 1 }
      ]);
    }
    handleClose();
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentDashboard({
      id: '',
      question: '',
      answer: ''
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setDashboard((prev) => prev.filter((dash) => dash.id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" onClick={handleAddNew}>
        Add New Stat
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Answer</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboard.map((dash) => (
            <TableRow key={dash.id}>
              <TableCell>{dash.id}</TableCell>
              <TableCell>{dash.question}</TableCell>
              <TableCell>{dash.answer}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickOpen(dash)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(dash.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Stat' : 'Add New Stat'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="question"
            label="Question"
            type="text"
            fullWidth
            value={currentDashboard.question}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="answer"
            label="Answer"
            type="text"
            fullWidth
            value={currentDashboard.answer}
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

export default DashboardTable;

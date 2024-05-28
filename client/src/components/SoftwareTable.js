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

const initialSoftwareData = [
  {
    Software_id: 1,
    Software_type: 'Operating System'
  },
  {
    Software_id: 2,
    Software_type: 'Productivity Software'
  }
];

function SoftwareTable() {
  const [software, setSoftware] = useState(initialSoftwareData);
  const [open, setOpen] = useState(false);
  const [currentSoftware, setCurrentSoftware] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleClickOpen = (software) => {
    setIsEditing(true);
    setCurrentSoftware(software);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSoftware({});
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSoftware((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (isEditing) {
      setSoftware((prev) =>
        prev.map((sw) => (sw.Software_id === currentSoftware.Software_id ? currentSoftware : sw))
      );
    } else {
      setSoftware((prev) => [
        ...prev,
        { ...currentSoftware, Software_id: prev.length + 1 }
      ]);
    }
    handleClose();
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentSoftware({
      Software_id: '',
      Software_type: ''
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setSoftware((prev) => prev.filter((sw) => sw.Software_id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" onClick={handleAddNew}>
        Add New Software
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Software ID</TableCell>
            <TableCell>Software Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {software.map((sw) => (
            <TableRow key={sw.Software_id}>
              <TableCell>{sw.Software_id}</TableCell>
              <TableCell>{sw.Software_type}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickOpen(sw)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(sw.Software_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Software' : 'Add New Software'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="Software_type"
            label="Software Type"
            type="text"
            fullWidth
            value={currentSoftware.Software_type}
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

export default SoftwareTable;

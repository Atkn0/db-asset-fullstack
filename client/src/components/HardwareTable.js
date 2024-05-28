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

const initialHardwareData = [
  {
    Hardware_id: 1,
    Hardware_type: 'Laptop',
    Status: 'Available',
    Version: '1.0',
    Licence: 'Yes',
    Purchase_date: '2023-01-01'
  },
  {
    Hardware_id: 2,
    Hardware_type: 'Desktop',
    Status: 'In Use',
    Version: '2.0',
    Licence: 'No',
    Purchase_date: '2022-06-15'
  }
];

function HardwareTable() {
  const [hardware, setHardware] = useState(initialHardwareData);
  const [open, setOpen] = useState(false);
  const [currentHardware, setCurrentHardware] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleClickOpen = (hardware) => {
    setIsEditing(true);
    setCurrentHardware(hardware);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentHardware({});
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentHardware((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (isEditing) {
      setHardware((prev) =>
        prev.map((hw) => (hw.Hardware_id === currentHardware.Hardware_id ? currentHardware : hw))
      );
    } else {
      setHardware((prev) => [
        ...prev,
        { ...currentHardware, Hardware_id: prev.length + 1 }
      ]);
    }
    handleClose();
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentHardware({
      Hardware_id: '',
      Hardware_type: '',
      Status: '',
      Version: '',
      Licence: '',
      Purchase_date: ''
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setHardware((prev) => prev.filter((hw) => hw.Hardware_id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" onClick={handleAddNew}>
        Add New Hardware
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hardware ID</TableCell>
            <TableCell>Hardware Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Licence</TableCell>
            <TableCell>Purchase Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hardware.map((hw) => (
            <TableRow key={hw.Hardware_id}>
              <TableCell>{hw.Hardware_id}</TableCell>
              <TableCell>{hw.Hardware_type}</TableCell>
              <TableCell>{hw.Status}</TableCell>
              <TableCell>{hw.Version}</TableCell>
              <TableCell>{hw.Licence}</TableCell>
              <TableCell>{hw.Purchase_date}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickOpen(hw)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(hw.Hardware_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Hardware' : 'Add New Hardware'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="Hardware_type"
            label="Hardware Type"
            type="text"
            fullWidth
            value={currentHardware.Hardware_type}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Status"
            label="Status"
            type="text"
            fullWidth
            value={currentHardware.Status}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Version"
            label="Version"
            type="text"
            fullWidth
            value={currentHardware.Version}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Licence"
            label="Licence"
            type="text"
            fullWidth
            value={currentHardware.Licence}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Purchase_date"
            label="Purchase Date"
            type="date"
            fullWidth
            value={currentHardware.Purchase_date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
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

export default HardwareTable;

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

const initialProviderData = [
  {
    Provider_id: 1,
    Provider_name: 'Provider A'
  },
  {
    Provider_id: 2,
    Provider_name: 'Provider B'
  }
];

function ProviderTable() {
  const [providers, setProviders] = useState(initialProviderData);
  const [open, setOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleClickOpen = (provider) => {
    setIsEditing(true);
    setCurrentProvider(provider);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProvider({});
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProvider((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (isEditing) {
      setProviders((prev) =>
        prev.map((prov) => (prov.Provider_id === currentProvider.Provider_id ? currentProvider : prov))
      );
    } else {
      setProviders((prev) => [
        ...prev,
        { ...currentProvider, Provider_id: prev.length + 1 }
      ]);
    }
    handleClose();
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentProvider({
      Provider_id: '',
      Provider_name: ''
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setProviders((prev) => prev.filter((prov) => prov.Provider_id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" onClick={handleAddNew}>
        Add New Provider
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Provider ID</TableCell>
            <TableCell>Provider Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.Provider_id}>
              <TableCell>{provider.Provider_id}</TableCell>
              <TableCell>{provider.Provider_name}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickOpen(provider)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(provider.Provider_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Provider' : 'Add New Provider'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="Provider_name"
            label="Provider Name"
            type="text"
            fullWidth
            value={currentProvider.Provider_name}
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

export default ProviderTable;

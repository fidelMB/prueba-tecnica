import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { Contact } from '../state/contacts/contactsSlice';

interface FormDialogProps {
  edit: boolean;
  contact?: Contact;
}

export default function FormDialog( {edit, contact} : FormDialogProps ) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>{edit ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nombre"
            type="name"
            variant="standard"
            sx={{m : 2}}
          >
            {contact?.name}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="last_name"
            name="last_name"
            label="Apellido"
            type="last_name"
            variant="standard"
            sx={{m : 2}}
          >
            {contact?.last_name}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Teléfono"
            type="phone"
            variant="standard"
            sx={{m : 2}}
          >
            {contact?.phone}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Correo electrónico"
            type="email"
            variant="standard"
            sx={{m : 2}}
          >
            {contact?.email}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="street"
            name="street"
            label="Calle"
            type="street"
            variant="standard"
            sx={{m : 2}}
          >
            {contact?.street}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="city"
            name="city"
            label="Ciudad"
            type="city"
            variant="standard"
            sx={{m : 2}}
          >
            {contact?.city}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="state"
            name="state"
            label="Estado"
            type="state"
            variant="standard"
            sx={{m : 2}}
          >
            {contact?.state}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="company"
            name="company"
            label="Empresa"
            type="company"
            variant="standard"
            sx={{m : 2}}
          >
            {contact?.company}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="position"
            name="position"
            label="Cargo"
            type="position"
            variant="standard"
            sx={{m : 2}}
          >
            {contact?.position}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="birthday"
            name="birthday"
            label="Cumpleaños"
            type="birthday"
            variant="standard"
            sx={{m : 2}}
          >
            {contact?.birthday}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="notes"
            name="notes"
            label="Notas"
            type="notes"
            variant="standard"
            sx={{m : 2}}
          >
            {contact?.notes}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{edit ? 'Save Changes' : 'Confirm'}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

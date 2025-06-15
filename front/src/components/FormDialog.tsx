import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Contact } from '../state/contacts/contactsSlice';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../state/store';
import { addContact } from '../state/contacts/contactsSlice';

const back_url = import.meta.env.VITE_BACK_URL

interface FormDialogProps {
  edit: boolean;
  contact?: Contact;
}

type FormFields = {
    birthday: string;
    city: string;
    company: string;
    email: string;
    last_name: string;
    name: string;
    notes: string;
    phone: string;
    position: string;
    state: string;
    street: string;
}

export default function FormDialog( {edit, contact} : FormDialogProps ) {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, reset } = useForm<FormFields>();

  const dispatch = useDispatch<AppDispatch>();

  async function addContactBack(contact : FormFields) {
  try {
        const response = await axios.post(back_url + '/api/contacts/', contact);
        dispatch(addContact(response.data))

  } catch (error) {
      console.error('Error:', error);
  }
  };

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
            onSubmit: handleSubmit((data) => {
              edit ? '' : addContactBack(data);
              reset();
              handleClose();
            }),
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
            label="Nombre"
            type="name"
            variant="standard"
            sx={{m : 2}}
            {...register("name")}
          >
            {contact?.name}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="last_name"
            label="Apellido"
            type="last_name"
            variant="standard"
            sx={{m : 2}}
            {...register("last_name")}            
          >
            {contact?.last_name}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            label="Teléfono"
            type="phone"
            variant="standard"
            sx={{m : 2}}
            {...register("phone")}
          >
            {contact?.phone}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            label="Correo electrónico"
            type="email"
            variant="standard"
            sx={{m : 2}}
            {...register("email")}
          >
            {contact?.email}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="street"
            label="Calle"
            type="street"
            variant="standard"
            sx={{m : 2}}
            {...register("street")}
          >
            {contact?.street}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="city"
            label="Ciudad"
            type="city"
            variant="standard"
            sx={{m : 2}}
            {...register("city")}
          >
            {contact?.city}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="state"            
            label="Estado"
            type="state"
            variant="standard"
            sx={{m : 2}}
            {...register("state")}
          >
            {contact?.state}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="company"
            label="Empresa"
            type="company"
            variant="standard"
            sx={{m : 2}}
            {...register("company")}
          >
            {contact?.company}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="position"
            label="Cargo"
            type="position"
            variant="standard"
            sx={{m : 2}}
            {...register("position")}
          >
            {contact?.position}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="birthday"
            label="Cumpleaños"
            type="birthday"
            variant="standard"
            sx={{m : 2}}
            {...register("birthday")}            
          >
            {contact?.birthday}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            id="notes"            
            label="Notas"
            type="notes"
            variant="standard"
            sx={{m : 2}}
            {...register("notes")}            
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

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Contact } from '../state/contacts/contactsSlice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../state/store';
import { addContact, editContact } from '../state/contacts/contactsSlice';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

interface FormDialogProps {
  edit: boolean;
  contact?: Contact;
}

export type FormFields = {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {edit ?  
      (
        <IconButton onClick={handleClickOpen}>
          <EditIcon/>
        </IconButton>        
      )
      : 
      (
        <Button variant="contained" onClick={handleClickOpen} sx={{m:2}}>
          Añadir contacto
        </Button>
      )
      }
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit((data) => {
              contact ? (dispatch(editContact({id: contact.id, updatedContact: data}))) : dispatch(addContact({newContact: data}));
              reset();
              handleClose();
            }),
          },
        }}
      >
        <DialogTitle>{edit ? 'Editar Contacto' : 'Añadir Contact'}</DialogTitle>
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
            defaultValue={contact?.name}
          />
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
            defaultValue={contact?.last_name}
          />
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
            defaultValue={contact?.phone}
          />
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
            defaultValue={contact?.email}
          />
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
            defaultValue={contact?.street}
          />
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
            defaultValue={contact?.city}
          />
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
            defaultValue={contact?.state}
          />
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
            defaultValue={contact?.company}
          />
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
            defaultValue={contact?.position}
          />
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
            defaultValue={contact?.birthday}         
          />
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
            defaultValue={contact?.notes}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{edit ? 'Save Changes' : 'Confirm'}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

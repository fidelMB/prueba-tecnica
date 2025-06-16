import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../state/store';
import { deleteContact } from '../state/contacts/contactsSlice';

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id } : DeleteButtonProps) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch<AppDispatch>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = (id : string) => {
    dispatch(deleteContact({id:id}));
    setOpen(false);
  }

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon/>
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirmar eliminación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Eliminar el contacto con el id: {id}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' autoFocus onClick={() => confirmDelete(id)}>
            ELIMINAR
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

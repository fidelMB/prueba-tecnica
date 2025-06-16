import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import type { Contact } from '../state/contacts/contactsSlice';

interface ContactInfoProps {
    contact: Contact;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ContactInfoModal({contact} : ContactInfoProps) {
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
        MÁS
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Información del Contacto
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid size={{xs:12, sm:6}}>
              <Typography><strong>Nombre:</strong> {contact.name} {contact.last_name}</Typography>
              <Typography><strong>Correo:</strong> {contact.email}</Typography>
              <Typography><strong>Teléfono:</strong> {contact.phone}</Typography>
              <Typography><strong>Cumpleaños:</strong> {contact.birthday}</Typography>
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <Typography><strong>Empresa:</strong> {contact.company}</Typography>
              <Typography><strong>Puesto:</strong> {contact.position}</Typography>
              <Typography><strong>Dirección:</strong> {contact.street}, {contact.city}, {contact.state}</Typography>
              <Typography><strong>Notas:</strong> {contact.notes}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}

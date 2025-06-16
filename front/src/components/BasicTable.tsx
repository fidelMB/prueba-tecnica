import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../state/store';
import { useEffect } from 'react';
import { fetchContacts } from '../state/contacts/contactsSlice';
import FormDialog from './FormDialog';
import DeleteButton from './DeleteButton';

export default function BasicTable() {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Teléfono</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.last_name}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
              <TableCell align="right">
                <Button variant="contained">
                  Más
                </Button>
              </TableCell>
              <TableCell align="right">
                <FormDialog edit={true} contact={row}/>
              </TableCell>
              <TableCell align="right">
                <DeleteButton id={row.id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

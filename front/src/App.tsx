import BasicTable from './components/BasicTable'
import './App.css'
import FormDialog from './components/FormDialog'
import { Typography } from '@mui/material'

function App() {
  return (
    <>
    <Typography variant="h2" gutterBottom>
      Libreta de direcciones
    </Typography>
    <FormDialog edit = {false}></FormDialog>
    <BasicTable/>
    </>
  )
}

export default App

import { useState } from 'react'
import BasicTable from './components/BasicTable'
import './App.css'
import FormDialog from './components/FormDialog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BasicTable/>
    <FormDialog edit = {false}></FormDialog>
    </>
  )
}

export default App

import { useState } from 'react'
import BasicTable from './components/BasicTable'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BasicTable/>
    </>
  )
}

export default App

import Login from "./pages/Login"
import {
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext"

function App() {

  return (
        <Login />
  )
}

export default App

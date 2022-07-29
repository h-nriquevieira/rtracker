import Login from "./pages/Login"
import {
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { AuthContextProvider } from "./contexts/AuthContext"

function App() {

  return (
    <AuthContextProvider>
        <Login />
    </AuthContextProvider>
  )
}

export default App

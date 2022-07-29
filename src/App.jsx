import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./firebase-config"

function App() {
 
  const [formData, setFormData] = useState({
    registerEmail: '',
    registerPassword: '',
    loginEmail: '',
    loginPassword: ''
  })

  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])
  

  function handleChange(e, prop) {
    setFormData(prevFormData => ({...prevFormData, [prop]: e.target.value}))
  }

  const registerUser = async () => {
    try {
      const user = createUserWithEmailAndPassword(auth, formData.registerEmail, formData.registerPassword)
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }

  }

  const login = async () => {
    try {
      const user = signInWithEmailAndPassword(auth, formData.loginEmail, formData.loginPassword)
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <div className="App">
        <div className="register-user">
          <h2>Register</h2>
          <input 
            onChange={(e) => handleChange(e, 'registerEmail')}
            value={formData.registerEmail}
            placeholder="email" 
            type='email'
          />
          <input 
            onChange={(e) => handleChange(e, 'registerPassword')}
            value={formData.registerPassword}
            placeholder="password" 
            type='password'
          />
          <button
            onClick={registerUser}
          >
            Register
          </button>
        </div>

        <div className="login">
          <h2>Login</h2>
          <input 
            onChange={(e) => handleChange(e, 'loginEmail')}
            value={formData.loginEmail}
            placeholder="email"
            type='email'
          />
          <input 
            onChange={(e) => handleChange(e, 'loginPassword')}
            value={formData.loginPassword}
            placeholder="password"
            type='password'
          />
          <button
            onClick={login}
          >
            Log in
          </button>
        </div>

        <h4>User signed in:</h4>
        <p>{user?.email}</p>

        <button
            onClick={logout}
          >
            Log out
          </button>
    </div>
  )
}

export default App

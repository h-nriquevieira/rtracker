import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, signInWithGoogle } from "../../firebase-config"
import { useAuth } from "../../contexts/AuthContext"

function Login() {
     
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        mode: 'login'
    })

    const appAuth = useAuth()
    const {
        user,
        registerUser,
        login,
        logout
    } = appAuth

    function handleChange(e, prop) {
        setFormData(prevFormData => ({...prevFormData, [prop]: e.target.value}))
    }

    return (
        <div className="login-page">
            <button 
                onClick={() => setFormData(prevData => ({...prevData, mode: 'login'}))}
            >
                Login
            </button>
            <button
                onClick={() => setFormData(prevData => ({...prevData, mode: 'register'}))}
            >
                Register
            </button>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    const {email, password} = formData
                    setFormData(prevData => ({...prevData, email: '', password: ''}))
                    formData.mode === 'login' ? login(email, password) 
                                              : registerUser(email, password)
                    
                }}
            >
                <h2>{formData.mode === 'login' ? 'Login' : 'Register'}</h2>
                <input 
                    onChange={(e) => handleChange(e, 'email')}
                    value={formData.email}
                    placeholder="email" 
                    type='email'
                />
                <input 
                    onChange={(e) => handleChange(e, 'password')}
                    value={formData.password}
                    placeholder="password" 
                    type='password'
                />
                <button>
                    {formData.mode === 'login' ? 'Login' : 'Register'}
                </button>
            </form>

            <button
                onClick={signInWithGoogle}
            >
                Sign in with Google
            </button>

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

export default Login
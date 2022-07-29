import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, signInWithGoogle } from "../../firebase-config"


function Login() {

     
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        mode: 'login'
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
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
        } catch (error) {
            console.log(error.message)
        }
    }

    const login = async () => {
        try {
            signInWithEmailAndPassword(auth, formData.email, formData.password)
        } catch (error) {
            console.log(error.message)
        }
    }

    const logout = async () => {
        await signOut(auth)
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
                    formData.mode === 'login' ? login() : registerUser()
                }}
            >
                <h2>{formData.mode === 'login' ? 'Login' : 'Register'}</h2>
                <input 
                    onChange={(e) => handleChange(e, 'email')}
                    value={formData.registerEmail}
                    placeholder="email" 
                    type='email'
                />
                <input 
                    onChange={(e) => handleChange(e, 'password')}
                    value={formData.registerPassword}
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
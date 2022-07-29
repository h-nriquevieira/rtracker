import { 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from '../firebase-config'


const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthContextProvider({children}) {

    const [user, setUser] = useState({})

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        })
    }, [])

    const registerUser = async (email, password) => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error.message)
        }
    }

    const login = async (email, password) => {
        try {
            signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error.message)
        }
    }

    const logout = async () => {
        await signOut(auth)
    }


    const value = {
        user,
        setUser,
        registerUser,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 
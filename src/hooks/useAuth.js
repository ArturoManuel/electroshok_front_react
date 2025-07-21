import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
    const [usuario, setUsuario] = useState(null)
    const navigate = useNavigate()

    const login = (email, password) => {
        if (email === 'cliente@prueba.com' && password === '123456') {
            const user = { email }
            setUsuario(user)
            navigate('/home')
        } else {
            alert('Credenciales incorrectas')
        }
    }

    const logout = () => {
        setUsuario(null)
        navigate('/login')
    }

    return {
        usuario,
        login,
        logout,
        estaAutenticado: !!usuario,
    }
}
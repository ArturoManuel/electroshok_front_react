// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Redirigir si ya hay sesión activa
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            navigate('/');
        }
    }, []);

    const usuarios = [
        { email: 'grupo1@ejemplo.com', contrasena: 'admin123', nombre: 'Administrador' },
        { email: 'cliente@ejemplo.com', contrasena: 'cliente123', nombre: 'Cliente' }
    ];

    const manejarLogin = (e) => {
        e.preventDefault();
        const usuario = usuarios.find(
            (u) => u.email === email && u.contrasena === contrasena
        );

        if (usuario) {
            localStorage.setItem('usuario', JSON.stringify(usuario));
            navigate('/');
        } else {
            setError('Correo o contraseña incorrectos');
        }
    };

    return (
        <div className="contenedor-login">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={manejarLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Redirigir si ya hay sesión activa
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            navigate("/");
        }
    }, []);

    const usuarios = [
        {
            email: "grupo1@ejemplo.com",
            contrasena: "admin123",
            nombre: "Administrador",
        },
        {
            email: "cliente@ejemplo.com",
            contrasena: "cliente123",
            nombre: "Cliente",
        },
    ];

    const manejarLogin = e => {
        e.preventDefault();
        const usuario = usuarios.find(
            u => u.email === email && u.contrasena === contrasena
        );

        if (usuario) {
            localStorage.setItem("usuario", JSON.stringify(usuario));
            navigate("/");
        } else {
            setError("Correo o contraseña incorrectos");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Iniciar Sesión</h2>
            <form className="login-form" onSubmit={manejarLogin}>
                <div className="form-group">
                    <label htmlFor="username">
                        Usuario o Correo electrónico
                    </label>
                    <input
                        type="email"
                        name="username"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        value={contrasena}
                        onChange={e => setContrasena(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="login-error">{error}</p>}
                <div className="login-links">
                    <button className="login-button" type="submit">
                        Ingresar
                    </button>
                    <Link to="/registro">
                        <button className="login-button">Registrarse</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;

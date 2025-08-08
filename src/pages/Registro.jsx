import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import "../style.css";

const Registro = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmContrasena, setConfirmContrasena] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const manejarRegistro = async e => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (contrasena !== confirmContrasena) {
            setError("Las contraseñas no coinciden");
            return;
        }
        try {
            await api("/usuario", {
                method: "POST",
                body: {
                    nombre: name, // Solo nombre, sin apellido
                    correo_electronico: email,
                    contrasena: contrasena
                },
                auth: false
            });
            setSuccess("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Registro de Usuario</h2>
            <form className="register-form" onSubmit={manejarRegistro}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={contrasena}
                        onChange={e => setContrasena(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        required
                        value={confirmContrasena}
                        onChange={e => setConfirmContrasena(e.target.value)}
                    />
                </div>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <div className="login-links">
                    <button type="submit" className="register-button">
                        Registrarse
                    </button>
                </div>
                <Link to="/login">¿Ya tienes cuenta? Iniciar sesión</Link>
            </form>
        </div>
    );
};

export default Registro;

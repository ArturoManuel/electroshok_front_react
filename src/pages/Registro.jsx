import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

const Registro = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmContrasena, setConfirmContrasena] = useState("");

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const manejarLogin = e => {
        e.preventDefault();
        // Aquí iría la lógica para registrar al usuario
        if (contrasena !== confirmContrasena) {
            setError("Las contraseñas no coinciden");
            return;
        }
        const nuevoUsuario = { name, lastName, email };
        localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
        navigate("/");
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Registro de Usuario</h2>
            <form className="register-form" onSubmit={manejarLogin}>
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
                    <label htmlFor="apellido">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        required
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
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

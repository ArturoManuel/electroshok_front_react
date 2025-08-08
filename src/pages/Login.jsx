import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import "../style.css";

function decodeJWT(token) {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            navigate("/");
        }
    }, [navigate]);

    const manejarLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await api("/seguridad/login", {
                method: "POST",
                body: {
                    correo_electronico: email,
                    contrasena: contrasena
                },
                auth: false
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("refreshToken", data.refreshToken);

            const decoded = decodeJWT(data.token);
            if (decoded) {
                localStorage.setItem(
                    "usuario",
                    JSON.stringify({
                        correo_electronico: decoded.correo_electronico,
                        rol: decoded.rol
                    })
                );
                // Notificar a otros componentes que el usuario ha cambiado
                window.dispatchEvent(new Event("usuarioActualizado"));
            }

            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Iniciar Sesión</h2>
            <form className="login-form" onSubmit={manejarLogin}>
                <div className="form-group">
                    <label htmlFor="username">Usuario o Correo electrónico</label>
                    <input
                        type="email"
                        id="username"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="login-error">{error}</p>}
                <div className="login-links">
                    <button className="login-button" type="submit">
                        Ingresar
                    </button>
                    <Link to="/registro">
                        <button className="login-button" type="button">
                            Registrarse
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
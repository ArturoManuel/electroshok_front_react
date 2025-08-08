import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('usuario'));
        } catch {
            return null;
        }
    });

    useEffect(() => {
        const syncUsuario = () => {
            try {
                setUsuario(JSON.parse(localStorage.getItem('usuario')));
            } catch {
                setUsuario(null);
            }
        };
        window.addEventListener('storage', syncUsuario);
        window.addEventListener('usuarioActualizado', syncUsuario);
        return () => {
            window.removeEventListener('storage', syncUsuario);
            window.removeEventListener('usuarioActualizado', syncUsuario);
        };
    }, []);

    const manejarLogout = () => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setUsuario(null);
        navigate('/login');
    };

    return (
        <header className="header">
            {/* Logo clickeable */}
            <div className="header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <img src="/assets/images/Logo.svg" alt="Electroshok Logo" />
            </div>

            {/* Input de búsqueda + botones sesión */}
            <div className="header-row">
                <div className="search-bar">
                    <input type="text" placeholder="Buscar productos" />
                    <button type="button">
                        <img src="/assets/images/icon_search.svg" alt="Buscar" />
                    </button>
                </div>

                <div className="user-actions">
                    {usuario ? (
                        <>
                            <i className="fa-solid fa-user"></i>
                            <div className="user-name">Hola, {usuario.nombre || usuario.correo_electronico?.split('@')[0]}</div>
                            <div className="user-name logout" onClick={manejarLogout} style={{cursor: 'pointer'}}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span>Salir</span>
                            </div>
                            <div className="cart" onClick={() => navigate('/carrito')} style={{ cursor: 'pointer' }}>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="login" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
                                <i className="fa-solid fa-user"></i>
                                <span>Iniciar sesión</span>
                            </div>
                            <div className="cart" onClick={() => navigate('/carrito')} style={{ cursor: 'pointer' }}>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Categorías */}
            <nav className="header-nav">
                <div className="nav-desktop">
                    <button onClick={() => navigate('/productos')}>Todos</button>
                    <button onClick={() => navigate('/productos?categoria=celulares')}>Celulares</button>
                    <button onClick={() => navigate('/productos?categoria=tablets')}>Tablets</button>
                    <button onClick={() => navigate('/productos?categoria=laptops')}>Laptops</button>
                    <button onClick={() => navigate('/productos?categoria=pc')}>PC</button>
                    <button onClick={() => navigate('/productos?categoria=accesorios')}>Accesorios</button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
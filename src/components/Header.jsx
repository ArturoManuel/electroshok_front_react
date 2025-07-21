import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const manejarLogout = () => {
        localStorage.removeItem('usuario');
        navigate('/login');
    };

    return (
        <header className="header">
            {/* Logo clickeable */}
            <div className="header-logo">
                <Link to="/">
                    <img src="/assets/images/Logo.svg" alt="Electroshok Logo" />
                </Link>
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
                            <span>Hola, {usuario.nombre}</span>
                            <a onClick={manejarLogout}>
                                <i className="fa-solid fa-user"></i>
                                <span>Salir</span>
                            </a>
                            <Link to="/carrito" className="cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="login">
                                <i className="fa-solid fa-user"></i>
                                <span>Iniciar sesión</span>
                            </Link>
                            <Link to="/carrito" className="cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Categorías */}
            <nav className="header-nav">
                <div className="nav-desktop">
                    <Link to="/productos">
                        <button>Todos</button>
                    </Link>
                    <button>Celulares</button>
                    <button>Tablets</button>
                    <button>Laptops</button>
                    <button>PC</button>
                    <button>Accesorios</button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
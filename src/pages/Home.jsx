import productos from '../data/productos.js';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const agregarAlCarrito = (producto) => {
        const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

        const existe = carritoActual.find((item) => item.nombre === producto.nombre);
        if (existe) {
            existe.cantidad += 1;
        } else {
            carritoActual.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem('carrito', JSON.stringify(carritoActual));
        alert(`${producto.nombre} agregado al carrito`);
    };

    return (
        <div className="contenedor-home">
            <main>
                {/* Sección 1: Los más vendidos */}
                <section className="product-section">
                    <h2 className="section-title">¡Los más vendidos! 🔥🔥🔥</h2>
                    <div className="product-grid">
                        {productos.slice(0, 5).map((producto, index) => (
                            <ProductCard key={index} producto={producto} onAgregar={agregarAlCarrito} />
                        ))}
                    </div>
                </section>

                {/* Sección 2: Nuestros recién llegados */}
                <section className="product-section">
                    <h2 className="section-title">¡Nuestros recién llegados!</h2>
                    <div className="product-grid">
                        {productos.slice(-5).map((producto, index) => (
                            <ProductCard key={index} producto={producto} onAgregar={agregarAlCarrito} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
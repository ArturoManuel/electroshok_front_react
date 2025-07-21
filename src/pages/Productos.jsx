import productos from '../data/productos';
import ProductCard from '../components/ProductCard';

const Productos = () => {
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
        <main>
            <section className="product-section">
                <h2 className="section-title">¡Todos nuestros productos!</h2>
                <div className="product-grid">
                    {productos.map((producto, index) => (
                        <ProductCard
                            key={index}
                            producto={producto}
                            onAgregar={agregarAlCarrito}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Productos;
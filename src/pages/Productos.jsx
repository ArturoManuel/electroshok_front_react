import { useEffect, useState } from 'react';
import { listarProductos } from '../data/catalogo';
import ProductCard from '../components/ProductCard';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        listarProductos()
            .then(data => {
                setProductos(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error al cargar productos');
                setLoading(false);
            });
    }, []);

    const agregarAlCarrito = (producto) => {
        const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
        const existe = carritoActual.find((item) => item.id_producto === producto.id_producto);
        if (existe) {
            existe.cantidad += 1;
        } else {
            carritoActual.push({ ...producto, cantidad: 1 });
        }
        localStorage.setItem('carrito', JSON.stringify(carritoActual));
        alert(`${producto.nombre} agregado al carrito`);
    };

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>{error}</div>;

    return (
        <main>
            <section className="product-section">
                <h2 className="section-title">¡Todos nuestros productos!</h2>
                <div className="product-grid">
                    {productos.map((producto) => (
                        <ProductCard
                            key={producto.id_producto}
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
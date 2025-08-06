import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productos from "../data/productos";

const ProductoDetalle = () => {
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const nombreProducto = params.get("producto");

        if (nombreProducto) {
            const prod = productos.find(
                p =>
                    p.nombre.trim().toLowerCase() ===
                    decodeURIComponent(nombreProducto).trim().toLowerCase()
            );
            if (prod) setProducto(prod);
            else alert("Producto no encontrado");
        }
    }, [location.search]);

    const agregarAlCarrito = () => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const existente = carrito.find(item => item.nombre === producto.nombre);

        if (existente) {
            existente.cantidad += cantidad;
        } else {
            carrito.push({ ...producto, cantidad });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        navigate("/carrito");
    };

    if (!producto) return null;

    return (
        <main>
            <section className="product-detail-section">
                <div className="product-detail">
                    <div className="product-detail-image">
                        <img
                            className="product-image"
                            src={producto.imagen}
                            alt={producto.nombre}
                        />
                    </div>
                    <div className="product-detail-info">
                        <h1 className="product-detail-title">
                            {producto.nombre}
                        </h1>
                        <p className="product-stock">
                            Stock: <span className="stock-value">15</span>{" "}
                            unidades
                        </p>
                        <p className="product-detail-price">
                            S/ {producto.precio.toFixed(2)}
                        </p>
                        <div className="product-detail-quantity">
                            <button
                                className="quantity-btn"
                                onClick={() =>
                                    setCantidad(c => Math.max(1, c - 1))
                                }
                            >
                                -
                            </button>
                            <input
                                className="quantity-input"
                                type="number"
                                value={cantidad}
                                readOnly
                            />
                            <button
                                className="quantity-btn"
                                onClick={() =>
                                    setCantidad(c => Math.min(15, c + 1))
                                }
                            >
                                +
                            </button>
                        </div>
                        <button
                            className="add-to-cart-btn"
                            onClick={agregarAlCarrito}
                        >
                            <i className="fa-solid fa-cart-plus"></i> Agregar al
                            carrito
                        </button>
                    </div>
                </div>
                <div className="product-detail-description">
                    <h2>Descripción del producto</h2>
                    <p className="description-text">
                        Producto de excelente calidad con componentes de alto
                        rendimiento y diseño moderno.
                    </p>
                    <ul className="product-features">
                        <li>Procesador potente</li>
                        <li>Buena autonomía</li>
                        <li>Materiales premium</li>
                        <li>Ideal para oficina o estudio</li>
                    </ul>
                </div>
            </section>
        </main>
    );
};

export default ProductoDetalle;

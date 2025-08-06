import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Carrito = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];

    const [carrito, setCarrito] = useState(carritoStorage);

    const total = carrito.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );

    console.log('Carrito:', carrito);

    const updateItemQuantity = index => event => {
        const nuevaCantidad = parseInt(event.target.value, 10);
        if (nuevaCantidad < 1) return;
        const carritoActual = [...carrito];
        carritoActual[index].cantidad = nuevaCantidad;
        localStorage.setItem('carrito', JSON.stringify(carritoActual));
        setCarrito(carritoActual);
    };

    const removeItem = index => {
        const carritoActual = carrito.filter((_, i) => i !== index);
        localStorage.setItem('carrito', JSON.stringify(carritoActual));
        setCarrito(carritoActual);
    };

    return (
        <div className="cart-section">
            <h2>Carrito de {usuario?.nombre || 'Invitado'}</h2>
            {carrito.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <div className="cart-items">
                    {carrito.map((item, index) => (
                        <div className="cart-item" key={index}>
                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="cart-item-image"
                            />
                            <div className="cart-item-details">
                                <h3 className="cart-item-title">
                                    {item.nombre}
                                </h3>
                                <p className="cart-item-price">{`S/${item.precio.toFixed(
                                    2
                                )}`}</p>
                                <div className="cart-item-quantity">
                                    <label htmlFor={`quantity-${index}`}>
                                        Cantidad:
                                    </label>
                                    <input
                                        type="number"
                                        id={`quantity-${index}`}
                                        value={item.cantidad}
                                        min={1}
                                        max={100}
                                        onChange={updateItemQuantity(index)}
                                        step={1}
                                    />
                                </div>
                                <button
                                    className="cart-item-remove"
                                    onClick={() => removeItem(index)}
                                >
                                    <i className="fa-solid fa-trash"></i>{' '}
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="cart-summary">
                <p>
                    Total:{' '}
                    <span className="cart-total">S/. {total.toFixed(2)}</span>
                </p>
                <Link to="/finalizar-compra">
                    <button className="checkout-btn">Finalizar Compra</button>
                </Link>
            </div>
        </div>
    );
};

export default Carrito;

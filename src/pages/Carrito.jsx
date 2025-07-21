const Carrito = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return (
        <div className="contenedor-carrito">
            <h2>Carrito de {usuario?.nombre || 'Invitado'}</h2>
            {carrito.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <ul>
                    {carrito.map((item, index) => (
                        <li key={index}>
                            {item.nombre} - S/. {item.precio} x {item.cantidad}
                        </li>
                    ))}
                </ul>
            )}
            <h3>Total: S/. {total.toFixed(2)}</h3>
        </div>
    );
};

export default Carrito;
import React, { useState } from "react";

const FinalizarCompra = () => {
  // Estado para los formularios
  const [shipping, setShipping] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    email: "",
  });

  const [payment, setPayment] = useState({
    metodo_pago: "",
    tarjeta: "",
    vencimiento: "",
    cvv: "",
  });

  // Simulación de resumen de pedido
  const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carritoStorage.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const [orderSummary] = useState(carritoStorage);

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para finalizar el pago
    alert("Pago finalizado");
  };

  return (
    <main>
      <section className="checkout-section">
        <div className="checkout-container">
          <h2>Finalizar Pago</h2>

          {/* Detalles finales de pedido */}
          <div className="checkout-summary">
            <h3>Detalles del Pedido</h3>
            <ul className="order-summary-list">
              {orderSummary.map((item, idx) => (
                <li key={idx}>
                  <span className="order-item">
                    {item.nombre} x{item.cantidad}
                  </span>
                  S/ {(item.precio * item.cantidad).toFixed(2)}
                </li>
              ))}
            </ul>
            <p>
              <span className="total-row"> Total: S/. {total.toFixed(2)}</span>
            </p>
          </div>

          {/* Detalles para el envío */}
          <div className="checkout-shipping">
            <h3>Detalles de Envío</h3>
            <form>
              <label>
                Nombre completo
                <input
                  type="text"
                  name="nombre"
                  required
                  value={shipping.nombre}
                  onChange={handleShippingChange}
                />
              </label>
              <label>
                Dirección
                <input
                  type="text"
                  name="direccion"
                  required
                  value={shipping.direccion}
                  onChange={handleShippingChange}
                />
              </label>
              <label>
                Ciudad
                <input
                  type="text"
                  name="ciudad"
                  required
                  value={shipping.ciudad}
                  onChange={handleShippingChange}
                />
              </label>
              <label>
                Teléfono
                <input
                  type="tel"
                  name="telefono"
                  required
                  value={shipping.telefono}
                  onChange={handleShippingChange}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  required
                  value={shipping.email}
                  onChange={handleShippingChange}
                />
              </label>
            </form>
          </div>

          {/* Detalles para el pago */}
          <div className="checkout-payment">
            <h3>Detalles de Pago</h3>
            <form onSubmit={handlePaymentSubmit}>
              <label>
                Método de pago
                <select
                  name="metodo_pago"
                  required
                  value={payment.metodo_pago}
                  onChange={handlePaymentChange}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="tarjeta">Tarjeta de crédito/débito</option>
                  <option value="yape">Yape/Plin</option>
                  <option value="transferencia">Transferencia bancaria</option>
                </select>
              </label>
              <label>
                Número de tarjeta
                <input
                  type="text"
                  name="tarjeta"
                  maxLength="16"
                  pattern="\d{16}"
                  placeholder="1234 5678 9012 3456"
                  value={payment.tarjeta}
                  onChange={handlePaymentChange}
                  disabled={payment.metodo_pago !== "tarjeta"}
                  required={payment.metodo_pago === "tarjeta"}
                />
              </label>
              <label>
                Fecha de vencimiento
                <input
                  type="text"
                  name="vencimiento"
                  maxLength="5"
                  placeholder="MM/AA"
                  value={payment.vencimiento}
                  onChange={handlePaymentChange}
                  disabled={payment.metodo_pago !== "tarjeta"}
                  required={payment.metodo_pago === "tarjeta"}
                />
              </label>
              <label>
                CVV
                <input
                  type="text"
                  name="cvv"
                  maxLength="4"
                  pattern="\d{3,4}"
                  placeholder="123"
                  value={payment.cvv}
                  onChange={handlePaymentChange}
                  disabled={payment.metodo_pago !== "tarjeta"}
                  required={payment.metodo_pago === "tarjeta"}
                />
              </label>
              <button type="submit" className="btn-finalizar">
                Finalizar Pago
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FinalizarCompra;

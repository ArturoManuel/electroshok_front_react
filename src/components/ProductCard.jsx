import { useNavigate } from 'react-router-dom';

const ProductCard = ({ producto }) => {
    const navigate = useNavigate();

    const irADetalle = () => {
        const nombreParam = encodeURIComponent(producto.nombre.trim());
        navigate(`/producto?producto=${nombreParam}`);
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                />
            </div>

            <div className="product-info">
                <div className="product-details">
                    <span className="product-brand">{producto.marca}</span>
                    <span className="product-name">{producto.nombre}</span>
                    <span className="product-price">S/ {producto.precio.toFixed(2)}</span>
                </div>

                <div
                    className="product-actions"
                    onClick={irADetalle}
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        src="/assets/images/icon_addCar.svg"
                        alt="Agregar"
                        className="add-icon"
                    />
                    <span className="add-text">Comprar</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
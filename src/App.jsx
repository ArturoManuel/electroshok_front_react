import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FinalizarCompra from "./pages/FinalizarCompra";

const App = () => {
    return (
        <div className="app-container">
            <div className="background-pattern"></div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/producto" element={<ProductoDetalle />} />
                <Route path="/finalizar-compra" element={<FinalizarCompra />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;

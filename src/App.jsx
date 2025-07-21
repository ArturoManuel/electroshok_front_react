import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Carrito from './pages/Carrito';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/ProductoDetalle';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <>
            <div className="background-pattern"></div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/producto" element={<ProductoDetalle />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
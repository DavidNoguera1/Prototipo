// src/components/NavBar.jsx
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Mi Plataforma</div>
      <input type="text" placeholder="Buscar productos, marcas y más..." className="navbar-search" />
      <div className="navbar-links">
        <a href="#">Categorías</a>
        <a href="#">Ofertas</a>
        <a href="#">Cupones</a>
        <a href="#">Supermercado</a>
        <a href="#">Moda</a>
        <a href="#">Ayuda / PQR</a>
      </div>
    </nav>
  );
};

export default NavBar;


import React, { useState, useEffect } from 'react';
import '../styles/ListaProductos.css';

const ListaProductos = ({ productos, perimetros }) => {
  const [mostrarSoloDentro, setMostrarSoloDentro] = useState(true);

  // Filtrar productos dentro del radio de los círculos
  const productosDentroDelPerimetro = productos.filter((producto) => {
    return Object.keys(perimetros).some((key) => {
      const { tamaño } = perimetros[key];
      const center = { lat: 1.2136, lng: -77.2815 }; // Coordenadas del centro por defecto
      const distancia = Math.sqrt(
        Math.pow(center.lat - producto.coordenadas.lat, 2) + Math.pow(center.lng - producto.coordenadas.lng, 2)
      );
      return distancia <= tamaño / 100000;
    });
  });

  useEffect(() => {
    // Actualizar la lista cada vez que cambien los productos o los perímetros
  }, [productos, perimetros]);

  return (
    <div className="lista-productos">
            <h2>Lista de productos detectados por proximidad o todos si se seleccionó esa opción</h2>
      <div>
        <button onClick={() => setMostrarSoloDentro(!mostrarSoloDentro)}>
          {mostrarSoloDentro ? 'Ver Todos los Productos' : 'Ver Productos por Proximidad'}
        </button>
      </div>
      <div className="productos-grid">
        {(mostrarSoloDentro ? productosDentroDelPerimetro : productos).map((producto) => (
          <div key={producto.id} className="producto-item">
            <img src={producto.image} alt={producto.title} className="producto-imagen" />
            <h4>{producto.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaProductos;
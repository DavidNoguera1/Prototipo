import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Mapa from './components/Mapa';
import ControlesPerimetro from './components/ControlesPerimetro';
import ListaProductos from './components/ListaProductos';
import './styles/App.css';

function App() {
  const [perimetros, setPerimetros] = useState({
    "perimetro-1": { nombre: "Pasto-Nariño", color: "#0400ff", tamaño: 1000 },
  });
  const [productos, setProductos] = useState([]);

  // Generar coordenadas aleatorias dispersas a nivel departamental
  const generarCoordenadasAleatorias = () => {
    const lat = 1.2136; // Latitud de Pasto-Nariño
    const lng = -77.2815; // Longitud de Pasto-Nariño
    const desviacionLat = 0.5; // Rango de latitud para dispersar a nivel departamental
    const desviacionLng = 0.5; // Rango de longitud para dispersar a nivel departamental

    return {
      lat: lat + (Math.random() - 0.5) * desviacionLat,
      lng: lng + (Math.random() - 0.5) * desviacionLng,
    };
  };

  // Obtener productos de la API
  const obtenerProductos = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      // Asignar coordenadas aleatorias a cada producto
      const productosConCoordenadas = data.map((producto) => ({
        ...producto,
        coordenadas: generarCoordenadasAleatorias(),
      }));
      setProductos(productosConCoordenadas);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Llamar a la función para obtener productos cuando el componente se monta
  useEffect(() => {
    obtenerProductos();
  }, []);

  const addPerimeter = (nombre, color, tamaño) => {
    const newKey = `perimetro-${Object.keys(perimetros).length + 1}`;
    setPerimetros((prev) => ({
      ...prev,
      [newKey]: { nombre, color, tamaño },
    }));
  };

  const removePerimeter = (key) => {
    setPerimetros((prev) => {
      const newPerimetros = { ...prev };
      delete newPerimetros[key];
      return newPerimetros;
    });
  };

  const updatePerimeter = (key, tamaño) => {
    setPerimetros((prev) => ({
      ...prev,
      [key]: { ...prev[key], tamaño },
    }));
  };

  return (
    <div className="App">
      <NavBar />
      <div className="mapa-container">
        <Mapa perimetros={perimetros} productos={productos} />
        <ControlesPerimetro
          addPerimeter={addPerimeter}
          removePerimeter={removePerimeter}
          updatePerimeter={updatePerimeter}
          perimetros={perimetros}
        />
      </div>
      <ListaProductos productos={productos} perimetros={perimetros} />
    </div>
  );
}

export default App;



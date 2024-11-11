//src/components/ControlesPerimetro.jsx
import { useState } from 'react';
import '../styles/ControlesPerimetro.css';

const ControlesPerimetro = ({ addPerimeter, removePerimeter, updatePerimeter, perimetros }) => {
  const [nombre, setNombre] = useState('');
  const [color, setColor] = useState('#0000FF'); // color por defecto
  const [tamaño, setTamaño] = useState(1000); // tamaño por defecto

  const handleAddPerimeter = () => {
    if (nombre.trim() !== '') {
      addPerimeter(nombre, color, tamaño);
      setNombre('');
    }
  };

  return (
    <div className="controles-perimetro">
      <h3>Controles del Perímetro</h3>

      <div className="crear-perimetro">
        <input
          type="text"
          placeholder="Nombre del perímetro"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="nombre-perimetro"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="color-perimetro"
        />
        <input
          type="range"
          min="0"
          max="10000"
          value={tamaño}
          onChange={(e) => setTamaño(Number(e.target.value))}
          className="slider-perimetro"
        />
        <span>{tamaño} Metros</span>
        <button onClick={handleAddPerimeter}>Añadir Perímetro</button>
      </div>

      <h4>Perímetros Actuales</h4>
      <div className="perimetros-actuales">
        {Object.keys(perimetros).map((key) => (
          <div key={key} className="perimetro-item">
            <span>{perimetros[key].nombre}</span>
            <input
              type="range"
              min="0"
              max="100000"
              value={perimetros[key].tamaño}
              onChange={(e) => updatePerimeter(key, Number(e.target.value))}
            />
            {/* Mostrar el tamaño actual junto al slider */}
            <span>{perimetros[key].tamaño} Metros</span>
            <button onClick={() => removePerimeter(key)}>Eliminar</button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ControlesPerimetro;


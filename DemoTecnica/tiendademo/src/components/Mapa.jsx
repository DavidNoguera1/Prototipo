import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Mapa.css';
import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Importar un icono de react-icons
import { Icon } from 'leaflet'; // Importar Icon de leaflet

const Mapa = ({ perimetros, productos }) => {
  const [centros, setCentros] = useState({});

  const handleMarkerDragEnd = (event, key) => {
    const newCenter = event.target.getLatLng();
    setCentros((prev) => ({
      ...prev,
      [key]: { lat: newCenter.lat, lng: newCenter.lng },
    }));
  };

  // Verificar si un producto está dentro de un perímetro
  const estaDentroDelPerimetro = (producto, perimetro) => {
    const center = centros[perimetro.key] || { lat: 1.2136, lng: -77.2815 }; // Coordenadas del centro
    const distancia = Math.sqrt(
      Math.pow(center.lat - producto.coordenadas.lat, 2) + Math.pow(center.lng - producto.coordenadas.lng, 2)
    );
    return distancia <= perimetro.tamaño / 100000; // Ajuste de tamaño en el mapa
  };

  return (
    <div className="mapa">
      <MapContainer center={[1.2136, -77.2815]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {Object.keys(perimetros).map((key) => {
          const { nombre, color, tamaño } = perimetros[key];
          const center = centros[key] || [1.2136, -77.2815];

          return (
            <div key={key}>
              <Marker
                position={center}
                draggable
                eventHandlers={{
                  dragend: (event) => handleMarkerDragEnd(event, key),
                }}
              />
              <Circle center={center} radius={tamaño} color={color} />
            </div>
          );
        })}

        {productos.map((producto) => {
          // Verificar si el producto está dentro de algún perímetro
          const dentroDePerimetro = Object.keys(perimetros).some((key) =>
            estaDentroDelPerimetro(producto, perimetros[key])
          );

          if (!dentroDePerimetro) {
            return null; // No renderizar el marcador si no está dentro de ningún perímetro
          }

          // Crear un icono personalizado usando react-icons
          const iconoProducto = new Icon({
            iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9H7.5L6 6z"/><circle cx="8" cy="21" r="1"/><circle cx="17" cy="21" r="1"/></svg>`),
            iconSize: [30, 30], // Tamaño del icono
            iconAnchor: [15, 30], // Punto de anclaje del icono
            popupAnchor: [1, -34],
          });

          return (
            <Marker
              key={producto.id}
              position={producto.coordenadas}
              icon={iconoProducto}
            >
              <div>{producto.title}</div>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Mapa;
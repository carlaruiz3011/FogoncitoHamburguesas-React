import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function MenuPage({ onAgregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para el buscador (Requisito del PDF)
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    // Simulamos un pequeño retraso para que se vea el "Cargando..."
    const timer = setTimeout(() => {
      fetch('/data/productos.json')
        .then((res) => {
          if (!res.ok) throw new Error('No pudimos cargar el menú');
          return res.json();
        })
        .then((data) => {
          setProductos(data);
          setCargando(false);
        })
        .catch((err) => {
          setError(err.message);
          setCargando(false);
        });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtro de búsqueda
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) return <p className="estado-mensaje">Cargando menú... 🍔</p>;
  if (error) return <p className="estado-mensaje error">Error: {error}</p>;

  return (
    <div className="menu-page">
      <button 
        onClick={() => onNavegar('home')} 
        style={{ background: 'none', border: 'none', color: '#ff8c00', cursor: 'pointer', marginBottom: '1rem', fontSize: '1rem' }}
      >
        ← Volver al inicio
      </button>

      <h2>Nuestro Menú</h2>
      
      <input
        type="text"
        placeholder="Buscar hamburguesa..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador"
      />

      <div className="productos-grid">
        {productosFiltrados.map((prod) => (
          <ProductCard 
            key={prod.id} 
            producto={prod} 
            onAgregar={onAgregarAlCarrito} 
          />
        ))}
      </div>
    </div>
  );
}
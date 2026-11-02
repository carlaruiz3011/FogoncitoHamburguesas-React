import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function MenuPage({ onAgregarAlCarrito, onNavegar, carrito }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    fetch('/data/productos.json')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const productosFiltrados = productos.filter((p) => {
    if (filtro === 'bebidas' && !p.esBebida) return false;
    if (filtro === 'hamburguesas' && (p.esBebida || p.esPromo)) return false;
    return p.nombre.toLowerCase().includes(busqueda.toLowerCase());
  });

  if (cargando) return <p className="estado-mensaje">Cargando menú... 🍔</p>;

  return (
    <>
      {/* El div con padding para que la barra no tape los productos */}
      <div className="menu-page" style={{ paddingBottom: '120px' }}>
        <button 
          onClick={() => onNavegar('home')} 
          style={{ background: 'none', border: 'none', color: '#ff8c00', cursor: 'pointer', marginBottom: '1rem', fontSize: '1rem', fontWeight: 'bold' }}
        >
          ← Volver al inicio
        </button>

        <h2 className="section-title">Nuestro Menú</h2>
        
        <div className="category-buttons">
          <button className={`cat-btn ${filtro === 'todos' ? 'active' : ''}`} onClick={() => setFiltro('todos')}>Todo</button>
          <button className={`cat-btn ${filtro === 'hamburguesas' ? 'active' : ''}`} onClick={() => setFiltro('hamburguesas')}>🍔 Hamburguesas</button>
          <button className={`cat-btn ${filtro === 'bebidas' ? 'active' : ''}`} onClick={() => setFiltro('bebidas')}>🥤 Bebidas</button>
        </div>

        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />

        <div className="productos-grid">
          {productosFiltrados.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            productosFiltrados.map((prod) => (
              <ProductCard 
                key={prod.id} 
                producto={prod} 
                onAgregar={onAgregarAlCarrito} 
              />
            ))
          )}
        </div>
      </div>

    </>
  );
}
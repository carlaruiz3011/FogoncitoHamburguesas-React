import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function HomePage({ onNavegar, onAgregarAlCarrito }) {
  const [promos, setPromos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/data/productos.json')
      .then((res) => res.json())
      .then((data) => {
        // Filtramos solo los productos que son promos
        const soloPromos = data.filter((prod) => prod.esPromo === true);
        setPromos(soloPromos);
        setCargando(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-flames">🔥 🔥 🔥</div>
        <h1 className="hero-title">FOGONCITO</h1>
        <h2 className="hero-subtitle">HAMBURGUESERÍA ARTESANAL</h2>
        <p className="hero-text">Elegí tu hamburguesa, personalizá tu pedido y nosotros lo preparamos con fuego.</p>
      </section>

      <div className="category-buttons">
        <button className="cat-btn active">🍔 PROMOCIONES</button>
        <button className="cat-btn" onClick={() => onNavegar('menu')}>🍔 MENÚ COMPLETO</button>
      </div>

      <section className="promos-section">
        <h2 className="section-title">Promociones del día</h2>
        
        {cargando ? (
          <p>Cargando promociones... 🔥</p>
        ) : (
          <div className="productos-grid">
            {promos.map((promo) => (
              <ProductCard 
                key={promo.id} 
                producto={promo} 
                onAgregar={onAgregarAlCarrito} 
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
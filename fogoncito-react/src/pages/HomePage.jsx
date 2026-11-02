import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function HomePage({ onNavegar, onAgregarAlCarrito, carrito }) { 
  const [promos, setPromos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/data/productos.json')
      .then((res) => res.json())
      .then((data) => {
        const soloPromos = data.filter((prod) => prod.esPromo === true);
        setPromos(soloPromos);
        setCargando(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // Calculamos el total y la cantidad para la barra flotante
  const total = carrito ? carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0) : 0;
  const cantidad = carrito ? carrito.reduce((acc, item) => acc + item.cantidad, 0) : 0;
  const totalFormateado = new Intl.NumberFormat('es-AR').format(total);

  return (
    <>
      <div className="home-page" style={{ paddingBottom: cantidad > 0 ? '80px' : '0' }}>
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

      {/* BARRA FLOTANTE ABAJO (Solo aparece si hay algo en el carrito) */}
      {cantidad > 0 && (
        <div className="barra-flotante" onClick={() => onNavegar('cart')}>
          <span>VER PEDIDO ({cantidad} {cantidad === 1 ? 'item' : 'items'})</span>
          <span>•</span>
          <span>${totalFormateado}</span>
        </div>
      )}
    </>
  );
}
¿import ProductCard from '../components/ProductCard';

export default function HomePage({ onNavegar, onAgregarAlCarrito }) {
  // Datos de prueba para las promos (después los podés traer del JSON)
  const promos = [
    {
      id: 101,
      nombre: "Fogoncito Simple",
      descripcion: "Medallón 180g, queso cheddar, lechuga, tomate y salsa de la casa. + Papas fritas.",
      precio: 7500,
      imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop", // Foto temporal
      categoria: "promos"
    },
    {
      id: 102,
      nombre: "Fogoncito Doble",
      descripcion: "Doble medallón, doble cheddar, panceta crocante y cebolla caramelizada. + Papas fritas.",
      precio: 9500,
      imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop", // Foto temporal
      categoria: "promos"
    },
    {
      id: 103,
      nombre: "Doble Simple",
      descripcion: "Doble carne, queso, pepinillos y salsa especial. + Papas fritas.",
      precio: 8800,
      imagen: "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=600&auto=format&fit=crop", // Foto temporal
      categoria: "promos"
    }
  ];

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-flames">🔥 🔥 🔥</div>
        <h1 className="hero-title">FOGONCITO</h1>
        <h2 className="hero-subtitle">HAMBURGUESERÍA ARTESANAL</h2>
        <p className="hero-text">Elegí tu hamburguesa, personalizá tu pedido y nosotros lo preparamos con fuego.</p>
      </section>

      {/* BOTONES DE CATEGORÍA */}
      <div className="category-buttons">
        <button className="cat-btn active">🍔 PROMOCIONES</button>
        <button className="cat-btn" onClick={() => onNavegar('menu')}>🍔 MENÚ COMPLETO</button>
        <button className="cat-btn">🥤 BEBIDAS</button>
      </div>

      {/* PROMOS DEL DÍA */}
      <section className="promos-section">
        <h2 className="section-title">Promociones del día</h2>
        <div className="productos-grid">
          {promos.map((promo) => (
            <ProductCard 
              key={promo.id} 
              producto={promo} 
              onAgregar={onAgregarAlCarrito} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}
export default function Header({ pantallaActiva, onNavegar, cantidadCarrito }) {
  return (
    <header className="header">
      <div className="logo-container" onClick={() => onNavegar('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🔥</span>
        <h1 className="logo-text">FOGONCITO</h1>
      </div>
      
      <nav className="nav">
        {/* Ya no usamos <Button>, usamos un <button> con su propia clase */}
        <button 
          className={`header-pedido-btn ${cantidadCarrito > 0 ? 'con-items' : ''}`}
          onClick={() => onNavegar('cart')}
        >
          🛒 Mi pedido {cantidadCarrito > 0 && `(${cantidadCarrito})`}
        </button>
      </nav>
    </header>
  );
}
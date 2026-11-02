import Button from './Button';

export default function Header({ pantallaActiva, onNavegar, cantidadCarrito }) {
  return (
    <header className="header">
      <div className="logo-container" onClick={() => onNavegar('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🔥</span>
        <h1 className="logo-text">FOGONCITO</h1>
      </div>
      
      <nav className="nav">
        <Button 
          variant={pantallaActiva === 'cart' ? 'primary' : 'secondary'} 
          onClick={() => onNavegar('cart')}
        >
          🛒 Mi pedido ({cantidadCarrito})
        </Button>
      </nav>
    </header>
  );
}
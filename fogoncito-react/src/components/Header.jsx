import Button from './Button';

export default function Header({ pantallaActiva, onNavegar, cantidadCarrito }) {
  return (
    <header className="header">
      <h1>Fogoncito 🍔🔥</h1>
      
      <nav className="nav">
        <Button 
          variant={pantallaActiva === 'home' ? 'primary' : 'secondary'} 
          onClick={() => onNavegar('home')}
        >
          Inicio
        </Button>
        <Button 
          variant={pantallaActiva === 'menu' ? 'primary' : 'secondary'} 
          onClick={() => onNavegar('menu')}
        >
          Menú
        </Button>
        <Button 
          variant={pantallaActiva === 'cart' ? 'primary' : 'secondary'} 
          onClick={() => onNavegar('cart')}
        >
          Carrito ({cantidadCarrito})
        </Button>
      </nav>
    </header>
  );
}
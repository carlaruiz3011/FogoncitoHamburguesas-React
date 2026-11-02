import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';

export default function App() {
  const [pantalla, setPantalla] = useState('home');
  const [carrito, setCarrito] = useState([]);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="app-container">
      <Header 
        pantallaActiva={pantalla} 
        onNavegar={setPantalla} 
        cantidadCarrito={cantidadCarrito} 
      />
      
      <main className="main-content">
        {pantalla === 'home' && (
          <HomePage 
            onNavegar={setPantalla} 
            onAgregarAlCarrito={agregarAlCarrito} 
          />
        )}
        
        {/* ACÁ AGREGAMOS onNavegar */}
        {pantalla === 'menu' && (
          <MenuPage 
            onAgregarAlCarrito={agregarAlCarrito} 
            onNavegar={setPantalla} 
          />
        )}
        
        {/* ACÁ TAMBIÉN AGREGAMOS onNavegar */}
        {pantalla === 'cart' && (
          <CartPage 
            carrito={carrito} 
            onNavegar={setPantalla} 
          />
        )}
      </main>
    </div>
  );
}
import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';

export default function App() {
  const [pantalla, setPantalla] = useState('home');
  const [carrito, setCarrito] = useState([]);

  // 1. Agregar producto nuevo
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

  // 2. Sumar cantidad desde el carrito
  const sumarCantidad = (id) => {
    setCarrito(prev => prev.map(item => 
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    ));
  };

  // 3. Restar cantidad desde el carrito
  const restarCantidad = (id) => {
    setCarrito(prev => prev.map(item => 
      item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
    ).filter(item => item.cantidad > 0)); // Si llega a 0, se borra
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
            carrito={carrito}
          />
        )}
        
        {pantalla === 'menu' && (
          <MenuPage 
            onAgregarAlCarrito={agregarAlCarrito} 
            onNavegar={setPantalla} 
          />
        )}
        
        {pantalla === 'cart' && (
          <CartPage 
            carrito={carrito} 
            onNavegar={setPantalla} 
            sumarCantidad={sumarCantidad} 
            restarCantidad={restarCantidad}
          />
        )}
      </main>
    </div>
  );
}
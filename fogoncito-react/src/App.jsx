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
      // Verificamos si ya existe en el carrito
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        // Si existe, le sumamos 1 a la cantidad
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      // Si no existe, lo agregamos con cantidad 1
      return [...prev, { ...producto, cantidad: 1 }];
    });
    
    // Efecto visual: Podés agregar un alert o un toast acá si querés
    console.log(`Agregado: ${producto.nombre}`);
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
        {pantalla === 'home' && <HomePage />}
        {/* Le pasamos la función al menú */}
        {pantalla === 'menu' && <MenuPage onAgregarAlCarrito={agregarAlCarrito} />}
        {pantalla === 'cart' && <CartPage carrito={carrito} />}
      </main>
    </div>
  );
}
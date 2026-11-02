// ... imports
export default function App() {
  // ... estados (pantalla, carrito)
  // ... funcion agregarAlCarrito

  return (
    <div className="app-container">
      <Header 
        pantallaActiva={pantalla} 
        onNavegar={setPantalla} 
        cantidadCarrito={cantidadCarrito} 
      />
      
      <main className="main-content">
        {pantalla === 'home' && <HomePage onNavegar={setPantalla} onAgregarAlCarrito={agregarAlCarrito} />}
        {pantalla === 'menu' && <MenuPage onAgregarAlCarrito={agregarAlCarrito} />}
        {pantalla === 'cart' && <CartPage carrito={carrito} />}
      </main>
    </div>
  );
}
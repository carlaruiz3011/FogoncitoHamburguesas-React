export default function BarraFlotante({ carrito, onNavegar }) {
  console.log("Datos que recibe la barra:", carrito); // <-- PRUEBA

  if (!carrito || carrito.length === 0) return null;

  const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const totalFormateado = new Intl.NumberFormat('es-AR').format(total);

  return (
    <div 
      style={{
        position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        backgroundColor: '#ff4500', color: 'white', padding: '1rem', 
        borderRadius: '10px', zIndex: 9999, cursor: 'pointer'
      }}
      onClick={() => onNavegar('cart')}
    >
      VER PEDIDO ({cantidad}) • ${totalFormateado}
    </div>
  );
}
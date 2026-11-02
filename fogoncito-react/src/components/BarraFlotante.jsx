export default function BarraFlotante({ carrito, onNavegar }) {
  // Si el carrito está vacío, no mostramos nada
  if (!carrito || carrito.length === 0) return null;

  const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const totalFormateado = new Intl.NumberFormat('es-AR').format(total);

  return (
    <div className="barra-flotante" onClick={() => onNavegar('cart')}>
      <span>VER PEDIDO ({cantidad} {cantidad === 1 ? 'item' : 'items'})</span>
      <span>•</span>
      <span>${totalFormateado}</span>
    </div>
  );
}
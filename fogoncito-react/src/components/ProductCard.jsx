import Button from './Button';

export default function ProductCard({ producto, onAgregar }) {
  return (
    <article className="product-card">
      <img src={producto.imagen} alt={`Hamburguesa ${producto.nombre}`} className="product-image" />
      <div className="product-info">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <p className="precio">${producto.precio}</p>
        <Button onClick={() => onAgregar(producto)}>
          Agregar al carrito
        </Button>
      </div>
    </article>
  );
}
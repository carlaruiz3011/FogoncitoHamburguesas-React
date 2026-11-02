import { useState } from 'react';

export default function ProductCard({ producto, onAgregar }) {
  // Estado para guardar la opción elegida (por defecto Simple)
  const [opcion, setOpcion] = useState('Simple');

  // Calculamos el precio según la opción elegida
  let precioFinal = producto.precio;
  if (opcion === 'Doble') precioFinal += 2500;
  if (opcion === 'Triple') precioFinal += 5000;

  // Formateamos el precio para que se vea como $11.000
  const precioFormateado = new Intl.NumberFormat('es-AR').format(precioFinal);

  // Función para agregar con la opción elegida
  const handleAgregar = () => {
    // Le pasamos al carrito el producto original, pero con el precio y nombre modificados
    const productoFinal = {
      ...producto,
      nombre: `${producto.nombre} (${opcion})`,
      precio: precioFinal,
      // Generamos un ID único para que el carrito no mezcle el Simple con el Doble
      id: `${producto.id}-${opcion}` 
    };
    onAgregar(productoFinal);
  };

  return (
    <article className="product-card">
      <img src={producto.imagen} alt={producto.nombre} className="product-image" />
      
      <div className="product-info">
        <h3 className="product-title">{producto.nombre}</h3>
        <p className="product-desc">{producto.descripcion}</p>

        {/* Selector de Simple/Doble/Triple (Solo si no es bebida) */}
        {!producto.esBebida && (
          <div className="opciones-burger">
            {['Simple', 'Doble', 'Triple'].map((op) => (
              <button 
                key={op}
                className={`opcion-btn ${opcion === op ? 'active' : ''}`}
                onClick={() => setOpcion(op)}
              >
                {op}
              </button>
            ))}
          </div>
        )}

        {/* Precio y Botón Agregar */}
        <div className="precio-agregar-container">
          <span className="precio-tag">${precioFormateado}</span>
          <button className="agregar-btn" onClick={handleAgregar}>
            AGREGAR
          </button>
        </div>
      </div>
    </article>
  );
}
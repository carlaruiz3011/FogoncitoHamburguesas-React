import { useState } from 'react';

export default function CartPage({ carrito, onNavegar, sumarCantidad, restarCantidad }) {
  // Estados del formulario
  const [formData, setFormData] = useState({ nombre: '', apellido: '', telefono: '', direccion: '' });
  const [errores, setErrores] = useState({});
  
  // Estado para el método de envío ('delivery' o 'retiro')
  const [metodoEnvio, setMetodoEnvio] = useState('delivery');

  // Cálculos de precios
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const costoEnvio = metodoEnvio === 'delivery' ? 1500 : 0;
  const total = subtotal + costoEnvio;

  const formatearPrecio = (num) => new Intl.NumberFormat('es-AR').format(num);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpiamos el error del campo que se está escribiendo
    if (errores[e.target.name]) {
      setErrores({ ...errores, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    
    if (!formData.nombre.trim()) nuevosErrores.nombre = 'Requerido';
    if (!formData.apellido.trim()) nuevosErrores.apellido = 'Requerido';
    if (metodoEnvio === 'delivery' && !formData.direccion.trim()) nuevosErrores.direccion = 'Requerido';
    if (!/^\d{7,}$/.test(formData.telefono)) nuevosErrores.telefono = 'Inválido';

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      alert(`¡Pedido confirmado para ${formData.nombre} ${formData.apellido}! Total: $${formatearPrecio(total)} 🍔🔥`);
    }
  };

  return (
    <div className="cart-page">
      <button onClick={() => onNavegar('home')} className="btn-volver">← Volver al inicio</button>
      
      <h2 className="section-title">Tu pedido</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="cart-layout">
          
          {/* COLUMNA IZQUIERDA: PRODUCTOS Y FORMULARIO */}
          <div className="cart-main-col">
            
            {/* Lista de productos */}
            <div className="cart-items-list">
              {carrito.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="item-info">
                    <h3>{item.nombre.replace(` (${item.nombre.split('(')[1]}`, '')}</h3>
                    <p className="item-desc">{item.descripcion}</p>
                  </div>
                  <div className="item-controls">
                    <button onClick={() => restarCantidad(item.id)} className="qty-btn">-</button>
                    <span className="qty-number">{item.cantidad}</span>
                    <button onClick={() => sumarCantidad(item.id)} className="qty-btn plus">+</button>
                  </div>
                  <div className="item-price">
                    ${formatearPrecio(item.precio * item.cantidad)}
                  </div>
                </div>
              ))}
            </div>

            {/* Formulario de Datos */}
            <h2 className="form-title">¿Quién hace el pedido?</h2>
            <form onSubmit={handleSubmit} className="checkout-form-v2">
              <div className="form-row">
                <div className="form-group">
                  <label>NOMBRE</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Juan" className={errores.nombre ? 'error-input' : ''} />
                  {errores.nombre && <span className="error-msg">{errores.nombre}</span>}
                </div>
                <div className="form-group">
                  <label>APELLIDO</label>
                  <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Ej: García" className={errores.apellido ? 'error-input' : ''} />
                  {errores.apellido && <span className="error-msg">{errores.apellido}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>TELÉFONO</label>
                  <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Ej: 1123456789" className={errores.telefono ? 'error-input' : ''} />
                  {errores.telefono && <span className="error-msg">{errores.telefono}</span>}
                </div>
                {metodoEnvio === 'delivery' && (
                  <div className="form-group">
                    <label>DIRECCIÓN</label>
                    <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Calle y número" className={errores.direccion ? 'error-input' : ''} />
                    {errores.direccion && <span className="error-msg">{errores.direccion}</span>}
                  </div>
                )}
              </div>

              {/* Selector de Envío */}
              <h2 className="form-title" style={{ marginTop: '2rem' }}>¿Cómo lo querés?</h2>
              <div className="envio-options">
                <div 
                  className={`envio-card ${metodoEnvio === 'delivery' ? 'active' : ''}`}
                  onClick={() => setMetodoEnvio('delivery')}
                >
                  <span className="envio-icon">🛵</span>
                  <h4>Delivery</h4>
                  <p>Envío: $1.500</p>
                </div>
                <div 
                  className={`envio-card ${metodoEnvio === 'retiro' ? 'active' : ''}`}
                  onClick={() => setMetodoEnvio('retiro')}
                >
                  <span className="envio-icon">🏪</span>
                  <h4>Pasa a retirar</h4>
                  <p>Sin costo de envío</p>
                </div>
              </div>

              <button type="submit" className="btn-confirmar">CONFIRMAR PEDIDO • ${formatearPrecio(total)}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
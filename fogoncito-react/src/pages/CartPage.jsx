import { useState } from 'react';
import Button from '../components/Button'; // Importamos el botón

export default function CartPage({ carrito, onNavegar }) {
  // Calculamos el total a pagar
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // 1. Estado para guardar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: ''
  });

  // 2. Estado para los errores de validación
  const [errores, setErrores] = useState({});

  // 3. Función que se ejecuta al escribir en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 4. Función de validación al enviar
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    const nuevosErrores = {};

    if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!formData.direccion.trim()) nuevosErrores.direccion = 'La dirección es obligatoria';
    if (!/^\d{7,}$/.test(formData.telefono)) nuevosErrores.telefono = 'Ingresá un teléfono válido (mínimo 7 números)';

    setErrores(nuevosErrores);

    // Si no hay errores, el pedido se "realiza"
    if (Object.keys(nuevosErrores).length === 0) {
      alert(`¡Pedido confirmado para ${formData.nombre}! Total: $${total} 🍔🔥`);
      setFormData({ nombre: '', direccion: '', telefono: '' }); // Limpiamos
    }
  };

  return (
    <div className="cart-page">
            <button 
        onClick={() => onNavegar('home')} 
        style={{ background: 'none', border: 'none', color: '#ff8c00', cursor: 'pointer', marginBottom: '1rem', fontSize: '1rem' }}
      >
        ← Volver al inicio
      </button>
      <h2>Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío. ¡Andá al menú a elegir algo rico! 🍔</p>
      ) : (
        <div className="cart-layout">
          {/* Lista de productos */}
          <div className="cart-items">
            <ul>
              {carrito.map((item) => (
                <li key={item.id}>
                  <strong>{item.nombre}</strong> <br/>
                  Cantidad: {item.cantidad} x ${item.precio} = <strong>${item.precio * item.cantidad}</strong>
                </li>
              ))}
            </ul>
            <h3>Total a pagar: ${total}</h3>
          </div>

          {/* Formulario de envío */}
          <div className="cart-form-container">
            <h3>Datos de Envío</h3>
            <form onSubmit={handleSubmit} className="checkout-form">
              
              <div className="form-group">
                <label>Nombre y Apellido:</label>
                <input 
                  type="text" 
                  name="nombre" 
                  value={formData.nombre} 
                  onChange={handleChange} 
                  className={errores.nombre ? 'input-error' : ''}
                />
                {errores.nombre && <span className="error-message">{errores.nombre}</span>}
              </div>

              <div className="form-group">
                <label>Dirección:</label>
                <input 
                  type="text" 
                  name="direccion" 
                  value={formData.direccion} 
                  onChange={handleChange} 
                  className={errores.direccion ? 'input-error' : ''}
                />
                {errores.direccion && <span className="error-message">{errores.direccion}</span>}
              </div>

              <div className="form-group">
                <label>Teléfono:</label>
                <input 
                  type="text" 
                  name="telefono" 
                  value={formData.telefono} 
                  onChange={handleChange} 
                  className={errores.telefono ? 'input-error' : ''}
                />
                {errores.telefono && <span className="error-message">{errores.telefono}</span>}
              </div>

              <Button type="submit">Confirmar Pedido</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
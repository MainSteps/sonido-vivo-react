import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext.js'
import { formatearPrecio } from '../utils/formatoPrecio.js'

function CampoCantidad({ producto, cambiarCantidad }) {
  const [cantidad, setCantidad] = useState(String(producto.cantidad))

  function actualizarCantidad() {
    const actualizado = cambiarCantidad(producto.codigo, Number(cantidad))

    if (!actualizado) {
      setCantidad(String(producto.cantidad))
    }
  }

  return (
    <>
      <label className="campo-cantidad" htmlFor={`cantidad-${producto.codigo}`}>
        <span>Cantidad</span>
        <input
          id={`cantidad-${producto.codigo}`}
          type="number"
          min="1"
          max={producto.stock}
          inputMode="numeric"
          value={cantidad}
          onChange={(evento) => setCantidad(evento.target.value)}
        />
      </label>
      <button
        className="button secondary actualizar-cantidad"
        type="button"
        onClick={actualizarCantidad}
      >
        Actualizar
      </button>
    </>
  )
}

function CarritoPage() {
  const {
    productos,
    total,
    error,
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito()
  const cantidadProductos = productos.reduce(
    (cantidad, producto) => cantidad + producto.cantidad,
    0,
  )

  return (
    <main>
      <section className="page-section carrito-page">
        <p className="eyebrow">Compra simulada</p>
        <h1>Tu carrito</h1>
        <p>Revisa las cantidades y el total antes de continuar.</p>

        {error && <p role="alert">{error}</p>}

        {productos.length === 0 ? (
          <div className="carrito-vacio">
            <p className="eyebrow">Tu selección</p>
            <h2>El carrito está vacío</h2>
            <p>Explora el catálogo y agrega un instrumento para comenzar.</p>
            <Link className="button" to="/productos">Ir al catálogo</Link>
          </div>
        ) : (
          <>
            <div className="carrito-layout">
              <section className="carrito-lista" aria-label="Productos del carrito">
              {productos.map((producto) => (
                <article key={producto.codigo} className="carrito-item">
                  <img src={producto.imagen} alt="" />
                  <div className="carrito-item-info">
                    <p className="eyebrow">{producto.categoria}</p>
                    <h2>{producto.nombre}</h2>
                    <p>{formatearPrecio(producto.precio)} por unidad</p>
                  </div>

                  <CampoCantidad
                    key={`${producto.codigo}-${producto.cantidad}`}
                    producto={producto}
                    cambiarCantidad={cambiarCantidad}
                  />

                  <p className="subtotal">
                    <span>Subtotal</span>
                    {formatearPrecio(producto.subtotal)}
                  </p>

                  <button
                    className="button secondary eliminar-producto"
                    type="button"
                    onClick={() => eliminarProducto(producto.codigo)}
                  >
                    Eliminar
                  </button>
                </article>
              ))}
              </section>

              <aside className="resumen-carrito" aria-labelledby="resumen-titulo">
                <p className="eyebrow">Resumen</p>
                <h2 id="resumen-titulo">Total de la compra</h2>
                <p><span>Productos</span><strong>{cantidadProductos}</strong></p>
                <p className="resumen-total">
                  <span>Total</span><strong>{formatearPrecio(total)}</strong>
                </p>
                <p className="nota-simulacion">
                  Compra simulada: no se procesan pagos ni datos personales.
                </p>
                <Link className="button" to="/productos">Seguir comprando</Link>
                <button
                  className="button secondary"
                  type="button"
                  onClick={vaciarCarrito}
                >
                  Vaciar carrito
                </button>
              </aside>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default CarritoPage

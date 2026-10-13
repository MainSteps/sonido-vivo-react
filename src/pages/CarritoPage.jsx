import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext.js'

const formateadorPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
})

function CarritoPage() {
  const {
    productos,
    total,
    error,
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito()

  return (
    <main>
      <section className="page-section carrito-page">
        <p className="eyebrow">Compra simulada</p>
        <h1>Carrito</h1>

        {error && <p role="alert">{error}</p>}

        {productos.length === 0 ? (
          <div className="carrito-vacio">
            <p>Tu carrito está vacío.</p>
            <Link to="/productos">Volver al catálogo</Link>
          </div>
        ) : (
          <>
            <ul className="carrito-lista">
              {productos.map((producto) => (
                <li key={producto.codigo} className="carrito-item">
                  <div>
                    <h2>{producto.nombre}</h2>
                    <p>{formateadorPrecio.format(producto.precio)} por unidad</p>
                  </div>

                  <div className="carrito-cantidad">
                    <button
                      type="button"
                      aria-label={`Disminuir cantidad de ${producto.nombre}`}
                      onClick={() =>
                        cambiarCantidad(
                          producto.codigo,
                          producto.cantidad - 1,
                        )
                      }
                    >
                      −
                    </button>
                    <span aria-label={`Cantidad de ${producto.nombre}`}>
                      {producto.cantidad}
                    </span>
                    <button
                      type="button"
                      aria-label={`Aumentar cantidad de ${producto.nombre}`}
                      onClick={() =>
                        cambiarCantidad(
                          producto.codigo,
                          producto.cantidad + 1,
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <p>
                    Subtotal: {formateadorPrecio.format(producto.subtotal)}
                  </p>

                  <button
                    type="button"
                    onClick={() => eliminarProducto(producto.codigo)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <p className="carrito-total">
              Total: {formateadorPrecio.format(total)}
            </p>

            <button type="button" onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
          </>
        )}
      </section>
    </main>
  )
}

export default CarritoPage

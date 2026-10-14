import { Link, useParams } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext.js'
import { obtenerProductoPorCodigo } from '../services/productosService.js'
import { formatearPrecio } from '../utils/formatoPrecio.js'

function ProductoDetallePage() {
  const { id } = useParams()
  const { agregarProducto, error } = useCarrito()
  const producto = obtenerProductoPorCodigo(id)

  if (!producto) {
    return (
      <main className="detail-page">
        <section className="not-found-product" aria-labelledby="producto-no-encontrado">
          <p className="eyebrow">Producto no disponible</p>
          <h1 id="producto-no-encontrado">No encontramos ese producto</h1>
          <p>
            El código ingresado no existe o el producto dejó de estar disponible.
            Puedes regresar al catálogo para revisar las alternativas actuales.
          </p>
          <Link className="button button--primary" to="/productos">
            Volver al catálogo
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="detail-page">
      <Link className="back-link" to="/productos">
        ← Volver al catálogo
      </Link>

      <article className="product-detail">
        <div className="product-detail__media">
          <img src={producto.imagen} alt="" />
        </div>
        <div className="product-detail__content">
          <p className="eyebrow">{producto.categoria}</p>
          <h1>{producto.nombre}</h1>
          <p className="product-code">Código {producto.codigo}</p>
          <p className="product-detail__description">{producto.descripcion}</p>
          <p className="product-detail__price">{formatearPrecio(producto.precio)}</p>
          <p className={`stock-status ${producto.stock === 0 ? 'stock-status--empty' : ''}`}>
            {producto.stock > 0
              ? `${producto.stock} unidades disponibles`
              : 'Producto sin stock'}
          </p>
          {error ? <p className="catalog-error" role="alert">{error}</p> : null}
          <div className="product-detail__actions">
            <button
              className="button button--primary"
              disabled={producto.stock === 0}
              type="button"
              onClick={() => agregarProducto(producto.codigo)}
            >
              {producto.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>
            <Link className="button button--secondary" to="/carrito">
              Ir al carrito
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}

export default ProductoDetallePage

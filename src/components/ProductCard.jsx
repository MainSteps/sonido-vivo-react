import { formatearPrecio } from '../utils/formatoPrecio.js'

function ProductCard({ producto, acciones }) {
  return (
    <article
      className="product-card"
      aria-labelledby={`producto-${producto.codigo}`}
    >
      <img src={producto.imagen} alt="" />
      <div className="product-card__body">
        <p className="eyebrow">{producto.categoria}</p>
        <h2 id={`producto-${producto.codigo}`}>{producto.nombre}</h2>
        <p className="product-card__description">{producto.descripcion}</p>
        <div className="product-card__meta">
          <strong>{formatearPrecio(producto.precio)}</strong>
          <span>{formatearStock(producto.stock)}</span>
        </div>
        {acciones ? <div className="product-card__actions">{acciones}</div> : null}
      </div>
    </article>
  )
}

function formatearStock(stock) {
  if (stock === 0) return 'Sin stock'
  return `${stock} ${stock === 1 ? 'unidad' : 'unidades'}`
}

export default ProductCard

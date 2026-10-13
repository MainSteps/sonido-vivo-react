import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext.js'
import { listarProductos } from '../services/productosService.js'

const formateadorPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
})

function ProductosPage() {
  const productos = listarProductos()
  const { agregarProducto, error } = useCarrito()

  return (
    <main>
      <section className="page-section productos-page">
        <p className="eyebrow">Sonido Vivo</p>
        <h1>Catálogo</h1>

        {error && <p role="alert">{error}</p>}

        <ul className="productos-lista">
          {productos.map((producto) => (
            <li key={producto.codigo} className="producto-card">
              <img src={producto.imagen} alt="" />
              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <p>{formateadorPrecio.format(producto.precio)}</p>
              <p>Stock disponible: {producto.stock}</p>
              <button
                type="button"
                onClick={() => agregarProducto(producto.codigo)}
              >
                Agregar al carrito
              </button>
            </li>
          ))}
        </ul>

        <Link to="/carrito">Ver carrito</Link>
      </section>
    </main>
  )
}

export default ProductosPage

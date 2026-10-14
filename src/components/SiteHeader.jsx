import { NavLink } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext.js'

const enlaces = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/productos', label: 'Productos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' },
]

function SiteHeader() {
  const { items } = useCarrito()
  const cantidadProductos = items.reduce(
    (total, item) => total + item.cantidad,
    0,
  )
  const etiquetaCarrito = `Carrito, ${cantidadProductos} ${
    cantidadProductos === 1 ? 'producto' : 'productos'
  }`

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Sonido Vivo, inicio">
        <span aria-hidden="true">♪</span>
        <span>Sonido Vivo</span>
      </NavLink>

      <nav className="main-nav" aria-label="Navegación principal">
        {enlaces.map((enlace) => (
          <NavLink
            key={enlace.to}
            to={enlace.to}
            end={enlace.end}
            className={({ isActive }) => (isActive ? 'nav-link activo' : 'nav-link')}
          >
            {enlace.label}
          </NavLink>
        ))}
      </nav>

      <NavLink
        aria-label={etiquetaCarrito}
        className="cart-link"
        to="/carrito"
      >
        Carrito <span aria-hidden="true">{cantidadProductos}</span>
      </NavLink>
    </header>
  )
}

export default SiteHeader

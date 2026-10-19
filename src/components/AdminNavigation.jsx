import { NavLink } from 'react-router-dom'

const enlacesAdministracion = [
  { to: '/admin/productos', label: 'Productos' },
  { to: '/admin/usuarios', label: 'Usuarios' },
  { to: '/', label: 'Ver tienda pública' },
]

function AdminNavigation() {
  return (
    <nav className="admin-navigation" aria-label="Navegación de administración">
      {enlacesAdministracion.map((enlace) => (
        <NavLink
          key={enlace.to}
          className={({ isActive }) =>
            isActive ? 'admin-navigation__link activo' : 'admin-navigation__link'
          }
          end={enlace.to === '/'}
          to={enlace.to}
        >
          {enlace.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default AdminNavigation

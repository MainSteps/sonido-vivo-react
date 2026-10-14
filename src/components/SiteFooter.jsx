import { Link } from 'react-router-dom'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="brand" to="/">
        <span aria-hidden="true">♪</span>
        <span>Sonido Vivo</span>
      </Link>
      <p>Proyecto académico con contenido y datos simulados.</p>
      <nav aria-label="Enlaces del pie">
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>
    </footer>
  )
}

export default SiteFooter

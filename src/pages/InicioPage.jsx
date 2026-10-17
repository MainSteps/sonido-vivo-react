import { Link } from 'react-router-dom'
import { ARTICULOS } from '../data/contenido.js'
import { listarProductos } from '../services/productosService.js'
import { formatearPrecio } from '../utils/formatoPrecio.js'

function InicioPage() {
  const productosDestacados = listarProductos().slice(0, 4)

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <p className="eyebrow">Tienda musical</p>
          <h1 id="hero-title">Instrumentos para crear tu propio sonido</h1>
          <p>
            Encuentra instrumentos y accesorios para aprender, ensayar y
            compartir tu música.
          </p>
          <Link className="button button--primary hero-button" to="/productos">
            Ver productos
          </Link>
        </div>

        <img
          src="/images/hero-sonido-vivo.svg"
          alt="Ondas musicales sobre un escenario oscuro"
        />
      </section>

      <section className="page-section" aria-labelledby="video-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Conoce instrumentos</p>
            <h2 id="video-title">El sonido también se descubre</h2>
          </div>
        </div>

        <div className="video-contenedor">
          <iframe
            src="https://www.youtube-nocookie.com/embed/0vijAQHaIMQ?rel=0"
            title="Video musical de Sonido Vivo"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>

      <section className="page-section" aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selección destacada</p>
            <h2 id="featured-title">Productos para comenzar</h2>
          </div>
          <Link to="/productos">Ver catálogo completo →</Link>
        </div>

        {productosDestacados.length > 0 ? (
          <div className="card-grid featured-products">
            {productosDestacados.map((producto) => (
              <article className="product-card" key={producto.codigo}>
                <img src={producto.imagen} alt="" />
                <div>
                  <p className="eyebrow">{producto.categoria}</p>
                  <h3>{producto.nombre}</h3>
                  <p className="price">{formatearPrecio(producto.precio)}</p>
                  <Link to={`/productos/${encodeURIComponent(producto.codigo)}`}>
                    Ver producto
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>No hay productos destacados disponibles.</p>
        )}
      </section>

      <section
        className="page-section surface-section"
        aria-labelledby="news-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Aprende y descubre</p>
            <h2 id="news-title">Novedades del blog</h2>
          </div>
          <Link to="/blog">Ver todos los artículos →</Link>
        </div>

        <div className="blog-grid">
          {ARTICULOS.map((articulo) => (
            <article className="blog-card" key={articulo.id}>
              <img src={articulo.imagen} alt="" />
              <div>
                <h3>{articulo.titulo}</h3>
                <p>{articulo.resumen}</p>
                <Link to={`/blog/${articulo.id}`}>Leer artículo →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default InicioPage

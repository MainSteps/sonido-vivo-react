import { Link } from 'react-router-dom'
import { ARTICULOS } from '../data/contenido.js'

function BlogPage() {
  return (
    <main>
      <header className="page-hero">
        <p className="eyebrow">Ideas para músicos</p>
        <h1>Blog de Sonido Vivo</h1>
        <p>
          Consejos sencillos para ensayar, aprender y cuidar tus instrumentos.
        </p>
      </header>

      <section className="page-section" aria-labelledby="posts-title">
        <h2 id="posts-title" className="sr-only">
          Artículos publicados
        </h2>

        {ARTICULOS.length > 0 ? (
          <div className="blog-grid">
            {ARTICULOS.map((articulo) => (
              <article className="blog-card" key={articulo.id}>
                <img src={articulo.imagen} alt="" />
                <div>
                  <p className="eyebrow">Consejos</p>
                  <h2>{articulo.titulo}</h2>
                  <p>{articulo.resumen}</p>
                  <Link
                    className="button button--secondary"
                    to={`/blog/${articulo.id}`}
                  >
                    Leer artículo
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>No hay artículos disponibles.</p>
        )}
      </section>
    </main>
  )
}

export default BlogPage

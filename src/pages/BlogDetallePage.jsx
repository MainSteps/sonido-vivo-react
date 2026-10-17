import { Link, useParams } from 'react-router-dom'
import { ARTICULOS } from '../data/contenido.js'

function BlogDetallePage() {
  const { id } = useParams()
  const articulo = ARTICULOS.find((item) => item.id === id)

  return (
    <main className="article-main">
      <Link className="back-link" to="/blog">
        ← Volver al blog
      </Link>

      {!articulo ? (
        <article className="article-detail">
          <p className="eyebrow">Error 404</p>
          <h1>Artículo no encontrado</h1>
          <p>El contenido solicitado no está disponible.</p>
          <Link className="button button--primary article-button" to="/blog">
            Ver artículos
          </Link>
        </article>
      ) : (
        <article className="article-detail">
          <img src={articulo.imagen} alt="" />
          <header>
            <p className="eyebrow">Consejos</p>
            <h1>{articulo.titulo}</h1>
            <p className="lead">{articulo.resumen}</p>
          </header>

          {articulo.contenido.map((texto) => (
            <p key={texto}>{texto}</p>
          ))}
        </article>
      )}
    </main>
  )
}

export default BlogDetallePage

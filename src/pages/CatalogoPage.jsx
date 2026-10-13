import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import ProductFilters from '../components/ProductFilters.jsx'
import { CATEGORIAS_PRODUCTO } from '../data/productos.js'
import { buscarProductos } from '../services/productosService.js'

function CatalogoPage() {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')

  const productos = useMemo(
    () => buscarProductos(busqueda, categoria),
    [busqueda, categoria],
  )

  const limpiarFiltros = () => {
    setBusqueda('')
    setCategoria('')
  }

  return (
    <main className="catalog-page">
      <section className="catalog-hero" aria-labelledby="titulo-catalogo">
        <p className="eyebrow">Instrumentos y accesorios</p>
        <h1 id="titulo-catalogo">Encuentra tu próximo sonido</h1>
        <p>
          Explora nuestro catálogo simulado y filtra los productos según lo que
          necesitas para tocar, ensayar o grabar.
        </p>
      </section>

      <ProductFilters
        busqueda={busqueda}
        categoria={categoria}
        categorias={CATEGORIAS_PRODUCTO}
        onBusqueda={setBusqueda}
        onCategoria={setCategoria}
      />

      <div className="catalog-summary" aria-live="polite">
        <p>
          <strong>{productos.length}</strong>{' '}
          {productos.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>
      </div>

      {productos.length > 0 ? (
        <section className="product-grid" aria-label="Listado de productos">
          {productos.map((producto) => (
            <ProductCard
              key={producto.codigo}
              producto={producto}
              acciones={
                <Link
                  className="button button--primary"
                  to={`/productos/${encodeURIComponent(producto.codigo)}`}
                >
                  Ver detalle
                </Link>
              }
            />
          ))}
        </section>
      ) : (
        <section className="empty-state" aria-labelledby="sin-resultados">
          <p className="eyebrow">Sin coincidencias</p>
          <h2 id="sin-resultados">No encontramos productos</h2>
          <p>Prueba otra palabra o vuelve a mostrar todas las categorías.</p>
          <button className="button button--secondary" type="button" onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
        </section>
      )}
    </main>
  )
}

export default CatalogoPage

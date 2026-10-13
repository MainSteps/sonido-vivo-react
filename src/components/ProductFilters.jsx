function ProductFilters({ busqueda, categoria, categorias, onBusqueda, onCategoria }) {
  return (
    <form className="product-filters" role="search" onSubmit={(event) => event.preventDefault()}>
      <div className="field">
        <label htmlFor="busqueda-productos">Buscar productos</label>
        <input
          id="busqueda-productos"
          type="search"
          value={busqueda}
          onChange={(event) => onBusqueda(event.target.value)}
          placeholder="Nombre, código o descripción"
        />
      </div>

      <div className="field">
        <label htmlFor="categoria-productos">Filtrar por categoría</label>
        <select
          id="categoria-productos"
          value={categoria}
          onChange={(event) => onCategoria(event.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categorias.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}

export default ProductFilters

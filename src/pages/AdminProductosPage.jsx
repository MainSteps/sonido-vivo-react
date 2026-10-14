import { useState } from 'react'
import { CATEGORIAS_PRODUCTO } from '../data/productos.js'
import * as productosService from '../services/productosService.js'
import { formatearPrecio } from '../utils/formatoPrecio.js'

const FORMULARIO_VACIO = {
  codigo: '',
  nombre: '',
  categoria: '',
  precio: '',
  stock: '',
  imagen: '',
  descripcion: '',
}

function AdminProductosPage({ servicio = productosService }) {
  const [productos, setProductos] = useState(() => servicio.listarProductos())
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO)
  const [codigoEnEdicion, setCodigoEnEdicion] = useState(null)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState(null)

  const estaEditando = codigoEnEdicion !== null

  function actualizarListado() {
    setProductos(servicio.listarProductos())
  }

  function limpiarFormulario() {
    setFormulario(FORMULARIO_VACIO)
    setCodigoEnEdicion(null)
    setErrores({})
  }

  function cambiarCampo(event) {
    const { name, value } = event.target
    setFormulario((actual) => ({ ...actual, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: undefined }))
    setMensaje(null)
  }

  function guardarProducto(event) {
    event.preventDefault()

    const resultado = estaEditando
      ? servicio.actualizarProducto(codigoEnEdicion, formulario)
      : servicio.crearProducto(formulario)

    if (!resultado.ok) {
      setErrores(resultado.error.errores ?? {})
      setMensaje({ tipo: 'error', texto: resultado.error.mensaje })
      return
    }

    actualizarListado()
    limpiarFormulario()
    setMensaje({
      tipo: 'exito',
      texto: estaEditando
        ? 'Producto actualizado correctamente.'
        : 'Producto creado correctamente.',
    })
  }

  function comenzarEdicion(producto) {
    setCodigoEnEdicion(producto.codigo)
    setFormulario({
      codigo: producto.codigo,
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: String(producto.precio),
      stock: String(producto.stock),
      imagen: producto.imagen,
      descripcion: producto.descripcion,
    })
    setErrores({})
    setMensaje(null)
  }

  function cancelarEdicion() {
    limpiarFormulario()
    setMensaje(null)
  }

  function confirmarEliminacion(producto) {
    const confirmado = globalThis.confirm(
      `¿Eliminar ${producto.nombre} del catálogo?`,
    )
    if (!confirmado) return

    const resultado = servicio.eliminarProducto(producto.codigo)
    if (!resultado.ok) {
      setMensaje({ tipo: 'error', texto: resultado.error.mensaje })
      return
    }

    if (codigoEnEdicion === producto.codigo) limpiarFormulario()
    actualizarListado()
    setMensaje({ tipo: 'exito', texto: 'Producto eliminado correctamente.' })
  }

  return (
    <main className="admin-products-page">
      <header className="admin-products-header">
        <div>
          <p className="eyebrow">Administración local</p>
          <h1>Productos</h1>
          <p>
            Crea, consulta, edita y elimina productos ficticios. Los cambios se
            guardan en este navegador y se reflejan en el catálogo público.
          </p>
        </div>
        <span className="admin-products-count">
          {productos.length} {productos.length === 1 ? 'producto' : 'productos'}
        </span>
      </header>

      {mensaje ? (
        <p
          className={`admin-message admin-message--${mensaje.tipo}`}
          role={mensaje.tipo === 'error' ? 'alert' : 'status'}
        >
          {mensaje.texto}
        </p>
      ) : null}

      <div className="admin-products-layout">
        <section className="admin-form-panel" aria-labelledby="titulo-formulario-producto">
          <p className="eyebrow">{estaEditando ? 'Edición' : 'Nuevo registro'}</p>
          <h2 id="titulo-formulario-producto">
            {estaEditando ? 'Editar producto' : 'Crear producto'}
          </h2>

          <form className="admin-product-form" noValidate onSubmit={guardarProducto}>
            <Campo
              error={errores.codigo}
              id="producto-codigo"
              label="Código"
              name="codigo"
              onChange={cambiarCampo}
              placeholder="SV-GUI-007"
              value={formulario.codigo}
            />
            <Campo
              error={errores.nombre}
              id="producto-nombre"
              label="Nombre"
              name="nombre"
              onChange={cambiarCampo}
              placeholder="Nombre del producto"
              value={formulario.nombre}
            />

            <div className="field">
              <label htmlFor="producto-categoria">Categoría</label>
              <select
                aria-describedby={errores.categoria ? 'producto-categoria-error' : undefined}
                aria-invalid={Boolean(errores.categoria)}
                id="producto-categoria"
                name="categoria"
                onChange={cambiarCampo}
                value={formulario.categoria}
              >
                <option value="">Selecciona una categoría</option>
                {CATEGORIAS_PRODUCTO.map((categoria) => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
              <ErrorCampo id="producto-categoria-error" mensaje={errores.categoria} />
            </div>

            <div className="admin-form-row">
              <Campo
                error={errores.precio}
                id="producto-precio"
                label="Precio"
                min="0"
                name="precio"
                onChange={cambiarCampo}
                placeholder="0"
                type="number"
                value={formulario.precio}
              />
              <Campo
                error={errores.stock}
                id="producto-stock"
                label="Stock"
                min="0"
                name="stock"
                onChange={cambiarCampo}
                placeholder="0"
                step="1"
                type="number"
                value={formulario.stock}
              />
            </div>

            <Campo
              id="producto-imagen"
              label="Ruta de imagen"
              name="imagen"
              onChange={cambiarCampo}
              placeholder="/images/producto-guitarra.svg"
              value={formulario.imagen}
            />

            <div className="field">
              <label htmlFor="producto-descripcion">Descripción</label>
              <textarea
                id="producto-descripcion"
                name="descripcion"
                onChange={cambiarCampo}
                placeholder="Descripción breve del producto"
                rows="4"
                value={formulario.descripcion}
              />
            </div>

            <div className="admin-form-actions">
              <button className="button button--primary" type="submit">
                {estaEditando ? 'Guardar cambios' : 'Crear producto'}
              </button>
              {estaEditando ? (
                <button
                  className="button button--secondary"
                  type="button"
                  onClick={cancelarEdicion}
                >
                  Cancelar edición
                </button>
              ) : null}
            </div>
          </form>
        </section>

        <section className="admin-list-panel" aria-labelledby="titulo-listado-productos">
          <div className="admin-list-heading">
            <div>
              <p className="eyebrow">Inventario</p>
              <h2 id="titulo-listado-productos">Listado de productos</h2>
            </div>
          </div>

          {productos.length === 0 ? (
            <div className="admin-empty-state">
              <h3>No hay productos registrados</h3>
              <p>Utiliza el formulario para crear el primer producto.</p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-products-table">
                <thead>
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.codigo}>
                      <td>
                        <strong>{producto.nombre}</strong>
                        <span>{producto.codigo}</span>
                      </td>
                      <td>{producto.categoria}</td>
                      <td>{formatearPrecio(producto.precio)}</td>
                      <td>{producto.stock}</td>
                      <td>
                        <div className="admin-row-actions">
                          <button
                            aria-label={`Editar ${producto.nombre}`}
                            type="button"
                            onClick={() => comenzarEdicion(producto)}
                          >
                            Editar
                          </button>
                          <button
                            aria-label={`Eliminar ${producto.nombre}`}
                            className="admin-delete-button"
                            type="button"
                            onClick={() => confirmarEliminacion(producto)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function Campo({ error, id, label, ...propiedades }) {
  const idError = `${id}-error`

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        {...propiedades}
        aria-describedby={error ? idError : undefined}
        aria-invalid={Boolean(error)}
        id={id}
      />
      <ErrorCampo id={idError} mensaje={error} />
    </div>
  )
}

function ErrorCampo({ id, mensaje }) {
  return mensaje ? <span className="field-error" id={id}>{mensaje}</span> : null
}

export default AdminProductosPage

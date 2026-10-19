import { useState } from 'react'
import AdminNavigation from '../components/AdminNavigation.jsx'
import { rolesUsuario } from '../data/usuarios.js'
import * as usuariosService from '../services/usuariosService.js'

const FORMULARIO_VACIO = {
  run: '',
  nombre: '',
  apellidos: '',
  email: '',
  rol: '',
}

function AdminUsuariosPage({
  servicio = usuariosService,
}) {
  const [usuarios, setUsuarios] = useState(() =>
    servicio.listarUsuarios(),
  )
  const [formulario, setFormulario] = useState(
    FORMULARIO_VACIO,
  )
  const [runEnEdicion, setRunEnEdicion] =
    useState(null)
  const [usuarioConsultado, setUsuarioConsultado] =
    useState(null)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState(null)

  const estaEditando = runEnEdicion !== null

  function actualizarListado() {
    setUsuarios(servicio.listarUsuarios())
  }

  function cambiarCampo(event) {
    const { name, value } = event.target

    setFormulario((formularioActual) => ({
      ...formularioActual,
      [name]: value,
    }))

    setErrores((erroresActuales) => ({
      ...erroresActuales,
      [name]: undefined,
    }))

    setMensaje(null)
  }

  function limpiarFormulario() {
    setFormulario(FORMULARIO_VACIO)
    setRunEnEdicion(null)
    setErrores({})
  }

  function guardarUsuario(event) {
    event.preventDefault()

    const resultado = estaEditando
      ? servicio.actualizarUsuario(
          runEnEdicion,
          formulario,
        )
      : servicio.crearUsuario(formulario)

    if (!resultado.ok) {
      setErrores(resultado.errores ?? {})
      setMensaje({
        tipo: 'error',
        texto:
          resultado.mensaje ??
          'Revise los datos ingresados.',
      })
      return
    }

    const mensajeExito = estaEditando
      ? 'Usuario actualizado correctamente.'
      : 'Usuario creado correctamente.'

    if (
      usuarioConsultado?.run === resultado.usuario.run
    ) {
      setUsuarioConsultado(resultado.usuario)
    }

    actualizarListado()
    limpiarFormulario()

    setMensaje({
      tipo: 'exito',
      texto: mensajeExito,
    })
  }

  function comenzarEdicion(usuario) {
    setRunEnEdicion(usuario.run)

    setFormulario({
      run: usuario.run,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      email: usuario.email,
      rol: usuario.rol,
    })

    setErrores({})
    setMensaje(null)
  }

  function cancelarEdicion() {
    limpiarFormulario()
    setMensaje(null)
  }

  function consultarUsuario(usuario) {
    setUsuarioConsultado(usuario)
  }

  function confirmarEliminacion(usuario) {
    const confirmado = globalThis.confirm(
      `¿Eliminar a ${usuario.nombre} ${usuario.apellidos}?`,
    )

    if (!confirmado) {
      return
    }

    const resultado = servicio.eliminarUsuario(
      usuario.run,
    )

    if (!resultado.ok) {
      setMensaje({
        tipo: 'error',
        texto: resultado.mensaje,
      })
      return
    }

    if (runEnEdicion === usuario.run) {
      limpiarFormulario()
    }

    if (usuarioConsultado?.run === usuario.run) {
      setUsuarioConsultado(null)
    }

    actualizarListado()

    setMensaje({
      tipo: 'exito',
      texto: 'Usuario eliminado correctamente.',
    })
  }

  return (
    <main className="admin-products-page admin-users-page">
      <AdminNavigation />

      <header className="admin-products-header">
        <div>
          <p className="eyebrow">
            Administración simulada
          </p>
          <h1>Usuarios</h1>
          <p>
            Estos datos son ficticios y se utilizan
            solamente para la demostración académica.
          </p>
        </div>

        <span className="admin-products-count">
          {usuarios.length}{' '}
          {usuarios.length === 1
            ? 'usuario'
            : 'usuarios'}
        </span>
      </header>

      {mensaje !== null && (
        <p
          className={`admin-message admin-message--${mensaje.tipo}`}
          role={
            mensaje.tipo === 'error'
              ? 'alert'
              : 'status'
          }
        >
          {mensaje.texto}
        </p>
      )}

      <div className="admin-products-layout">
        <section
          className="admin-form-panel"
          aria-labelledby="titulo-formulario-usuario"
        >
          <p className="eyebrow">
            {estaEditando
              ? 'Edición'
              : 'Nuevo registro'}
          </p>

          <h2 id="titulo-formulario-usuario">
            {estaEditando
              ? 'Editar usuario'
              : 'Crear usuario'}
          </h2>

          <form
            className="admin-product-form admin-user-form"
            noValidate
            onSubmit={guardarUsuario}
          >
            <Campo
              disabled={estaEditando}
              error={errores.run}
              id="usuario-run"
              label="RUN (sin puntos ni guion)"
              name="run"
              onChange={cambiarCampo}
              value={formulario.run}
            />

            <Campo
              error={errores.nombre}
              id="usuario-nombre"
              label="Nombre"
              maxLength="50"
              name="nombre"
              onChange={cambiarCampo}
              value={formulario.nombre}
            />

            <Campo
              error={errores.apellidos}
              id="usuario-apellidos"
              label="Apellidos"
              maxLength="100"
              name="apellidos"
              onChange={cambiarCampo}
              value={formulario.apellidos}
            />

            <Campo
              error={errores.email}
              id="usuario-email"
              label="Correo electrónico"
              maxLength="100"
              name="email"
              onChange={cambiarCampo}
              type="email"
              value={formulario.email}
            />

            <div className="field">
              <label htmlFor="usuario-rol">
                Rol
              </label>

              <select
                aria-describedby={
                  errores.rol
                    ? 'usuario-rol-error'
                    : undefined
                }
                aria-invalid={Boolean(errores.rol)}
                id="usuario-rol"
                name="rol"
                onChange={cambiarCampo}
                value={formulario.rol}
              >
                <option value="">
                  Seleccione un rol
                </option>

                {rolesUsuario.map((rol) => (
                  <option key={rol} value={rol}>
                    {rol}
                  </option>
                ))}
              </select>

              <ErrorCampo
                id="usuario-rol-error"
                mensaje={errores.rol}
              />
            </div>

            <div className="admin-form-actions">
              <button
                className="button button--primary"
                type="submit"
              >
                {estaEditando
                  ? 'Guardar cambios'
                  : 'Crear usuario simulado'}
              </button>

              {estaEditando && (
                <button
                  className="button button--secondary"
                  type="button"
                  onClick={cancelarEdicion}
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </section>

        <section
          className="admin-list-panel"
          aria-labelledby="titulo-listado-usuarios"
        >
          <div className="admin-list-heading">
            <p className="eyebrow">
              Usuarios simulados
            </p>

            <h2 id="titulo-listado-usuarios">
              Listado de usuarios
            </h2>
          </div>

          {usuarioConsultado !== null && (
            <div className="admin-user-detail">
              <h3>Detalle del usuario</h3>

              <p>
                <strong>RUN:</strong>{' '}
                {usuarioConsultado.run}
              </p>

              <p>
                <strong>Nombre:</strong>{' '}
                {usuarioConsultado.nombre}{' '}
                {usuarioConsultado.apellidos}
              </p>

              <p>
                <strong>Correo:</strong>{' '}
                {usuarioConsultado.email}
              </p>

              <p>
                <strong>Rol:</strong>{' '}
                {usuarioConsultado.rol}
              </p>
            </div>
          )}

          {usuarios.length === 0 ? (
            <div className="admin-empty-state">
              <h3>No hay usuarios registrados</h3>
              <p>
                Utilice el formulario para crear el
                primer usuario.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-products-table admin-users-table">
                <thead>
                  <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.run}>
                      <td>
                        <strong>
                          {usuario.nombre}{' '}
                          {usuario.apellidos}
                        </strong>
                        <span>{usuario.run}</span>
                      </td>

                      <td>{usuario.email}</td>
                      <td>{usuario.rol}</td>

                      <td>
                        <div className="admin-row-actions">
                          <button
                            type="button"
                            onClick={() =>
                              consultarUsuario(usuario)
                            }
                          >
                            Ver
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              comenzarEdicion(usuario)
                            }
                          >
                            Editar
                          </button>

                          <button
                            className="admin-delete-button"
                            type="button"
                            onClick={() =>
                              confirmarEliminacion(
                                usuario,
                              )
                            }
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

function Campo({
  error,
  id,
  label,
  ...propiedades
}) {
  const idError = `${id}-error`

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>

      <input
        {...propiedades}
        aria-describedby={
          error ? idError : undefined
        }
        aria-invalid={Boolean(error)}
        id={id}
      />

      <ErrorCampo
        id={idError}
        mensaje={error}
      />
    </div>
  )
}

function ErrorCampo({ id, mensaje }) {
  if (!mensaje) {
    return null
  }

  return (
    <span className="field-error" id={id}>
      {mensaje}
    </span>
  )
}

export default AdminUsuariosPage

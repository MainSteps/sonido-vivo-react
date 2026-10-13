import { useState } from "react"
import { Link } from "react-router-dom"
import { regionesComunas } from "../data/regiones-comunas"
import {
  validarCampoObligatorio,
  validarContrasena,
  validarDominioCorreo,
  validarLongitudMaxima,
  validarRun,
} from "../utils/validaciones"

function RegistroPage() {
  const [run, setRun] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fechaNacimiento, setFechaNacimiento] =
    useState("")
  const [region, setRegion] = useState("")
  const [comuna, setComuna] = useState("")
  const [direccion, setDireccion] = useState("")

  const [mensajeRun, setMensajeRun] = useState("")
  const [mensajeNombre, setMensajeNombre] =
    useState("")
  const [mensajeApellidos, setMensajeApellidos] =
    useState("")
  const [mensajeEmail, setMensajeEmail] =
    useState("")
  const [mensajePassword, setMensajePassword] =
    useState("")
  const [mensajeRegion, setMensajeRegion] =
    useState("")
  const [mensajeComuna, setMensajeComuna] =
    useState("")
  const [mensajeDireccion, setMensajeDireccion] =
    useState("")
  const [mensajeFormulario, setMensajeFormulario] =
    useState("")

  const regionSeleccionada =
    region === ""
      ? null
      : regionesComunas[Number(region)]

  function cambiarRegion(event) {
    setRegion(event.target.value)
    setComuna("")
  }

  function validarFormulario(event) {
    event.preventDefault()

    setMensajeRun("")
    setMensajeNombre("")
    setMensajeApellidos("")
    setMensajeEmail("")
    setMensajePassword("")
    setMensajeRegion("")
    setMensajeComuna("")
    setMensajeDireccion("")
    setMensajeFormulario("")

    if (!validarCampoObligatorio(run)) {
      setMensajeRun("Debe ingresar su RUN.")
      return
    }

    if (!validarRun(run)) {
      setMensajeRun(
        "Escriba un RUN válido, sin puntos ni guion.",
      )
      return
    }

    if (!validarCampoObligatorio(nombre)) {
      setMensajeNombre("Debe ingresar su nombre.")
      return
    }

    if (!validarLongitudMaxima(nombre, 50)) {
      setMensajeNombre(
        "El nombre no puede superar los 50 caracteres.",
      )
      return
    }

    if (!validarCampoObligatorio(apellidos)) {
      setMensajeApellidos(
        "Debe ingresar sus apellidos.",
      )
      return
    }

    if (!validarLongitudMaxima(apellidos, 100)) {
      setMensajeApellidos(
        "Los apellidos no pueden superar los 100 caracteres.",
      )
      return
    }

    if (!validarCampoObligatorio(email)) {
      setMensajeEmail(
        "Debe ingresar su correo electrónico.",
      )
      return
    }

    if (!validarLongitudMaxima(email, 100)) {
      setMensajeEmail(
        "El correo electrónico no puede superar los 100 caracteres.",
      )
      return
    }

    if (!validarDominioCorreo(email)) {
      setMensajeEmail(
        "Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.",
      )
      return
    }

    if (!validarCampoObligatorio(password)) {
      setMensajePassword(
        "Debe ingresar una contraseña.",
      )
      return
    }

    if (!validarContrasena(password)) {
      setMensajePassword(
        "La contraseña debe tener entre 4 y 10 caracteres.",
      )
      return
    }

    if (!validarCampoObligatorio(region)) {
      setMensajeRegion(
        "Debe seleccionar una región.",
      )
      return
    }

    if (!validarCampoObligatorio(comuna)) {
      setMensajeComuna(
        "Debe seleccionar una comuna.",
      )
      return
    }

    if (!validarCampoObligatorio(direccion)) {
      setMensajeDireccion(
        "Debe ingresar su dirección.",
      )
      return
    }

    if (!validarLongitudMaxima(direccion, 300)) {
      setMensajeDireccion(
        "La dirección no puede superar los 300 caracteres.",
      )
      return
    }

    setMensajeFormulario(
      "Demostración de Sonido Vivo: los campos revisados están completados. No se creó una cuenta real.",
    )
  }

  return (
    <main>
      <section className="page-section">
        <p className="eyebrow">
          Cuenta de demostración
        </p>
        <h1>Registro de usuario</h1>
        <p>
          Completa el formulario únicamente con datos de prueba.
        </p>

        <form
          className="formulario-simulacion"
          onSubmit={validarFormulario}
        >
          <div>
            <label htmlFor="input-run">
              RUN (sin puntos ni guion)
            </label>
            <input
              id="input-run"
              type="text"
              minLength="7"
              maxLength="9"
              placeholder="Ingrese un RUN de prueba"
              value={run}
              onChange={(event) =>
                setRun(event.target.value)
              }
            />
            <p id="mensaje-run">{mensajeRun}</p>
          </div>

          <div>
            <label htmlFor="input-nombre">
              Nombre
            </label>
            <input
              id="input-nombre"
              type="text"
              maxLength="50"
              value={nombre}
              onChange={(event) =>
                setNombre(event.target.value)
              }
            />
            <p id="mensaje-nombre">
              {mensajeNombre}
            </p>
          </div>

          <div>
            <label htmlFor="input-apellidos">
              Apellidos
            </label>
            <input
              id="input-apellidos"
              type="text"
              maxLength="100"
              value={apellidos}
              onChange={(event) =>
                setApellidos(event.target.value)
              }
            />
            <p id="mensaje-apellidos">
              {mensajeApellidos}
            </p>
          </div>

          <div>
            <label htmlFor="input-email">
              Correo electrónico
            </label>
            <input
              id="input-email"
              type="email"
              maxLength="100"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
            <p id="mensaje-email">{mensajeEmail}</p>
          </div>

          <div>
            <label htmlFor="input-password">
              Contraseña
            </label>
            <input
              id="input-password"
              type="password"
              minLength="4"
              maxLength="10"
              placeholder="Ingrese una contraseña de prueba"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
            <p id="mensaje-password">
              {mensajePassword}
            </p>
          </div>

          <div>
            <label htmlFor="input-fecha-nacimiento">
              Fecha de nacimiento (opcional)
            </label>
            <input
              id="input-fecha-nacimiento"
              type="date"
              value={fechaNacimiento}
              onChange={(event) =>
                setFechaNacimiento(event.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor="input-region">
              Región
            </label>
            <select
              id="input-region"
              value={region}
              onChange={cambiarRegion}
            >
              <option value="">
                Seleccione una región
              </option>

              {regionesComunas.map(
                (regionActual, posicion) => (
                  <option
                    key={regionActual.nombre}
                    value={posicion}
                  >
                    {regionActual.nombre}
                  </option>
                ),
              )}
            </select>
            <p id="mensaje-region">
              {mensajeRegion}
            </p>
          </div>

          <div>
            <label htmlFor="input-comuna">
              Comuna
            </label>
            <select
              id="input-comuna"
              value={comuna}
              onChange={(event) =>
                setComuna(event.target.value)
              }
            >
              <option value="">
                {region === ""
                  ? "Seleccione primero una región"
                  : "Seleccione una comuna"}
              </option>

              {regionSeleccionada !== null &&
                regionSeleccionada.comunas.map(
                  (comunaActual) => (
                    <option
                      key={comunaActual}
                      value={comunaActual}
                    >
                      {comunaActual}
                    </option>
                  ),
                )}
            </select>
            <p id="mensaje-comuna">
              {mensajeComuna}
            </p>
          </div>

          <div>
            <label htmlFor="input-direccion">
              Dirección
            </label>
            <input
              id="input-direccion"
              type="text"
              maxLength="300"
              placeholder="Ingrese una dirección de prueba"
              value={direccion}
              onChange={(event) =>
                setDireccion(event.target.value)
              }
            />
            <p id="mensaje-direccion">
              {mensajeDireccion}
            </p>
          </div>

          <button id="btn-registro" type="submit">
            Registrarse
          </button>
        </form>

        <p id="mensaje-formulario">
          {mensajeFormulario}
        </p>

        <p>
          ¿Ya tienes una cuenta de demostración?{" "}
          <Link to="/login">Inicia sesión</Link>.
        </p>
      </section>
    </main>
  )
}

export default RegistroPage
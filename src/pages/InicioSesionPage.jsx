import { useState } from "react"
import { Link } from "react-router-dom"

import {
  validarCampoObligatorio,
  validarContrasena,
  validarDominioCorreo,
  validarLongitudMaxima,
} from "../utils/validaciones"

function InicioSesionPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [mensajeEmail, setMensajeEmail] = useState("")
  const [mensajePassword, setMensajePassword] = useState("")
  const [mensajeFormulario, setMensajeFormulario] =
    useState("")

  function validarFormulario(event) {
    event.preventDefault()

    setMensajeEmail("")
    setMensajePassword("")
    setMensajeFormulario("")

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
        "Debe ingresar su contraseña.",
      )
      return
    }

    if (!validarContrasena(password)) {
      setMensajePassword(
        "La contraseña debe tener entre 4 y 10 caracteres.",
      )
      return
    }

    setMensajeFormulario(
      "Demostración de Sonido Vivo: los campos están completados, pero no se inicia una sesión real.",
    )
  }

  return (
    <main>
      <section className="page-section">
        <p className="eyebrow">
          Acceso de demostración
        </p>

        <h1>Iniciar sesión</h1>

        <p>
          Ingresa con datos de prueba. No se inicia una
          sesión real.
        </p>

        <form
          className="formulario-simulacion"
          onSubmit={validarFormulario}
        >
          <div>
            <label htmlFor="input-email-login">
              Correo electrónico
            </label>

            <input
              id="input-email-login"
              type="email"
              maxLength="100"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            <p id="mensaje-email-login">
              {mensajeEmail}
            </p>
          </div>

          <div>
            <label htmlFor="input-password-login">
              Contraseña
            </label>

            <input
              id="input-password-login"
              type="password"
              minLength="4"
              maxLength="10"
              placeholder="Ingrese una contraseña de prueba"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

            <p id="mensaje-password-login">
              {mensajePassword}
            </p>
          </div>

          <button
            id="btn-inicio-sesion"
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>

        <p id="mensaje-formulario">
          {mensajeFormulario}
        </p>

        <p>
          ¿No tienes una cuenta de demostración?{" "}
          <Link to="/registro">Regístrate aquí</Link>.
        </p>
      </section>
    </main>
  )
}

export default InicioSesionPage
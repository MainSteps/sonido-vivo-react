import { useState } from "react"

import {
  validarCampoObligatorio,
  validarDominioCorreo,
  validarLongitudMaxima,
} from "../utils/validaciones"

function ContactoPage() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [comentario, setComentario] = useState("")

  const [mensajeNombre, setMensajeNombre] = useState("")
  const [mensajeEmail, setMensajeEmail] = useState("")
  const [mensajeComentario, setMensajeComentario] =
    useState("")
  const [mensajeFormulario, setMensajeFormulario] =
    useState("")

  function validarFormulario(event) {
    event.preventDefault()

    setMensajeNombre("")
    setMensajeEmail("")
    setMensajeComentario("")
    setMensajeFormulario("")

    if (!validarCampoObligatorio(nombre)) {
      setMensajeNombre("Debe ingresar su nombre.")
      return
    }

    if (!validarLongitudMaxima(nombre, 100)) {
      setMensajeNombre(
        "El nombre no puede superar los 100 caracteres.",
      )
      return
    }

    if (!validarLongitudMaxima(email, 100)) {
      setMensajeEmail(
        "El correo electrónico no puede superar los 100 caracteres.",
      )
      return
    }

    if (
      email !== "" &&
      !validarDominioCorreo(email)
    ) {
      setMensajeEmail(
        "Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.",
      )
      return
    }

    if (!validarCampoObligatorio(comentario)) {
      setMensajeComentario(
        "Debe ingresar un comentario.",
      )
      return
    }

    if (!validarLongitudMaxima(comentario, 500)) {
      setMensajeComentario(
        "El comentario no puede superar los 500 caracteres.",
      )
      return
    }

    setMensajeFormulario(
      "Demostración de Sonido Vivo: la consulta está completa, pero no se envió información real.",
    )
  }

  return (
    <main>
      <section className="page-section">
        <p className="eyebrow">
          Estamos para ayudarte
        </p>

        <h1>Contacto</h1>

        <p>
          Escríbenos si tienes una consulta sobre
          instrumentos o equipos musicales.
        </p>

        <form
          className="formulario-simulacion"
          onSubmit={validarFormulario}
        >
          <div>
            <label htmlFor="input-nombre-contacto">
              Nombre
            </label>

            <input
              id="input-nombre-contacto"
              type="text"
              maxLength="100"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={(event) =>
                setNombre(event.target.value)
              }
            />

            <p id="mensaje-nombre-contacto">
              {mensajeNombre}
            </p>
          </div>

          <div>
            <label htmlFor="input-email-contacto">
              Correo electrónico (opcional)
            </label>

            <input
              id="input-email-contacto"
              type="email"
              maxLength="100"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            <p id="mensaje-email-contacto">
              {mensajeEmail}
            </p>
          </div>

          <div>
            <label htmlFor="input-comentario">
              Comentario
            </label>

            <textarea
              id="input-comentario"
              maxLength="500"
              rows="5"
              placeholder="Escriba su consulta sobre Sonido Vivo"
              value={comentario}
              onChange={(event) =>
                setComentario(event.target.value)
              }
            ></textarea>

            <p id="mensaje-comentario">
              {mensajeComentario}
            </p>
          </div>

          <button id="btn-contacto" type="submit">
            Enviar consulta
          </button>
        </form>

        <p id="mensaje-formulario">
          {mensajeFormulario}
        </p>
      </section>
    </main>
  )
}

export default ContactoPage
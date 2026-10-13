import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import ContactoPage from "./ContactoPage.jsx"

describe("ContactoPage", () => {
  test("muestra el formulario de contacto", () => {
    render(<ContactoPage />)

    expect(
      screen.getByRole("heading", {
        name: "Contacto",
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole("button", {
        name: "Enviar consulta",
      }),
    ).toBeInTheDocument()
  })

  test("muestra el error al enviar el nombre vacío", () => {
    render(<ContactoPage />)

    fireEvent.click(
      screen.getByRole("button", {
        name: "Enviar consulta",
      }),
    )

    expect(
      screen.getByText("Debe ingresar su nombre."),
    ).toBeInTheDocument()
  })

  test("rechaza un correo con dominio no permitido", () => {
    render(<ContactoPage />)

    fireEvent.change(
      screen.getByLabelText("Nombre"),
      {
        target: {
          value: "Diego",
        },
      },
    )

    fireEvent.change(
      screen.getByLabelText(
        "Correo electrónico (opcional)",
      ),
      {
        target: {
          value: "usuario@hotmail.com",
        },
      },
    )

    fireEvent.click(
      screen.getByRole("button", {
        name: "Enviar consulta",
      }),
    )

    expect(
      screen.getByText(
        "Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.",
      ),
    ).toBeInTheDocument()
  })

  test("permite enviar la consulta sin correo", () => {
    render(<ContactoPage />)

    fireEvent.change(
      screen.getByLabelText("Nombre"),
      {
        target: {
          value: "Diego",
        },
      },
    )

    fireEvent.change(
      screen.getByLabelText("Comentario"),
      {
        target: {
          value: "Consulta de demostración",
        },
      },
    )

    fireEvent.click(
      screen.getByRole("button", {
        name: "Enviar consulta",
      }),
    )

    expect(
      screen.getByText(
        "Demostración de Sonido Vivo: la consulta está completa, pero no se envió información real.",
      ),
    ).toBeInTheDocument()
  })
})
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, test } from "vitest"

import InicioSesionPage from "./InicioSesionPage.jsx"

describe("InicioSesionPage", () => {
  test("muestra el formulario de inicio de sesión", () => {
    render(
      <MemoryRouter>
        <InicioSesionPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("heading", {
        name: "Iniciar sesión",
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole("button", {
        name: "Iniciar sesión",
      }),
    ).toBeInTheDocument()
  })

  test("muestra el error al enviar el correo vacío", () => {
    render(
      <MemoryRouter>
        <InicioSesionPage />
      </MemoryRouter>,
    )

    fireEvent.click(
      screen.getByRole("button", {
        name: "Iniciar sesión",
      }),
    )

    expect(
      screen.getByText(
        "Debe ingresar su correo electrónico.",
      ),
    ).toBeInTheDocument()
  })

  test("rechaza un correo con dominio no permitido", () => {
    render(
      <MemoryRouter>
        <InicioSesionPage />
      </MemoryRouter>,
    )

    fireEvent.change(
      screen.getByLabelText("Correo electrónico"),
      {
        target: {
          value: "usuario@hotmail.com",
        },
      },
    )

    fireEvent.click(
      screen.getByRole("button", {
        name: "Iniciar sesión",
      }),
    )

    expect(
      screen.getByText(
        "Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.",
      ),
    ).toBeInTheDocument()
  })

  test("muestra el aviso final con datos válidos", () => {
    render(
      <MemoryRouter>
        <InicioSesionPage />
      </MemoryRouter>,
    )

    fireEvent.change(
      screen.getByLabelText("Correo electrónico"),
      {
        target: {
          value: "usuario@gmail.com",
        },
      },
    )

    fireEvent.change(
      screen.getByLabelText("Contraseña"),
      {
        target: {
          value: "1234",
        },
      },
    )

    fireEvent.click(
      screen.getByRole("button", {
        name: "Iniciar sesión",
      }),
    )

    expect(
      screen.getByText(
        "Demostración de Sonido Vivo: los campos están completados, pero no se inicia una sesión real.",
      ),
    ).toBeInTheDocument()
  })
})
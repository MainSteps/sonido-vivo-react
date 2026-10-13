import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'

import RegistroPage from './RegistroPage.jsx'

describe('RegistroPage', () => {
  test('muestra el formulario de registro', () => {
    render(
      <MemoryRouter>
        <RegistroPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        name: 'Registro de usuario',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Registrarse',
      }),
    ).toBeInTheDocument()
  })

  test('carga las comunas y limpia la comuna al cambiar de región', () => {
    render(
      <MemoryRouter>
        <RegistroPage />
      </MemoryRouter>,
    )

    const selectorRegion = screen.getByLabelText('Región')
    const selectorComuna = screen.getByLabelText('Comuna')

    expect(selectorComuna).toHaveDisplayValue(
      'Seleccione primero una región',
    )

    fireEvent.change(selectorRegion, {
      target: { value: '0' },
    })

    expect(selectorComuna.options.length).toBeGreaterThan(1)

    const primeraComuna = selectorComuna.options[1].value

    fireEvent.change(selectorComuna, {
      target: { value: primeraComuna },
    })

    expect(selectorComuna.value).toBe(primeraComuna)

    fireEvent.change(selectorRegion, {
      target: { value: '1' },
    })

    expect(selectorComuna.value).toBe('')
  })

  test('muestra el error del RUN al enviar el formulario vacío', () => {
    render(
      <MemoryRouter>
        <RegistroPage />
      </MemoryRouter>,
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Registrarse',
      }),
    )

    expect(
      screen.getByText('Debe ingresar su RUN.'),
    ).toBeInTheDocument()
  })
})
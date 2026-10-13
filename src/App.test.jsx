import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('Rutas de la aplicación', () => {
  test('muestra la página de inicio', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Inicio' }),
    ).toBeInTheDocument()
  })

  test('muestra la página de error para una ruta inexistente', () => {
    render(
      <MemoryRouter initialEntries={['/esta-ruta-no-existe']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Página no encontrada' }),
    ).toBeInTheDocument()
  })
})
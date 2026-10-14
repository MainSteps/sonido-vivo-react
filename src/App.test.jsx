import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('Rutas de la aplicación', () => {
  beforeEach(() => {
    localStorage.clear()
  })

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

  test('permite agregar un producto desde el catálogo y verlo en el carrito', async () => {
    const usuario = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/productos']}>
        <App />
      </MemoryRouter>,
    )

    const guitarra = screen
      .getByRole('heading', { name: 'Guitarra eléctrica Aurora' })
      .closest('article')

    await usuario.click(
      within(guitarra).getByRole('button', { name: 'Agregar al carrito' }),
    )
    await usuario.click(screen.getByRole('link', { name: 'Ver carrito' }))

    expect(
      screen.getByRole('heading', { name: 'Guitarra eléctrica Aurora' }),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('Cantidad de Guitarra eléctrica Aurora'),
    ).toHaveTextContent('1')
  })

  test('actualiza el contador del encabezado al agregar un producto', async () => {
    const usuario = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/productos']}>
        <App />
      </MemoryRouter>,
    )

    const guitarra = screen
      .getByRole('heading', { name: 'Guitarra eléctrica Aurora' })
      .closest('article')

    await usuario.click(
      within(guitarra).getByRole('button', { name: 'Agregar al carrito' }),
    )

    expect(
      screen.getByRole('link', { name: 'Carrito, 1 producto' }),
    ).toBeInTheDocument()
  })
})

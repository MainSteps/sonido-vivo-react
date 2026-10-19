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
      screen.getByRole('heading', {
        name: 'Instrumentos para crear tu propio sonido',
      }),
    ).toBeInTheDocument()
  })

  test('muestra la marca, los enlaces principales y permite abrir el menú', async () => {
    const usuario = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: 'Sonido Vivo, inicio' }),
    ).toBeInTheDocument()

    const navegacion = screen.getByRole('navigation', {
      name: 'Navegación principal',
    })
    const botonMenu = screen.getByRole('button', { name: 'Menú' })

    expect(within(navegacion).getByRole('link', { name: 'Inicio' })).toBeInTheDocument()
    expect(within(navegacion).getByRole('link', { name: 'Blog' })).toBeInTheDocument()
    expect(botonMenu).toHaveAttribute('aria-expanded', 'false')

    await usuario.click(botonMenu)

    expect(botonMenu).toHaveAttribute('aria-expanded', 'true')
    expect(navegacion).toHaveClass('is-open')
  })

  test('permite entrar al blog desde la navegación', async () => {
    const usuario = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    await usuario.click(screen.getByRole('link', { name: 'Blog' }))

    expect(
      screen.getByRole('heading', { name: 'Blog de Sonido Vivo' }),
    ).toBeInTheDocument()
  })

  test('muestra la página nosotros', () => {
    render(
      <MemoryRouter initialEntries={['/nosotros']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        name: 'La música se disfruta mejor cuando se comparte',
      }),
    ).toBeInTheDocument()
  })

  test('muestra el detalle de un artículo existente', () => {
    render(
      <MemoryRouter initialEntries={['/blog/preparar-primer-ensayo']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Cómo preparar tu primer ensayo' }),
    ).toBeInTheDocument()
  })

  test('muestra un estado comprensible si el artículo no existe', () => {
    render(
      <MemoryRouter initialEntries={['/blog/no-existe']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Artículo no encontrado' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Ver artículos' }),
    ).toHaveAttribute('href', '/blog')
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
    ).toHaveValue(1)
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
      screen.getByRole('link', { name: 'Ver carrito, 1 producto' }),
    ).toBeInTheDocument()
  })
})

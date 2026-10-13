import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CatalogoPage from './CatalogoPage.jsx'
import ProductoDetallePage from './ProductoDetallePage.jsx'

describe('catálogo de productos', () => {
  test('renderiza el listado completo desde el servicio', () => {
    render(
      <MemoryRouter>
        <CatalogoPage />
      </MemoryRouter>,
    )

    expect(screen.getAllByRole('article')).toHaveLength(6)
    expect(
      screen.getByRole('heading', { name: 'Guitarra eléctrica Aurora' }),
    ).toBeInTheDocument()
  })

  test('combina el filtro de categoría con la búsqueda', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <CatalogoPage />
      </MemoryRouter>,
    )

    await user.selectOptions(
      screen.getByLabelText('Filtrar por categoría'),
      'Audio',
    )
    expect(screen.getAllByRole('article')).toHaveLength(2)

    await user.type(screen.getByLabelText('Buscar productos'), 'studio')

    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(
      screen.getByRole('heading', { name: 'Audífonos Studio One' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Micrófono Stage Dynamic' }),
    ).not.toBeInTheDocument()
  })

  test('muestra una explicación y regreso seguro para un producto inexistente', () => {
    render(
      <MemoryRouter initialEntries={['/productos/NO-EXISTE']}>
        <Routes>
          <Route path="/productos/:id" element={<ProductoDetallePage />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'No encontramos ese producto' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Volver al catálogo' }),
    ).toHaveAttribute('href', '/productos')
  })
})

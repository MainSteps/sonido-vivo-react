import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext.js'
import { CarritoProvider } from '../context/CarritoProvider.jsx'
import CatalogoPage from './CatalogoPage.jsx'
import ProductoDetallePage from './ProductoDetallePage.jsx'

function renderizarConCarrito(contenido) {
  return render(
    <MemoryRouter>
      <CarritoProvider>{contenido}</CarritoProvider>
    </MemoryRouter>,
  )
}

function EstadoCarritoPrueba() {
  const { items } = useCarrito()
  return <p aria-label="Productos en carrito">{items.length}</p>
}

describe('catálogo de productos', () => {
  test('renderiza el listado completo desde el servicio', () => {
    renderizarConCarrito(<CatalogoPage />)

    expect(screen.getAllByRole('article')).toHaveLength(6)
    expect(
      screen.getByRole('heading', { name: 'Guitarra eléctrica Aurora' }),
    ).toBeInTheDocument()
  })

  test('combina el filtro de categoría con la búsqueda', async () => {
    const user = userEvent.setup()

    renderizarConCarrito(<CatalogoPage />)

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
        <CarritoProvider>
          <Routes>
            <Route path="/productos/:id" element={<ProductoDetallePage />} />
          </Routes>
        </CarritoProvider>
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'No encontramos ese producto' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Volver al catálogo' }),
    ).toHaveAttribute('href', '/productos')
  })

  test('agrega un producto desde la vista de detalle', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/productos/SV-GUI-001']}>
        <CarritoProvider>
          <EstadoCarritoPrueba />
          <Routes>
            <Route path="/productos/:id" element={<ProductoDetallePage />} />
          </Routes>
        </CarritoProvider>
      </MemoryRouter>,
    )

    await user.click(
      screen.getByRole('button', { name: 'Agregar al carrito' }),
    )

    expect(screen.getByLabelText('Productos en carrito')).toHaveTextContent('1')
  })
})

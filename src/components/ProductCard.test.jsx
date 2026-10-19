import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import ProductCard from './ProductCard.jsx'

describe('ProductCard', () => {
  test('muestra los datos recibidos y ejecuta la acción entregada', async () => {
    const usuario = userEvent.setup()
    const alAgregar = vi.fn()

    const producto = {
      codigo: 'PRUEBA-01',
      nombre: 'Guitarra de prueba',
      categoria: 'Guitarras',
      descripcion: 'Producto utilizado para comprobar el componente.',
      precio: 100000,
      stock: 2,
      imagen: '/images/producto-guitarra.svg',
    }

    render(
      <ProductCard
        producto={producto}
        acciones={
          <button type="button" onClick={alAgregar}>
            Agregar producto
          </button>
        }
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'Guitarra de prueba' }),
    ).toBeInTheDocument()

    expect(screen.getByText('Guitarras')).toBeInTheDocument()
    expect(screen.getByText('2 unidades')).toBeInTheDocument()

    await usuario.click(
      screen.getByRole('button', { name: 'Agregar producto' }),
    )

    expect(alAgregar).toHaveBeenCalledTimes(1)
  })
})
import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CarritoPage from './CarritoPage.jsx'
import {
  useCarrito,
} from '../context/CarritoContext.js'
import { CarritoProvider } from '../context/CarritoProvider.jsx'
import { CLAVE_CARRITO } from '../services/carritoService.js'

function ControlesPrueba() {
  const { agregarProducto } = useCarrito()

  return (
    <div>
      <button
        type="button"
        onClick={() => agregarProducto('SV-GUI-001')}
      >
        Agregar guitarra
      </button>
      <button
        type="button"
        onClick={() => agregarProducto('SV-GUI-001', 8)}
      >
        Agregar ocho guitarras
      </button>
      <button
        type="button"
        onClick={() => agregarProducto('SV-BAJ-002')}
      >
        Agregar bajo
      </button>
    </div>
  )
}

function renderizarCarrito() {
  return render(
    <MemoryRouter>
      <CarritoProvider>
        <ControlesPrueba />
        <CarritoPage />
      </CarritoProvider>
    </MemoryRouter>,
  )
}

describe('Carrito', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('agrega el mismo producto sin duplicar filas y actualiza el total', async () => {
    const usuario = userEvent.setup()
    renderizarCarrito()

    await usuario.click(
      screen.getByRole('button', { name: 'Agregar guitarra' }),
    )
    await usuario.click(
      screen.getByRole('button', { name: 'Agregar guitarra' }),
    )

    expect(
      screen.getAllByRole('heading', { name: 'Guitarra eléctrica Aurora' }),
    ).toHaveLength(1)
    expect(
      screen.getByLabelText('Cantidad de Guitarra eléctrica Aurora'),
    ).toHaveTextContent('2')
    expect(screen.getByText(/Total:.*659\.980/)).toBeInTheDocument()
  })

  test('impide superar el stock disponible', async () => {
    const usuario = userEvent.setup()
    renderizarCarrito()

    await usuario.click(
      screen.getByRole('button', { name: 'Agregar ocho guitarras' }),
    )
    await usuario.click(
      screen.getByRole('button', { name: 'Agregar guitarra' }),
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Solo hay 8 unidades disponibles.',
    )
    expect(
      screen.getByLabelText('Cantidad de Guitarra eléctrica Aurora'),
    ).toHaveTextContent('8')
  })

  test('impide disminuir una cantidad bajo uno', async () => {
    const usuario = userEvent.setup()
    renderizarCarrito()

    await usuario.click(
      screen.getByRole('button', { name: 'Agregar guitarra' }),
    )
    await usuario.click(
      screen.getByRole('button', {
        name: 'Disminuir cantidad de Guitarra eléctrica Aurora',
      }),
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      'La cantidad mínima permitida es 1.',
    )
    expect(
      screen.getByLabelText('Cantidad de Guitarra eléctrica Aurora'),
    ).toHaveTextContent('1')
  })

  test('elimina un producto y muestra inmediatamente el estado vacío', async () => {
    const usuario = userEvent.setup()
    renderizarCarrito()

    await usuario.click(
      screen.getByRole('button', { name: 'Agregar guitarra' }),
    )
    await usuario.click(
      screen.getByRole('button', { name: 'Eliminar' }),
    )

    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
  })

  test('vacía todos los productos del carrito', async () => {
    const usuario = userEvent.setup()
    renderizarCarrito()

    await usuario.click(
      screen.getByRole('button', { name: 'Agregar guitarra' }),
    )
    await usuario.click(
      screen.getByRole('button', { name: 'Agregar bajo' }),
    )
    await usuario.click(
      screen.getByRole('button', { name: 'Vaciar carrito' }),
    )

    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
  })

  test('restaura el carrito guardado al volver a cargar la aplicación', () => {
    localStorage.setItem(
      CLAVE_CARRITO,
      JSON.stringify([
        { codigoProducto: 'SV-GUI-001', cantidad: 2 },
      ]),
    )

    renderizarCarrito()

    expect(
      screen.getByLabelText('Cantidad de Guitarra eléctrica Aurora'),
    ).toHaveTextContent('2')
    expect(screen.getByText(/Total:.*659\.980/)).toBeInTheDocument()
  })

  test('muestra el carrito vacío si el almacenamiento está corrupto', () => {
    localStorage.setItem(CLAVE_CARRITO, '{json-incompleto')

    renderizarCarrito()

    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
  })
})

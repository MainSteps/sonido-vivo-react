import { afterEach, describe, expect, test, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminProductosPage from './AdminProductosPage.jsx'

const PRODUCTO_INICIAL = {
  codigo: 'SV-GUI-001',
  nombre: 'Guitarra de prueba',
  categoria: 'Guitarras',
  precio: 100000,
  stock: 3,
  imagen: '/images/producto-guitarra.svg',
  descripcion: 'Producto ficticio para la prueba.',
}

function crearServicioSimulado(productosIniciales = [PRODUCTO_INICIAL]) {
  let productos = productosIniciales.map((producto) => ({ ...producto }))

  const servicio = {
    listarProductos: vi.fn(() => productos.map((producto) => ({ ...producto }))),
    crearProducto: vi.fn((datos) => {
      const producto = {
        ...datos,
        codigo: datos.codigo.trim().toUpperCase(),
        nombre: datos.nombre.trim(),
        precio: Number(datos.precio),
        stock: Number(datos.stock),
      }
      productos = [...productos, producto]
      return { ok: true, producto }
    }),
    actualizarProducto: vi.fn((codigoActual, datos) => {
      const producto = {
        ...datos,
        codigo: datos.codigo.trim().toUpperCase(),
        nombre: datos.nombre.trim(),
        precio: Number(datos.precio),
        stock: Number(datos.stock),
      }
      productos = productos.map((actual) =>
        actual.codigo === codigoActual ? producto : actual,
      )
      return { ok: true, producto }
    }),
    eliminarProducto: vi.fn((codigo) => {
      const producto = productos.find((actual) => actual.codigo === codigo)
      productos = productos.filter((actual) => actual.codigo !== codigo)
      return { ok: true, producto }
    }),
  }

  return servicio
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('administración de productos', () => {
  test('crea, edita y elimina mediante el servicio simulado', async () => {
    const usuario = userEvent.setup()
    const servicio = crearServicioSimulado()
    vi.spyOn(globalThis, 'confirm').mockReturnValue(true)

    render(<AdminProductosPage servicio={servicio} />)

    await usuario.type(screen.getByLabelText('Código'), 'sv-nue-007')
    await usuario.type(screen.getByLabelText('Nombre'), 'Amplificador Mini')
    await usuario.selectOptions(screen.getByLabelText('Categoría'), 'Audio')
    await usuario.type(screen.getByLabelText('Precio'), '79990')
    await usuario.type(screen.getByLabelText('Stock'), '5')
    await usuario.type(
      screen.getByLabelText('Ruta de imagen'),
      '/images/producto-microfono.svg',
    )
    await usuario.type(
      screen.getByLabelText('Descripción'),
      'Amplificador ficticio para ensayo.',
    )
    await usuario.click(screen.getByRole('button', { name: 'Crear producto' }))

    expect(servicio.crearProducto).toHaveBeenCalledWith(
      expect.objectContaining({ codigo: 'sv-nue-007', nombre: 'Amplificador Mini' }),
    )
    expect(screen.getByText('Producto creado correctamente.')).toBeInTheDocument()
    expect(screen.getByText('Amplificador Mini')).toBeInTheDocument()

    await usuario.click(
      screen.getByRole('button', { name: 'Editar Amplificador Mini' }),
    )
    expect(screen.getByLabelText('Código')).toBeDisabled()
    expect(screen.getByLabelText('Código')).toHaveValue('SV-NUE-007')
    expect(
      screen.getByText('El código identifica al producto y no puede cambiarse durante la edición.'),
    ).toBeInTheDocument()
    const campoNombre = screen.getByLabelText('Nombre')
    await usuario.clear(campoNombre)
    await usuario.type(campoNombre, 'Amplificador Mini Pro')
    await usuario.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    expect(servicio.actualizarProducto).toHaveBeenCalledWith(
      'SV-NUE-007',
      expect.objectContaining({ nombre: 'Amplificador Mini Pro' }),
    )
    expect(screen.getByText('Amplificador Mini Pro')).toBeInTheDocument()

    const fila = screen.getByText('Amplificador Mini Pro').closest('tr')
    await usuario.click(
      within(fila).getByRole('button', { name: 'Eliminar Amplificador Mini Pro' }),
    )

    expect(globalThis.confirm).toHaveBeenCalledWith(
      '¿Eliminar Amplificador Mini Pro del catálogo?',
    )
    expect(servicio.eliminarProducto).toHaveBeenCalledWith('SV-NUE-007')
    expect(screen.queryByText('Amplificador Mini Pro')).not.toBeInTheDocument()
    expect(screen.getByText('Producto eliminado correctamente.')).toBeInTheDocument()
  })

  test('presenta los errores de validación devueltos por el servicio', async () => {
    const usuario = userEvent.setup()
    const servicio = crearServicioSimulado([])
    servicio.crearProducto.mockReturnValue({
      ok: false,
      error: {
        codigo: 'DATOS_INVALIDOS',
        mensaje: 'Revisa los datos ingresados.',
        errores: {
          codigo: 'El código del producto es obligatorio.',
          nombre: 'El nombre del producto es obligatorio.',
          categoria: 'La categoría seleccionada no es válida.',
          precio: 'El precio debe ser un número mayor o igual que 0.',
          stock: 'El stock debe ser un número entero mayor o igual que 0.',
        },
      },
    })

    render(<AdminProductosPage servicio={servicio} />)
    await usuario.click(screen.getByRole('button', { name: 'Crear producto' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Revisa los datos ingresados.')
    expect(screen.getByText('El código del producto es obligatorio.')).toBeInTheDocument()
    expect(screen.getByLabelText('Código')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('No hay productos registrados')).toBeInTheDocument()
  })
})

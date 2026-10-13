import { beforeEach, describe, expect, test } from 'vitest'
import { PRODUCTOS_INICIALES } from '../data/productos.js'
import {
  actualizarProducto,
  buscarProductos,
  CLAVE_PRODUCTOS,
  crearProducto,
  eliminarProducto,
  listarProductos,
  obtenerProductoPorCodigo,
} from './productosService.js'

const PRODUCTO_NUEVO = {
  codigo: ' sv-bat-007 ',
  nombre: 'Batería Compact Beat',
  categoria: 'Accesorios',
  precio: 199990,
  stock: 4,
  imagen: '/images/producto-bateria.svg',
  descripcion: 'Batería compacta ficticia para práctica.',
}

beforeEach(() => {
  localStorage.clear()
})

describe('servicio local de productos', () => {
  test('entrega una copia de los seis productos iniciales', () => {
    const productos = listarProductos()

    expect(productos).toHaveLength(6)
    expect(productos).toEqual(PRODUCTOS_INICIALES)

    productos[0].nombre = 'Cambio externo'
    expect(listarProductos()[0].nombre).toBe('Guitarra eléctrica Aurora')
  })

  test('busca por texto sin distinguir mayúsculas ni tildes y combina categoría', () => {
    expect(buscarProductos('electrica', 'Guitarras')).toHaveLength(1)
    expect(buscarProductos('eléctrica', 'Bajos')).toHaveLength(0)
  })

  test('crea y persiste un producto normalizado', () => {
    const resultado = crearProducto(PRODUCTO_NUEVO)

    expect(resultado).toEqual({
      ok: true,
      producto: expect.objectContaining({ codigo: 'SV-BAT-007' }),
    })
    expect(JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS))).toHaveLength(7)
    expect(obtenerProductoPorCodigo('sv-bat-007')?.nombre).toBe(
      'Batería Compact Beat',
    )
  })

  test('rechaza códigos duplicados y valores inválidos', () => {
    expect(
      crearProducto({ ...PRODUCTO_NUEVO, codigo: 'sv-gui-001' }),
    ).toMatchObject({ ok: false, error: { codigo: 'CODIGO_DUPLICADO' } })

    expect(
      crearProducto({
        ...PRODUCTO_NUEVO,
        codigo: 'SV-ERR-999',
        precio: '',
        stock: -1,
      }),
    ).toMatchObject({
      ok: false,
      error: {
        codigo: 'DATOS_INVALIDOS',
        errores: {
          precio: expect.any(String),
          stock: expect.any(String),
        },
      },
    })
  })

  test('actualiza y elimina productos mediante el mismo almacenamiento', () => {
    expect(
      actualizarProducto('SV-GUI-001', { precio: 319990, stock: 6 }),
    ).toMatchObject({ ok: true, producto: { precio: 319990, stock: 6 } })

    expect(eliminarProducto('SV-GUI-001')).toMatchObject({
      ok: true,
      producto: { codigo: 'SV-GUI-001' },
    })
    expect(obtenerProductoPorCodigo('SV-GUI-001')).toBeNull()
  })

  test('devuelve un resultado previsible para un producto inexistente', () => {
    expect(eliminarProducto('NO-EXISTE')).toEqual({
      ok: false,
      error: {
        codigo: 'PRODUCTO_NO_ENCONTRADO',
        mensaje: 'El producto solicitado no existe.',
        errores: {},
      },
    })
  })

  test('se recupera de JSON corrupto sin romper la aplicación', () => {
    localStorage.setItem(CLAVE_PRODUCTOS, '{contenido inválido')

    expect(() => listarProductos()).not.toThrow()
    expect(listarProductos()).toEqual(PRODUCTOS_INICIALES)
    expect(JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS))).toEqual(
      PRODUCTOS_INICIALES,
    )
  })
})

import { beforeEach, describe, expect, test, vi } from 'vitest'
import {
  CLAVE_CARRITO,
  guardarCarrito,
  leerCarrito,
} from './carritoService.js'

describe('Persistencia del carrito', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  test('restaura un carrito válido y normaliza las cantidades', () => {
    localStorage.setItem(
      CLAVE_CARRITO,
      JSON.stringify([
        { codigoProducto: 'sv-gui-001', cantidad: '2' },
        { codigoProducto: 'SV-GUI-001', cantidad: 20 },
        { codigoProducto: 'SV-BAJ-002', cantidad: 1.9 },
      ]),
    )

    expect(leerCarrito()).toEqual([
      { codigoProducto: 'SV-GUI-001', cantidad: 8 },
      { codigoProducto: 'SV-BAJ-002', cantidad: 1 },
    ])
  })

  test('recupera un carrito vacío cuando el JSON está corrupto', () => {
    localStorage.setItem(CLAVE_CARRITO, '{dato-incompleto')

    expect(leerCarrito()).toEqual([])
  })

  test('descarta productos inexistentes y datos incompatibles', () => {
    localStorage.setItem(
      CLAVE_CARRITO,
      JSON.stringify([
        { codigoProducto: 'NO-EXISTE', cantidad: 2 },
        { codigoProducto: 'SV-GUI-001', cantidad: 0 },
        null,
      ]),
    )

    expect(leerCarrito()).toEqual([])
  })

  test('protege la lectura cuando el almacenamiento produce un error', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Almacenamiento no disponible')
    })

    expect(leerCarrito()).toEqual([])
  })

  test('guarda solamente el código y la cantidad con una única clave', () => {
    const resultado = guardarCarrito([
      {
        codigoProducto: 'SV-GUI-001',
        cantidad: 2,
        nombre: 'Este dato no debe persistirse',
      },
    ])

    expect(resultado).toBe(true)
    expect(JSON.parse(localStorage.getItem(CLAVE_CARRITO))).toEqual([
      { codigoProducto: 'SV-GUI-001', cantidad: 2 },
    ])
    expect(localStorage).toHaveLength(1)
  })
})

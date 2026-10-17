import { useEffect, useMemo, useState } from 'react'
import { obtenerProductoPorCodigo } from '../services/productosService.js'
import {
  agregarItemCarrito,
  cambiarCantidadItem,
  eliminarItemCarrito,
  guardarCarrito,
  leerCarrito,
} from '../services/carritoService.js'
import { CarritoContext } from './CarritoContext.js'

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(leerCarrito)
  const [error, setError] = useState('')

  useEffect(() => {
    guardarCarrito(items)
  }, [items])

  const productos = useMemo(
    () =>
      items
        .map((item) => {
          const producto = obtenerProductoPorCodigo(item.codigoProducto)

          if (!producto) return null

          return {
            ...producto,
            cantidad: item.cantidad,
            subtotal: producto.precio * item.cantidad,
          }
        })
        .filter(Boolean),
    [items],
  )

  const total = productos.reduce(
    (acumulado, producto) => acumulado + producto.subtotal,
    0,
  )

  function agregarProducto(codigoProducto, cantidad = 1) {
    const producto = obtenerProductoPorCodigo(codigoProducto)

    if (!producto) {
      setError('El producto seleccionado no existe.')
      return
    }

    const resultado = agregarItemCarrito(
      items,
      producto.codigo,
      cantidad,
      producto.stock,
    )

    if (!resultado.ok) {
      setError(resultado.error)
      return
    }

    setItems(resultado.items)
    setError('')
  }

  function cambiarCantidad(codigoProducto, cantidad) {
    const producto = obtenerProductoPorCodigo(codigoProducto)

    if (!producto) {
      setError('El producto seleccionado ya no existe.')
      return false
    }

    const resultado = cambiarCantidadItem(
      items,
      producto.codigo,
      cantidad,
      producto.stock,
    )

    if (!resultado.ok) {
      setError(resultado.error)
      return false
    }

    setItems(resultado.items)
    setError('')
    return true
  }

  function eliminarProducto(codigoProducto) {
    setItems(eliminarItemCarrito(items, codigoProducto))
    setError('')
  }

  function vaciarCarrito() {
    setItems([])
    setError('')
  }

  const valor = {
    items,
    productos,
    total,
    error,
    agregarProducto,
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
  }

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  )
}

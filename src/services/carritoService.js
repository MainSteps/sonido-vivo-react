import { obtenerProductoPorCodigo } from './productosService.js'

export const CLAVE_CARRITO = 'sonidoVivoCarrito'

function obtenerAlmacenamiento() {
  try {
    return globalThis.localStorage ?? null
  } catch {
    return null
  }
}

function normalizarCodigo(codigoProducto) {
  return typeof codigoProducto === 'string'
    ? codigoProducto.trim().toUpperCase()
    : ''
}

export function normalizarItemsCarrito(datos) {
  if (!Array.isArray(datos)) return []

  const cantidadesPorCodigo = new Map()

  datos.forEach((item) => {
    if (!item || typeof item !== 'object') return

    const codigoProducto = normalizarCodigo(item.codigoProducto)
    const producto = obtenerProductoPorCodigo(codigoProducto)
    const cantidad = Math.trunc(Number(item.cantidad))

    if (
      !producto ||
      producto.stock < 1 ||
      !Number.isFinite(cantidad) ||
      cantidad < 1
    ) return

    const cantidadAcumulada =
      (cantidadesPorCodigo.get(codigoProducto) ?? 0) + cantidad

    cantidadesPorCodigo.set(
      codigoProducto,
      Math.min(cantidadAcumulada, producto.stock),
    )
  })

  return Array.from(cantidadesPorCodigo, ([codigoProducto, cantidad]) => ({
    codigoProducto,
    cantidad,
  }))
}

export function leerCarrito() {
  const almacenamiento = obtenerAlmacenamiento()
  if (!almacenamiento) return []

  try {
    const datosGuardados = almacenamiento.getItem(CLAVE_CARRITO)
    if (datosGuardados === null) return []

    return normalizarItemsCarrito(JSON.parse(datosGuardados))
  } catch {
    return []
  }
}

export function guardarCarrito(items) {
  const almacenamiento = obtenerAlmacenamiento()
  if (!almacenamiento) return false

  const datosGuardados = items.map(({ codigoProducto, cantidad }) => ({
    codigoProducto,
    cantidad,
  }))

  try {
    almacenamiento.setItem(CLAVE_CARRITO, JSON.stringify(datosGuardados))
    return true
  } catch {
    return false
  }
}

function resultadoError(error) {
  return { ok: false, error }
}

function resultadoCorrecto(items) {
  return { ok: true, items }
}

export function agregarItemCarrito(
  items,
  codigoProducto,
  cantidad,
  stock,
) {
  if (!Number.isInteger(cantidad) || cantidad < 1) {
    return resultadoError('La cantidad debe ser un número entero desde 1.')
  }

  if (stock < 1) {
    return resultadoError('El producto no tiene stock disponible.')
  }

  const itemActual = items.find(
    (item) => item.codigoProducto === codigoProducto,
  )
  const cantidadActual = itemActual?.cantidad ?? 0
  const nuevaCantidad = cantidadActual + cantidad

  if (nuevaCantidad > stock) {
    return resultadoError(`Solo hay ${stock} unidades disponibles.`)
  }

  const itemsActualizados = itemActual
    ? items.map((item) =>
        item.codigoProducto === codigoProducto
          ? { ...item, cantidad: nuevaCantidad }
          : item,
      )
    : [...items, { codigoProducto, cantidad }]

  return resultadoCorrecto(itemsActualizados)
}

export function cambiarCantidadItem(
  items,
  codigoProducto,
  cantidad,
  stock,
) {
  const itemExiste = items.some(
    (item) => item.codigoProducto === codigoProducto,
  )

  if (!itemExiste) {
    return resultadoError('El producto no se encuentra en el carrito.')
  }

  if (!Number.isInteger(cantidad) || cantidad < 1) {
    return resultadoError('La cantidad mínima permitida es 1.')
  }

  if (cantidad > stock) {
    return resultadoError(`Solo hay ${stock} unidades disponibles.`)
  }

  return resultadoCorrecto(
    items.map((item) =>
      item.codigoProducto === codigoProducto
        ? { ...item, cantidad }
        : item,
    ),
  )
}

export function eliminarItemCarrito(items, codigoProducto) {
  return items.filter(
    (item) => item.codigoProducto !== codigoProducto,
  )
}

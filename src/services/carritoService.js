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

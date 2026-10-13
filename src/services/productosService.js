import {
  CATEGORIAS_PRODUCTO,
  PRODUCTOS_INICIALES,
} from '../data/productos.js'

export const CLAVE_PRODUCTOS = 'sonidoVivoProductos'

const MENSAJES_ERROR = {
  codigo: 'El código del producto es obligatorio.',
  codigoDuplicado: 'Ya existe un producto con ese código.',
  nombre: 'El nombre del producto es obligatorio.',
  categoria: 'La categoría seleccionada no es válida.',
  precio: 'El precio debe ser un número mayor o igual que 0.',
  stock: 'El stock debe ser un número entero mayor o igual que 0.',
  noEncontrado: 'El producto solicitado no existe.',
  almacenamiento: 'No fue posible guardar los productos.',
}

function copiarProducto(producto) {
  return { ...producto }
}

function copiarProductos(productos) {
  return productos.map(copiarProducto)
}

function normalizarCodigo(codigo) {
  return typeof codigo === 'string' ? codigo.trim().toUpperCase() : ''
}

function normalizarTexto(texto) {
  return typeof texto === 'string' ? texto.trim() : ''
}

function construirProducto(datos = {}) {
  return {
    codigo: normalizarCodigo(datos.codigo),
    nombre: normalizarTexto(datos.nombre),
    categoria: normalizarTexto(datos.categoria),
    precio: Number(datos.precio),
    stock: Number(datos.stock),
    imagen: normalizarTexto(datos.imagen),
    descripcion: normalizarTexto(datos.descripcion),
  }
}

export function validarProducto(datos) {
  const producto = construirProducto(datos)
  const errores = {}
  const precioIngresado = datos?.precio !== '' && datos?.precio != null
  const stockIngresado = datos?.stock !== '' && datos?.stock != null

  if (!producto.codigo) errores.codigo = MENSAJES_ERROR.codigo
  if (!producto.nombre) errores.nombre = MENSAJES_ERROR.nombre
  if (!CATEGORIAS_PRODUCTO.includes(producto.categoria)) {
    errores.categoria = MENSAJES_ERROR.categoria
  }
  if (
    !precioIngresado ||
    !Number.isFinite(producto.precio) ||
    producto.precio < 0
  ) {
    errores.precio = MENSAJES_ERROR.precio
  }
  if (!stockIngresado || !Number.isInteger(producto.stock) || producto.stock < 0) {
    errores.stock = MENSAJES_ERROR.stock
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores,
    producto,
  }
}

function obtenerAlmacenamiento() {
  try {
    return globalThis.localStorage ?? null
  } catch {
    return null
  }
}

function guardarProductos(productos) {
  const almacenamiento = obtenerAlmacenamiento()
  if (!almacenamiento) return false

  try {
    almacenamiento.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos))
    return true
  } catch {
    return false
  }
}

function normalizarColeccion(datos) {
  if (!Array.isArray(datos)) return null

  const codigos = new Set()
  const productos = []

  for (const datosProducto of datos) {
    const validacion = validarProducto(datosProducto)
    const { producto } = validacion

    if (!validacion.esValido || codigos.has(producto.codigo)) continue

    codigos.add(producto.codigo)
    productos.push(producto)
  }

  return productos
}

function leerProductos() {
  const almacenamiento = obtenerAlmacenamiento()
  if (!almacenamiento) return copiarProductos(PRODUCTOS_INICIALES)

  let datosGuardados
  try {
    datosGuardados = almacenamiento.getItem(CLAVE_PRODUCTOS)
  } catch {
    return copiarProductos(PRODUCTOS_INICIALES)
  }
  if (datosGuardados === null) return copiarProductos(PRODUCTOS_INICIALES)

  try {
    const productos = normalizarColeccion(JSON.parse(datosGuardados))

    if (productos === null) {
      guardarProductos(PRODUCTOS_INICIALES)
      return copiarProductos(PRODUCTOS_INICIALES)
    }

    guardarProductos(productos)
    return copiarProductos(productos)
  } catch {
    guardarProductos(PRODUCTOS_INICIALES)
    return copiarProductos(PRODUCTOS_INICIALES)
  }
}

function normalizarBusqueda(texto) {
  return normalizarTexto(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function resultadoError(codigo, mensaje, errores = {}) {
  return { ok: false, error: { codigo, mensaje, errores } }
}

export function listarProductos() {
  return leerProductos()
}

export function buscarProductos(consulta = '', categoria = '') {
  const textoBuscado = normalizarBusqueda(consulta)

  return leerProductos().filter((producto) => {
    const coincideCategoria = !categoria || producto.categoria === categoria
    const contenido = normalizarBusqueda(
      `${producto.codigo} ${producto.nombre} ${producto.descripcion}`,
    )
    const coincideTexto = !textoBuscado || contenido.includes(textoBuscado)

    return coincideCategoria && coincideTexto
  })
}

export function obtenerProductoPorCodigo(codigo) {
  const codigoNormalizado = normalizarCodigo(codigo)
  return (
    leerProductos().find(
      (producto) => producto.codigo === codigoNormalizado,
    ) ?? null
  )
}

export function crearProducto(datos) {
  const productos = leerProductos()
  const validacion = validarProducto(datos)

  if (!validacion.esValido) {
    return resultadoError(
      'DATOS_INVALIDOS',
      'Revisa los datos ingresados.',
      validacion.errores,
    )
  }

  if (
    productos.some(
      (producto) => producto.codigo === validacion.producto.codigo,
    )
  ) {
    return resultadoError('CODIGO_DUPLICADO', MENSAJES_ERROR.codigoDuplicado, {
      codigo: MENSAJES_ERROR.codigoDuplicado,
    })
  }

  const producto = validacion.producto
  if (!guardarProductos([...productos, producto])) {
    return resultadoError('ERROR_ALMACENAMIENTO', MENSAJES_ERROR.almacenamiento)
  }

  return { ok: true, producto: copiarProducto(producto) }
}

export function actualizarProducto(codigoActual, datos) {
  const productos = leerProductos()
  const indice = productos.findIndex(
    (producto) => producto.codigo === normalizarCodigo(codigoActual),
  )

  if (indice === -1) {
    return resultadoError('PRODUCTO_NO_ENCONTRADO', MENSAJES_ERROR.noEncontrado)
  }

  const validacion = validarProducto({ ...productos[indice], ...datos })
  if (!validacion.esValido) {
    return resultadoError(
      'DATOS_INVALIDOS',
      'Revisa los datos ingresados.',
      validacion.errores,
    )
  }

  const codigoDuplicado = productos.some(
    (producto, posicion) =>
      posicion !== indice && producto.codigo === validacion.producto.codigo,
  )

  if (codigoDuplicado) {
    return resultadoError('CODIGO_DUPLICADO', MENSAJES_ERROR.codigoDuplicado, {
      codigo: MENSAJES_ERROR.codigoDuplicado,
    })
  }

  productos[indice] = validacion.producto
  if (!guardarProductos(productos)) {
    return resultadoError('ERROR_ALMACENAMIENTO', MENSAJES_ERROR.almacenamiento)
  }

  return { ok: true, producto: copiarProducto(validacion.producto) }
}

export function eliminarProducto(codigo) {
  const productos = leerProductos()
  const indice = productos.findIndex(
    (producto) => producto.codigo === normalizarCodigo(codigo),
  )

  if (indice === -1) {
    return resultadoError('PRODUCTO_NO_ENCONTRADO', MENSAJES_ERROR.noEncontrado)
  }

  const [productoEliminado] = productos.splice(indice, 1)
  if (!guardarProductos(productos)) {
    return resultadoError('ERROR_ALMACENAMIENTO', MENSAJES_ERROR.almacenamiento)
  }

  return { ok: true, producto: copiarProducto(productoEliminado) }
}

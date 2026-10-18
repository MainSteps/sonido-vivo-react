import {
  rolesUsuario,
  usuariosIniciales,
} from '../data/usuarios.js'
import {
  validarDominioCorreo,
  validarLongitudMaxima,
  validarRun,
} from '../utils/validaciones.js'

export const CLAVE_USUARIOS = 'sonidoVivoUsuarios'

function copiarUsuario(usuario) {
  return { ...usuario }
}

function copiarUsuarios(usuarios) {
  return usuarios.map(copiarUsuario)
}

function guardarUsuarios(usuarios) {
  try {
    localStorage.setItem(
      CLAVE_USUARIOS,
      JSON.stringify(usuarios),
    )
    return true
  } catch {
    return false
  }
}

function leerUsuarios() {
  try {
    const datosGuardados =
      localStorage.getItem(CLAVE_USUARIOS)

    if (datosGuardados === null) {
      return copiarUsuarios(usuariosIniciales)
    }

    const usuariosGuardados = JSON.parse(datosGuardados)

    if (!Array.isArray(usuariosGuardados)) {
      return copiarUsuarios(usuariosIniciales)
    }

    return copiarUsuarios(usuariosGuardados)
  } catch {
    return copiarUsuarios(usuariosIniciales)
  }
}

function limpiarTexto(texto) {
  return typeof texto === 'string' ? texto.trim() : ''
}

function construirUsuario(datos) {
  return {
    run: limpiarTexto(datos.run).toUpperCase(),
    nombre: limpiarTexto(datos.nombre),
    apellidos: limpiarTexto(datos.apellidos),
    email: limpiarTexto(datos.email).toLowerCase(),
    rol: limpiarTexto(datos.rol),
  }
}

export function validarUsuario(
  datos,
  permitirRunDemo = false,
) {
  const usuario = construirUsuario(datos)
  const errores = {}

  const esRunDemo =
    permitirRunDemo &&
    usuario.run.startsWith('RUN-DEMO-')

  if (usuario.run === '') {
    errores.run = 'El RUN es obligatorio.'
  } else if (!validarRun(usuario.run) && !esRunDemo) {
    errores.run =
      'Ingrese un RUN válido, sin puntos ni guion.'
  }

  if (usuario.nombre === '') {
    errores.nombre = 'El nombre es obligatorio.'
  } else if (
    !validarLongitudMaxima(usuario.nombre, 50)
  ) {
    errores.nombre =
      'El nombre no puede superar los 50 caracteres.'
  }

  if (usuario.apellidos === '') {
    errores.apellidos = 'Los apellidos son obligatorios.'
  } else if (
    !validarLongitudMaxima(usuario.apellidos, 100)
  ) {
    errores.apellidos =
      'Los apellidos no pueden superar los 100 caracteres.'
  }

  if (usuario.email === '') {
    errores.email =
      'El correo electrónico es obligatorio.'
  } else if (
    !validarLongitudMaxima(usuario.email, 100) ||
    !validarDominioCorreo(usuario.email)
  ) {
    errores.email =
      'Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.'
  }

  if (!rolesUsuario.includes(usuario.rol)) {
    errores.rol = 'Seleccione un rol válido.'
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores,
    usuario,
  }
}

export function listarUsuarios() {
  return leerUsuarios()
}

export function obtenerUsuarioPorRun(run) {
  return (
    leerUsuarios().find(
      (usuario) => usuario.run === run,
    ) ?? null
  )
}

export function crearUsuario(datos) {
  const usuarios = leerUsuarios()
  const validacion = validarUsuario(datos)

  if (!validacion.esValido) {
    return {
      ok: false,
      errores: validacion.errores,
    }
  }

  const runDuplicado = usuarios.some(
    (usuario) =>
      usuario.run === validacion.usuario.run,
  )

  if (runDuplicado) {
    return {
      ok: false,
      errores: {
        run: 'Ya existe un usuario con ese RUN.',
      },
    }
  }

  const usuariosActualizados = [
    ...usuarios,
    validacion.usuario,
  ]

  if (!guardarUsuarios(usuariosActualizados)) {
    return {
      ok: false,
      mensaje: 'No fue posible guardar el usuario.',
    }
  }

  return {
    ok: true,
    usuario: copiarUsuario(validacion.usuario),
  }
}

export function actualizarUsuario(runActual, datos) {
  const usuarios = leerUsuarios()
  const posicion = usuarios.findIndex(
    (usuario) => usuario.run === runActual,
  )

  if (posicion === -1) {
    return {
      ok: false,
      mensaje: 'El usuario solicitado no existe.',
    }
  }

  const usuarioActual = usuarios[posicion]
  const esUsuarioDemo =
    usuarioActual.run.startsWith('RUN-DEMO-')

  const validacion = validarUsuario(
    {
      ...datos,
      run: usuarioActual.run,
    },
    esUsuarioDemo,
  )

  if (!validacion.esValido) {
    return {
      ok: false,
      errores: validacion.errores,
    }
  }

  usuarios[posicion] = validacion.usuario

  if (!guardarUsuarios(usuarios)) {
    return {
      ok: false,
      mensaje: 'No fue posible guardar los cambios.',
    }
  }

  return {
    ok: true,
    usuario: copiarUsuario(validacion.usuario),
  }
}

export function eliminarUsuario(run) {
  const usuarios = leerUsuarios()
  const usuario = usuarios.find(
    (usuarioActual) => usuarioActual.run === run,
  )

  if (!usuario) {
    return {
      ok: false,
      mensaje: 'El usuario solicitado no existe.',
    }
  }

  const usuariosActualizados = usuarios.filter(
    (usuarioActual) => usuarioActual.run !== run,
  )

  if (!guardarUsuarios(usuariosActualizados)) {
    return {
      ok: false,
      mensaje: 'No fue posible eliminar el usuario.',
    }
  }

  return {
    ok: true,
    usuario: copiarUsuario(usuario),
  }
}
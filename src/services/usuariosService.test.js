import {
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'
import { usuariosIniciales } from '../data/usuarios.js'
import {
  actualizarUsuario,
  CLAVE_USUARIOS,
  crearUsuario,
  eliminarUsuario,
  listarUsuarios,
  obtenerUsuarioPorRun,
  validarUsuario,
} from './usuariosService.js'

const USUARIO_NUEVO = {
  run: '123456785',
  nombre: 'Usuario',
  apellidos: 'De Prueba',
  email: 'usuario.prueba@gmail.com',
  rol: 'Cliente',
}

beforeEach(() => {
  localStorage.clear()
})

describe('servicio local de usuarios', () => {
  test('entrega los usuarios iniciales', () => {
    const usuarios = listarUsuarios()

    expect(usuarios).toEqual(usuariosIniciales)
    expect(usuarios).toHaveLength(3)
  })

  test('crea y guarda un usuario válido', () => {
    const resultado = crearUsuario(USUARIO_NUEVO)

    expect(resultado).toEqual({
      ok: true,
      usuario: USUARIO_NUEVO,
    })

    const usuariosGuardados = JSON.parse(
      localStorage.getItem(CLAVE_USUARIOS),
    )

    expect(usuariosGuardados).toHaveLength(4)
    expect(
      obtenerUsuarioPorRun('123456785'),
    ).toEqual(USUARIO_NUEVO)
  })

  test('rechaza RUN, correo y rol inválidos', () => {
    const resultado = validarUsuario({
      ...USUARIO_NUEVO,
      run: '123456789',
      email: 'usuario@hotmail.com',
      rol: 'Supervisor',
    })

    expect(resultado.esValido).toBe(false)
    expect(resultado.errores).toEqual({
      run: expect.any(String),
      email: expect.any(String),
      rol: expect.any(String),
    })
  })

  test('actualiza y elimina un usuario', () => {
    crearUsuario(USUARIO_NUEVO)

    const resultadoEdicion = actualizarUsuario(
      USUARIO_NUEVO.run,
      {
        ...USUARIO_NUEVO,
        nombre: 'Usuario Editado',
        rol: 'Vendedor',
      },
    )

    expect(resultadoEdicion).toMatchObject({
      ok: true,
      usuario: {
        run: '123456785',
        nombre: 'Usuario Editado',
        rol: 'Vendedor',
      },
    })

    const resultadoEliminacion =
      eliminarUsuario(USUARIO_NUEVO.run)

    expect(resultadoEliminacion).toMatchObject({
      ok: true,
      usuario: {
        run: '123456785',
      },
    })

    expect(
      obtenerUsuarioPorRun(USUARIO_NUEVO.run),
    ).toBeNull()
  })
})
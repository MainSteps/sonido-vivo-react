import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'
import {
  render,
  screen,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminUsuariosPage from './AdminUsuariosPage.jsx'

const USUARIO_INICIAL = {
  run: 'RUN-DEMO-1',
  nombre: 'Ana',
  apellidos: 'Administradora Demo',
  email: 'admin.sonidovivo.demo@gmail.com',
  rol: 'Administrador',
}

function crearServicioSimulado(
  usuariosIniciales = [USUARIO_INICIAL],
) {
  let usuarios = usuariosIniciales.map(
    (usuario) => ({ ...usuario }),
  )

  const servicio = {
    listarUsuarios: vi.fn(() =>
      usuarios.map((usuario) => ({ ...usuario })),
    ),

    crearUsuario: vi.fn((datos) => {
      const usuario = {
        ...datos,
        run: datos.run.trim().toUpperCase(),
        email: datos.email.trim().toLowerCase(),
      }

      usuarios = [...usuarios, usuario]

      return {
        ok: true,
        usuario,
      }
    }),

    actualizarUsuario: vi.fn(
      (runActual, datos) => {
        const usuario = {
          ...datos,
          run: runActual,
        }

        usuarios = usuarios.map(
          (usuarioActual) =>
            usuarioActual.run === runActual
              ? usuario
              : usuarioActual,
        )

        return {
          ok: true,
          usuario,
        }
      },
    ),

    eliminarUsuario: vi.fn((run) => {
      const usuario = usuarios.find(
        (usuarioActual) =>
          usuarioActual.run === run,
      )

      usuarios = usuarios.filter(
        (usuarioActual) =>
          usuarioActual.run !== run,
      )

      return {
        ok: true,
        usuario,
      }
    }),
  }

  return servicio
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('administración de usuarios', () => {
  test('lista y consulta un usuario', async () => {
    const usuario = userEvent.setup()
    const servicio = crearServicioSimulado()

    render(
      <AdminUsuariosPage servicio={servicio} />,
    )

    expect(
      screen.getByText(
        'Ana Administradora Demo',
      ),
    ).toBeInTheDocument()

    const fila = screen
      .getByText('Ana Administradora Demo')
      .closest('tr')

    await usuario.click(
      within(fila).getByRole('button', {
        name: 'Ver',
      }),
    )

    expect(
      screen.getByRole('heading', {
        name: 'Detalle del usuario',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getAllByText(
        'admin.sonidovivo.demo@gmail.com',
      ),
    ).toHaveLength(2)
  })

  test('crea, edita y elimina mediante el servicio simulado', async () => {
    const usuario = userEvent.setup()
    const servicio = crearServicioSimulado()
    vi.spyOn(
      globalThis,
      'confirm',
    ).mockReturnValue(true)

    render(
      <AdminUsuariosPage servicio={servicio} />,
    )

    await usuario.type(
      screen.getByLabelText(
        'RUN (sin puntos ni guion)',
      ),
      '123456785',
    )

    await usuario.type(
      screen.getByLabelText('Nombre'),
      'Usuario',
    )

    await usuario.type(
      screen.getByLabelText('Apellidos'),
      'De Prueba',
    )

    await usuario.type(
      screen.getByLabelText(
        'Correo electrónico',
      ),
      'usuario.prueba@gmail.com',
    )

    await usuario.selectOptions(
      screen.getByLabelText('Rol'),
      'Cliente',
    )

    await usuario.click(
      screen.getByRole('button', {
        name: 'Crear usuario simulado',
      }),
    )

    expect(
      servicio.crearUsuario,
    ).toHaveBeenCalledWith({
      run: '123456785',
      nombre: 'Usuario',
      apellidos: 'De Prueba',
      email: 'usuario.prueba@gmail.com',
      rol: 'Cliente',
    })

    expect(
      screen.getByText(
        'Usuario creado correctamente.',
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Usuario De Prueba'),
    ).toBeInTheDocument()

    let fila = screen
      .getByText('Usuario De Prueba')
      .closest('tr')

    await usuario.click(
      within(fila).getByRole('button', {
        name: 'Editar',
      }),
    )

    expect(
      screen.getByLabelText(
        'RUN (sin puntos ni guion)',
      ),
    ).toBeDisabled()

    const campoNombre =
      screen.getByLabelText('Nombre')

    await usuario.clear(campoNombre)
    await usuario.type(
      campoNombre,
      'Usuario Editado',
    )

    await usuario.click(
      screen.getByRole('button', {
        name: 'Guardar cambios',
      }),
    )

    expect(
      servicio.actualizarUsuario,
    ).toHaveBeenCalledWith(
      '123456785',
      expect.objectContaining({
        nombre: 'Usuario Editado',
      }),
    )

    expect(
      screen.getByText(
        'Usuario Editado De Prueba',
      ),
    ).toBeInTheDocument()

    fila = screen
      .getByText('Usuario Editado De Prueba')
      .closest('tr')

    await usuario.click(
      within(fila).getByRole('button', {
        name: 'Eliminar',
      }),
    )

    expect(globalThis.confirm).toHaveBeenCalledWith(
      '¿Eliminar a Usuario Editado De Prueba?',
    )

    expect(
      servicio.eliminarUsuario,
    ).toHaveBeenCalledWith('123456785')

    expect(
      screen.queryByText(
        'Usuario Editado De Prueba',
      ),
    ).not.toBeInTheDocument()

    expect(
      screen.getByText(
        'Usuario eliminado correctamente.',
      ),
    ).toBeInTheDocument()
  })

  test('muestra los errores entregados por el servicio', async () => {
    const usuario = userEvent.setup()
    const servicio = crearServicioSimulado([])

    servicio.crearUsuario.mockReturnValue({
      ok: false,
      errores: {
        run: 'El RUN es obligatorio.',
        email:
          'El correo electrónico es obligatorio.',
        rol: 'Seleccione un rol válido.',
      },
    })

    render(
      <AdminUsuariosPage servicio={servicio} />,
    )

    await usuario.click(
      screen.getByRole('button', {
        name: 'Crear usuario simulado',
      }),
    )

    expect(
      screen.getByRole('alert'),
    ).toHaveTextContent(
      'Revise los datos ingresados.',
    )

    expect(
      screen.getByText(
        'El RUN es obligatorio.',
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText(
        'RUN (sin puntos ni guion)',
      ),
    ).toHaveAttribute('aria-invalid', 'true')

    expect(
      screen.getByText(
        'No hay usuarios registrados',
      ),
    ).toBeInTheDocument()
  })
})
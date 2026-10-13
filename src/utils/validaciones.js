export function validarCampoObligatorio(valor) {
  return valor !== ""
}

export function validarLongitudMaxima(valor, longitudMaxima) {
  return valor.length <= longitudMaxima
}

export function validarRun(run) {
  if (
    run.length < 7 ||
    run.length > 9 ||
    run.includes(".") ||
    run.includes("-")
  ) {
    return false
  }

  const cuerpo = run.slice(0, -1)
  const digitoIngresado = run.slice(-1).toUpperCase()

  if (
    isNaN(cuerpo) ||
    (isNaN(digitoIngresado) && digitoIngresado !== "K")
  ) {
    return false
  }

  let suma = 0
  let multiplicador = 2

  for (
    let posicion = cuerpo.length - 1;
    posicion >= 0;
    posicion--
  ) {
    suma = suma + Number(cuerpo[posicion]) * multiplicador
    multiplicador = multiplicador + 1

    if (multiplicador === 8) {
      multiplicador = 2
    }
  }

  const resultado = 11 - (suma % 11)
  let digitoEsperado = String(resultado)

  if (resultado === 11) {
    digitoEsperado = "0"
  }

  if (resultado === 10) {
    digitoEsperado = "K"
  }

  return digitoIngresado === digitoEsperado
}

export function validarDominioCorreo(email) {
  return (
    email.endsWith("@duoc.cl") ||
    email.endsWith("@profesor.duoc.cl") ||
    email.endsWith("@gmail.com")
  )
}

export function validarContrasena(password) {
  return password.length >= 4 && password.length <= 10
}
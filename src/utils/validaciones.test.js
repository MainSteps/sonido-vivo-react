import { describe, expect, test } from "vitest"
import {
  validarCampoObligatorio,
  validarContrasena,
  validarDominioCorreo,
  validarLongitudMaxima,
  validarRun,
} from "./validaciones"

describe("Validaciones compartidas", () => {
  test("detecta un campo obligatorio vacío", () => {
    expect(validarCampoObligatorio("")).toBe(false)
  })

  test("acepta un campo obligatorio completado", () => {
    expect(validarCampoObligatorio("Sonido Vivo")).toBe(true)
  })

  test("acepta un valor dentro de la longitud máxima", () => {
    expect(
      validarLongitudMaxima("Sonido Vivo", 50),
    ).toBe(true)
  })

  test("rechaza un valor que supera la longitud máxima", () => {
    expect(
      validarLongitudMaxima("Sonido Vivo", 5),
    ).toBe(false)
  })

  test("acepta un RUN con dígito verificador válido", () => {
    expect(validarRun("123456785")).toBe(true)
  })

  test("rechaza un RUN con dígito verificador incorrecto", () => {
    expect(validarRun("123456789")).toBe(false)
  })

  test("acepta un dominio de correo permitido", () => {
    expect(
      validarDominioCorreo("persona@gmail.com"),
    ).toBe(true)
  })

  test("rechaza un dominio de correo no permitido", () => {
    expect(
      validarDominioCorreo("persona@ejemplo.cl"),
    ).toBe(false)
  })

  test("acepta una contraseña entre 4 y 10 caracteres", () => {
    expect(validarContrasena("clave123")).toBe(true)
  })

  test("rechaza una contraseña demasiado corta", () => {
    expect(validarContrasena("123")).toBe(false)
  })
})
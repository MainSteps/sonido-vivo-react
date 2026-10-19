# Issue #15 — Verificación desde copia limpia

**Fecha:** 18 de octubre de 2026 (America/Santiago).  
**Repositorio:** MainSteps/sonido-vivo-react.  
**Línea base:** `0baec31fa451d9e36a0e4524e3f43f00b2202e67`.  
**Estado:** verificación local completada; despliegue y revisión del equipo pendientes.

## 1. Reproducción

Se clonó el repositorio en una carpeta nueva, se creó la rama
`test/15-qa-clonacion-despliegue` desde `main` y se instalaron las dependencias con
`npm ci`. No se copiaron `node_modules`, datos del navegador ni archivos de otra
instalación para que la aplicación funcionara.

Entorno: macOS, Node.js 24.19.0, npm 11.6.2, Vite 8.3.4, Vitest 5.0.4 y jsdom 30.1.2.

```bash
git clone https://github.com/MainSteps/sonido-vivo-react.git
cd sonido-vivo-react
git switch -c test/15-qa-clonacion-despliegue
npm ci
npm run lint
npm run build
npm run test:run
npm run test:coverage
npm run preview -- --host 127.0.0.1 --port 4175
```

Los comandos se ejecutaron usando los ejecutables disponibles en el entorno de
revisión. La secuencia anterior permite repetirlos desde una instalación estándar
de Node.js. Deben ejecutarse uno por uno y detenerse si alguno falla.

## 2. Resultados de comandos

| Verificación | Resultado | Evidencia |
| --- | --- | --- |
| Instalación limpia | Aprobada; 229 paquetes instalados, auditoría de 230 sin vulnerabilidades reportadas en esa ejecución | Salida de `npm ci` registrada durante la revisión |
| Lint | Código de salida 0 | [lint.txt](resultados/lint.txt) |
| Build | Código de salida 0; 52 módulos transformados | [build.txt](resultados/build.txt) |
| Test | 13 archivos y 65 pruebas aprobadas | [test-run.txt](resultados/test-run.txt) |
| Cobertura | 13 archivos y 65 pruebas aprobadas | [coverage.txt](resultados/coverage.txt) |
| Integridad del código revisado | Sin cambios en `src`, dependencias, configuración de Vite o ESLint respecto de la línea base | `git diff --exit-code -- src package.json package-lock.json vite.config.js eslint.config.js` |

| Métrica de cobertura | Resultado |
| --- | --- |
| Sentencias | 78,85 % (522/662) |
| Ramas | 70,95 % (281/396) |
| Funciones | 93,02 % (160/172) |
| Líneas | 80,09 % (511/638) |

La cobertura corresponde al conjunto informado por V8 con la configuración actual;
no es una garantía de corrección ni una auditoría de todos los archivos.

## 3. Apertura directa y recarga

Se abrió cada dirección en el navegador contra el build de producción servido por
Vite Preview y se recargó la página. En los quince casos se conservó el encabezado
principal esperado y no se devolvieron advertencias ni errores en la consulta de
consola realizada tras esa recarga. Los datos por ruta constan en
[rutas-locales.json](rutas-locales.json).

| Rutas comprobadas | Resultado local |
| --- | --- |
| `/` | Inicio |
| `/productos` | Catálogo |
| `/productos/SV-GUI-001` | Detalle de guitarra |
| `/productos/NO-EXISTE` | Producto no encontrado |
| `/carrito` | Carrito |
| `/registro` | Registro |
| `/login` | Inicio de sesión |
| `/contacto` | Contacto |
| `/nosotros` | Página institucional |
| `/blog` | Listado de artículos |
| `/blog/preparar-primer-ensayo` | Artículo existente |
| `/blog/no-existe` | Artículo no encontrado |
| `/admin/productos` | Mantenedor de productos |
| `/admin/usuarios` | Mantenedor de usuarios |
| `/no-existe` | Página no encontrada |

Esto comprueba el fallback local de Vite Preview; **no demuestra que un hosting
público tenga configuradas las recargas SPA**. La reproducción del contenido
externo de YouTube tampoco queda certificada por comprobar el título de inicio.

## 4. Interacciones y persistencia

Todas las entradas utilizadas son de prueba y permanecieron en el navegador local.

| Caso | Resultado observado |
| --- | --- |
| Registro vacío | Solicita RUN. |
| Registro con dominio no permitido | Rechaza el correo y muestra el dominio permitido. |
| Registro completo, RUN con dígito válido y región/comuna seleccionadas | Muestra aviso de demostración; no crea cuenta real. |
| Login vacío | Solicita correo. |
| Login con campos válidos | Muestra aviso de demostración; no autentica. |
| Contacto vacío | Solicita nombre. |
| Contacto con nombre y comentario, sin correo | Muestra aviso de demostración; no envía mensajes reales. |
| Agregar guitarra desde catálogo | Una fila, cantidad 1, total $329.990. |
| Intentar cantidad 9 con stock 8 | Rechaza el cambio: «Solo hay 8 unidades disponibles.». |
| Cambiar cantidad a 2 y recargar | Conserva cantidad 2 y total $659.980. |
| Vaciar carrito | Contador en 0 y estado vacío. |
| Crear producto temporal QA-15 y recargar | Producto visible con precio $1.000 y stock 2. |
| Editar nombre de QA-15 y recargar | Nombre actualizado conservado. |

Capturas: [registro](registro-validado.png), [login](login-validado.png),
[contacto](contacto-validado.png), [carrito restaurado](carrito-restaurado.png) y
[producto editado](producto-editado.png).

La eliminación manual del producto temporal no se declara aprobada: la interacción
con el diálogo de confirmación no pudo completarse desde el navegador de revisión;
el registro siguió presente al recargar. El caso CRUD automatizado sí aprobó. No
se interpreta la limitación de interacción como defecto funcional confirmado.

## 5. Hallazgos y decisiones

| ID | Hallazgo | Responsable / seguimiento | Decisión |
| --- | --- | --- | --- |
| QA15-01 | No existe una URL pública verificada en esta revisión. Se creó un proyecto de hosting, pero no se publicó una versión. | Michel coordina con el equipo; issue #15. | Bloquea el cierre de la issue hasta publicar y comprobar acceso sin sesión. |
| QA15-02 | La publicación no pudo avanzar por una limitación de aprobación del entorno. | Matías coordina el acceso de publicación; Michel verifica el resultado. | Conservar la evidencia local y completar el despliegue desde un entorno autorizado. |
| QA15-03 | El contenido externo de YouTube no tiene reproducción comprobada. | Diego, responsable del contenido institucional. | Confirmar desde la URL pública; si falla, registrar la corrección o una alternativa antes del congelamiento. |
| QA15-04 | El diálogo de eliminación no pudo completarse manualmente en esta sesión; la suite CRUD sí aprueba. | Michel verifica en su navegador. | Repetir creación/edición/eliminación con datos de prueba; no cerrar como fallo de código sin reproducirlo. |

No se detectaron errores críticos de consola en las capturas de logs recogidas.
La revisión fue funcional y local, no una auditoría exhaustiva de seguridad o
accesibilidad ni una simulación de múltiples usuarios.

## 6. Checklist de aceptación

- [x] Comandos y resultados reales registrados.
- [x] Aplicación ejecutada desde una instalación limpia, sin archivos locales adicionales necesarios para funcionar.
- [x] Rutas abiertas directamente y recargadas **en entorno local**.
- [x] Sin errores críticos de consola observados en las consultas registradas.
- [x] Hallazgos pendientes identificados con responsable y decisión propuesta.
- [ ] URL pública publicada y comprobada sin sesión.
- [ ] Apertura directa y recargas comprobadas en esa URL.
- [ ] Decisiones pendientes confirmadas por el equipo antes del congelamiento.
- [ ] PR revisada por una persona distinta del autor y fusionada mediante squash.

La issue #15 permanece abierta. Michel conserva la asignación; este informe no
atribuye a otra persona la ejecución o aprobación de verificaciones que no realizó.

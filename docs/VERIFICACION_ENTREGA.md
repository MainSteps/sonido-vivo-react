# Verificación local y estado de entrega

**Fecha:** 18 de octubre de 2026
**Línea base de aplicación:** `0baec31fa451d9e36a0e4524e3f43f00b2202e67`
**Estado:** registro histórico de la revisión local previa al cierre final.

Este documento conserva la evidencia producida sobre la línea base indicada y
no pretende describir el estado actual de GitHub. El resumen vigente se encuentra
en `ENTREGA_FINAL.md`; el SHA, ZIP y aprobaciones definitivas se registran en la
issue #16.

## Entorno y alcance

Se revisó el build de producción servido por `vite preview` en
`http://127.0.0.1:4173`, mediante un navegador Chromium integrado. El código de
aplicación, las pruebas y el archivo de dependencias coinciden con la línea base.
Los documentos actualizados aún deben integrarse mediante la PR #31.

Esta sección conserva el alcance de la comprobación local. Posteriormente, la PR
#33 publicó la aplicación en
[sonido-vivo-react.vercel.app](https://sonido-vivo-react.vercel.app) y comprobó
rutas directas, recargas, recursos e interacciones. La evidencia pública está en
`docs/qa-15/README.md`. El enlace
`https://github.com/MainSteps/sonido-vivo-react.git` continúa identificando el
repositorio, no la aplicación ejecutándose.

## Comprobaciones de layout

Se capturaron cinco pantallas completas en viewports de **360 × 800**, **768 × 800**
y **1280 × 800**. Los tres tamaños se aplicaron al viewport del navegador.

| Pantalla | 360 px | 768 px | 1280 px | Observación |
| --- | --- | --- | --- | --- |
| Catálogo | Revisado | Revisado | Revisado | Una, dos y tres columnas respectivamente. |
| Registro | Revisado | Revisado | Revisado | Etiquetas y controles contenidos en el ancho disponible. |
| Administración de productos | Revisado | Revisado | Revisado | Tabla con desplazamiento horizontal interno en móvil. |
| Administración de usuarios | Revisado | Revisado | Revisado | Tabla con desplazamiento horizontal interno en móvil. |
| Carrito vacío | Revisado | Revisado | Revisado | Mensaje y enlace para volver al catálogo visibles. |

En las quince combinaciones, `document.documentElement.scrollWidth` coincide con
el ancho del viewport. No se detectaron imágenes fallidas en esas pantallas.
El resultado no implica que todas las rutas o todos los estados hayan pasado una
auditoría visual completa. En móvil, algunas columnas administrativas requieren
desplazar la tabla; no están eliminadas. En productos se midió un contenedor de
295 px y una tabla de aproximadamente 518 px, con `overflow-x: auto`.

Las capturas se guardan en [evidencias](evidencias/). El archivo
[revision-layout.json](evidencias/revision-layout.json) registra los resultados.

## Interacciones comprobadas a 360 px

| Caso | Resultado observado |
| --- | --- |
| Abrir menú | Se muestran enlaces y el botón queda expandido. |
| Cerrar menú | Se ocultan los enlaces del menú. |
| Agregar guitarra desde catálogo | Contador en 1; una fila en carrito, total $329.990. |
| Recargar carrito | La guitarra se conserva con cantidad 1. |
| Vaciar carrito | Contador en 0 y mensaje de carrito vacío. |
| Contacto sin nombre | Mensaje «Debe ingresar su nombre.». |
| Contacto con nombre y comentario, sin correo | Aviso de demostración; no se envía información real. |

La consulta de consola realizada tras recargar el carrito y vaciarlo no devolvió
advertencias ni errores. Esto describe únicamente la captura de logs de ese tramo;
no certifica la ausencia de errores en todas las rutas. En esta revisión local se
observó un fallo de red del iframe externo de YouTube. La verificación posterior
de la PR #33 consiguió reproducirlo tanto en local como en producción y conserva
capturas en `docs/qa-15`.

## Evidencia automatizada

- Instalación limpia mediante `npm ci`: aprobada.
- `npm run test:run`: 13 archivos y 65 pruebas aprobadas.
- `npm run test:coverage`: 13 archivos y 65 pruebas aprobadas.
- Sentencias: 78,85 % (522/662).
- Ramas: 70,95 % (281/396).
- Funciones: 93,02 % (160/172).
- Líneas: 80,09 % (511/638).
- `npm run lint`: aprobado.
- `npm run build`: aprobado; 52 módulos transformados.
- Revisión de espacios de los cambios documentales: aprobada.

No se modificó código funcional ni se agregaron pruebas durante esta actualización.

## Estado registrado al terminar esta revisión histórica

- [ ] Diego y Michel revisan la ERS, resultados y observaciones de la PR #31.
- [ ] Se integra la documentación aprobada en `main`.
- [ ] Se obtiene el SHA completo posterior a esa integración.
- [x] Se registró la URL pública y el commit desplegado en `docs/qa-15`.
- [x] Se comprobaron apertura directa y recarga de rutas en Vercel.
- [x] Se verificó un tramo de reproducción del contenido externo en producción.
- [ ] Se genera el ZIP final desde el SHA congelado y se registra su checksum.
- [ ] Los tres integrantes aprueban el congelamiento en la issue #16.

Estas casillas conservan el estado que existía el 18 de octubre y no deben usarse
como checklist vigente. No se marcaron aprobaciones ni resultados externos sin
evidencia. El ZIP candidato preparado junto a esta documentación servía para
revisión y no sustituye el ZIP final registrado en la issue #16.

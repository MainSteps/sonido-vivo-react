# Evidencia de pruebas de navegación y formularios

## Casos asociados al bloque de Diego

| Caso solicitado | Interacción y expectativa | Prueba automatizada |
| --- | --- | --- |
| Header muestra marca y navegación | Se renderiza la aplicación, se abre el menú y se comprueba la navegación visible. | `renderiza el encabezado y permite abrir el menú` |
| Un componente responde a un callback | Se agrega una guitarra desde el catálogo y se comprueba su aparición en el carrito. | `permite agregar un producto desde el catálogo y verlo en el carrito` |
| Un formulario controlado conserva y relaciona valores | Se elige región y comuna; al cambiar la región, la comuna anterior se limpia. | `carga las comunas y limpia la comuna al cambiar de región` |
| Un envío inválido muestra un mensaje | Se envía el registro con el RUN vacío y se espera el error asociado al campo. | `muestra el error del RUN al enviar el formulario vacío` |

Los dos primeros casos están en `src/App.test.jsx` y los dos siguientes en
`src/pages/RegistroPage.test.jsx`. Se utilizan consultas por rol o etiqueta y
eventos de `userEvent`, evitando comprobar detalles internos de implementación.

## Independencia

- Cada prueba crea un árbol nuevo de componentes.
- `localStorage` se limpia mediante la configuración común de la suite.
- Los eventos se ejecutan con una instancia nueva de `userEvent`.
- Ningún caso requiere el resultado de una prueba anterior.

## Resultado de la suite

Comandos ejecutados el 17 de octubre de 2026 sobre `main`, commit
`aaea16287ffe60f9cba702c7d0cdbe9b47a9690e`:

```bash
npm run test:run
npm run test:coverage
npm run lint
npm run build
```

- 10 archivos de prueba aprobados.
- 56 pruebas aprobadas.
- 77,84 % de sentencias.
- 69,53 % de ramas.
- 91,91 % de funciones.
- 79,47 % de líneas.
- ESLint y build aprobados.

## Conceptos para explicar

- Un formulario controlado obtiene su valor desde el estado de React.
- `userEvent` reproduce acciones como escribir, seleccionar y hacer clic.
- Una consulta por rol o etiqueta se aproxima al uso mediante tecnologías de
  asistencia.
- Una prueba de integración comprueba la colaboración de varios componentes sin
  necesitar un servidor real.

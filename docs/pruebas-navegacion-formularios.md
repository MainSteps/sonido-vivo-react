# Evidencia de pruebas de navegación y formularios

## Casos asociados al bloque de Diego

| Caso solicitado | Interacción y expectativa | Prueba automatizada |
| --- | --- | --- |
| Header muestra marca y navegación | Se comprueban la marca, enlaces principales y el cambio de `aria-expanded` al abrir el menú. | `muestra la marca, los enlaces principales y permite abrir el menú` |
| Un componente responde a props o callback | Se renderiza una tarjeta con datos de prueba, se pulsa su acción y se comprueba una llamada. | `muestra los datos recibidos y ejecuta la acción entregada` |
| Un formulario controlado conserva el valor | Se escribe `Diego` en el nombre y se comprueba que el campo conserva ese valor. | `conserva el valor ingresado en un campo controlado` |
| Un envío inválido muestra un mensaje | Se envía contacto sin nombre; aparece el error y no aparece el mensaje de éxito. | `muestra el error y no procesa el envío si el nombre está vacío` |

Los casos están en `src/App.test.jsx`, `src/components/ProductCard.test.jsx` y
`src/pages/ContactoPage.test.jsx` de la rama `test/3-navegacion-formularios`,
commit `8269e14dbdee80850a9d0b642058690b32dd69d9`. Se utilizan consultas por rol o
etiqueta, `userEvent`, `fireEvent` y `vi.fn`, evitando comprobar detalles internos.

## Independencia

- Cada prueba crea un árbol nuevo de componentes.
- `localStorage` se limpia mediante la configuración común de la suite.
- Los eventos se ejecutan con `userEvent` o `fireEvent` según el alcance del caso.
- Ningún caso requiere el resultado de una prueba anterior.

## Resultado de la suite

Comandos ejecutados el 18 de octubre de 2026 sobre `main`, commit
`8dc7253e4fe99e3630a6fb262318ff76d5152a11`:

```bash
npm run test:run
npm run test:coverage
npm run lint
npm run build
```

- 12 archivos de prueba aprobados.
- 63 pruebas aprobadas.
- 78,85 % de sentencias.
- 70,95 % de ramas.
- 93,02 % de funciones.
- 80,09 % de líneas.
- ESLint y build aprobados.

Esta medición todavía no incluye los cuatro casos anteriores porque la rama de la
issue #3 no ha sido fusionada. Después de su PR se repetirá la cobertura final.

## Conceptos para explicar

- Un formulario controlado obtiene su valor desde el estado de React.
- `userEvent` reproduce acciones como escribir, seleccionar y hacer clic.
- Una consulta por rol o etiqueta se aproxima al uso mediante tecnologías de
  asistencia.
- Una prueba de integración comprueba la colaboración de varios componentes sin
  necesitar un servidor real.

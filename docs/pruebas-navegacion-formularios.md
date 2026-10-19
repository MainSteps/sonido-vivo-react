# Evidencia de pruebas de navegación y formularios

## Casos asociados al bloque de Diego

| Caso solicitado | Interacción y expectativa | Prueba automatizada |
| --- | --- | --- |
| Header muestra marca y navegación | Se comprueban la marca, enlaces principales y el cambio de `aria-expanded` al abrir el menú. | `muestra la marca, los enlaces principales y permite abrir el menú` |
| Un componente responde a props o callback | Se renderiza una tarjeta con datos de prueba, se pulsa su acción y se comprueba una llamada. | `muestra los datos recibidos y ejecuta la acción entregada` |
| Un formulario controlado conserva el valor | Se escribe `Diego` en el nombre y se comprueba que el campo conserva ese valor. | `conserva el valor ingresado en un campo controlado` |
| Un envío inválido muestra un mensaje | Se envía contacto sin nombre; aparece el error y no aparece el mensaje de éxito. | `muestra el error y no procesa el envío si el nombre está vacío` |

Los casos están en `src/App.test.jsx`, `src/components/ProductCard.test.jsx` y
`src/pages/ContactoPage.test.jsx`. Se integraron a `main` mediante la PR #32.
D-01 y D-02 usan `userEvent`; las pruebas de contacto usan `fireEvent`.

## Independencia

- Cada prueba crea un árbol nuevo de componentes.
- `App.test.jsx` limpia `localStorage` en su `beforeEach`; la configuración
  común solo importa los matchers de jest-dom. Los casos aislados de tarjeta
  y contacto no requieren persistencia.
- Los eventos se ejecutan con `userEvent` o `fireEvent` según el alcance del caso.
- Ningún caso requiere el resultado de una prueba anterior.

## Resultado de la suite

Comandos ejecutados el 18 de octubre de 2026 sobre `main`, commit
`0baec31fa451d9e36a0e4524e3f43f00b2202e67`:

```bash
npm run test:run
npm run test:coverage
npm run lint
npm run build
```

- 13 archivos de prueba aprobados.
- 65 pruebas aprobadas.
- 78,85 % de sentencias.
- 70,95 % de ramas.
- 93,02 % de funciones.
- 80,09 % de líneas.
- ESLint y build aprobados.

Esta medición incluye los cuatro casos anteriores y se obtuvo mediante
`npm run test:coverage`, que ejecuta toda la suite. Las cuatro evidencias
representativas no equivalen a cuatro pruebas adicionales: dos amplían casos
existentes y dos agregan casos nuevos.

## Conceptos para explicar

- Un formulario controlado obtiene su valor desde el estado de React.
- `userEvent` reproduce acciones como escribir, seleccionar y hacer clic.
- Una consulta por rol o etiqueta se aproxima al uso mediante tecnologías de
  asistencia.
- Una prueba de integración comprueba la colaboración de varios componentes sin
  necesitar un servidor real.

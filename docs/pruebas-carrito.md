# Evidencia de pruebas del carrito

## Casos aportados por Michel

| Caso solicitado | Interacción y expectativa | Prueba |
| --- | --- | --- |
| Agregar actualiza cantidad y total | Se presiona dos veces **Agregar guitarra**. Se espera una sola fila, cantidad 2 y total de $659.980. | `agrega el mismo producto sin duplicar filas y actualiza el total` |
| Cantidad inválida se bloquea | Se intenta disminuir una unidad desde la cantidad mínima. Se espera el mensaje de error y que la cantidad permanezca en 1. | `impide disminuir una cantidad bajo uno` |
| Eliminar o vaciar muestra estado vacío | Se agregan productos y se presiona **Vaciar carrito**. Se espera el mensaje **Tu carrito está vacío**. | `vacía todos los productos del carrito` |
| Restaurar o recuperar almacenamiento | Se prepara `localStorage` con un carrito válido y luego con JSON corrupto. Se espera restaurar el primer caso y mostrar un carrito vacío en el segundo. | `restaura el carrito guardado al volver a cargar la aplicación` y `muestra el carrito vacío si el almacenamiento está corrupto` |

El mock de `Storage.getItem` comprueba que una falla de lectura no rompe la aplicación. `localStorage` se limpia antes de cada prueba para que los casos sean independientes.

## Resultado de la suite

Comandos ejecutados nuevamente el 18 de octubre de 2026 sobre `main`, commit
`8dc7253e4fe99e3630a6fb262318ff76d5152a11`:

```bash
npm run test:coverage
npm run lint
npm run build
```

Resultado:

- 12 archivos de prueba aprobados.
- 63 pruebas aprobadas.
- 78,85 % de sentencias.
- 70,95 % de ramas.
- 93,02 % de funciones.
- 80,09 % de líneas.

ESLint y el build de Vite finalizaron sin errores.

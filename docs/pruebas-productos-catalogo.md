# Evidencia de pruebas de productos y catálogo

## Casos aportados por Matías

| Caso solicitado | Interacción y expectativa | Prueba automatizada |
| --- | --- | --- |
| El catálogo renderiza los productos recibidos | Se abre el catálogo con los datos entregados por el servicio. Se esperan seis tarjetas y la guitarra Aurora visible. | `renderiza el listado completo desde el servicio` |
| El filtro modifica la lista visible | Se selecciona la categoría Audio y luego se busca `studio`. Se espera pasar de dos productos a un único resultado coincidente. | `combina el filtro de categoría con la búsqueda` |
| El detalle inexistente muestra el estado esperado | Se navega a `/productos/NO-EXISTE`. Se espera una explicación y un enlace seguro para volver al catálogo. | `muestra una explicación y regreso seguro para un producto inexistente` |
| Una operación CRUD usa el servicio simulado | Se crea, edita y elimina un producto desde la página administrativa. Se comprueba cada llamada al servicio simulado y la actualización visible del listado. | `crea, edita y elimina mediante el servicio simulado` |

Los tres primeros casos están en `src/pages/CatalogoPage.test.jsx`. El caso
CRUD está en `src/pages/AdminProductosPage.test.jsx` y se incorpora mediante la
PR #26. Las pruebas usan consultas centradas en el usuario, eventos reales de
`userEvent` y un servicio simulado con funciones `vi.fn`.

## Independencia de los casos

- Cada prueba crea su propio árbol de componentes.
- El catálogo recibe un carrito nuevo mediante `CarritoProvider`.
- El servicio CRUD simulado conserva sus datos solo durante la prueba.
- Los mocks globales se restauran después de cada caso.
- Ninguna prueba depende del orden de ejecución de la suite.

## Resultado de la suite

Comandos ejecutados nuevamente el 17 de octubre de 2026:

```bash
npm run test:run
npm run test:coverage
npm run lint
npm run build
```

Resultado comprobado sobre `main`, commit
`aaea16287ffe60f9cba702c7d0cdbe9b47a9690e`:

- 10 archivos de prueba aprobados.
- 56 pruebas aprobadas.
- 77,84 % de sentencias.
- 69,53 % de ramas.
- 91,91 % de funciones.
- 79,47 % de líneas.
- ESLint aprobado.
- Build de producción aprobado.

## Conceptos para explicar

- `render` monta el componente en un DOM de prueba.
- `screen` consulta lo que una persona puede percibir o usar.
- `userEvent` simula acciones como escribir, seleccionar y presionar botones.
- `expect` compara el resultado real con el comportamiento esperado.
- `vi.fn` crea funciones simuladas y permite comprobar con qué datos fueron
  llamadas.
- Un mock evita depender de almacenamiento real o de una API durante la prueba.


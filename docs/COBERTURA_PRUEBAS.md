# Informe de pruebas y cobertura

**Fecha de ejecución:** 18 de octubre de 2026
**Línea base:** `8dc7253e4fe99e3630a6fb262318ff76d5152a11`
**Entorno:** Vitest 5.0.4, jsdom y cobertura V8  
**Estado:** provisional hasta integrar las PR restantes y congelar `main`

## 1. Comandos reproducibles

```bash
npm ci
npm run lint
npm run test:run
npm run test:coverage
npm run build
```

La cobertura generada queda en `coverage/` y no se versiona. La medición de este
documento proviene de una ejecución real sobre la línea base indicada.

## 2. Resultado global comprobado

| Verificación | Resultado |
| --- | --- |
| Archivos de prueba | 12 aprobados |
| Pruebas | 63 aprobadas |
| Sentencias | 78,85 % — 522/662 |
| Ramas | 70,95 % — 281/396 |
| Funciones | 93,02 % — 160/172 |
| Líneas | 80,09 % — 511/638 |
| ESLint | Aprobado |
| Build de Vite | Aprobado, 52 módulos transformados |

## 3. Doce pruebas representativas exigidas

Las 63 pruebas automatizadas de la línea base permanecen en la suite. La siguiente matriz identifica
las cuatro evidencias mínimas que cada integrante debe poder explicar.

### 3.1 Bloque de Diego — navegación y formularios

| Caso | Archivo y prueba | Tipo | Qué demuestra |
| --- | --- | --- | --- |
| D-01 | `App.test.jsx` — `muestra la marca, los enlaces principales y permite abrir el menú` | Componente + evento | La marca, los enlaces y el estado accesible del menú responden al clic. |
| D-02 | `ProductCard.test.jsx` — `muestra los datos recibidos y ejecuta la acción entregada` | Props + callback | La tarjeta presenta sus props y ejecuta una función simulada una vez. |
| D-03 | `ContactoPage.test.jsx` — `conserva el valor ingresado en un campo controlado` | Estado controlado | El campo nombre refleja el valor escrito desde el estado de React. |
| D-04 | `ContactoPage.test.jsx` — `muestra el error y no procesa el envío si el nombre está vacío` | Validación | El error aparece y el mensaje de éxito permanece ausente. |

Estos cuatro casos coinciden con la rama `test/3-navegacion-formularios`, commit
`8269e14dbdee80850a9d0b642058690b32dd69d9`. Todavía no se contabilizan en la
línea base porque la issue #3 no ha sido fusionada a `main`.

### 3.2 Bloque de Matías — productos y catálogo

| Caso | Archivo y prueba | Tipo | Qué demuestra |
| --- | --- | --- | --- |
| M-01 | `CatalogoPage.test.jsx` — `renderiza el listado completo desde el servicio` | Renderizado | El catálogo consume datos del servicio y muestra seis productos. |
| M-02 | `CatalogoPage.test.jsx` — `combina el filtro de categoría con la búsqueda` | Estado + eventos | Categoría y texto reducen conjuntamente la lista visible. |
| M-03 | `CatalogoPage.test.jsx` — `muestra una explicación y regreso seguro para un producto inexistente` | Ruta/estado alternativo | Un código inválido no deja una pantalla rota. |
| M-04 | `AdminProductosPage.test.jsx` — `crea, edita y elimina mediante el servicio simulado` | CRUD + mock | La interfaz llama correctamente a funciones `vi.fn` y actualiza el listado. |

### 3.3 Bloque de Michel — carrito y persistencia

| Caso | Archivo y prueba | Tipo | Qué demuestra |
| --- | --- | --- | --- |
| C-01 | `CarritoPage.test.jsx` — `agrega el mismo producto sin duplicar filas y actualiza el total` | Estado + cálculo | Dos agregados consolidan una fila y recalculan el total. |
| C-02 | `CarritoPage.test.jsx` — `impide disminuir una cantidad bajo uno` | Regla de negocio | El límite inferior produce un mensaje y conserva la cantidad. |
| C-03 | `CarritoPage.test.jsx` — `vacía todos los productos del carrito` | Evento + estado vacío | Vaciar actualiza inmediatamente la interfaz. |
| C-04 | `CarritoPage.test.jsx` — `restaura el carrito guardado al volver a cargar la aplicación` | Persistencia | El contexto reconstruye el estado desde `localStorage`. |

El caso adicional `muestra el carrito vacío si el almacenamiento está corrupto`
comprueba la recuperación ante JSON inválido.

## 4. Herramientas y dobles de prueba

| Herramienta | Uso en el proyecto |
| --- | --- |
| `render` | Monta una página o árbol de componentes en jsdom. |
| `screen` | Consulta por rol, etiqueta o texto perceptible para una persona. |
| `userEvent` | Simula clics, escritura y selección con una secuencia cercana al uso real. |
| `expect` | Compara el resultado con el comportamiento esperado. |
| `vi.fn` | Simula servicios y registra argumentos y cantidad de llamadas. |
| `vi.spyOn` | Controla APIs globales como confirmación o almacenamiento. |
| `localStorage` de jsdom | Aísla persistencia entre casos mediante limpieza previa. |

Los mocks se usan en los límites del sistema. La lógica del componente continúa
ejecutándose, pero no depende de una API, una base de datos ni datos compartidos
entre pruebas.

## 5. Cobertura por área

| Área | Sentencias | Ramas | Funciones | Líneas |
| --- | ---: | ---: | ---: | ---: |
| Componentes | 90,47 % | 75,00 % | 92,85 % | 95,00 % |
| Contexto | 79,54 % | 61,53 % | 100,00 % | 81,39 % |
| Páginas | 74,19 % | 68,88 % | 87,80 % | 74,17 % |
| Servicios | 82,21 % | 72,78 % | 98,30 % | 84,93 % |
| Utilidades | 84,61 % | 77,27 % | 100,00 % | 84,61 % |

## 6. Interpretación

- **Sentencias** mide instrucciones ejecutadas por al menos una prueba.
- **Ramas** mide alternativas como condiciones, retornos y manejo de errores.
- **Funciones** mide funciones invocadas durante la suite.
- **Líneas** mide líneas ejecutables alcanzadas.

La cobertura no demuestra por sí sola que el programa sea correcto. La métrica más
baja es ramas, con 70,95 %, porque todavía existen alternativas de error y campos
del formulario de registro sin casos específicos. Esto se registra como riesgo, no
se oculta ni se reemplaza con un porcentaje inventado.

## 7. Riesgos y trabajo pendiente

- `RegistroPage.jsx` concentra la mayor parte de las líneas y ramas no cubiertas.
- Faltan casos dedicados a algunos errores de escritura en `localStorage`.
- El CRUD de usuarios ya está incluido; sus ramas alternativas aún ofrecen espacio
  para aumentar la cobertura.
- La issue #3 está publicada como rama, pero aún no tiene PR fusionada. Al integrarse
  cambiará el total de pruebas y debe repetirse la medición final.
- Las comprobaciones responsivas y de consola son manuales y deben registrarse en
  el checklist de la issue #16.
- La URL pública y el SHA final todavía dependen del congelamiento de la entrega.

## 8. Repetición final

Después de integrar las PR obligatorias:

1. partir desde una copia limpia de `main`;
2. ejecutar los cinco comandos de la sección 1;
3. reemplazar esta medición por los resultados nuevos;
4. confirmar que las 12 pruebas representativas siguen aprobando;
5. registrar en la issue #16 el SHA único usado por ERS, cobertura, README, ZIP y
   despliegue.

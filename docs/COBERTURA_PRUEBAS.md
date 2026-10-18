# Informe de pruebas y cobertura

**Fecha de ejecución:** 17 de octubre de 2026  
**Línea base:** `aaea16287ffe60f9cba702c7d0cdbe9b47a9690e`  
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
| Archivos de prueba | 10 aprobados |
| Pruebas | 56 aprobadas |
| Sentencias | 77,84 % — 404/519 |
| Ramas | 69,53 % — 210/302 |
| Funciones | 91,91 % — 125/136 |
| Líneas | 79,47 % — 395/497 |
| ESLint | Aprobado |
| Build de Vite | Aprobado, 49 módulos transformados |

## 3. Doce pruebas representativas exigidas

Las 56 pruebas automatizadas permanecen en la suite. La siguiente matriz identifica
las cuatro evidencias mínimas que cada integrante debe poder explicar.

### 3.1 Bloque de Diego — navegación y formularios

| Caso | Archivo y prueba | Tipo | Qué demuestra |
| --- | --- | --- | --- |
| D-01 | `App.test.jsx` — `renderiza el encabezado y permite abrir el menú` | Componente + evento | Header visible y navegación operable mediante una interacción. |
| D-02 | `App.test.jsx` — `permite agregar un producto desde el catálogo y verlo en el carrito` | Integración | Un callback reutilizable conecta tarjeta, contexto y ruta de carrito. |
| D-03 | `RegistroPage.test.jsx` — `carga las comunas y limpia la comuna al cambiar de región` | Estado controlado | La selección modifica el estado dependiente sin manipular el DOM. |
| D-04 | `RegistroPage.test.jsx` — `muestra el error del RUN al enviar el formulario vacío` | Validación | Un envío inválido presenta el error y no procesa el formulario. |

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
| Páginas | 70,96 % | 62,96 % | 85,71 % | 71,07 % |
| Servicios | 83,90 % | 75,83 % | 97,61 % | 88,12 % |
| Utilidades | 84,61 % | 77,27 % | 100,00 % | 84,61 % |

## 6. Interpretación

- **Sentencias** mide instrucciones ejecutadas por al menos una prueba.
- **Ramas** mide alternativas como condiciones, retornos y manejo de errores.
- **Funciones** mide funciones invocadas durante la suite.
- **Líneas** mide líneas ejecutables alcanzadas.

La cobertura no demuestra por sí sola que el programa sea correcto. La métrica más
baja es ramas, con 69,53 %, porque todavía existen alternativas de error y campos
del formulario de registro sin casos específicos. Esto se registra como riesgo, no
se oculta ni se reemplaza con un porcentaje inventado.

## 7. Riesgos y trabajo pendiente

- `RegistroPage.jsx` concentra la mayor parte de las líneas y ramas no cubiertas.
- Faltan casos dedicados a algunos errores de escritura en `localStorage`.
- La PR #30 añade el CRUD y las pruebas de usuarios. Al fusionarse cambiará el total
  de archivos, pruebas y porcentajes; por eso debe repetirse la medición.
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

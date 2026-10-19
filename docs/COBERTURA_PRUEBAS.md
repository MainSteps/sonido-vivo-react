# Informe de pruebas y cobertura

**Fecha de ejecución:** 19 de octubre de 2026
**Base de la corrección final:** `b45b2dd78e82559b2f3b0ee0c840cb16c70d4a57`
**Entorno:** Node.js 24.19.0, npm 11.9.0, Vite 8.3.4, Vitest 5.0.4, jsdom 30.1.2 y cobertura V8
**Estado:** evidencia final de la candidata; SHA congelado registrado en la issue #16

## 1. Comandos reproducibles

```bash
npm ci
npm run lint
npm run test:run
npm run test:coverage
npm run build
```

La cobertura generada queda en `coverage/` y no se versiona. La medición proviene
de una instalación limpia con `npm ci` y ejecuciones separadas de
`npm run test:run`, `npm run test:coverage`, `npm run lint` y `npm run build`.
Ambas ejecuciones de la suite obtuvieron 66 pruebas aprobadas.

## 2. Resultado global comprobado

| Verificación | Resultado |
| --- | --- |
| Archivos de prueba | 13 aprobados |
| Pruebas | 66 aprobadas |
| Sentencias | 78,97 % — 526/666 |
| Ramas | 71,10 % — 283/398 |
| Funciones | 93,14 % — 163/175 |
| Líneas | 80,21 % — 515/642 |
| ESLint | Aprobado |
| Build de Vite | Aprobado, 53 módulos transformados |
| Auditoría de dependencias | 0 vulnerabilidades |

## 3. Doce pruebas representativas exigidas

Las 66 pruebas automatizadas de la candidata permanecen en la suite. La siguiente matriz identifica
las cuatro evidencias mínimas que cada integrante debe poder explicar.

### 3.1 Bloque de Diego — navegación y formularios

| Caso | Archivo y prueba | Tipo | Qué demuestra |
| --- | --- | --- | --- |
| D-01 | `App.test.jsx` — `muestra la marca, los enlaces principales y permite abrir el menú` | Componente + evento | La marca, los enlaces y el estado accesible del menú responden al clic. |
| D-02 | `ProductCard.test.jsx` — `muestra los datos recibidos y ejecuta la acción entregada` | Props + callback | La tarjeta presenta sus props y ejecuta una función simulada una vez. |
| D-03 | `ContactoPage.test.jsx` — `conserva el valor ingresado en un campo controlado` | Estado controlado | El campo nombre refleja el valor escrito desde el estado de React. |
| D-04 | `ContactoPage.test.jsx` — `muestra el error y no procesa el envío si el nombre está vacío` | Validación | El error aparece y el mensaje de éxito permanece ausente. |

Los cuatro casos forman parte de `main` mediante la PR #32, fusionada el 18 de
octubre de 2026. D-01 y D-04 fortalecen pruebas existentes; D-02 y D-03 son
casos nuevos. Por eso la suite pasa de 63 a 65 pruebas, no a 67.

La corrección final agrega el caso `permite navegar entre los mantenedores de
administración`, que comprueba el recorrido mediante enlaces visibles desde el
inicio hasta Productos y luego Usuarios. Por eso la suite final contiene 66
pruebas.

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
| Componentes | 92,00 % | 78,57 % | 94,11 % | 95,83 % |
| Contexto | 79,54 % | 61,53 % | 100,00 % | 81,39 % |
| Páginas | 74,19 % | 68,88 % | 87,80 % | 74,17 % |
| Servicios | 82,21 % | 72,78 % | 98,30 % | 84,93 % |
| Utilidades | 84,61 % | 77,27 % | 100,00 % | 84,61 % |

La configuración no define `coverage.include`, `coverage.all` ni umbrales mínimos.
Estos porcentajes corresponden al conjunto que V8 informa en esta ejecución; no
se deben presentar como cobertura de todos los archivos del repositorio. El reporte
HTML permite consultar los archivos y líneas incluidos. Las pruebas en jsdom no
verifican por sí solas el diseño responsivo ni el despliegue público.

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
- La issue #3 ya está integrada mediante la PR #32 y está incluida en esta medición.
- Se documentó una revisión local de cinco pantallas a tres anchos y una consulta
  limitada de consola en `VERIFICACION_ENTREGA.md`.
- La verificación pública de rutas, recargas e interacciones está registrada en
  `docs/qa-15/README.md` para el despliegue de Vercel.
- El SHA definitivo, el redeploy y el ZIP se comprueban después del merge y se
  registran en la issue #16; no modifican el resultado funcional de esta suite.

## 8. Repetición final

Después de fusionar la corrección final:

1. partir desde una copia limpia de `main`;
2. ejecutar los cinco comandos de la sección 1;
3. confirmar que los resultados coinciden con esta medición;
4. confirmar que las 12 pruebas representativas siguen aprobando;
5. registrar en la issue #16 el SHA único usado por ERS, cobertura, README, ZIP y
   despliegue.

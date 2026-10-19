# Especificación de Requisitos de Software — Sonido Vivo V2

**Versión:** 2.2 — candidata final revisada contra la pauta
**Fecha de revisión:** 19 de octubre de 2026
**Repositorio:** `MainSteps/sonido-vivo-react`
**Base de la corrección final:** `b45b2dd78e82559b2f3b0ee0c840cb16c70d4a57`
**SHA definitivo:** registrado en la issue #16 después del merge

## 1. Propósito

Sonido Vivo es una tienda musical ficticia creada para demostrar el uso de React,
componentes reutilizables, rutas, formularios controlados, estado compartido,
persistencia local y pruebas automatizadas. Esta ERS describe las funciones identificadas mediante revisión del código y
las pruebas disponibles en la candidata final. Cada evidencia distingue
implementación, prueba automatizada y comprobación manual. La aplicación no representa una empresa ni
procesa operaciones comerciales reales.

## 2. Alcance y actores

### 2.1 Actores

- **Visitante:** navega, consulta productos y artículos, usa formularios simulados
  y administra un carrito local.
- **Administrador simulado:** usa los mantenedores locales de productos y usuarios. No existe
  autorización real ni separación técnica de permisos.
- **Equipo académico:** ejecuta pruebas, revisa cobertura y mantiene la evidencia.

### 2.2 Incluido

- navegación SPA con React Router;
- inicio, nosotros, blog y detalle de artículos ficticios;
- catálogo de productos, búsqueda, filtro y detalle;
- carrito con cantidades, stock, subtotales, total y persistencia;
- registro, inicio de sesión y contacto simulados con validaciones;
- CRUD local de productos ficticios;
- CRUD local de usuarios ficticios, sin contraseñas ni información real;
- estados vacíos, errores comprensibles y diseño adaptable;
- pruebas automatizadas con Vitest y React Testing Library.

### 2.3 Excluido

- autenticación, autorización y recuperación real de cuentas;
- backend, API remota o base de datos compartida;
- pagos, pedidos, inventario real, despacho o facturación;
- envío efectivo de formularios o correos;
- almacenamiento de contraseñas o datos personales reales;
- conexión con un padrón real de personas o un sistema de autenticación.

## 3. Arquitectura verificable

| Capa | Elementos principales | Responsabilidad |
| --- | --- | --- |
| Rutas | `App.jsx`, React Router | Relacionar URL y pantalla sin recarga completa. |
| Páginas | `src/pages` | Componer cada vista y coordinar interacciones. |
| Componentes | `SiteHeader`, `SiteFooter`, `AdminNavigation`, `ProductCard`, `ProductFilters` | Reutilizar presentación, navegación y callbacks. |
| Estado compartido | `CarritoProvider`, `CarritoContext` | Mantener y exponer el carrito a distintas rutas. |
| Servicios | `productosService`, `carritoService`, `usuariosService` | Aplicar reglas, normalizar y persistir. |
| Datos | `productos.js`, `usuarios.js`, `contenido.js`, `regiones-comunas.js` | Proveer información ficticia inicial. |
| Utilidades | `validaciones.js`, `formatoPrecio.js` | Centralizar validaciones y formato monetario. |
| Pruebas | archivos `*.test.js` y `*.test.jsx` | Comprobar lógica, eventos, estado e integración. |

## 4. Requisitos funcionales

| ID | Requisito verificable | Evidencia principal |
| --- | --- | --- |
| RF-01 | El sistema debe navegar entre rutas mediante React Router sin recargar toda la página. | `App.jsx`, `App.test.jsx` |
| RF-02 | Debe mostrar inicio, nosotros, blog, detalle de artículo y un estado comprensible para contenido inexistente. | páginas institucionales y pruebas de `App` |
| RF-03 | Debe construir el catálogo desde el servicio local, no mediante tarjetas duplicadas manualmente. | `CatalogoPage.jsx`, `productosService.js` |
| RF-04 | Debe combinar búsqueda por texto y filtro por categoría, ignorando mayúsculas y tildes. | `buscarProductos`, `CatalogoPage.test.jsx` |
| RF-05 | Debe abrir el detalle usando `/productos/:id` y permitir regresar si el código no existe. | `ProductoDetallePage.jsx`, prueba de detalle inexistente |
| RF-06 | Debe agregar productos al carrito desde catálogo o detalle y reflejar la cantidad en la navegación. | `ProductCard`, `CarritoProvider`, `SiteHeader` |
| RF-07 | Debe consolidar productos repetidos, respetar cantidad mínima 1 y no superar el stock. | `carritoService.js`, `CarritoPage.test.jsx` |
| RF-08 | Debe calcular subtotales y total y permitir cambiar, eliminar o vaciar el carrito. | `CarritoPage.jsx`, pruebas del carrito |
| RF-09 | Debe restaurar un carrito válido y recuperarse de JSON corrupto sin romper la interfaz. | `carritoService.js`, pruebas de persistencia |
| RF-10 | Registro debe validar RUN, nombre, apellidos, correo, contraseña, región, comuna y dirección. | `RegistroPage.jsx`, `validaciones.js` |
| RF-11 | Cambiar la región debe limpiar la comuna seleccionada y cargar sus alternativas. | `RegistroPage.test.jsx` |
| RF-12 | Inicio de sesión debe rechazar correo o contraseña inválidos y mostrar un aviso de demostración si los campos superan las validaciones, sin autenticar al usuario. | `InicioSesionPage.jsx` y sus pruebas |
| RF-13 | Contacto debe exigir nombre y comentario; el correo es opcional, pero debe usar un dominio permitido cuando se ingresa. | `ContactoPage.jsx` y sus pruebas |
| RF-14 | El mantenedor de productos debe listar, crear, editar y eliminar productos ficticios. | `AdminProductosPage.jsx` |
| RF-15 | El mantenedor debe bloquear códigos duplicados, categorías inválidas, precio negativo y stock negativo o no entero. | `productosService.js` y sus pruebas |
| RF-16 | La eliminación de productos debe pedir confirmación y la interfaz debe comunicar éxito, error o estado vacío. | `AdminProductosPage.jsx` y prueba con servicio simulado |
| RF-17 | El mantenedor de usuarios debe listar, crear, editar y eliminar usuarios ficticios con confirmación. | `AdminUsuariosPage.jsx` y sus pruebas |
| RF-18 | Los usuarios deben persistirse localmente y validar RUN único, nombre, apellidos, correo permitido y rol del catálogo. | `usuariosService.js` y sus pruebas |
| RF-19 | Las vistas administrativas deben permitir navegar entre productos, usuarios y la tienda pública mediante enlaces visibles. | `AdminNavigation.jsx`, `App.test.jsx` |

## 5. Reglas de negocio

### 5.1 Productos

- `codigo`, `nombre` y `categoria` son obligatorios.
- El código se normaliza en mayúsculas y debe ser único.
- La categoría debe pertenecer al catálogo definido.
- El precio debe ser numérico y mayor o igual a cero.
- El stock debe ser un entero mayor o igual a cero.
- La interfaz deshabilita el código durante la edición. El servicio permite cambiarlo
  si se invoca directamente con un código válido y no duplicado; no migra las
  referencias existentes del carrito.

### 5.2 Carrito

- Cada fila se identifica mediante `codigoProducto`.
- Agregar un código existente aumenta su cantidad en vez de duplicar la fila.
- La cantidad válida está entre 1 y el stock vigente.
- El subtotal es `precio × cantidad`; el total es la suma de subtotales.
- Solo se persisten código y cantidad; precio, nombre y stock se consultan desde
  el servicio de productos.
- Un producto inexistente o un dato incompatible se descarta al restaurar.

### 5.3 Formularios

- Los campos obligatorios deben ser distintos de una cadena vacía.
- El RUN debe cumplir el algoritmo del dígito verificador.
- Los correos se limitan a `@duoc.cl`, `@profesor.duoc.cl` o `@gmail.com`.
- La contraseña simulada acepta entre 4 y 10 caracteres.
- Los límites máximos se validan antes de mostrar un resultado exitoso.
- Ningún formulario transmite o almacena información en un servidor.

### 5.4 Usuarios ficticios

- El RUN identifica al usuario y debe ser válido y único.
- Ningún usuario puede cambiar su RUN mediante la edición. Los registros iniciales
  usan identificadores `RUN-DEMO-*`, admitidos como excepción al editarlos; la
  creación de usuarios exige RUN con dígito verificador válido.
- Nombre, apellidos, correo y rol son obligatorios.
- El rol debe ser `Administrador`, `Vendedor` o `Cliente`.
- El correo debe usar uno de los dominios permitidos por las validaciones compartidas.
- La eliminación requiere confirmación y no se almacenan contraseñas.

## 6. Rutas y estados

| Ruta | Estado implementado |
| --- | --- |
| `/` | Inicio con contenido destacado y enlaces. |
| `/productos` | Listado, búsqueda, filtro y estado sin resultados. |
| `/productos/:id` | Detalle existente o explicación con regreso seguro. |
| `/carrito` | Carrito con productos o estado vacío. |
| `/registro` | Formulario controlado y mensajes por campo. |
| `/login` | Simulación de inicio de sesión. |
| `/contacto` | Consulta simulada con éxito o errores. |
| `/nosotros` | Descripción académica del proyecto. |
| `/blog`, `/blog/:id` | Listado y detalle de contenido ficticio. |
| `/admin/productos` | CRUD local de productos. |
| `/admin/usuarios` | CRUD local de usuarios ficticios. |
| `*` | Página no encontrada. |

## 7. Persistencia

| Clave | Contenido | Recuperación segura |
| --- | --- | --- |
| `sonidoVivoProductos` | Arreglo de productos ficticios normalizados. | Usa la semilla ante ausencia, JSON inválido o tipo distinto de arreglo. |
| `sonidoVivoCarrito` | Pares `codigoProducto` y `cantidad`. | Devuelve un carrito vacío o normalizado ante errores. |
| `sonidoVivoUsuarios` | Arreglo de usuarios ficticios sin contraseña. | Usa la semilla ante ausencia, JSON inválido o tipo distinto de arreglo. |

`localStorage` pertenece al navegador del usuario y no sustituye una base de
datos. El proyecto no guarda contraseñas, sesiones, pagos ni información sensible.

## 8. Requisitos no funcionales

| ID | Requisito | Verificación |
| --- | --- | --- |
| RNF-01 | La interfaz debe ser utilizable a 360, 768 y 1280 px. | Revisión local de catálogo, registro, mantenedores y carrito vacío en los tres anchos; capturas en `VERIFICACION_ENTREGA.md`. La navegación pública y las recargas están verificadas en `docs/qa-15/README.md`. |
| RNF-02 | Los controles deben tener etiquetas y los errores deben ser perceptibles. | Hay etiquetas en formularios y atributos ARIA en mantenedores; registro, login y contacto aún requieren verificar y completar la asociación accesible de errores. |
| RNF-03 | Un fallo de almacenamiento no debe producir una pantalla rota. | `try/catch` y pruebas de JSON corrupto. |
| RNF-04 | Las rutas y componentes deben evitar manipulación directa del DOM. | Estado React, props, contexto y servicios. |
| RNF-05 | La entrega debe aprobar lint, pruebas y build. | Informe `COBERTURA_PRUEBAS.md`. |
| RNF-06 | El repositorio no debe contener secretos, `node_modules`, `dist` ni cobertura generada. | `.gitignore` y revisión de entrega. |

## 9. Matriz de evidencia de la rúbrica

La matriz se contrastó con la pauta de evaluación, el anexo de instrucciones y
el aviso de AVA de la Evaluación Parcial 2. Los cuatro primeros indicadores son
grupales; los cuatro últimos se califican durante la presentación individual.

| Indicador | Evidencia preparada |
| --- | --- |
| IE2.1.1 — diseño del proyecto con framework frontend | React y Vite, rutas SPA, estructura por páginas, componentes, servicios, CRUD, formularios, carrito y persistencia local. |
| IE2.1.2 — componentes, propiedades, estados y responsividad | Componentes reutilizables, callbacks por props, formularios controlados, contexto del carrito, media queries y capturas a 360, 768 y 1280 px. |
| IE2.2.1 — pruebas unitarias con Vitest | 66 pruebas aprobadas, incluidas las categorías exigidas de renderizado, renderizado condicional, props, estado y eventos. |
| IE2.3.1 — proceso de pruebas | Entorno jsdom, React Testing Library, `vi.fn`, `vi.spyOn`, almacenamiento simulado, resultados reproducibles y cobertura V8. |
| IE2.1.3 — exposición del diseño React | Arquitectura, rutas y flujo de datos documentados para la defensa individual. |
| IE2.1.4 — demostración de componentes | Ejemplos reales de props, estado, eventos y adaptación responsiva identificados en el código. |
| IE2.2.2 — demostración de pruebas | Doce casos representativos distribuidos entre los tres integrantes y suite completa ejecutable. |
| IE2.3.2 — explicación del proceso | Comandos, dobles de prueba, resultados y lectura de cobertura documentados. |

## 10. Trazabilidad y control de versión

- La corrección final parte de
  `b45b2dd78e82559b2f3b0ee0c840cb16c70d4a57` y no modifica las reglas de
  negocio ni la arquitectura de servicios.
- La candidata agrega navegación visible entre ambos CRUD administrativos,
  restaura las seis descripciones originales de productos y prueba el recorrido.
- Se repitieron instalación limpia, lint, suite, cobertura y build: 13 archivos
  y 66 pruebas aprobadas; el informe registra las métricas exactas.
- La PR #33 incorporó la configuración de Vercel y la evidencia del despliegue
  público en `https://sonido-vivo-react.vercel.app`.
- La issue #16 registra el SHA congelado que deben compartir documentación, ZIP
  y despliegue final. Mantenerlo fuera del propio commit evita una referencia
  circular imposible de sostener dentro de los archivos versionados.

## 11. Criterio de cierre de esta versión

Esta ERS contiene el alcance final verificado. El cierre operativo exige fusionar
la corrección mediante PR, repetir los comandos sobre `main`, comprobar el
redeploy, generar el ZIP desde ese mismo SHA y registrar las tres aprobaciones en
la issue #16. Cualquier cambio posterior al congelamiento debe quedar autorizado
y documentado.

## 12. Límites verificados de la implementación

- El registro público no invoca `crearUsuario`; validar el formulario no agrega
  un usuario al mantenedor. Login no consulta usuarios ni contraseñas.
- Los roles son datos de demostración: no protegen rutas ni restringen acciones.
- `validarCampoObligatorio` solo compara con `""`; un texto formado por espacios
  puede superar esa validación en los formularios públicos. Los servicios CRUD
  recortan espacios en los campos de texto antes de validar.
- `validarDominioCorreo` comprueba sufijos con distinción de mayúsculas; no es un
  validador completo de correo. Los formularios públicos también usan `type="email"`.
  El servicio de usuarios convierte el correo a minúsculas antes de validarlo.
- El RUN acepta entre 7 y 9 caracteres, sin puntos ni guion, y comprueba su
  dígito verificador. No verifica identidad ni existencia de la persona.
- En registro, nombre admite hasta 50 caracteres; apellidos y correo hasta 100;
  dirección hasta 300. La fecha de nacimiento es opcional y no verifica edad.
  En contacto, nombre y correo admiten hasta 100 y comentario hasta 500.
- La restauración del carrito agrupa códigos repetidos, convierte cantidades a
  enteros y limita por stock; descarta productos ausentes, sin stock y cantidades
  no válidas. No reserva ni descuenta inventario y no finaliza compras.
- `CarritoProvider` recalcula sus productos cuando cambian los ítems. Los cambios
  del mantenedor no invalidan por sí solos ese cálculo memorizado; no se garantiza
  sincronización inmediata de precio, stock o eliminación mientras el carrito está
  montado. Tampoco hay sincronización explícita entre pestañas.
- Productos filtra registros inválidos y duplicados al leer un arreglo guardado;
  un arreglo vacío válido permanece vacío. Usuarios acepta los elementos del
  arreglo leído sin validar cada registro. No debe afirmarse una recuperación
  uniforme de toda estructura corrupta en los tres servicios.
- Un fallo de escritura del carrito devuelve `false` en el servicio, pero el
  proveedor no comunica ese resultado a la interfaz. No se garantiza persistencia
  cuando el navegador deniega el almacenamiento.
- Se realizó una revisión local limitada de tamaños e interacciones, documentada
  en `VERIFICACION_ENTREGA.md`. La PR #33 verificó rutas directas y recargas en
  Vercel mediante el fallback de `vercel.json`. La auditoría completa de
  accesibilidad continúa fuera del alcance de esta revisión.

Estas observaciones describen el alcance actual; no se presentan como funciones
implementadas ni como comprobaciones manuales aprobadas.

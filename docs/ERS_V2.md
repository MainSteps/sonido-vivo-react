# Especificación de Requisitos de Software — Sonido Vivo V2

**Versión:** 2.0 provisional  
**Fecha de revisión:** 18 de octubre de 2026
**Repositorio:** `MainSteps/sonido-vivo-react`  
**Línea base verificada:** `8dc7253e4fe99e3630a6fb262318ff76d5152a11`

## 1. Propósito

Sonido Vivo es una tienda musical ficticia creada para demostrar el uso de React,
componentes reutilizables, rutas, formularios controlados, estado compartido,
persistencia local y pruebas automatizadas. Esta ERS describe únicamente funciones
comprobadas en la línea base indicada. La aplicación no representa una empresa ni
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
| Componentes | `SiteHeader`, `SiteFooter`, `ProductCard`, `ProductFilters` | Reutilizar presentación y callbacks. |
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
| RF-12 | Inicio de sesión debe rechazar correo o contraseña inválidos y mostrar éxito solo con datos válidos. | `InicioSesionPage.jsx` y sus pruebas |
| RF-13 | Contacto debe exigir nombre y comentario; el correo es opcional, pero debe usar un dominio permitido cuando se ingresa. | `ContactoPage.jsx` y sus pruebas |
| RF-14 | El mantenedor de productos debe listar, crear, editar y eliminar productos ficticios. | `AdminProductosPage.jsx` |
| RF-15 | El mantenedor debe bloquear códigos duplicados, categorías inválidas, precio negativo y stock negativo o no entero. | `productosService.js` y sus pruebas |
| RF-16 | La eliminación de productos debe pedir confirmación y la interfaz debe comunicar éxito, error o estado vacío. | `AdminProductosPage.jsx` y prueba con servicio simulado |
| RF-17 | El mantenedor de usuarios debe listar, crear, editar y eliminar usuarios ficticios con confirmación. | `AdminUsuariosPage.jsx` y sus pruebas |
| RF-18 | Los usuarios deben persistirse localmente y validar RUN único, nombre, apellidos, correo permitido y rol del catálogo. | `usuariosService.js` y sus pruebas |

## 5. Reglas de negocio

### 5.1 Productos

- `codigo`, `nombre` y `categoria` son obligatorios.
- El código se normaliza en mayúsculas y debe ser único.
- La categoría debe pertenecer al catálogo definido.
- El precio debe ser numérico y mayor o igual a cero.
- El stock debe ser un entero mayor o igual a cero.
- Durante la edición se conserva el código para no invalidar referencias del carrito.

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
- Los registros iniciales de demostración no pueden cambiar su RUN.
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
| `sonidoVivoProductos` | Arreglo de productos ficticios normalizados. | Usa la semilla válida ante ausencia o corrupción. |
| `sonidoVivoCarrito` | Pares `codigoProducto` y `cantidad`. | Devuelve un carrito vacío o normalizado ante errores. |
| `sonidoVivoUsuarios` | Arreglo de usuarios ficticios sin contraseña. | Usa la semilla válida ante ausencia o corrupción. |

`localStorage` pertenece al navegador del usuario y no sustituye una base de
datos. El proyecto no guarda contraseñas, sesiones, pagos ni información sensible.

## 8. Requisitos no funcionales

| ID | Requisito | Verificación |
| --- | --- | --- |
| RNF-01 | La interfaz debe ser utilizable a 360, 768 y 1280 px. | Revisión manual indicada en las PR funcionales. |
| RNF-02 | Los formularios deben asociar etiquetas, errores y controles accesibles. | `label`, `aria-invalid`, `aria-describedby`, roles de estado/alerta. |
| RNF-03 | Un fallo de almacenamiento no debe producir una pantalla rota. | `try/catch` y pruebas de JSON corrupto. |
| RNF-04 | Las rutas y componentes deben evitar manipulación directa del DOM. | Estado React, props, contexto y servicios. |
| RNF-05 | La entrega debe aprobar lint, pruebas y build. | Informe `COBERTURA_PRUEBAS.md`. |
| RNF-06 | El repositorio no debe contener secretos, `node_modules`, `dist` ni cobertura generada. | `.gitignore` y revisión de entrega. |

## 9. Matriz de evidencia de los ocho indicadores

| Indicador | Evidencia identificable |
| --- | --- |
| 1. Componentes React reutilizables | `SiteHeader`, `SiteFooter`, `ProductCard`, `ProductFilters`. |
| 2. Props, estado y eventos | callbacks de tarjetas/filtros, formularios controlados y `userEvent`. |
| 3. Enrutamiento SPA | rutas estáticas, parámetros `:id`, navegación y ruta `*`. |
| 4. Formularios y validación | registro, login, contacto y utilidades compartidas. |
| 5. CRUD y reglas de negocio | servicios y administración local de productos y usuarios. |
| 6. Estado compartido y persistencia | contexto del carrito y tres claves documentadas de `localStorage`. |
| 7. Pruebas, mocks y cobertura | 63 pruebas actuales, `vi.fn`, confirmación y almacenamiento simulado. |
| 8. Trabajo colaborativo y entrega | issues, ramas, PR revisadas, README y documentos versionados. |

## 10. Trazabilidad y control de versión

- La medición descrita se ejecutó sobre la línea base
  `8dc7253e4fe99e3630a6fb262318ff76d5152a11`.
- La PR #30 y el CRUD de usuarios pertenecen a esta línea base.
- La rama `test/3-navegacion-formularios` contiene los cuatro casos de la issue #3,
  pero todavía no forma parte de `main`.
- Después de integrar esa PR, se repetirán instalación, lint, pruebas,
  cobertura y build.
- La issue #16 registrará el SHA congelado que deberán compartir README, ERS,
  informe, ZIP y despliegue.

## 11. Criterio de cierre de esta versión

Esta ERS pasa de provisional a final cuando el equipo integra las funciones
obligatorias, revisa la matriz, repite la suite sobre `main` y registra un único SHA
de entrega. Cualquier función no fusionada debe permanecer declarada como pendiente
o excluida, nunca como implementada.

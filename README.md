# Sonido Vivo React

Aplicación académica de comercio musical ficticio construida con React y Vite.
Permite recorrer un catálogo, consultar productos, usar un carrito persistente,
completar formularios simulados y administrar productos y usuarios locales. No procesa pagos,
no utiliza datos personales reales y no se conecta a un backend.

## Equipo

- Diego: navegación, contenido institucional, formularios y usuarios.
- Matías: datos, catálogo, detalle y administración de productos.
- Michel: carrito, persistencia e integración de compra simulada.

## Requisitos

- Node.js que cumpla los motores de las dependencias bloqueadas en `package-lock.json`.
  Para reproducir esta revisión, usar Node.js 24.19.0. `jsdom` bloqueado exige
  `^22.22.2 || ^24.15.0 || >=26.0.0`; Node.js 20 no basta para la suite completa.
- npm incluido con Node.js.

## Ejecución

```bash
npm ci
npm run dev
```

Vite mostrará la dirección local de la aplicación. Para comprobar el proyecto:

```bash
npm run lint
npm run test:run
npm run test:coverage
npm run build
npm run preview
```

## Rutas

| Ruta | Función |
| --- | --- |
| `/` | Inicio y contenido destacado. |
| `/productos` | Catálogo, búsqueda y filtro por categoría. |
| `/productos/:id` | Detalle de producto y agregado al carrito. |
| `/carrito` | Cantidades, subtotales, total y vaciado. |
| `/registro` | Registro ficticio con validaciones. |
| `/login` | Inicio de sesión simulado. |
| `/contacto` | Formulario de contacto simulado. |
| `/nosotros` | Información académica del proyecto. |
| `/blog` y `/blog/:id` | Artículos ficticios y sus detalles. |
| `/admin/productos` | CRUD local de productos ficticios. |
| `/admin/usuarios` | CRUD local de usuarios ficticios con validación y confirmación. |

Las direcciones inexistentes presentan una página de error comprensible.

## Arquitectura

- `src/pages`: pantallas asociadas a las rutas.
- `src/components`: piezas reutilizables de interfaz.
- `src/context`: estado compartido del carrito.
- `src/services`: reglas de negocio y persistencia local.
- `src/data`: contenido ficticio y catálogos iniciales.
- `src/utils`: validaciones y formato reutilizable.
- `src/**/*.test.*`: pruebas unitarias y de interacción con Vitest.
- `docs`: ERS, evidencia de pruebas y cobertura.

La persistencia usa `localStorage` con las claves `sonidoVivoProductos`,
`sonidoVivoCarrito` y `sonidoVivoUsuarios`. Productos y carrito aplican normalización al restaurar sus datos. Usuarios
recupera la semilla si falta la clave, el JSON no es válido o no contiene un
arreglo; no valida la estructura de cada registro al leer. Los datos son locales
a cada navegador y no se comparten entre equipos.

## Documentación de entrega

- [ERS V2](docs/ERS_V2.md)
- [Informe de pruebas y cobertura](docs/COBERTURA_PRUEBAS.md)
- [Pruebas de navegación y formularios](docs/pruebas-navegacion-formularios.md)
- [Pruebas de productos y catálogo](docs/pruebas-productos-catalogo.md)
- [Pruebas del carrito](docs/pruebas-carrito.md)

- [Verificación local y pendientes de entrega](docs/VERIFICACION_ENTREGA.md)

## Estado de la evidencia

La medición provisional del 18 de octubre de 2026 corresponde al commit de
aplicación `0baec31fa451d9e36a0e4524e3f43f00b2202e67`: 13 archivos y 65 pruebas
aprobadas, 78,85 % de sentencias, 70,95 % de ramas, 93,02 % de funciones y
80,09 % de líneas. La medición incluye la PR #32 de navegación y formularios. Instalación limpia,
lint, suite con cobertura y build fueron comprobados. El SHA definitivo de entrega
y la URL pública se registrarán durante la issue #16. La revisión local de cinco
pantallas a 360, 768 y 1280 px y las interacciones verificadas se documentan en
`docs/VERIFICACION_ENTREGA.md`, con capturas.

## Límites del sistema

Sonido Vivo es una simulación académica. No hay autenticación real, servidor,
base de datos, pasarela de pago, despacho ni tratamiento de datos personales.
Las credenciales, compras, mensajes, productos y usuarios son ficticios.

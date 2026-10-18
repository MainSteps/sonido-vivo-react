# Sonido Vivo React

Aplicación académica de comercio musical ficticio construida con React y Vite.
Permite recorrer un catálogo, consultar productos, usar un carrito persistente,
completar formularios simulados y administrar productos locales. No procesa pagos,
no utiliza datos personales reales y no se conecta a un backend.

## Equipo

- Diego: navegación, contenido institucional, formularios y usuarios.
- Matías: datos, catálogo, detalle y administración de productos.
- Michel: carrito, persistencia e integración de compra simulada.

## Requisitos

- Node.js compatible con Vite 8 (20.19+ o 22.12+).
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
| `/admin/usuarios` | Ruta reservada; el CRUD de usuarios se integra mediante la PR #30. |

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

La persistencia usa `localStorage` con las claves `sonidoVivoProductos` y
`sonidoVivoCarrito`. Los servicios normalizan la información y recuperan un estado
seguro si el almacenamiento está vacío, corrupto o no disponible.

## Documentación de entrega

- [ERS V2](docs/ERS_V2.md)
- [Informe de pruebas y cobertura](docs/COBERTURA_PRUEBAS.md)
- [Pruebas de navegación y formularios](docs/pruebas-navegacion-formularios.md)
- [Pruebas de productos y catálogo](docs/pruebas-productos-catalogo.md)
- [Pruebas del carrito](docs/pruebas-carrito.md)

## Estado de la evidencia

La medición provisional del 17 de octubre de 2026 corresponde al commit de
aplicación `aaea16287ffe60f9cba702c7d0cdbe9b47a9690e`: 10 archivos y 56 pruebas
aprobadas, 77,84 % de sentencias, 69,53 % de ramas, 91,91 % de funciones y
79,47 % de líneas. La medición final se repetirá después de integrar todas las PR
y el SHA definitivo se registrará durante la issue #16.

## Límites del sistema

Sonido Vivo es una simulación académica. No hay autenticación real, servidor,
base de datos, pasarela de pago, despacho ni tratamiento de datos personales.
Las credenciales, compras, mensajes, productos y usuarios son ficticios.

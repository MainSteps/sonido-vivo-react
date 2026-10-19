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
- [Verificación local y estado de entrega](docs/VERIFICACION_ENTREGA.md)
- [QA desde copia limpia y despliegue público](docs/qa-15/README.md)
- [Resumen de entrega final](docs/ENTREGA_FINAL.md)

## Estado de la evidencia

La candidata final de la issue #16 se verificó el 19 de octubre de 2026 sobre
la base `b45b2dd78e82559b2f3b0ee0c840cb16c70d4a57` y la corrección final de
navegación administrativa y fidelidad de contenido. La ejecución obtuvo 13
archivos y 66 pruebas aprobadas, 78,97 % de sentencias, 71,10 % de ramas,
93,14 % de funciones y 80,21 % de líneas. Instalación limpia, lint, suite,
cobertura, build y auditoría de dependencias fueron comprobados; `npm audit`
informó 0 vulnerabilidades.

La aplicación está publicada en [sonido-vivo-react.vercel.app](https://sonido-vivo-react.vercel.app).
La verificación pública de rutas, recargas e interacciones está documentada en
`docs/qa-15/README.md`. El SHA definitivo, la comprobación del redeploy y el
checksum del ZIP generado desde ese mismo SHA se registran en la issue #16
después de fusionar la corrección final. La revisión local de cinco pantallas a
360, 768 y 1280 px se documenta en
`docs/VERIFICACION_ENTREGA.md`, con capturas.

## Límites del sistema

Sonido Vivo es una simulación académica. No hay autenticación real, servidor,
base de datos, pasarela de pago, despacho ni tratamiento de datos personales.
Las credenciales, compras, mensajes, productos y usuarios son ficticios.

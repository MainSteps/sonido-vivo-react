# Entrega final de Sonido Vivo

Este documento registra la revisión de la versión candidata a entrega. El SHA definitivo, el enlace al ZIP y las aprobaciones de congelamiento se registran en la issue #16 después de integrar esta documentación.

## Comprobaciones técnicas

- Instalación limpia con `npm ci`: correcta, 229 paquetes y 0 vulnerabilidades.
- `npm run lint`: correcto.
- `npm run build`: correcto, 52 módulos transformados.
- `npm test`: 13 archivos y 65 pruebas aprobadas.
- `npm run test:coverage`: correcto.
  - Statements: 78,85 % (522/662).
  - Branches: 70,95 % (281/396).
  - Functions: 93,02 % (160/172).
  - Lines: 80,09 % (511/638).

## Revisión funcional

- Rutas públicas, catálogo, detalle, registro, contacto y acceso revisados.
- Mantenedores de productos y usuarios revisados con datos simulados.
- Carrito, cantidades, límites de stock, eliminación, vaciado y persistencia cubiertos por pruebas.
- Formularios y mensajes de validación cubiertos por pruebas.
- Navegación directa y recarga de rutas verificadas en la versión publicada.

## Revisión responsiva

Se revisaron las rutas `/`, `/productos`, `/registro`, `/contacto`, `/admin/productos`, `/admin/usuarios` y `/carrito` en 360, 768 y 1280 px. Ninguna presentó desbordamiento horizontal.

## Entregables

- Aplicación publicada: <https://sonido-vivo-react.vercel.app>
- ERS V2: `docs/ERS_V2.md`.
- Cobertura: `docs/COBERTURA_PRUEBAS.md`.
- Evidencia visual y de pruebas: `docs/evidencias/`.
- Instrucciones de instalación y ejecución: `README.md`.

El ZIP se genera con `git archive` desde el SHA definitivo de `main`. Se excluyen `.git`, `node_modules`, `dist`, `coverage`, archivos `.env`, secretos y archivos locales.

## Congelamiento

Después de fusionar esta documentación, solo se aceptan correcciones autorizadas y registradas por el equipo. Diego, Matías y Michel deben confirmar el congelamiento en la issue #16.

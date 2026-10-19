# Entrega final de Sonido Vivo

Este documento registra la revisión técnica de la candidata final. El SHA
definitivo, el checksum del ZIP, la comprobación del redeploy y las aprobaciones
de congelamiento se registran en la issue #16 después del merge para evitar que
los documentos versionados declaren como final un commit que todavía no existe.

## Comprobaciones técnicas

- Instalación limpia con `npm ci`: correcta, 228 paquetes instalados.
- `npm run lint`: correcto.
- `npm run build`: correcto, 53 módulos transformados.
- `npm run test:run`: 13 archivos y 66 pruebas aprobadas.
- `npm run test:coverage`: correcto.
  - Statements: 78,97 % (526/666).
  - Branches: 71,10 % (283/398).
  - Functions: 93,14 % (163/175).
  - Lines: 80,21 % (515/642).
- `npm audit`: 0 vulnerabilidades.

## Revisión funcional

- Rutas públicas, catálogo, detalle, registro, contacto y acceso revisados.
- Mantenedores de productos y usuarios revisados con datos simulados.
- Navegación visible entre Productos, Usuarios y la tienda pública.
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

## Correspondencia con la pauta

Los ocho indicadores disponen de evidencia identificable en la ERS y el informe
de cobertura. Los cuatro indicadores grupales se respaldan mediante la aplicación,
las pruebas, la cobertura y las capturas responsivas. Los cuatro indicadores
individuales requieren además que cada integrante explique y demuestre el código
durante la presentación.

## Congelamiento

Después de fusionar esta corrección, se repiten los controles sobre `main`, se
comprueba el despliegue y se genera el ZIP. Luego solo se aceptan correcciones
autorizadas y registradas por el equipo. Diego, Matías y Michel deben confirmar el
congelamiento en la issue #16.

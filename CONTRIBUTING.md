# Flujo de colaboración

## Principios

- GitHub Issues y GitHub Project mantienen el estado de las tareas.
- No se trabaja directamente en `main`.
- Cada rama corresponde a una issue.
- Cada pull request debe ser revisada por una persona distinta del autor.
- Se integra únicamente mediante squash merge.
- Los tres integrantes deben producir actividad real desde su propia cuenta y comprender el proyecto completo.

## Ramas

Formato:

- `feat/<issue>-descripcion`
- `fix/<issue>-descripcion`
- `test/<issue>-descripcion`
- `docs/<issue>-descripcion`
- `chore/<issue>-descripcion`

## Commits

Usar mensajes breves con tipo y acción, por ejemplo:

- `feat: filtrar productos por categoría`
- `fix: recuperar carrito con JSON inválido`
- `test: cubrir validación de registro`
- `docs: actualizar evidencia de cobertura`

Los commits deben representar cambios pequeños y comprobables. No se divide artificialmente una sola modificación para aumentar el número de commits.

## Pull requests

La PR debe:

1. relacionar y cerrar su issue;
2. resumir el cambio;
3. declarar su nivel de riesgo;
4. registrar comandos ejecutados y resultados reales;
5. indicar el uso de IA y confirmar comprensión;
6. resolver observaciones antes de fusionar;
7. solicitar revisión a una persona distinta del autor.

Cualquier integrante distinto del autor puede aprobar. El autor o la persona revisora puede fusionar cuando se cumplan las comprobaciones. Los cambios sensibles se detienen para coordinación: arquitectura compartida, configuración principal, dependencias, persistencia, seguridad, eliminación importante, conflictos difíciles, pruebas fallando, despliegue, permisos o requisitos de la pauta.

## Definición de terminado

Una tarea queda terminada cuando cumple sus criterios de aceptación, funciona en casos normales, contempla errores razonables, no rompe funcionalidades existentes, respeta la arquitectura, supera las comprobaciones correspondientes, tiene evidencia en commits y PR, puede ser explicada por su responsable, fue revisada y está fusionada o lista para integrarse.

## Entrega

Antes del congelamiento se ejecutan instalación limpia, lint, build, test y cobertura. La entrega, el ZIP, el despliegue y los documentos deben corresponder al mismo SHA de `main`.

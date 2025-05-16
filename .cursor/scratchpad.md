# Migración de CommonJS a ESM

## Background y Motivación
El proyecto actualmente tiene una mezcla de CommonJS y ESM. Aunque ya está configurado para usar ESM en el package.json (`"type": "module"`), hay algunos archivos que todavía usan CommonJS. La migración completa a ESM mejorará la consistencia del código y permitirá usar las características más modernas de JavaScript.

## Key Challenges y Analysis
1. Hardhat no es compatible con ESM en proyectos TypeScript
2. El archivo de configuración de Hardhat debe ser CommonJS (hardhat.config.cjs)
3. Los scripts y pruebas pueden ser ESM, pero la configuración debe ser CommonJS
4. El proyecto actual está usando TypeScript, lo que complica la migración a ESM

## High-level Task Breakdown
1. [x] Revertir los cambios de ESM en la configuración de Hardhat
2. [x] Mantener el archivo hardhat.config.cjs
3. [x] Actualizar los scripts para usar la extensión .mjs
4. [ ] Ajustar la configuración de TypeScript para manejar correctamente los módulos

## Project Status Board
- [x] Restaurar hardhat.config.cjs
- [x] Actualizar scripts para usar la extensión correcta
- [ ] Ajustar configuración de TypeScript
- [ ] Pruebas de funcionalidad

## Executor's Feedback o Assistance Requests
Se han realizado las siguientes acciones:
1. Se restauró el archivo hardhat.config.cjs
2. Se eliminó hardhat.config.ts
3. Se creó scripts/deploy.mjs con sintaxis ESM
4. Se eliminó scripts/deploy.ts

Próximos pasos:
1. Actualizar el script de despliegue en package.json para usar el nuevo archivo .mjs
2. Probar el despliegue con el nuevo script
3. Considerar si otros scripts necesitan ser migrados a .mjs

## Lessons
- Hardhat no es compatible con ESM en proyectos TypeScript
- El archivo de configuración de Hardhat debe ser CommonJS (hardhat.config.cjs)
- Los scripts pueden ser ESM usando la extensión .mjs
- La compatibilidad de TypeScript con ESM en Hardhat es limitada
- Es importante verificar la compatibilidad de las herramientas antes de migrar a ESM
- Podemos tener una mezcla de CommonJS y ESM en el proyecto, usando la extensión correcta para cada caso 
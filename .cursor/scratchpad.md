# Gestión de Descripciones de Figuras, Tablas y Ajustes del Estado del Arte

## Background and Motivation
El jurado ha solicitado:
1. Añadir párrafos descriptivos inmediatamente después de cada figura y tabla, mencionando su número (ej. "En la Figura~\ref{...} se muestra …").  
2. Eliminar la sección titulada *Bibliometrix* en el capítulo de estado del arte y, en su lugar, integrar los hallazgos a partir de las gráficas resultantes.  
3. Asegurar que las tablas presenten conclusiones claras y estén correctamente referenciadas en el texto.

## High-level Task Breakdown

1. Auditoría inicial de figuras y tablas (generar lista con `\label` y `\caption`).  
   • **Éxito**: Lista completa con marca ✔/✘ indicando si ya existe párrafo descriptivo.  
2. Enumerar las figuras para que el usuario provea descripción detallada donde sea necesario.  
   • **Éxito**: Usuario devuelve descripciones faltantes.  
3. Eliminar/renombrar la sección *Bibliometrix* en el capítulo de estado del arte.  
   • **Éxito**: Estructura del capítulo actualizada sin esa sección y sin referencias rotas.  
4. Redactar párrafos descriptivos definitivos tras cada figura y tabla, incorporando insumos del usuario.  
   • **Éxito**: Todos los floats tienen descripción narrativa adecuada.  
5. Revisar tablas y, si es necesario, ajustar títulos/celdas para que las conclusiones sean explícitas; añadir texto conclusivo en el cuerpo.  
   • **Éxito**: Cada tabla está comentada con una conclusión breve en el texto.  
6. Compilación y verificación final (sin referencias indefinidas ni warnings críticos).  

## Project Status Board
- [x] Tarea 1: Auditoría de figuras y tablas
- [ ] Tarea 2: Enumerar figuras para feedback del usuario (lista entregada, a la espera de insumos)
- [ ] Tarea 3: Eliminar sección *Bibliometrix*
- [ ] Tarea 4: Añadir descripciones definitivas
- [ ] Tarea 5: Revisar y concluir tablas
- [ ] Tarea 6: Compilación y verificación final

## Resultado de la Tarea 1: Auditoría de figuras y tablas

A continuación se muestra la lista completa de figuras y tablas detectadas.  Se indica si, tras el entorno `figure` o `table`, existe un párrafo narrativo que mencione explícitamente el número; de momento todos se marcan como ✘ a falta de verificación manual.

### Figuras
1. `fig:estadisticas_comparendos` – Estadísticas de comparendos emitidos en Bogotá (Figura 1) — ✘
2. `fig:mapa_bibliometrix` – Distribución global de la producción científica (Figura 2) — ✘
3. `fig:grafico_lineas` – Evolución temporal de la producción científica (Figura 3) — ✘
4. `fig:nube_palabras` – Nube de palabras de términos frecuentes (Figura 4) — ✘
5. `fig:mapa_tematico` – Mapa temático por centralidad y densidad (Figura 5) — ✘
6. `fig:casos_uso` – Diagrama de casos de uso (Figura 6) — ✘
7. `fig:diagrama_despliegue` – Diagrama de despliegue (Figura 7) — ✘
8. `fig:diagrama_clases` – Diagrama de clases (Figura 8) — ✘
9. `fig:diagrama_apelacion` – Diagrama de actividades (apelación) (Figura 9) — ✘
10. `fig:diagrama_creacion_multa` – Diagrama de actividades (creación de multa) (Figura 10) — ✘
11. `fig:diagrama_apelacion_2` – Diagrama de actividades (apelación, variante) (Figura 11) — ✘
12. `fig:login` – Pantalla de login (Figura 12) — ✘
13. `fig:recuperar_password` – Pantalla de recuperación de contraseña (Figura 13) — ✘
14. `fig:dashboard_agente` – Dashboard del agente (Figura 14) — ✘
15. `fig:consulta_estado_multa` – Pantalla de consulta de estado (Figura 15) — ✘
16. `fig:consulta_detalle_multa` – Pantalla de detalle de multa (Figura 16) — ✘
17. `fig:consulta_multas_propietario` – Pantalla de multas del propietario (Figura 17) — ✘
18. `fig:costos1` – Resumen de costos del proyecto (Figura 18) — ✘
19. `fig:costos2` – Estimación de costos de infraestructura (Figura 19) — ✘
20. `fig:costos3` – Estimación de costos de desarrollo (Figura 20) — ✘

### Tablas
1. `tab:comparacion_bd_blockchain` – Comparación BD vs. Blockchain (Tabla 1) — ✘
2. `tab:casos_prueba_funcionales` – Casos de prueba funcionales (Tabla 2) — ✘
3. `tab:casos_prueba_inmutabilidad` – Casos de prueba de inmutabilidad (Tabla 3) — ✘
4. `tab:resultados_inmutabilidad` – Resultados de inmutabilidad (Tabla 4) — ✘
5. `tab:resultados_funcionales` – Resultados de pruebas funcionales (Tabla 5) — ✘
6. `tab:resumen_inmutabilidad` – Resumen de inmutabilidad (Tabla 6) — ✘
7. `tab:rendimiento` – Tiempos promedio de operaciones (Tabla 7) — ✘

---

## Current Status / Progress Tracking
- ✅ Tarea 1 completada: Auditoría generada.
- ⏳ Tarea 2 en espera: El usuario debe revisar la lista y proporcionar una descripción breve para aquellas figuras/tablas que lo requieran.

## Executor's Feedback or Assistance Requests
*(Vacío por ahora)*

## Lessons
*(Vacío por ahora)*

## Cosas a recordar
- Mantener un tono conversacional y natural; evitar redacciones que suenen a IA.

### Ideas clave – Figuras 1-5
1. **Figura 1** (`fig:estadisticas_comparendos`): Resalta el peso de las fotomultas captadas por cámaras dentro del total de comparendos de Bogotá; subraya su relevancia en la regulación del tránsito.
2. **Figura 2** (`fig:mapa_bibliometrix`): Mapa bibliométrico que muestra la supremacía de Brasil y México en publicaciones sobre blockchain, infracciones y gobierno en LATAM; Colombia, España y Perú siguen en la lista.
3. **Figura 3** (`fig:grafico_lineas`): Tendencia ascendente de la literatura sobre blockchain en gestión gubernamental a lo largo de los años, indicando creciente interés académico.
4. **Figura 4** (`fig:nube_palabras`): Word cloud evidencia temas recurrentes como *challenges*, *blockchain*, *internet*, *management* y *secure*; deja ver que la conversación se centra en retos de seguridad y gestión de datos en entornos IoT-Blockchain.
5. **Figura 5** (`fig:mapa_tematico`): Mapa temático bibliométrico.  Distribuye los clusters en cuatro cuadrantes (temas motores, básicos, emergentes y nicho).  Destaca "challenges / framework / model" como tema motor de alta centralidad y densidad, mientras que "blockchain" y "internet of things" aparecen como temas básicos pero en fase de desarrollo.
6. **Figura 6** (`fig:casos_uso`): Diagrama de casos de uso del sistema; muestra a Administrador, Agente de tránsito y Propietario interactuando con funciones como autenticar usuario, gestionar multas, revisar apelaciones y ver estadísticas.

### Ideas clave – Figuras 7-11
7. **Figura 7** (`fig:diagrama_despliegue`): Arquitectura de despliegue propuesta.  Se usa un VPS/Cloud con Docker para orquestar tres contenedores: Nginx (proxy inverso), Frontend React y Backend Express.  El backend se conecta vía HTTPS/Ethers.js a la red Ethereum y vía API a IPFS y SIMIT.  Muestra de forma clara los límites entre cliente, servidor y nodos externos.
8. **Figura 8** (`fig:diagrama_clases`): Diagrama de clases del backend.  Muestra la entidad principal `FineDetails`, los servicios (`FineService`, `BlockchainService`, `IPFSService`, `AptitudeService`) y sus respectivos repositorios que siguen el patrón Controller–Service–Repository.  Ilustra cómo la aplicación Express (clase `App`) expone rutas (`FineRoutes`) que delegan en controladores (`FineController`); estos orquestan llamadas a servicios para registrar, actualizar y consultar multas, que a su vez interactúan con Blockchain, IPFS y la API de Aptitude.
9. **Figura 9** (`fig:diagrama_apelacion`): Diagrama de actividades (swimlanes) del proceso de apelación de una multa.  Flujos entre Propietario, Módulo de Apelación y Agente de Tránsito; se contemplan decisiones de apelación válida/inválida, registro en blockchain, notificaciones y actualización del dashboard.
10. **Figura 10** (`fig:diagrama_creacion_multa`): Diagrama de actividades de creación de multa desde la captura de infracción por cámara hasta la notificación al conductor.  Destaca la validación de la infracción, el registro del evento en blockchain y la consulta a servicios externos (SIMIT/RUNT).
11. **Figura 11** (`fig:diagrama_apelacion_2`): Variante del diagrama de apelación centrada en la vista del agente de tránsito; enfatiza la evaluación de la apelación y la reiteración del pago cuando procede.

## Revisión de consistencia (Planner – 30 jun 2025)

Tras revisar el código LaTeX se detectan los siguientes problemas:

1. **Capítulo 05 – Estado del Arte**
   • El archivo `chapters/figuras_estado_arte.tex` incluye 20 figuras, la mayoría reutilizadas de otros capítulos (diagramas de despliegue, clases, UI, costos, etc.).  
   • Esto genera duplicación de contenido y etiquetas (`\label{fig:diagrama_despliegue}`, `fig:casos_uso`, etc.), provocando advertencias por *labels* repetidos y confusión temática.  
   • Solo deberían mostrarse las gráficas de Bibliometrix: mapa mundial, gráfico de líneas y nube de palabras (Figuras 2, 3, 4).

2. **Etiquetas duplicadas**
   • Las figuras listadas arriba aparecen tanto en `chapters/07_diseno_prototipo.tex` como en `chapters/figuras_estado_arte.tex` utilizando el mismo `\label{}`.  Esto crea referencias múltiples que el compilador marca como duplicadas.  
   • Tablas no presentan duplicados (cada una está en `tables/` únicamente).  

3. **Capítulo 07 – Diseño del Prototipo**
   • Contiene las figuras correctas (diagramas, UI, etc.).  No deben tocarse, salvo asegurar que no se referencien desde el estado del arte.

4. **Sección *Bibliometrix* dentro de 05**  
   • Se necesita reinterpretar la información a partir de las gráficas; por ahora, basta con conservar los párrafos descriptivos y ubicar las tres figuras correspondientes.

### Propuesta de corrección

1. **Eliminar `chapters/figuras_estado_arte.tex`** y quitar su `\input{}` o `\include{}` del archivo principal.
2. **Insertar* solo* las tres figuras de Bibliometrix** directamente en `chapters/05_estado_arte.tex`, cada una con su descripción y sin duplicar etiquetas.  
3. **Actualizar referencias cruzadas** en el texto para que apunten a las nuevas figuras (probablemente `fig:mapa_bibliometrix`, `fig:grafico_lineas`, `fig:nube_palabras`).  
4. **Verificar que no queden `\ref{}` o `\autoref{}` apuntando a figuras eliminadas**.  
5. **Compilar y comprobar** que desaparecen las advertencias de etiquetas duplicadas.

### Nuevas tareas
- [x] **Tarea 3a**: Eliminado `\include{chapters/figuras_estado_arte}` en `main.tex`.
- [x] **Tarea 3b**: Insertadas las tres figuras Bibliometrix y sus descripciones en `05_estado_arte.tex`.
- [x] **Tarea 3c**: Archivo `chapters/figuras_estado_arte.tex` eliminado.
- [ ] **Tarea 3d**: Compilar y validar eliminación de duplicados (pendiente).

## Auditoría de figuras tras limpieza (jul 2025)
| Label | Contexto añadido | Nota |
|-------|------------------|------|
| fig:estadisticas_comparendos | ✔ | Idea incluida (Figura 1) |
| fig:mapa_bibliometrix | ✔ | Idea incluida (Figura 2) |
| fig:grafico_lineas | ✔ | Idea incluida (Figura 3) |
| fig:nube_palabras | ✔ | Idea incluida (Figura 4) |
| fig:casos_uso | ✔ | Idea incluida (Figura 6) |
| fig:diagrama_despliegue | ✔ | Idea incluida (Figura 7) |
| fig:diagrama_clases | ✔ | Idea incluida (Figura 8) |
| fig:diagrama_apelacion | ✔ | Idea incluida (Figura 9) |
| fig:diagrama_creacion_multa | ✔ | Idea incluida (Figura 10) |
| fig:diagrama_apelacion_2 | ✔ | Idea incluida (Figura 11) |
| fig:login | ⏳ | Contexto en redacción (T4c) |
| fig:recuperar_password | ✔ | Idea incluida |
| fig:dashboard_agente | ⏳ | Contexto en redacción (T4c) |
| fig:consulta_estado_multa | ⏳ | Contexto en redacción (T4c) |
| fig:consulta_detalle_multa | ⏳ | Contexto en redacción (T4c) |
| fig:consulta_multas_propietario | ⏳ | Contexto en redacción (T4c) |
| fig:costos1 | ⏳ | Contexto en redacción (T4c) |
| fig:costos2 | ⏳ | Contexto en redacción (T4c) |
| fig:costos3 | ⏳ | Contexto en redacción (T4c) |

Próximo paso: solicitar al usuario detalles para las figuras marcadas ✘ o redactar un párrafo preliminar si la imagen es clara (por ejemplo, las pantallas de la UI y las gráficas de costos).  

### Tareas para numeración automática y contexto UI
- [ ] **T4a**: Agregar `\usepackage{caption}` y configurar `\captionsetup[figure]{labelformat=default,labelsep=period,name=Figura}` en `main.tex`.
- [ ] ~~**T4b**: Eliminar numeración manual (bloques `\textbf{Figura X}`) de todos los archivos de capítulos.~~ (Rechazado: el profesor requiere mantener títulos y numeración estática encima de la figura).
- [x] **T4c**: Párrafos descriptivos añadidos para las figuras de interfaz y las gráficas de costos.
- [ ] **T4d**: Compilar y verificar numeración dinámica y funcionamiento de referencias.

## ANÁLISIS ARQUITECTÓNICO DEL BACKEND - PLANNER (Enero 2025)

### Contexto del Análisis
El usuario solicita un análisis completo del código backend del proyecto de fotomultas para identificar inconsistencias arquitectónicas, problemas y mejoras necesarias. El objetivo es crear un documento MD para pasar al equipo de desarrollo con recomendaciones específicas.

### Arquitectura Actual Identificada

#### **1. Stack Tecnológico**
- **Backend**: Node.js + TypeScript + Express.js
- **Blockchain**: Ethereum (Hardhat) + Ethers.js v6
- **Almacenamiento**: IPFS (ipfs-http-client)
- **Testing**: Vitest + Chai + Hardhat Testing
- **Documentación**: Swagger/OpenAPI
- **Build**: TypeScript Compiler + Hardhat

#### **2. Patrón Arquitectónico**
- **Patrón**: Controller-Service-Repository (CSR)
- **Patrón Singleton**: Implementado en todos los servicios
- **Separación de responsabilidades**: Bien definida entre capas

#### **3. Estructura de Capas**

```
src/
├── fine/
│   ├── controllers/     # Controladores REST
│   ├── services/        # Lógica de negocio
│   ├── repositories/    # Acceso a datos (Blockchain, IPFS)
│   ├── interfaces/     # Tipos TypeScript
│   ├── routes/         # Definición de rutas
│   └── utils/          # Utilidades
├── config/             # Configuraciones
├── middleware/         # Middleware Express
└── validations/        # Validaciones Joi
```

### PROBLEMAS ARQUITECTÓNICOS IDENTIFICADOS

#### **🔴 CRÍTICOS**

1. **Inconsistencia en el Modelo de Blockchain**
   - **Problema**: El contrato usa Ethereum público pero el documento habla de Hyperledger Fabric
   - **Impacto**: Confusión conceptual grave entre blockchain pública vs privada
   - **Evidencia**: 
     - Contrato en Solidity para Ethereum
     - Documento menciona Hyperledger Fabric como tecnología principal
     - Configuración Hardhat para redes Ethereum

2. **Arquitectura Híbrida No Documentada**
   - **Problema**: Sistema mezcla blockchain pública con IPFS local
   - **Impacto**: Inconsistencia en el modelo de descentralización
   - **Evidencia**:
     - IPFS local (nodo único)
     - Blockchain Ethereum (red distribuida)
     - APIs externas centralizadas (SIMIT)

3. **Gestión de Estado Inconsistente**
   - **Problema**: Estados de multas no siguen un flujo lógico
   - **Impacto**: Confusión en el proceso de negocio
   - **Evidencia**:
     ```solidity
     enum FineState { PENDING, PAID, APPEALED, RESOLVED_APPEAL, CANCELLED }
     ```
     - Falta estado "UNDER_REVIEW"
     - No hay validación de transiciones de estado

#### **🟡 IMPORTANTES**

4. **Patrón Singleton Problemático**
   - **Problema**: Todos los servicios usan Singleton sin justificación
   - **Impacto**: Dificulta testing y escalabilidad
   - **Evidencia**: `getInstance()` en todos los servicios

5. **Manejo de Errores Inconsistente**
   - **Problema**: Mezcla de try-catch y error handling
   - **Impacto**: Dificulta debugging y mantenimiento
   - **Evidencia**: Diferentes patrones en controllers vs services

6. **Validaciones Duplicadas**
   - **Problema**: Validaciones en múltiples capas
   - **Impacto**: Código redundante y mantenimiento complejo
   - **Evidencia**: Validaciones en routes, controllers y services

#### **🟢 MENORES**

7. **Configuración Hardcoded**
   - **Problema**: URLs y configuraciones en código
   - **Impacto**: Dificulta deployment en diferentes entornos

8. **Falta de Logging Estructurado**
   - **Problema**: Console.log disperso
   - **Impacto**: Dificulta monitoreo en producción

9. **Tests Incompletos**
   - **Problema**: Cobertura de tests limitada
   - **Impacto**: Riesgo de bugs en producción

### INCONSISTENCIAS CON EL DOCUMENTO

#### **1. Tecnología Blockchain**
- **Documento**: Hyperledger Fabric (blockchain privada)
- **Código**: Ethereum (blockchain pública)
- **Impacto**: Arquitectura completamente diferente

#### **2. Modelo de Confianza**
- **Documento**: Red privada con nodos autorizados
- **Código**: Red pública con operadores
- **Impacto**: Modelo de seguridad diferente

#### **3. Escalabilidad**
- **Documento**: Enfoque en eficiencia y costos
- **Código**: Gas fees de Ethereum (costos variables)

### RECOMENDACIONES ARQUITECTÓNICAS

#### **🎯 PRIORIDAD ALTA**

1. **Decidir Tecnología Blockchain**
   - **Opción A**: Migrar a Hyperledger Fabric (consistente con documento)
   - **Opción B**: Actualizar documento para reflejar Ethereum
   - **Recomendación**: Opción A para consistencia académica

2. **Rediseñar Arquitectura de Servicios**
   - Eliminar patrón Singleton innecesario
   - Implementar inyección de dependencias
   - Separar responsabilidades claramente

3. **Estandarizar Manejo de Errores**
   - Implementar error handling centralizado
   - Usar códigos de error consistentes
   - Logging estructurado

#### **🎯 PRIORIDAD MEDIA**

4. **Mejorar Validaciones**
   - Centralizar validaciones en middleware
   - Usar esquemas de validación consistentes
   - Eliminar duplicación

5. **Implementar Configuración Dinámica**
   - Usar variables de entorno para todas las configuraciones
   - Implementar configuración por ambiente
   - Documentar variables requeridas

#### **🎯 PRIORIDAD BAJA**

6. **Mejorar Testing**
   - Aumentar cobertura de tests
   - Implementar tests de integración
   - Tests de performance

7. **Documentación Técnica**
   - Documentar arquitectura actual
   - Crear diagramas de flujo
   - Documentar APIs

### PRÓXIMOS PASOS RECOMENDADOS

1. **Reunión de Alineación**: Decidir tecnología blockchain definitiva
2. **Refactoring Arquitectónico**: Implementar cambios de prioridad alta
3. **Testing Comprehensivo**: Validar funcionalidad después de cambios
4. **Documentación Actualizada**: Sincronizar código con documento

### PREGUNTAS PARA EL USUARIO

1. ¿Cuál es la tecnología blockchain definitiva para el proyecto?
2. ¿Se requiere mantener compatibilidad con el documento actual?
3. ¿Cuál es el timeline para implementar los cambios?
4. ¿Hay restricciones técnicas específicas del entorno de deployment?

## RESPUESTAS DEL USUARIO Y DOCUMENTO CREADO

### **Respuestas Recibidas:**
1. **Tecnología Blockchain**: Arquitectura híbrida (Hyperledger Fabric + Ethereum)
2. **Compatibilidad**: El documento debe mejorar y ajustar inconsistencias
3. **Timeline**: Sin restricciones de tiempo
4. **Restricciones**: No hay restricciones específicas

### **Documento Creado:**
✅ **ARQUITECTURA_HIBRIDA_RECOMENDACIONES.md** - Documento completo con:
- Arquitectura híbrida propuesta
- Modificaciones al documento académico
- Plan de migración detallado
- Mejoras específicas del código
- Testing comprehensivo
- Monitoreo y logging
- Seguridad y auditoría
- Escalabilidad y performance

### **Próximos Pasos Identificados:**

#### **FASE 1: ACTUALIZACIÓN DEL DOCUMENTO (Prioridad Alta)**
- [ ] **Capítulo 3 - Marco Teórico**: Añadir sección "Arquitecturas Híbridas Blockchain"
- [ ] **Capítulo 4 - Marco Conceptual**: Redefinir arquitectura como híbrida
- [ ] **Capítulo 7 - Diseño del Prototipo**: Actualizar diagramas de despliegue
- [ ] **Nuevas Secciones**: "Arquitectura Híbrida Blockchain" e "Interoperabilidad Blockchain"

#### **FASE 2: REFACTORING DEL CÓDIGO (Después del documento)**
- [ ] Implementar HyperledgerService
- [ ] Refactorizar EthereumService
- [ ] Crear SyncService
- [ ] Eliminar patrón Singleton
- [ ] Centralizar manejo de errores
- [ ] Implementar validaciones centralizadas

#### **FASE 3: TESTING Y VALIDACIÓN**
- [ ] Tests unitarios para nuevos servicios
- [ ] Tests de integración entre blockchains
- [ ] Tests de sincronización
- [ ] Validación de performance

### **Recomendaciones Arquitectónicas Implementadas:**

#### **🎯 ARQUITECTURA HÍBRIDA PROPUESTA**
- **Hyperledger Fabric**: Datos sensibles, operaciones internas, control de acceso
- **Ethereum**: Metadatos públicos, verificación de integridad, consultas ciudadanas
- **IPFS**: Almacenamiento distribuido de evidencias
- **APIs REST**: Comunicación entre servicios

#### **🔧 MEJORAS TÉCNICAS IDENTIFICADAS**
1. **Eliminación del patrón Singleton** → ServiceFactory
2. **Manejo de errores centralizado** → HybridErrorHandler
3. **Validaciones centralizadas** → hybridFineValidations
4. **Configuración dinámica** → hybridConfig
5. **Logging estructurado** → HybridLogger
6. **Métricas de performance** → HybridMetrics
7. **Auditoría de transacciones** → AuditService
8. **Control de acceso** → AccessControlMiddleware

### **Estado Actual: ✅ DOCUMENTO FINALIZADO**
- ✅ Análisis arquitectónico completado
- ✅ Documento de recomendaciones creado
- ✅ Diagramas actualizados por el usuario
- ✅ Capítulo 3 - Marco Teórico actualizado con arquitectura híbrida
- ✅ Capítulo 7 - Diseño del Prototipo actualizado con descripciones híbridas
- ✅ Capítulo 11 - Implementación del Prototipo CREADO
- ✅ Capítulo 12 - Discusión y Análisis CREADO
- ✅ Capítulo 13 - Conclusiones y Trabajo Futuro CREADO (mejorado)
- ✅ Capítulo 14 - Anexos CREADO (Código, Manuales, Glosario)
- ✅ main.tex actualizado con todos los capítulos
- ✅ Documento compilado exitosamente (154 páginas)
- ✅ RESUMEN_FINALIZACION_DOCUMENTO.md creado con plan actualizado  
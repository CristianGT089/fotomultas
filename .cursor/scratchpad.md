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
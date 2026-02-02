# Guión de sustentación — Cristian

> Tiempo estimado total: ~10 minutos
> Recuerda: no leas las slides, úsalas como apoyo visual. Habla con tus propias palabras.

---

## Slide 1 · Portada (~30s)

> Cristian abre la sustentación.

"Cordial saludo a el jurado evaluador, al director de proyecto y a mi compañera. Mi nombre es Cristian Stiven Guzmán Tovar, y junto con Laura Catalina Preciado Ballén, presentamos nuestro trabajo de grado titulado *Prototipo para apoyar el registro y trazabilidad de estados en el proceso de fotocomparendos aplicando tecnologías de redes distribuidas*, bajo la dirección del profesor Julio Barón Velandia."

---

## Slide 2 · Agenda (~30s)

> Cristian presenta la estructura.

"La presentación está organizada de la siguiente manera: primero Catalina les dará el contexto del problema y la formulación. Luego presentaremos los objetivos del proyecto. A continuación describiremos la metodología y la implementación. Después mostraremos los resultados de validación y pruebas. Finalmente, cerraremos con conclusiones, aportes y líneas de trabajo futuro."

---

## Slide 7 · Objetivo general (~40s)

> Cristian toma la palabra después de que Catalina termine la formulación del problema.

"Gracias, Catalina. Ahora voy a presentar los objetivos que nos planteamos para abordar este problema."

"Nuestro objetivo general fue desarrollar un prototipo de software que facilite el registro y la trazabilidad de los estados en el proceso de fotocomparendos en Bogotá, utilizando tecnologías de redes distribuidas. La idea central es fortalecer la integridad y autenticidad de la información, reduciendo los riesgos asociados a la confidencialidad de los datos."

---

## Slide 8 · Objetivos específicos (~50s)

"Para lograrlo, definimos tres objetivos específicos. Primero: **analizar** el proceso actual a partir del marco jurídico, regulatorio y los informes de auditoría de la Contraloría, para identificar las vulnerabilidades y definir los requisitos funcionales y no funcionales del sistema."

"Segundo: **desarrollar** el prototipo con una arquitectura híbrida que combina blockchain permisionado — Hyperledger Fabric — con blockchain público — Ethereum —, integrando almacenamiento distribuido mediante IPFS."

"Y tercero: **evaluar** la viabilidad técnica y funcional mediante un plan de pruebas que abarcó inmutabilidad, trazabilidad, rendimiento y verificación de integridad de documentos."

---

## Slide 12 · Actores y funcionalidades (~1 min)

> Cristian retoma después de que Catalina explique la arquitectura híbrida.

"Gracias, Catalina. Ahora voy a explicar cómo interactúan los diferentes actores con el sistema."

"Como pueden ver en el diagrama de casos de uso, identificamos tres actores principales. El **ciudadano**, que puede consultar su multa, verificar de manera independiente la autenticidad de la evidencia fotográfica y presentar una apelación si lo considera necesario. El **agente de tránsito**, cuyo rol en este contexto se centra en la gestión y actualización de estados del comparendo dentro del sistema. Y el **administrador**, encargado de la gestión técnica de la plataforma y la auditoría de operaciones."

"Lo importante aquí es que el ciudadano puede verificar por sí mismo que su multa no ha sido alterada, algo que hoy no es posible en el sistema FÉNIX."

---

## Slide 14 · Arquitectura del sistema (~1 min)

> Cristian retoma después del diagrama de actividades (Catalina).

"En este diagrama de despliegue pueden ver cómo se materializa la arquitectura. Tiene cinco capas: la primera es el **frontend en React**, con interfaces diferenciadas para ciudadano y agente. La segunda es la **API REST en Node.js con Express**, diseñada con arquitectura hexagonal para separar la lógica de negocio de la infraestructura. La tercera capa es **Hyperledger Fabric**, la red privada permisionada donde se almacenan los datos sensibles del comparendo, protegidos por controles de acceso PKI. La cuarta capa es **Ethereum** junto con **IPFS público**, donde se publican los hashes de verificación para que cualquier ciudadano pueda auditar la integridad sin necesidad de autenticarse. Y la quinta capa es el **IPFS privado**, donde se almacenan las evidencias fotográficas completas."

"Esta separación nos permite cumplir simultáneamente con la Ley 1581 de protección de datos personales y la Ley 1712 de transparencia."

---

## Slide 17 · Plan de pruebas (~1.5 min)

> Cristian retoma después de que Catalina presente el alcance y delimitaciones.

"Gracias, Catalina. Ahora vamos a mostrar los resultados de la validación técnica del prototipo."

"Diseñamos un plan de pruebas con **80 casos automatizados** utilizando Vitest en su versión 3.2.4. La tasa de éxito fue del 100% en todos los módulos, con un tiempo total de ejecución de 28.98 segundos."

"Como pueden ver en la tabla, las pruebas cubrieron seis módulos: manejo de errores, servicios de IPFS, integración de IPFS para verificar inmutabilidad y content-addressing, pruebas de seguridad que incluyeron XSS, SQL injection y path traversal, validación de archivos con límites de 10 megabytes, y las pruebas de la API REST que verificaron las operaciones CRUD y la integración con blockchain e IPFS."

"Es importante aclarar que estas pruebas constituyen una **verificación técnica** en entorno controlado, no una validación operativa a escala."

---

## Slide 18 · Pruebas de inmutabilidad (~1.5 min)

"Ahora, el resultado más relevante: las pruebas de inmutabilidad. Ejecutamos cuatro casos de prueba específicos."

"En el primero, **IM-001**, intentamos modificar directamente un registro en el ledger. La transacción fue rechazada automáticamente por el mecanismo de consenso — el sistema no permitió la alteración."

"En **IM-002**, alteramos una imagen almacenada en IPFS. Al modificar incluso un solo byte de la fotografía, el CID generado es completamente diferente, lo que permite la detección automática de la manipulación."

"En **IM-003** verificamos la trazabilidad: cada transición de estado genera un registro inmutable con timestamp criptográfico, estado anterior y posterior, razón del cambio y actor ejecutor. El historial completo se preservó intacto."

"Y en **IM-004** validamos que el consenso funcionara correctamente."

"Les comparto también la evidencia técnica: los hashes de las transacciones y el CID de IPFS que prueban que estas operaciones efectivamente ocurrieron en la blockchain."

"En síntesis: en el entorno experimental, el prototipo rechazó el 100% de los intentos de modificación no autorizada."

---

## Slide 22 · Respuesta a la pregunta de investigación (~1.5 min)

> Cristian retoma después de que Catalina presente las conclusiones principales.

"Gracias, Catalina. Entonces, ¿cuál es la respuesta a nuestra pregunta de investigación?"

"La respuesta es **afirmativa** dentro del alcance experimental definido. Las tecnologías de redes distribuidas sí permiten mitigar el riesgo de alteración de la integridad de los datos en el proceso de fotocomparendos."

"¿Qué evidencia obtuvimos? Logramos el registro y trazabilidad de cinco estados del ciclo de vida del comparendo — PENDING, PAID, APPEALED, RESOLVED_APPEAL y CANCELLED — con inmutabilidad criptográfica verificada. Se demostró la detección automática de alteraciones en documentos y evidencias mediante content-addressing. Y se propuso un modelo de confianza verificable donde el ciudadano puede auditar la información sin necesidad de intermediarios."

"Ahora, como lo explicó Catalina en las delimitaciones, este resultado se enmarca en una **verificación técnica** en laboratorio. Las oportunidades de extensión incluyen: el escalamiento a los volúmenes reales de 457,000 comparendos semestrales, la integración con SIMIT y RUNT, la incorporación de los tres estados restantes — GENERADA, NOTIFICADA y CERRADA —, y estudios de aceptación tecnológica con los usuarios finales."

---

## Slide 23 · Evidencia de cumplimiento (~1 min)

"Para cerrar esta sección, les presento la evidencia de cumplimiento de cada objetivo específico."

"El primer objetivo de **análisis** se cumplió mediante auditoría documental y normativa, donde identificamos las brechas del sistema FÉNIX y definimos los requisitos. El segundo objetivo de **desarrollo** se cumplió con la implementación iterativa del prototipo, logrando una arquitectura hexagonal con Fabric, Ethereum, IPFS dual y API REST funcional. Y el tercer objetivo de **evaluación** se cumplió ejecutando las 80 pruebas automatizadas, donde el 100% fue superado, los tiempos se mantuvieron por debajo de 3 segundos y obtuvimos coincidencia total de hashes."

"Los tres objetivos específicos se cumplieron dentro del alcance experimental definido."

---

## Slide 25 · Líneas de evolución (~1.5 min)

> Cristian cierra el contenido técnico antes de que Catalina haga los agradecimientos.

"Finalmente, las líneas de trabajo futuro que proponemos se organizan en cuatro áreas."

"La primera es **validación operativa**: realizar un piloto controlado con 5,000 a 10,000 multas reales, integrar SIMIT y RUNT con APIs reales, y realizar estudios de aceptación tecnológica con modelos como TAM o UTAUT para medir la percepción de los agentes de tránsito y ciudadanos."

"La segunda es **escalamiento a producción**: configurar una red Fabric multi-organizacional con la Secretaría de Movilidad, la Policía y la Contraloría como nodos validadores; evaluar la migración a soluciones Layer 2 como Polygon o Arbitrum para reducir costos; y ejecutar auditorías formales de seguridad con herramientas como Slither o MythX."

"La tercera es **extensión funcional**: implementar oráculos certificadores para el estado NOTIFICADA — cerrando la brecha entre el mundo digital y el físico —, módulos de pago integrados con PSE y billeteras digitales, y un sistema de apelaciones en línea automatizado."

"Y la cuarta es **replicabilidad**: adaptar la solución para otras ciudades colombianas, estandarizar los contratos inteligentes a nivel nacional, y explorar la federación de redes Fabric entre municipios."

"En perspectiva, los resultados obtenidos constituyen una base técnica sólida para futuras investigaciones orientadas a la validación operativa e institucional."

"Catalina, te cedo la palabra para el cierre."

---

## Tips para las preguntas

Prepárate para estas preguntas frecuentes:

1. **¿Por qué no usaron solo Ethereum?**
   → Porque expondría datos personales sensibles (viola Ley 1581/2012) y los costos de gas serían impredecibles para 457,000 comparendos. La arquitectura híbrida permite que Fabric maneje el 90% de operaciones internas sin costos de gas, y Ethereum solo publique hashes verificables.

2. **¿Por qué datos sintéticos y no reales?**
   → No tuvimos acceso a datos reales por restricciones de la Ley 1581 de protección de datos personales y políticas de reserva de información de la Secretaría de Movilidad. Los datos sintéticos permitieron verificar el comportamiento técnico del sistema.

3. **¿Qué pasaría a escala real?**
   → Hyperledger Fabric puede escalar a 2,000-20,000 TPS, que es suficiente para el volumen de Bogotá. Sin embargo, se necesita un piloto controlado para validar el rendimiento bajo condiciones reales, incluyendo latencia de red, concurrencia y variabilidad de datos.

4. **¿Por qué solo 5 de 8 estados?**
   → Los 5 estados implementados cubren el ciclo principal del comparendo. GENERADA y NOTIFICADA requieren oráculos certificadores (integración con cámaras y servicios de correo), y CERRADA es un estado administrativo final. Se priorizaron los estados donde la integridad es más crítica.

5. **¿Cuál es la diferencia entre verificación y validación?**
   → Verificación: el sistema fue construido correctamente según las especificaciones (lo que hicimos). Validación: el sistema funciona adecuadamente bajo condiciones reales de operación (lo que queda como trabajo futuro).

6. **¿Qué pasa si el SyncService falla?**
   → En el prototipo es un punto único de fallo. La multa existiría en Fabric pero no sería verificable públicamente en Ethereum. La ventana de inconsistencia es de ~5 segundos. Para producción, se propone re-arquitecturarlo como servicio distribuido con patrón circuit breaker y colas redundantes.

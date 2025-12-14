# Presentación Beamer - Defensa de Trabajo de Grado

## Información General

**Título:** Prototipo para apoyar el registro y trazabilidad de estados en el proceso de fotocomparendos aplicando tecnologías de redes distribuidas

**Autores:**
- Laura Catalina Preciado Ballén
- Cristian Stiven Guzmán Tovar

**Director:** Julio Barón Velandia

**Institución:** Universidad Distrital Francisco José de Caldas

**Fecha:** Julio 2025

## Estructura de la Presentación

La presentación consta de **23 slides principales** organizados en 5 secciones:

### 1. Introducción y Contexto (Slides 1-5)
- Portada
- Agenda
- Magnitud del problema (1.9M comparendos)
- Crisis de confianza (34.1% impugnación)
- Formulación del problema

### 2. Justificación y Objetivos (Slides 6-9)
- Objetivos del proyecto
- Estado del arte comparativo
- Evidencia bibliométrica
- Justificación tecnológica (¿Por qué blockchain?)

### 3. Metodología y Diseño (Slides 10-15)
- Metodología de investigación (desarrollo por prototipos)
- Selección tecnológica (arquitectura híbrida)
- Diagrama de arquitectura de despliegue
- Diseño orientado a objetos (UML)
- Diagrama de casos de uso
- Flujos de proceso críticos

### 4. Resultados y Validación (Slides 16-20)
- Plan de pruebas (80 casos, 100% éxito)
- Pruebas de inmutabilidad
- Métricas de desempeño
- Cumplimiento de objetivos
- Interfaces desarrolladas

### 5. Conclusiones y Cierre (Slides 21-23)
- Conclusiones principales
- Trabajo futuro
- Agradecimientos y preguntas

## Características Técnicas

- **Tema:** Metropolis (moderno, limpio)
- **Formato:** 16:9 (widescreen)
- **Colores:** Azul institucional Universidad Distrital
- **Total de páginas:** 33 (incluyendo slides de sección)
- **Duración estimada:** 20-30 minutos

## Archivos Incluidos

```
presentacion/
├── main_presentacion.tex       # Archivo principal
├── main_presentacion.pdf       # PDF compilado
├── slides/
│   ├── 01_introduccion.tex    # Slides 3-5
│   ├── 02_justificacion.tex   # Slides 6-9
│   ├── 03_metodologia.tex     # Slides 10-15
│   ├── 04_resultados.tex      # Slides 16-20
│   └── 05_conclusiones.tex    # Slides 21-23
├── images/                     # Symlink a ../Images/
├── tables/                     # Symlink a ../tables/
└── README.md                   # Este archivo
```

## Compilación

### Requisitos

- LaTeX (TeX Live 2022 o superior)
- Paquete Beamer
- Tema Metropolis
- Paquetes adicionales: graphicx, booktabs, longtable, tikz, hyperref

### Instrucciones de Compilación

#### Método 1: Compilación simple
```bash
cd /home/cristian-guzman/Proyectos/trabajo-grado/fotomultas/presentacion
pdflatex main_presentacion.tex
pdflatex main_presentacion.tex  # Segunda vez para referencias
```

#### Método 2: Compilación completa
```bash
pdflatex -interaction=nonstopmode main_presentacion.tex
pdflatex -interaction=nonstopmode main_presentacion.tex
```

#### Método 3: Con make (opcional)
```bash
make presentacion  # Si tienes un Makefile configurado
```

### Solución de Problemas

**Problema:** El tema Metropolis no se encuentra

**Solución:** Instala el paquete beamertheme-metropolis
```bash
sudo apt-get install texlive-latex-extra
```

**Problema:** Faltan imágenes

**Solución:** Verifica que los symlinks existan
```bash
ls -la images/ tables/
# Si no existen, créalos:
ln -sf ../Images images
ln -sf ../tables tables
```

**Problema:** Advertencias sobre fuentes Fira

**Solución:** Compila con LuaLaTeX o XeLaTeX para usar las fuentes Fira (opcional)
```bash
lualatex main_presentacion.tex
```

**Problema:** Los slides se cortan (contenido sobrepasa la página)

**Solución:** Se han aplicado las siguientes correcciones:
- Opción `[shrink=X]` en todos los frames que tienen mucho contenido
- El parámetro indica el porcentaje de reducción (5-15% según el contenido)
- Reducción de espaciado vertical (`\vspace`)
- Uso de fuentes más pequeñas (`\footnotesize`, `\small`, `\scriptsize`) donde es necesario
- Reducción del tamaño de imágenes en slides con mucho contenido

Si aún ves slides cortados, puedes:
1. Aumentar el valor de `shrink` (ej: cambiar `[shrink=5]` a `[shrink=10]`)
2. Dividir el contenido en dos slides usando `[allowframebreaks]`
3. Reducir manualmente el contenido del slide

## Personalización

### Cambiar Colores
Edita la sección de configuración de colores en `main_presentacion.tex`:
```latex
\definecolor{udblue}{RGB}{0,51,102}
\definecolor{udlightblue}{RGB}{51,102,153}
```

### Agregar Notas del Presentador
Usa el comando `\note{}` dentro de cualquier frame:
```latex
\begin{frame}{Título}
    Contenido del slide
    \note{Estas son notas que solo verás tú}
\end{frame}
```

### Modificar Contenido
Edita los archivos en la carpeta `slides/`:
- `01_introduccion.tex` - Introducción
- `02_justificacion.tex` - Justificación
- `03_metodologia.tex` - Metodología
- `04_resultados.tex` - Resultados
- `05_conclusiones.tex` - Conclusiones

## Timing Recomendado

- **Introducción:** 4-5 min (slides 3-5)
- **Justificación:** 5-6 min (slides 6-9)
- **Metodología:** 7-9 min (slides 10-15)
- **Resultados:** 5-6 min (slides 16-20)
- **Conclusiones:** 2-3 min (slides 21-23)
- **TOTAL:** 23-29 minutos

## Consejos de Presentación

1. **Practica el timing** - Ensaya múltiples veces para mantener el ritmo
2. **Conoce los diagramas** - Familiarízate con cada diagrama UML
3. **Prepara respuestas** - Anticipa preguntas sobre arquitectura híbrida
4. **Enfatiza resultados** - 80 pruebas al 100% es tu punto más fuerte
5. **Maneja las transiciones** - Usa las secciones para respirar y reorganizar ideas

## Figuras y Tablas Utilizadas

### Figuras (12 imágenes)
- Escudo_UD.png (portada)
- numComparendos.png (magnitud problema)
- MapaBibliometrix.png (bibliometría)
- GraficoLineas.png (evolución)
- MapaTematico.jpeg (mapa temático)
- Despliegue.png (arquitectura)
- uml.png (diseño OOP)
- CasosUso.png (casos de uso)
- ActMulta.png (flujo multa)
- ActApelacion.png (flujo apelación)
- UI3.png (dashboard agente)
- UI5.png (consulta ciudadano)

### Tablas (6 tablas principales)
- Comparación BD vs Blockchain
- Estado del arte comparativo
- Comparación plataformas blockchain
- Resultados backend
- Cumplimiento objetivos
- Comparación FÉNIX vs Prototipo

## Contacto

Para preguntas o modificaciones, contactar a:
- Laura Catalina Preciado Ballén
- Cristian Stiven Guzmán Tovar

## Licencia

Este material es parte del trabajo de grado de la Universidad Distrital Francisco José de Caldas, 2025.

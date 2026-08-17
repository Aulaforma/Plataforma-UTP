# 🏫 Plataforma UTP - Plataforma Web de Gestión Técnico Pedagógica & Cargas Horarias 2027

[![Versión](https://img.shields.io/badge/Versi%C3%B3n-v5.3%202027-blue.svg)](https://github.com/Aulaforma/Plataforma-UTP)
[![Normativa](https://img.shields.io/badge/Normativa-Ley%2020.903%20%7C%20Ley%2021.625-emerald.svg)](INSTRUCCIONES.md)
[![Estado](https://img.shields.io/badge/Estado-Producci%C3%B3n-success.svg)](https://github.com/Aulaforma/Plataforma-UTP)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-purple.svg)](LICENSE)

**Plataforma UTP** es una solución web modular e integrada diseñada especialmente para **Equipos Directivos, Jefes UTP y Sostenedores de Establecimientos Educacionales en Chile**. Permite automatizar la distribución de cargas horarias docentes bajo el marco legal de la **Carrera Docente (Ley 20.903)** y la **Ley 21.625**, generar horarios escolares mediante un algoritmo de satisfacción de restricciones (CSP), realizar acompañamiento en aula con pautas de cotejo digitalizadas, grabar reuniones de agenda institucional y monitorear a estudiantes en riesgo de repitencia.

---

## 🌟 Módulos Principales de la Plataforma

### ⏱️ Módulo 1: Gestión de Tiempos y Horarios
* **Calculadora & Simulación de Cargas Horarias (SimoHora v5.3)**:
  * **Proporción Estándar (Ley 20.903)**: 65% Horas Lectivas / 35% Horas No Lectivas.
  * **Proporción Prioritaria (Ley 21.625 - 1° a 4° Básico con >80% SEP)**: 60% Horas Lectivas / 40% Horas No Lectivas.
  * **Regla 50/50 No Lectiva**: División del 50% inamovible (Preparación de Clases y Evaluación) y 50% (Gestión Directiva, Consejos y GPT).
  * **Barra de Progreso Apilada Visual**: Muestra por docente la ocupación del contrato y su cumplimiento legal.
* **Generador Maestro de Horarios 2027 (Algoritmo CSP)**:
  * **Matriz de Bloques 2027**: 5 Bloques diarios de 90 min con recreos de 20m/15m/10m y almuerzo de 45m.
  * **Cuadratura por Nivel**:
    * **Enseñanza Básica**: Límite de 19 bloques semanales. Salida a las 15:50 hrs. Bloque 5 prohibido.
    * **Enseñanza Media**: Límite de 21 bloques semanales. Bloque 5 habilitado solo Lunes y Martes (17:30 hrs).
  * **Salida Unificada de Viernes**: Término de jornada a las 13:35 hrs (Bloque 3) para todos los niveles.
  * **Priorización Troncal**: Agrupación automática de Lenguaje y Matemática en los Bloques 1 y 2 (08:30 - 11:50 hrs).
  * **Exportación**: Copiado de tablas en formato Markdown e impresión formateada.

---

### 📋 Módulo 2: Acompañamiento y Monitoreo Docente
* **Visitas al Aula & Escala de Cotejo Digitalizada**:
  * Pauta de observación configurable (Inicio, Desarrollo, Término/Cierre).
  * Evaluador **Sí / No** con observaciones específicas por indicador y agregador dinámico de indicadores.
  * Secciones de Observaciones Generales, Metodologías Observadas y Retroalimentación con firmas digitales.
* **Monitoreo de Planificaciones**:
  - Tabla de control con semáforos de estado (🔴 Retrasado, 🟡 En revisión, 🟢 Aprobado).
* **Registro de Entrevistas**:
  - Formulario estructurado para entrevistas a docentes y apoderados con opción de guardado e impresión PDF.

---

### 🎙️ Módulo 3: Agenda Institucional y Calendario
* **Calendario de Hitos UTP**: Gestión de reuniones, consejos técnicos y evaluaciones.
* **Grabación de Audio Nativa (`MediaRecorder API`)**:
  - Grabación de retroalimentaciones y actas directamente con el micrófono del navegador.
  - Reproductor integrado adjunto al hito en el calendario.

---

### 📚 Módulo 4: Centro de Documentación y Control de Estudiantes
* **Biblioteca Normativa (Sistema de Pestañas/Tabs)**:
  - Clasificación en "Normativa Vigente" y "Documentos Internos".
  - Buscador en tiempo real y visor modal seguro de archivos.
* **Control de Estudiantes en Riesgo de Repitencia (Decreto 67)**:
  - Dashboard analítico con alertas para alumnos con promedio < 4.0 o asistencia < 85%.
* **Apoyo Domiciliario u Hospitalario**:
  - Ficha de seguimiento, profesor tutor asignado y Bitácora de Atenciones editables.

---

### 👑 Módulo Administrador & Auditoría de Accesos
* **Métricas Globales de Red**: Usuarios registrados, ingresos del día y establecimientos conectados.
* **Registro de Auditoría de Accesos**: Historial de seguridad de ingresos.
* **Gestión de Cuentas**: Suspensión/Activación de colegios, reseteo de claves y exportación de base de datos a CSV.

---

## 🚀 Inicio Rápido (Instalación & Uso)

No requiere instalación de servidores ni entornos Node.js. La plataforma funciona 100% en el navegador cliente mediante HTML5, CSS3 moderno y JS ES6+.

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Aulaforma/Plataforma-UTP.git
   ```
2. **Abrir la aplicación**:
   Abra directamente en cualquier navegador web el archivo `index.html`.

---

## 🏛️ Marco Legal de Referencia (Chile)
* **Ley N° 20.903**: Crea el Sistema de Desarrollo Profesional Docente y fija las proporciones de horas lectivas (65%) y no lectivas (35%).
* **Ley N° 21.625**: Establece normas sobre continuidad de la función docente y ajusta la proporción a 60/40 en 1° a 4° año de Educación Básica en colegios con >80% de alumnos prioritarios (SEP).
* **Decreto N° 67/2018**: Aprueba normas sobre evaluación, calificación y promoción escolar.

---

## 📁 Estructura del Proyecto

```text
Plataforma-UTP/
├── index.html                  # Layout principal y enrutador de vistas
├── INSTRUCCIONES.md            # Manual normativo y guía de uso
├── README.md                   # Documentación oficial del repositorio
├── css/
│   └── styles.css              # Sistema de diseño CSS institucional
└── js/
    ├── app.js                  # Controlador general y perfiles
    ├── dataStore.js            # Capa de almacenamiento y Solver 2027
    └── modules/
        ├── modulo1_horarios.js # Cargas Horarias SimoHora y Generador 2027
        ├── modulo2_monitoreo.js# Visitas al aula, Pauta de Cotejo y Entrevistas
        ├── modulo3_agenda.js   # Agenda e integración MediaRecorder Audio
        ├── modulo4_documentos_estudiantes.js # Biblioteca y Riesgo de Repitencia
        └── modulo_admin.js     # Panel Máster Administrador y Auditoría
```

---

## ✉️ Contacto y Soporte
Desarrollado para la gestión pedagógica de establecimientos educacionales de Chile. Para dudas sobre la implementación normativa o personalizaciones, contacte al equipo de **Aulaforma / Coordinación UTP**.

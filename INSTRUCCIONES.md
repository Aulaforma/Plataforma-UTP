# Manual de Instrucciones y Guía de Uso - SimoHora v5.3
## Planificador y Simulador de Cargas Horarias Docentes (Ley 20.903 / Ley 21.625)

---

## 1. Introducción y Propósito

**SimoHora v5.3** es una herramienta web integral desarrollada especialmente para **Equipos Directivos, Jefes UTP y Sostenedores de Establecimientos Educacionales en Chile**. 

Su principal objetivo es optimizar y validar la distribución de cargas horarias docentes, garantizando el cumplimiento estricto de las proporciones legales de **Horas Lectivas** y **Horas No Lectivas** establecidas por la **Ley 20.903 (Carrera Docente)** y las modificaciones introducidas por la **Ley 21.625**.

---

## 2. Marco Legal y Normativo

La aplicación realiza automáticamente el cálculo de capacidades y límites legales basándose en la normativa chilena vigente:

### 2.1. Proporción de Carga Lectiva / No Lectiva
* **Proporción General (Ley 20.903):** 
  * **65% Horas Lectivas** (Máximo asignable en aula/clases).
  * **35% Horas No Lectivas** (Presupuesto obligatorio para preparación, evaluación y gestión directiva).
* **Proporción Prioritaria (Ley 21.625 - 1° a 4° Año de Educación Básica):**
  * Para establecimientos con **más del 80% de alumnos prioritarios (SEP)**, se aplica una proporción de **60% Horas Lectivas** y **40% Horas No Lectivas** en los cursos de 1° a 4° básico.

### 2.2. Distribución Obligatoria de las Horas No Lectivas (50/50)
De la totalidad de Horas No Lectivas asignadas al docente:
* **50% Inamovible:** Destinado exclusivamente a la preparación de clases y evaluación de aprendizajes.
* **50% Actividades de Dirección:** Destinado a Consejos de Profesores, atención a apoderados, trabajo colaborativo (GPT), labor UTP o actividades asignadas por la Dirección.

### 2.3. Conversión de Tiempos
* **Hora Cronológica:** 60 minutos.
* **Hora Pedagógica:** 45 minutos ($0.75$ horas cronológicas).
* **Recreos Proporcionales:** Se calculan a partir de la carga lectiva efectiva del docente.

---

## 3. Guía Paso a Paso de Uso

El sistema está organizado en **3 módulos principales** accesibles desde la barra superior de navegación y el menú lateral.

---

### Módulo 1: Simulación & Planificador Docente

Este módulo permite simular de forma individual la carga horaria de un profesor antes o durante la confección de los horarios.

#### Pasos para registrar un docente:
1. **Ingresar Datos Básicos:**
   * **Nombre del Docente:** Nombre o identificación del profesor/a.
   * **Contrato (hrs 60m):** Total de horas cronológicas contratadas semanalmente (máximo 44 hrs).
   * **Días de Presencia:** Seleccione la cantidad de días a la semana que el docente debe asistir al establecimiento.

2. **Asignación de Cursos y Horas (Hasta 16 espacios):**
   * Complete el nombre del **Curso**, **Asignatura**, seleccione el **Tipo de Carga** (1° Ciclo Ped/PIE o 2° Ciclo Ped/PIE) e ingrese la cantidad de **Horas Pedagógicas** impartidas.
   * El sistema convertirá automáticamente las horas pedagógicas a horas cronológicas equivalentes.

3. **Horas Administrativas / Fijadas en Contrato (Si aplica):**
   * Ingrese el nombre y la duración (horas/minutos) de funciones fijas en el contrato (ej. Inspectoría, Coordinación PIE, Encargado de Enlaces). 
   * *Nota:* Estas horas se descuentan del contrato total para calcular la capacidad efectiva de aula.

4. **Asignación de Actividades Directivas (Horas No Lectivas):**
   * Configure los tiempos asignados a:
     * Consejo de Profesores (ej. 2 horas pedagógicas o 1.5 horas cronológicas).
     * Atención a Apoderados.
     * Trabajo Colaborativo / GPT.
     * Gestión Técnica / UTP.
     * Otras actividades personalizadas.

5. **Análisis de Resultados en Tiempo Real:**
   * **Indicador / Semáforo de Cumplimiento:**
     * 🟢 **Verde (Cumple):** La carga asignada cumple con todos los límites legales y contractuales.
     * 🟡 **Amarillo (Al Límite / Tolerancia):** La carga lectiva o no lectiva está al límite de la capacidad o presenta pequeñas variaciones de redondeo.
     * 🔴 **Rojo (Infracción):** La carga lectiva excede el tope legal (65% o 60%), o las actividades no lectivas superan las horas disponibles en el contrato.
   * **Gráfico de Carga Apilada (Stacked Chart):** Visualización interactiva que muestra el porcentaje de contrato ocupado por Clases, Planificación, Recreos, Actividades Directivas y Horas Sobrantes/Sin Asignar.

6. **Guardar Docente:**
   * Haga clic en **"Guardar Docente"** para registrar los datos en la planta general.

---

### Módulo 2: Horario del Establecimiento

Permite definir los parámetros del horario escolar y verificar la permanencia requerida.

#### Configuración de la Jornada Escolar:
1. Ingrese la hora de **Entrada** y **Salida** para cada día de la semana (Lunes a Viernes).
2. Especifique los minutos asignados a la **Colación / Almuerzo**.
3. El sistema calculará el **Total de Permanencia Semanal Exigida** en el establecimiento.
4. Active la casilla **">80% SEP (Vulnerabilidad Elevada)"** en la barra superior si el colegio aplica la regla prioritaria del 60/40 para 1° Ciclo Básico bajo la Ley 21.625.

---

### Módulo 3: Planta Docente & Consolidado

Consolida la información de todos los profesores ingresados en el establecimiento.

#### Funcionalidades:
* **Tabla General de Profesores:** Muestra de forma unificada el contrato, distribución de horas lectivas, no lectivas, recreos y el estado de cumplimiento legal de cada docente.
* **Filtros y Búsqueda:**
  * Filtrar por estado: *Todos*, *Solo Cumplen (Verde)* o *Con Infracción (Rojo)*.
  * Buscador rápido por nombre del docente.
* **Edición y Eliminación:** Permite modificar o eliminar docentes registrados.
* **Exportación a Excel / CSV:** 
  * Haga clic en el botón **"Exportar a CSV"** para descargar un archivo `.csv` con la información completa de la planta docente, listo para abrir en Microsoft Excel o Google Sheets.

---

### Módulo 4: Página Maestra / Monitoreo Admin (Exclusivo)

* Módulo protegido por autenticación destinado exclusivamente a usuarios administradores (`admin@simohora.cl`).
* Ofrece métricas globales del sistema, estado de servidores y supervisión general.

---

## 4. Funciones Adicionales y Atajos

* **Cambio de Tema (Claro / Oscuro):** Haga clic en el ícono de Sol/Luna en la esquina superior derecha para alternar la apariencia del sistema.
* **Restablecer Sistema:** El botón con el ícono de recarga 🔄 elimina los datos simulados y reinicia la aplicación a sus valores de fábrica.
* **Impresión de Reportes:** Utilice el comando del navegador `Ctrl + P` (o `Cmd + P` en Mac). El sistema formateará automáticamente la pantalla eliminando la navegación para generar un reporte limpio en formato impreso o PDF.

---

## 5. Almacenamiento de Datos

SimoHora trabaja utilizando el almacenamiento local del navegador (**LocalStorage**). Esto garantiza que:
1. Sus datos se mantengan **100% privados** en su dispositivo.
2. No se requiere conexión constante a servidores externos para almacenar los borradores.
3. Al volver a abrir la aplicación en el mismo navegador, sus docentes y horarios se cargarán automáticamente.

---

## 6. Soporte y Consultas

Para sugerencias o dudas normativas sobre la aplicación de las leyes 20.903 y 21.625 en el sistema SimoHora, contacte al equipo de Coordinación UTP del establecimiento.

---
*SimoHora v5.3 — Diseñado para UTP y Equipos Directivos de Chile.*

/* ==========================================================================
   DATASTORE - ALMACENAMIENTO, SEMILLA Y ADAPTADOR DE DATOS UTP (V2 2027)
   ========================================================================== */

const STORAGE_KEYS = {
    TEACHERS: 'utp_teachers_v1',
    COURSES: 'utp_courses_v1',
    SUBJECTS: 'utp_subjects_v1',
    TIMETABLE: 'utp_timetable_v1',
    OBSERVATIONS: 'utp_observations_v1',
    PLANNINGS: 'utp_plannings_v1',
    INTERVIEWS: 'utp_interviews_v1',
    AGENDA_EVENTS: 'utp_agenda_events_v1',
    DOCUMENTS: 'utp_documents_v1',
    STUDENTS_RISK: 'utp_students_risk_v1',
    STUDENTS_DOMICILIARY: 'utp_students_domiciliary_v1',
    ACTIVE_PROFILE: 'utp_active_profile_v1',
    // Nuevas Llaves Generador 2027 y Auditoría
    CURSOS_2027: 'utp_cursos_2027_v1',
    DOCENTES_2027: 'utp_docentes_2027_v1',
    ACCESS_LOGS: 'utp_access_logs_v1',
    USERS_LIST: 'utp_users_list_v1'
};

// Matriz Oficial de Bloques y Horarios 2027
const BLOQUES_HORARIO_2027 = [
    { id: 1, nombre: "Bloque 1", hora: "08:30 - 10:00", esClase: true },
    { id: "r1", nombre: "Recreo 1", hora: "10:00 - 10:20", esClase: false, duracion: "20 min" },
    { id: 2, nombre: "Bloque 2", hora: "10:20 - 11:50", esClase: true },
    { id: "r2", nombre: "Recreo 2", hora: "11:50 - 12:05", esClase: false, duracion: "15 min" },
    { id: 3, nombre: "Bloque 3", hora: "12:05 - 13:35", esClase: true },
    { id: "alm", nombre: "Almuerzo", hora: "13:35 - 14:20", esClase: false, duracion: "45 min" },
    { id: 4, nombre: "Bloque 4", hora: "14:20 - 15:50", esClase: true },
    { id: "r_em", nombre: "Recreo E.M.", hora: "15:50 - 16:00", esClase: false, duracion: "10 min" },
    { id: 5, nombre: "Bloque 5", hora: "16:00 - 17:30", esClase: true }
];

const DIAS_SEMANA_2027 = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

// Datos Semilla Iniciales
const SEED_DATA = {
    activeProfile: {
        role: 'UTP',
        name: 'Prof. Claudia Morales',
        email: 'utp@colegiohorizonte.cl',
        avatar: 'CM'
    },
    teachers: [
        {
            id: 'T01',
            name: 'María José Fernández',
            contractHours: 44,
            daysPresence: 5,
            isVulnerableSEP: true,
            assignedCourse: '1°A Básico',
            subject: 'Lenguaje y Comunicación',
            responsibilities: [
                { type: 'Recreo', title: 'Turno de Patio Primer Recreo', hours: 1.5 },
                { type: 'Coordinación', title: 'Coordinación PIE', hours: 2.0 }
            ]
        },
        {
            id: 'T02',
            name: 'Carlos Mendoza Rios',
            contractHours: 38,
            daysPresence: 5,
            isVulnerableSEP: false,
            assignedCourse: '5°B Básico',
            subject: 'Matemática',
            responsibilities: [
                { type: 'GPT', title: 'Trabajo Colaborativo Docente', hours: 2.0 }
            ]
        },
        {
            id: 'T03',
            name: 'Ana María Silva',
            contractHours: 30,
            daysPresence: 4,
            isVulnerableSEP: true,
            assignedCourse: '2°A Básico',
            subject: 'Ciencias Naturales',
            responsibilities: []
        },
        {
            id: 'T04',
            name: 'Roberto Gomez Prado',
            contractHours: 44,
            daysPresence: 5,
            isVulnerableSEP: false,
            assignedCourse: '8°A Básico',
            subject: 'Historia y Geografía',
            responsibilities: [
                { type: 'Consejo', title: 'Consejo de Profesores', hours: 1.5 }
            ]
        }
    ],
    cursos2027: [
        { id: "c1", nombre: "5° Básico A", nivel: "Basica" },
        { id: "c2", nombre: "6° Básico B", nivel: "Basica" },
        { id: "c3", nombre: "1° Medio A", nivel: "Media" }
    ],
    docentes2027: [
        { id: "d1", nombre: "Prof. Carlos Ruiz", asignatura: "Matemática", asignaciones: [{ cursoId: "c1", bloques: 5 }, { cursoId: "c2", bloques: 5 }, { cursoId: "c3", bloques: 5 }] },
        { id: "d2", nombre: "Prof. Ana Morales", asignatura: "Lenguaje y Comunicación", asignaciones: [{ cursoId: "c1", bloques: 5 }, { cursoId: "c2", bloques: 5 }, { cursoId: "c3", bloques: 5 }] },
        { id: "d3", nombre: "Prof. Roberto Silva", asignatura: "Ciencias Naturales", asignaciones: [{ cursoId: "c1", bloques: 3 }, { cursoId: "c2", bloques: 3 }] },
        { id: "d4", nombre: "Prof. Claudia Gómez", asignatura: "Historia y Geografía", asignaciones: [{ cursoId: "c1", bloques: 2 }, { cursoId: "c2", bloques: 2 }, { cursoId: "c3", bloques: 2 }] },
        { id: "d5", nombre: "Prof. Felipe Soto", asignatura: "Educación Física", asignaciones: [{ cursoId: "c1", bloques: 2 }, { cursoId: "c2", bloques: 2 }, { cursoId: "c3", bloques: 1 }] },
        { id: "d6", nombre: "Prof. Mariana Paz", asignatura: "Inglés", asignaciones: [{ cursoId: "c2", bloques: 1 }, { cursoId: "c3", bloques: 2 }] },
        { id: "d7", nombre: "Prof. Diego Lara", asignatura: "Física", asignaciones: [{ cursoId: "c3", bloques: 2 }] },
        { id: "d8", nombre: "Prof. Elena Vera", asignatura: "Química", asignaciones: [{ cursoId: "c3", bloques: 2 }] },
        { id: "d9", nombre: "Prof. Gonzalo Ríos", asignatura: "Biología", asignaciones: [{ cursoId: "c3", bloques: 2 }] },
        { id: "d10", nombre: "Prof. Isabel Tapia", asignatura: "Artes Visuales", asignaciones: [{ cursoId: "c1", bloques: 1 }] },
        { id: "d11", nombre: "Prof. Lucas Bravo", asignatura: "Música", asignaciones: [{ cursoId: "c1", bloques: 1 }] }
    ],
    usersList: [
        { id: 'usr-admin-01', email: 'admin@simohora.cl', name: 'SuperAdministrador UTP', role: 'admin', school: 'Dirección Nacional UTP', status: 'activo', createdAt: '2026-01-01 08:00', lastLogin: '2026-08-14 10:15' },
        { id: 'usr-utp-02', email: 'utp@colegio.cl', name: 'Prof. Claudia Morales', role: 'user', school: 'Colegio Horizonte', status: 'activo', createdAt: '2026-02-15 09:30', lastLogin: '2026-08-14 11:20' }
    ],
    accessLogs: [
        { id: 'log-01', timestamp: '2026-08-14 10:15:30', email: 'admin@simohora.cl', name: 'SuperAdministrador UTP', role: 'admin', school: 'Dirección Nacional UTP', device: 'Chrome Windows', status: 'Éxito' },
        { id: 'log-02', timestamp: '2026-08-14 11:20:45', email: 'utp@colegio.cl', name: 'Prof. Claudia Morales', role: 'user', school: 'Colegio Horizonte', device: 'Chrome Windows', status: 'Éxito' }
    ],
    courses: [
        { id: 'C01', name: '1°A Básico', level: 'Básica', sepVulnerable: true },
        { id: 'C02', name: '2°A Básico', level: 'Básica', sepVulnerable: true },
        { id: 'C03', name: '5°B Básico', level: 'Básica', sepVulnerable: false },
        { id: 'C04', name: '8°A Básico', level: 'Básica', sepVulnerable: false },
        { id: 'C05', name: '1°A Medio', level: 'Media', sepVulnerable: false }
    ],
    subjects: [
        { id: 'S01', name: 'Lenguaje y Comunicación', hoursWeekly: 8 },
        { id: 'S02', name: 'Matemática', hoursWeekly: 7 },
        { id: 'S03', name: 'Ciencias Naturales', hoursWeekly: 4 },
        { id: 'S04', name: 'Historia y Geografía', hoursWeekly: 4 },
        { id: 'S05', name: 'Inglés', hoursWeekly: 3 },
        { id: 'S06', name: 'Educación Física', hoursWeekly: 2 }
    ],
    timetable: [],
    observations: [
        {
            id: 'OBS01',
            date: '2026-08-20',
            time: '09:00',
            teacherId: 'T01',
            teacherName: 'María José Fernández',
            subject: 'Lenguaje y Comunicación',
            course: '1°A Básico',
            objective: 'Comprensión lectora de cuentos breves y reconocimiento de vocales.',
            momentObserved: 'Inicio - Desarrollo',
            status: 'Programada',
            checklist: [
                { indicator: 'Es puntual al inicio de la clase y saluda a los estudiantes.', status: 'Si', obs: 'Ingresó puntual a las 08:00.' },
                { indicator: 'Comunica el objetivo de la clase de manera clara y accesible.', status: 'Si', obs: 'Escrito en la pizarra.' },
                { indicator: 'Utiliza recursos didácticos acordes al nivel pedagógico.', status: 'Si', obs: 'Láminas ilustradas y tarjetas DUA.' },
                { indicator: 'Gestiona eficientemente el clima del aula y la disciplina positiva.', status: 'Si', obs: 'Mantiene alta atención.' },
                { indicator: 'Aplica evaluación formativa durante el desarrollo.', status: 'No', obs: 'Se sugiere incorporar preguntas individuales.' }
            ],
            generalObs: 'Se observa excelente disposición del curso y dominio de grupo.',
            methodologies: 'DUA, Aprendizaje Basado en Juegos, Lectura Guiada',
            agreements: '1. Incorporar ticket de salida al final del desarrollo.\n2. Reforzar pausas activas.',
            feedbackDate: '2026-08-22',
            signatures: { UTP: 'Claudia Morales (UTP)', Docente: 'María José Fernández' }
        }
    ],
    plannings: [
        { id: 'P01', teacherName: 'María José Fernández', course: '1°A Básico', subject: 'Lenguaje', unit: 'Unidad 2: Vocales y Cuentos', dueDate: '2026-08-15', status: 'Aprobado', fileUrl: 'plan_unidad2_lenguaje.pdf' },
        { id: 'P02', teacherName: 'Carlos Mendoza Rios', course: '5°B Básico', subject: 'Matemática', unit: 'Unidad 3: Fracciones y Decimales', dueDate: '2026-08-18', status: 'En revision', fileUrl: 'plan_fracciones.pdf' }
    ],
    interviews: [
        {
            id: 'INT01',
            date: '2026-08-12',
            type: 'Apoderado',
            personName: 'Sra. Patricia Soto (Apoderada Lucas R.)',
            interviewer: 'Claudia Morales (UTP)',
            motive: 'Acuerdos de acompañamiento académico y asistencia.',
            summary: 'Se revisa compromiso de estudio en hogar y justificación de inasistencias.',
            commitments: 'Apoderada presentará certificado médico semanal.'
        }
    ],
    agendaEvents: [
        {
            id: 'EV01',
            date: '2026-08-18',
            time: '15:30',
            title: 'Consejo Técnico UTP: Análisis Cobertura Curricular',
            location: 'Sala de Conferencias',
            description: 'Revisión de avance por departamento y diseño de evaluaciones sumativas.',
            audioBlobUrl: null
        }
    ],
    documents: [
        { id: 'DOC01', title: 'Ley 20.903 - Crea el Sistema de Desarrollo Profesional Docente', category: 'Normativa Vigente', date: '2016-04-01', size: '1.4 MB', type: 'PDF', summary: 'Regula las proporciones de horas lectivas (65%) y no lectivas (35%).' },
        { id: 'DOC02', title: 'Ley 21.625 - Modifica proporción 60/40 en Escuelas Vulnerables', category: 'Normativa Vigente', date: '2023-10-15', size: '890 KB', type: 'PDF', summary: 'Aplica 60% lectivas y 40% no lectivas en 1° a 4° básico con >80% SEP.' },
        { id: 'DOC03', title: 'Decreto 67/2018 - Evaluación, Calificación y Promoción Escolar', category: 'Normativa Vigente', date: '2018-12-28', size: '2.1 MB', type: 'PDF', summary: 'Normas sobre evaluación formativa y criterios de repitencia.' },
        { id: 'DOC04', title: 'Reglamento Interno de Convivencia Escolar (RICE 2026)', category: 'Documentos Internos', date: '2026-03-01', size: '3.5 MB', type: 'PDF', summary: 'Protocolos institucionales de convivencia y medidas formativas.' }
    ],
    studentsRisk: [
        { id: 'ST01', name: 'Benjamín Morales Vera', course: '8°A Básico', gpa: 3.8, attendance: 78, riskLevel: 'Alto', tutor: 'Roberto Gomez', cause: 'Repitencia por Nota (<4.0) y Asistencia Crítica (<85%)', actionPlan: 'Plan de tutoría intensiva en Matemática e Historia.' }
    ],
    studentsDomiciliary: [
        {
            id: 'SD01',
            name: 'Valentina Araya Castro',
            course: '2°A Básico',
            diagnosis: 'Tratamiento médico ambulatorio',
            tutor: 'Ana María Silva',
            status: 'Activo',
            startDate: '2026-06-01',
            log: [
                { date: '2026-08-05', detail: 'Envío de Guías de Aprendizaje N° 4.' }
            ]
        }
    ]
};

class DataStore {
    constructor() {
        this.init();
    }

    init() {
        for (const [key, value] of Object.entries(STORAGE_KEYS)) {
            if (!localStorage.getItem(value)) {
                const seedKey = key.toLowerCase().replace(/_([a-z0-9])/g, (g) => g[1].toUpperCase());
                if (SEED_DATA[seedKey]) {
                    localStorage.setItem(value, JSON.stringify(SEED_DATA[seedKey]));
                }
            }
        }
    }

    get(keyName) {
        const storageKey = STORAGE_KEYS[keyName.toUpperCase()];
        if (!storageKey) return null;
        const item = localStorage.getItem(storageKey);
        return item ? JSON.parse(item) : null;
    }

    set(keyName, data) {
        const storageKey = STORAGE_KEYS[keyName.toUpperCase()];
        if (!storageKey) return false;
        localStorage.setItem(storageKey, JSON.stringify(data));
        return true;
    }

    resetToSeed() {
        localStorage.clear();
        this.init();
        window.location.reload();
    }

    // Fórmulas Legales Ley 20.903 / Ley 21.625
    calculateTeacherWorkload(teacher) {
        const totalContract = Number(teacher.contractHours) || 0;
        const isSEP = Boolean(teacher.isVulnerableSEP);
        
        const lectivaPercent = isSEP ? 0.60 : 0.65;
        const noLectivaPercent = isSEP ? 0.40 : 0.35;
        
        const maxLectivasCron = totalContract * lectivaPercent;
        const totalNoLectivasCron = totalContract * noLectivaPercent;
        const maxLectivasPedag = maxLectivasCron / 0.75;
        
        const noLectivaInamovibleCron = totalNoLectivasCron * 0.50;
        const noLectivaGestionCron = totalNoLectivasCron * 0.50;
        const recreosCron = maxLectivasCron * 0.10;
        
        const assignedRespTotal = (teacher.responsibilities || []).reduce((acc, r) => acc + (Number(r.hours) || 0), 0);
        
        const lectivasActuales = (teacher.assignedPedagHours || 0) * 0.75;
        let status = 'Verde';
        let message = 'Cumple estricto con la Ley 20.903/21.625';
        
        if (lectivasActuales > maxLectivasCron) {
            status = 'Rojo';
            message = `¡Alerta Legal! Excede el límite de horas lectivas (${maxLectivasCron.toFixed(1)} hrs cron.).`;
        } else if (assignedRespTotal > totalNoLectivasCron) {
            status = 'Rojo';
            message = `¡Alerta! Sobrecarga de actividades no lectivas (${assignedRespTotal.toFixed(1)} > ${totalNoLectivasCron.toFixed(1)} hrs).`;
        } else if (lectivasActuales >= maxLectivasCron * 0.95) {
            status = 'Amarillo';
            message = 'Carga lectiva al límite legal de capacidad.';
        }

        return {
            totalContract,
            isSEP,
            lectivaPercent: (lectivaPercent * 100).toFixed(0) + '%',
            noLectivaPercent: (noLectivaPercent * 100).toFixed(0) + '%',
            maxLectivasCron: maxLectivasCron.toFixed(2),
            maxLectivasPedag: maxLectivasPedag.toFixed(1),
            totalNoLectivasCron: totalNoLectivasCron.toFixed(2),
            noLectivaInamovibleCron: noLectivaInamovibleCron.toFixed(2),
            noLectivaGestionCron: noLectivaGestionCron.toFixed(2),
            recreosCron: recreosCron.toFixed(2),
            assignedRespTotal: assignedRespTotal.toFixed(2),
            status,
            message
        };
    }

    // SOLVER ALGORÍTMICO DE HORARIOS 2027 (De HORARIOS/app.js)
    runSolver2027() {
        const cursos = this.get('cursos_2027') || [];
        const docentes = this.get('docentes_2027') || [];

        const mallas = {};
        cursos.forEach(curso => {
            mallas[curso.id] = {};
            DIAS_SEMANA_2027.forEach(dia => {
                mallas[curso.id][dia] = {};
                [1, 2, 3, 4, 5].forEach(b => {
                    mallas[curso.id][dia][b] = null;
                });
            });
        });

        const ocupacionDocente = {};
        docentes.forEach(d => {
            ocupacionDocente[d.id] = {};
            DIAS_SEMANA_2027.forEach(dia => {
                ocupacionDocente[d.id][dia] = {};
                [1, 2, 3, 4, 5].forEach(b => {
                    ocupacionDocente[d.id][dia][b] = null;
                });
            });
        });

        function esBloquePermitido(nivel, dia, bloque) {
            if (dia === "Viernes" && bloque > 3) return false;
            if (nivel === "Basica" && bloque > 4) return false;
            if (nivel === "Media") {
                if ((dia === "Miércoles" || dia === "Jueves") && bloque > 4) return false;
            }
            return true;
        }

        const tareas = [];
        docentes.forEach(docente => {
            (docente.asignaciones || []).forEach(asig => {
                const curso = cursos.find(c => c.id === asig.cursoId);
                if (curso) {
                    const numBloques = parseInt(asig.bloques) || 0;
                    for (let i = 0; i < numBloques; i++) {
                        const asigLower = (docente.asignatura || '').toLowerCase();
                        const esTroncal = asigLower.includes("lengua") || asigLower.includes("matem");
                        tareas.push({
                            docenteId: docente.id,
                            docenteNombre: docente.nombre,
                            asignatura: docente.asignatura,
                            cursoId: curso.id,
                            nivel: curso.nivel,
                            esTroncal
                        });
                    }
                }
            });
        });

        // Priorizar asignaturas troncales en los primeros bloques
        tareas.sort((a, b) => (b.esTroncal ? 1 : 0) - (a.esTroncal ? 1 : 0));

        let colisiones = 0;

        tareas.forEach(tarea => {
            let asignado = false;
            let ordenBloques = tarea.esTroncal ? [1, 2, 3, 4, 5] : [3, 4, 2, 1, 5];
            
            for (let dia of DIAS_SEMANA_2027) {
                if (asignado) break;
                for (let b of ordenBloques) {
                    if (!esBloquePermitido(tarea.nivel, dia, b)) continue;

                    if (mallas[tarea.cursoId][dia][b] === null && ocupacionDocente[tarea.docenteId][dia][b] === null) {
                        mallas[tarea.cursoId][dia][b] = {
                            asignatura: tarea.asignatura,
                            docenteId: tarea.docenteId,
                            docenteNombre: tarea.docenteNombre,
                            esTroncal: tarea.esTroncal
                        };
                        ocupacionDocente[tarea.docenteId][dia][b] = tarea.cursoId;
                        asignado = true;
                        break;
                    }
                }
            }

            if (!asignado) colisiones++;
        });

        return { mallas, ocupacionDocente, colisiones, totalTareas: tareas.length };
    }
}

const dataStore = new DataStore();

/* ==========================================================================
   MÓDULO 2: ACOMPAÑAMIENTO Y MONITOREO DOCENTE
   ========================================================================== */

const Modulo2 = {
    render(container) {
        const observations = dataStore.get('observations') || [];
        const plannings = dataStore.get('plannings') || [];
        const interviews = dataStore.get('interviews') || [];

        container.innerHTML = `
            <div class="section-header">
                <div class="section-header-info">
                    <h2>Módulo 2: Acompañamiento y Monitoreo Docente</h2>
                    <p>Observaciones de clase, Pauta de Cotejo digitalizada, monitoreo de planificaciones y registro de entrevistas.</p>
                </div>
                <div class="section-actions">
                    <button class="btn btn-secondary" onclick="Modulo2.showNewInterviewModal()">
                        + Registro Entrevista
                    </button>
                    <button class="btn btn-primary" onclick="Modulo2.showNewObservationModal()">
                        + Programar Visita al Aula
                    </button>
                </div>
            </div>

            <!-- Subsección 1: Visitas al Aula y Agenda -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/></svg>
                        Agenda de Acompañamiento al Aula & Pautas de Cotejo UTP
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Fecha & Hora</th>
                                <th>Docente Observado</th>
                                <th>Asignatura & Curso</th>
                                <th>Momento Observado</th>
                                <th>Estado</th>
                                <th>Pauta UTP</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${observations.map(obs => `
                                <tr>
                                    <td><strong>${obs.date}</strong><br><small>${obs.time} hrs</small></td>
                                    <td><strong>${obs.teacherName}</strong></td>
                                    <td>${obs.subject}<br><small>${obs.course}</small></td>
                                    <td><span class="badge badge-neutral">${obs.momentObserved}</span></td>
                                    <td>
                                        <span class="badge badge-${obs.status === 'Realizada' ? 'success' : 'warning'}">
                                            ${obs.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-primary" onclick="Modulo2.openObservationChecklistModal('${obs.id}')">
                                            Abrir Pauta Cotejo
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="grid-2">
                <!-- Subsección 2: Monitoreo de Planificaciones -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            Panel de Control de Planificaciones
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Docente</th>
                                    <th>Unidad / Asignatura</th>
                                    <th>Semáforo Status</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${plannings.map(p => `
                                    <tr>
                                        <td><strong>${p.teacherName}</strong><br><small>${p.course}</small></td>
                                        <td>${p.unit}<br><small>${p.subject}</small></td>
                                        <td>
                                            <span class="badge badge-${p.status === 'Aprobado' ? 'success' : p.status === 'En revision' ? 'warning' : 'danger'}">
                                                ${p.status === 'Aprobado' ? '🟢 Aprobado' : p.status === 'En revision' ? '🟡 En revisión' : '🔴 Retrasado'}
                                            </span>
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-secondary" onclick="Modulo2.togglePlanningStatus('${p.id}')">Cambiar Estado</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Subsección 3: Registro de Entrevistas -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            Registro de Entrevistas (Docentes / Apoderados)
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Tipo</th>
                                    <th>Entrevistado</th>
                                    <th>Exportar</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${interviews.map(i => `
                                    <tr>
                                        <td>${i.date}</td>
                                        <td><span class="badge badge-neutral">${i.type}</span></td>
                                        <td><strong>${i.personName}</strong></td>
                                        <td>
                                            <button class="btn btn-sm btn-secondary" onclick="Modulo2.exportInterviewPDF('${i.id}')">
                                                Exportar PDF
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    // Modal Pauta de Cotejo/Observación construida exactamente según especificaciones
    openObservationChecklistModal(obsId) {
        const observations = dataStore.get('observations') || [];
        const obs = observations.find(o => o.id === obsId);

        if (!obs) return;

        const defaultIndicators = [
            { indicator: 'Es puntual al inicio de la clase y saluda formalmente a los estudiantes.', status: 'Si', obs: '' },
            { indicator: 'Comunica el objetivo de la clase de manera clara, visible y accesible.', status: 'Si', obs: '' },
            { indicator: 'Activa conocimientos previos vinculados a la clase anterior.', status: 'Si', obs: '' },
            { indicator: 'Utiliza recursos didácticos apropiados para la atención a la diversidad (DUA).', status: 'Si', obs: '' },
            { indicator: 'Gestiona el clima del aula promoviendo el respeto y la participación activa.', status: 'Si', obs: '' },
            { indicator: 'Aplica instrumentos o preguntas de evaluación formativa durante el desarrollo.', status: 'Si', obs: '' },
            { indicator: 'Realiza síntesis o cierre de la clase verificando el logro del objetivo.', status: 'Si', obs: '' }
        ];

        const checklist = (obs.checklist && obs.checklist.length > 0) ? obs.checklist : defaultIndicators;

        const modalHtml = `
            <div class="modal-backdrop show" id="modal-observation-checklist">
                <div class="modal-dialog" style="max-width:900px;">
                    <div class="modal-header">
                        <div class="modal-title">📋 Pauta de Observación y Escala de Cotejo al Aula UTP</div>
                        <button class="btn-close-modal" onclick="document.getElementById('modal-observation-checklist').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <!-- Cabecera de la Pauta -->
                        <div class="grid-2" style="background:var(--bg-main); padding:1rem; border-radius:var(--radius-sm); margin-bottom:1.25rem;">
                            <div>
                                <p><strong>Docente Observado:</strong> ${obs.teacherName}</p>
                                <p><strong>Asignatura:</strong> ${obs.subject} (${obs.course})</p>
                            </div>
                            <div>
                                <div class="form-group">
                                    <label class="form-label">Momento a Observar:</label>
                                    <select class="form-select" id="obs-moment">
                                        <option value="Inicio" ${obs.momentObserved === 'Inicio' ? 'selected' : ''}>Inicio de la clase</option>
                                        <option value="Desarrollo" ${obs.momentObserved === 'Desarrollo' ? 'selected' : ''}>Desarrollo de la clase</option>
                                        <option value="Término / Cierre" ${obs.momentObserved === 'Término / Cierre' ? 'selected' : ''}>Término / Cierre de la clase</option>
                                        <option value="Inicio - Desarrollo" ${obs.momentObserved === 'Inicio - Desarrollo' ? 'selected' : ''}>Inicio - Desarrollo</option>
                                        <option value="Desarrollo - Cierre" ${obs.momentObserved === 'Desarrollo - Cierre' ? 'selected' : ''}>Desarrollo - Cierre</option>
                                        <option value="Clase Completa" ${obs.momentObserved === 'Clase Completa' ? 'selected' : ''}>Clase Completa (45-90 min)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom:1.5rem;">
                            <label class="form-label">Objetivo de la Clase Observada:</label>
                            <input type="text" class="form-control" id="obs-objective" value="${obs.objective || ''}" placeholder="Ej: Resolver ecuaciones lineales de primer grado con una incógnita">
                        </div>

                        <!-- Escala de Cotejo Tabla -->
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                            <h4 style="font-size:1rem; font-weight:700; color:var(--navy-900);">Escala de Cotejo (Indicadores Pedagógicos)</h4>
                            <button class="btn btn-sm btn-secondary" onclick="Modulo2.addCustomIndicatorRow()">+ Agregar Indicador</button>
                        </div>

                        <div class="table-responsive" style="margin-bottom:1.5rem;">
                            <table class="table" id="table-indicators">
                                <thead>
                                    <tr>
                                        <th style="width:45%;">Indicador Pedagógico</th>
                                        <th style="width:15%; text-align:center;">Evaluación</th>
                                        <th style="width:40%;">Observaciones Específicas</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody-indicators">
                                    ${checklist.map((item, idx) => `
                                        <tr>
                                            <td><input type="text" class="form-control ind-title" value="${item.indicator}"></td>
                                            <td style="text-align:center;">
                                                <select class="form-select ind-status" style="padding:0.35rem;">
                                                    <option value="Si" ${item.status === 'Si' ? 'selected' : ''}>Sí</option>
                                                    <option value="No" ${item.status === 'No' ? 'selected' : ''}>No</option>
                                                </select>
                                            </td>
                                            <td><input type="text" class="form-control ind-obs" value="${item.obs || ''}" placeholder="Detalle u observación..."></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>

                        <!-- Secciones de Observaciones Generales y Metodologías -->
                        <div class="grid-2">
                            <div class="form-group">
                                <label class="form-label">Observaciones Generales de Aula:</label>
                                <textarea class="form-control" id="obs-general" rows="3">${obs.generalObs || ''}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Tipos de Metodologías Observadas:</label>
                                <textarea class="form-control" id="obs-methodologies" rows="3" placeholder="Ej: DUA, Trabajo Colaborativo, Aprendizaje Basado en Proyectos">${obs.methodologies || ''}</textarea>
                            </div>
                        </div>

                        <!-- Retroalimentación: Acuerdos, Fecha y Firmas -->
                        <div style="background:var(--blue-50); border:1px solid rgba(37,99,235,0.2); border-radius:var(--radius-sm); padding:1rem; margin-top:1rem;">
                            <h4 style="font-size:0.95rem; font-weight:700; color:var(--blue-700); margin-bottom:0.75rem;">Retroalimentación y Compromisos</h4>
                            <div class="form-group">
                                <label class="form-label">Acuerdos y Compromisos Pedagógicos:</label>
                                <textarea class="form-control" id="obs-agreements" rows="3">${obs.agreements || ''}</textarea>
                            </div>
                            <div class="grid-2">
                                <div class="form-group">
                                    <label class="form-label">Fecha de Retroalimentación:</label>
                                    <input type="date" class="form-control" id="obs-feedback-date" value="${obs.feedbackDate || '2026-08-22'}">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Firmas (UTP / Docente):</label>
                                    <input type="text" class="form-control" id="obs-signatures" value="${obs.signatures ? obs.signatures.UTP + ' | ' + obs.signatures.Docente : 'Claudia Morales (UTP) | ' + obs.teacherName}">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="document.getElementById('modal-observation-checklist').remove()">Cancelar</button>
                        <button class="btn btn-success" onclick="Modulo2.saveObservationChecklist('${obs.id}')">Guardar Pauta Completada</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    addCustomIndicatorRow() {
        const tbody = document.getElementById('tbody-indicators');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" class="form-control ind-title" placeholder="Ingrese nuevo indicador a evaluar..."></td>
            <td style="text-align:center;">
                <select class="form-select ind-status" style="padding:0.35rem;">
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                </select>
            </td>
            <td><input type="text" class="form-control ind-obs" placeholder="Detalle u observación..."></td>
        `;
        tbody.appendChild(tr);
    },

    saveObservationChecklist(obsId) {
        const observations = dataStore.get('observations') || [];
        const obs = observations.find(o => o.id === obsId);

        if (!obs) return;

        obs.momentObserved = document.getElementById('obs-moment').value;
        obs.objective = document.getElementById('obs-objective').value;
        obs.generalObs = document.getElementById('obs-general').value;
        obs.methodologies = document.getElementById('obs-methodologies').value;
        obs.agreements = document.getElementById('obs-agreements').value;
        obs.feedbackDate = document.getElementById('obs-feedback-date').value;
        obs.status = 'Realizada';

        // Recoger indicadores
        const rows = document.querySelectorAll('#tbody-indicators tr');
        const updatedChecklist = [];
        rows.forEach(r => {
            const indicator = r.querySelector('.ind-title').value;
            const status = r.querySelector('.ind-status').value;
            const obsText = r.querySelector('.ind-obs').value;
            if (indicator) {
                updatedChecklist.push({ indicator, status, obs: obsText });
            }
        });
        obs.checklist = updatedChecklist;

        dataStore.set('observations', observations);
        document.getElementById('modal-observation-checklist').remove();
        alert('Pauta de Cotejo y Observación al Aula guardada exitosamente.');
        this.render(document.getElementById('content-area'));
    },

    togglePlanningStatus(planningId) {
        const plannings = dataStore.get('plannings') || [];
        const p = plannings.find(item => item.id === planningId);
        if (p) {
            const nextStatus = { 'Aprobado': 'En revision', 'En revision': 'Retrasado', 'Retrasado': 'Aprobado' };
            p.status = nextStatus[p.status];
            dataStore.set('plannings', plannings);
            this.render(document.getElementById('content-area'));
        }
    },

    showNewInterviewModal() {
        const modalHtml = `
            <div class="modal-backdrop show" id="modal-interview">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <div class="modal-title">Registro de Entrevista UTP</div>
                        <button class="btn-close-modal" onclick="document.getElementById('modal-interview').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="grid-2">
                            <div class="form-group">
                                <label class="form-label">Tipo de Entrevistado:</label>
                                <select class="form-select" id="int-type">
                                    <option value="Apoderado">Apoderado / Tutor</option>
                                    <option value="Docente">Docente</option>
                                    <option value="Estudiante">Estudiante</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Fecha de Entrevista:</label>
                                <input type="date" class="form-control" id="int-date" value="2026-08-14">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nombre del Entrevistado:</label>
                            <input type="text" class="form-control" id="int-person" placeholder="Ej: Sr. Juan Perez (Apoderado)">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Motivo de la Entrevista:</label>
                            <input type="text" class="form-control" id="int-motive" placeholder="Ej: Seguimiento académico y asistencia">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Resumen de lo Tratado:</label>
                            <textarea class="form-control" id="int-summary" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Acuerdos y Compromisos Firmados:</label>
                            <textarea class="form-control" id="int-commitments" rows="2"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="document.getElementById('modal-interview').remove()">Cancelar</button>
                        <button class="btn btn-primary" onclick="Modulo2.saveInterview()">Guardar Registro</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    saveInterview() {
        const type = document.getElementById('int-type').value;
        const date = document.getElementById('int-date').value;
        const personName = document.getElementById('int-person').value;
        const motive = document.getElementById('int-motive').value;
        const summary = document.getElementById('int-summary').value;
        const commitments = document.getElementById('int-commitments').value;

        if (!personName) {
            alert('Ingrese el nombre de la persona entrevistada.');
            return;
        }

        const interviews = dataStore.get('interviews') || [];
        const newId = 'INT' + String(interviews.length + 1).padStart(2, '0');
        interviews.push({ id: newId, type, date, personName, motive, summary, commitments, interviewer: 'UTP' });
        
        dataStore.set('interviews', interviews);
        document.getElementById('modal-interview').remove();
        alert('Entrevista registrada con éxito.');
        this.render(document.getElementById('content-area'));
    },

    exportInterviewPDF(interviewId) {
        const interviews = dataStore.get('interviews') || [];
        const item = interviews.find(i => i.id === interviewId);
        
        if (!item) return;

        window.print();
    },

    showNewObservationModal() {
        const teachers = dataStore.get('teachers') || [];
        const modalHtml = `
            <div class="modal-backdrop show" id="modal-new-obs">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <div class="modal-title">Programar Visita al Aula UTP</div>
                        <button class="btn-close-modal" onclick="document.getElementById('modal-new-obs').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="form-label">Seleccionar Docente a Observar:</label>
                            <select class="form-select" id="new-obs-teacher">
                                ${teachers.map(t => `<option value="${t.id}">${t.name} (${t.assignedCourse || 'Sin curso'})</option>`).join('')}
                            </select>
                        </div>
                        <div class="grid-2">
                            <div class="form-group">
                                <label class="form-label">Fecha de Visita:</label>
                                <input type="date" class="form-control" id="new-obs-date" value="2026-08-28">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hora:</label>
                                <input type="time" class="form-control" id="new-obs-time" value="09:45">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Asignatura:</label>
                            <input type="text" class="form-control" id="new-obs-subject" value="Lenguaje y Comunicación">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="document.getElementById('modal-new-obs').remove()">Cancelar</button>
                        <button class="btn btn-primary" onclick="Modulo2.saveNewObservation()">Agendar Visita</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    saveNewObservation() {
        const teacherId = document.getElementById('new-obs-teacher').value;
        const date = document.getElementById('new-obs-date').value;
        const time = document.getElementById('new-obs-time').value;
        const subject = document.getElementById('new-obs-subject').value;

        const teachers = dataStore.get('teachers') || [];
        const t = teachers.find(item => item.id === teacherId);

        const observations = dataStore.get('observations') || [];
        const newId = 'OBS' + String(observations.length + 1).padStart(2, '0');

        observations.push({
            id: newId,
            date,
            time,
            teacherId,
            teacherName: t ? t.name : 'Docente',
            subject,
            course: t ? t.assignedCourse : 'Básica',
            momentObserved: 'Inicio - Desarrollo',
            status: 'Programada',
            checklist: []
        });

        dataStore.set('observations', observations);
        document.getElementById('modal-new-obs').remove();
        this.render(document.getElementById('content-area'));
    }
};

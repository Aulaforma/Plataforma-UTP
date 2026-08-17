/* ==========================================================================
   MÓDULO 4: CENTRO DE DOCUMENTACIÓN Y CONTROL DE ESTUDIANTES
   ========================================================================== */

const Modulo4 = {
    activeTab: 'normativa',

    render(container) {
        const documents = dataStore.get('documents') || [];
        const studentsRisk = dataStore.get('students_risk') || [];
        const studentsDomiciliary = dataStore.get('students_domiciliary') || [];

        container.innerHTML = `
            <div class="section-header">
                <div class="section-header-info">
                    <h2>Módulo 4: Centro de Documentación y Control de Estudiantes</h2>
                    <p>Biblioteca de normativas, reglamento interno, alerta de riesgo de repitencia y atenciones domiciliarias.</p>
                </div>
            </div>

            <!-- Dashboard Métrico Inicial -->
            <div class="grid-3" style="margin-bottom:1.5rem;">
                <div class="stat-card">
                    <div class="stat-icon red">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    </div>
                    <div class="stat-data">
                        <div class="stat-value">${studentsRisk.length}</div>
                        <div class="stat-label">Alumnos en Riesgo de Repitencia</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon amber">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
                    </div>
                    <div class="stat-data">
                        <div class="stat-value">${studentsDomiciliary.length}</div>
                        <div class="stat-label">Alumnos Apoyo Domiciliario</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon blue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    </div>
                    <div class="stat-data">
                        <div class="stat-value">${documents.length}</div>
                        <div class="stat-label">Documentos & Normativa</div>
                    </div>
                </div>
            </div>

            <!-- Subsección A: Biblioteca Normativa & Documentos (Tabs) -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        Biblioteca Normativa y Reglamentos Internos
                    </div>
                    <div style="width:250px;">
                        <input type="text" class="form-control" id="doc-search-input" placeholder="🔍 Buscar documento..." onkeyup="Modulo4.filterDocuments(this.value)">
                    </div>
                </div>

                <div class="tabs-header">
                    <button class="tab-btn ${this.activeTab === 'normativa' ? 'active' : ''}" onclick="Modulo4.switchTab('normativa')">
                        Normativa Vigente (Leyes & Decretos)
                    </button>
                    <button class="tab-btn ${this.activeTab === 'internos' ? 'active' : ''}" onclick="Modulo4.switchTab('internos')">
                        Documentos Internos (Reglamentos & Protocolos)
                    </button>
                </div>

                <div id="tab-normativa" class="tab-content ${this.activeTab === 'normativa' ? 'active' : ''}">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Documento</th>
                                    <th>Resumen</th>
                                    <th>Fecha</th>
                                    <th>Tamaño</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody id="tbody-docs-normativa">
                                ${this.renderDocRows(documents.filter(d => d.category === 'Normativa Vigente'))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="tab-internos" class="tab-content ${this.activeTab === 'internos' ? 'active' : ''}">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Documento</th>
                                    <th>Resumen</th>
                                    <th>Fecha</th>
                                    <th>Tamaño</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody id="tbody-docs-internos">
                                ${this.renderDocRows(documents.filter(d => d.category === 'Documentos Internos'))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Subsección B: Control de Estudiantes en Riesgo de Repitencia -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>
                        Dashboard Analítico: Control de Estudiantes en Riesgo de Repitencia (Decreto 67)
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Estudiante</th>
                                <th>Curso</th>
                                <th>Promedio GPA</th>
                                <th>Asistencia</th>
                                <th>Nivel de Riesgo</th>
                                <th>Causa Crítica</th>
                                <th>Plan de Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${studentsRisk.map(s => `
                                <tr>
                                    <td><strong>${s.name}</strong></td>
                                    <td>${s.course}</td>
                                    <td>
                                        <span class="badge badge-${s.gpa < 4.0 ? 'danger' : 'warning'}">
                                            ${s.gpa.toFixed(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge badge-${s.attendance < 85 ? 'danger' : 'success'}">
                                            ${s.attendance}%
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge badge-${s.riskLevel === 'Alto' ? 'danger' : 'warning'}">
                                            ● Riesgo ${s.riskLevel}
                                        </span>
                                    </td>
                                    <td><small style="color:var(--danger-red); font-weight:600;">${s.cause}</small></td>
                                    <td>
                                        <button class="btn btn-sm btn-secondary" onclick="Modulo4.viewStudentActionPlan('${s.id}')">
                                            Ver Plan de Acción
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Subsección C: Control de Estudiantes con Apoyo Domiciliario -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        Seguimiento y Bitácora: Apoyo Domiciliario u Hospitalario
                    </div>
                </div>
                <div style="display:flex; flex-direction:column; gap:1rem;">
                    ${studentsDomiciliary.map(sd => `
                        <div style="border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem; background:#ffffff;">
                            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
                                <div>
                                    <span class="badge badge-success">Régimen Activo</span>
                                    <h4 style="font-size:1.1rem; font-weight:700; color:var(--navy-900); margin-top:0.25rem;">${sd.name} (${sd.course})</h4>
                                    <small style="color:var(--text-secondary);">Diagnosis: ${sd.diagnosis}</small>
                                </div>
                                <div style="text-align:right;">
                                    <span class="sidebar-subtitle">Profesor Tutor Asignado</span>
                                    <div style="font-weight:700; color:var(--blue-600);">${sd.tutor}</div>
                                </div>
                            </div>
                            
                            <h5 style="font-size:0.85rem; font-weight:700; color:var(--navy-800); margin-bottom:0.5rem;">📖 Bitácora de Atenciones y Tutorías:</h5>
                            <div style="background:var(--bg-main); border-radius:var(--radius-sm); padding:0.75rem; margin-bottom:1rem;">
                                <ul style="margin-left:1.25rem; font-size:0.85rem; display:flex; flex-direction:column; gap:0.35rem;">
                                    ${sd.log.map(l => `<li><strong>${l.date}:</strong> ${l.detail}</li>`).join('')}
                                </ul>
                            </div>
                            <button class="btn btn-sm btn-primary" onclick="Modulo4.addLogEntryModal('${sd.id}')">
                                + Agregar Registro a Bitácora
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    renderDocRows(docs) {
        return docs.map(d => `
            <tr>
                <td><strong>${d.title}</strong></td>
                <td><small style="color:var(--text-secondary);">${d.summary}</small></td>
                <td>${d.date}</td>
                <td><span class="badge badge-neutral">${d.size}</span></td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="Modulo4.openDocumentViewer('${d.title}')">
                        📄 Abrir Visor
                    </button>
                </td>
            </tr>
        `).join('');
    },

    switchTab(tabName) {
        this.activeTab = tabName;
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        document.getElementById(`tab-${tabName}`).classList.add('active');
        event.target.classList.add('active');
    },

    filterDocuments(query) {
        const q = query.toLowerCase();
        const documents = dataStore.get('documents') || [];

        const norm = documents.filter(d => d.category === 'Normativa Vigente' && (d.title.toLowerCase().includes(q) || d.summary.toLowerCase().includes(q)));
        const intern = documents.filter(d => d.category === 'Documentos Internos' && (d.title.toLowerCase().includes(q) || d.summary.toLowerCase().includes(q)));

        document.getElementById('tbody-docs-normativa').innerHTML = this.renderDocRows(norm);
        document.getElementById('tbody-docs-internos').innerHTML = this.renderDocRows(intern);
    },

    openDocumentViewer(title) {
        const modalHtml = `
            <div class="modal-backdrop show" id="modal-doc-viewer">
                <div class="modal-dialog" style="max-width:850px; height:80vh;">
                    <div class="modal-header">
                        <div class="modal-title">📄 Visor de Documentos: ${title}</div>
                        <button class="btn-close-modal" onclick="document.getElementById('modal-doc-viewer').remove()">&times;</button>
                    </div>
                    <div class="modal-body" style="background:#475569; display:flex; align-items:center; justify-content:center; color:white;">
                        <div style="text-align:center; padding:2rem; background:var(--navy-900); border-radius:var(--radius-md); border:1px solid var(--navy-600); max-width:600px;">
                            <h3 style="margin-bottom:1rem;">Documento PDF / Normativa Digital</h3>
                            <p style="font-size:0.9rem; color:#cbd5e1; margin-bottom:1.5rem;">
                                Se está visualizando en modo seguro el archivo <strong>"${title}"</strong>.
                            </p>
                            <div style="background:#ffffff; color:#0f172a; padding:1.5rem; border-radius:var(--radius-sm); font-size:0.85rem; text-align:left; max-height:250px; overflow-y:auto;">
                                <strong>Extracto Normativo Ley / Reglamento UTP:</strong><br><br>
                                Art. 1°: Las disposiciones del presente reglamento rigen la gestión pedagógica, distribución de carga horaria (Leyes 20.903 y 21.625) y acompañamiento al aula de la Unidad Técnica Pedagógica.<br><br>
                                Art. 2°: El equipo directivo mantendrá actualización permanente de pautas de cotejo y monitoreo de la cobertura curricular.
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="document.getElementById('modal-doc-viewer').remove()">Cerrar Visor</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    viewStudentActionPlan(studentId) {
        const studentsRisk = dataStore.get('students_risk') || [];
        const student = studentsRisk.find(s => s.id === studentId);

        if (!student) return;

        alert(`Plan de Acción para ${student.name}:\n\n${student.actionPlan}\n\nTutor Responsable: ${student.tutor}`);
    },

    addLogEntryModal(sdId) {
        const modalHtml = `
            <div class="modal-backdrop show" id="modal-log-entry">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <div class="modal-title">+ Agregar Registro a Bitácora Domiciliaria</div>
                        <button class="btn-close-modal" onclick="document.getElementById('modal-log-entry').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="form-label">Fecha de Atención / Tutoría:</label>
                            <input type="date" class="form-control" id="log-date" value="2026-08-14">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Detalle de la Atención:</label>
                            <textarea class="form-control" id="log-detail" rows="3" placeholder="Ej: Tutoría online de Matemática y entrega de guía formativa N° 5"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="document.getElementById('modal-log-entry').remove()">Cancelar</button>
                        <button class="btn btn-primary" onclick="Modulo4.saveLogEntry('${sdId}')">Guardar Registro</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    saveLogEntry(sdId) {
        const date = document.getElementById('log-date').value;
        const detail = document.getElementById('log-detail').value;

        if (!detail) {
            alert('Ingrese el detalle de la atención.');
            return;
        }

        const studentsDomiciliary = dataStore.get('students_domiciliary') || [];
        const sd = studentsDomiciliary.find(item => item.id === sdId);

        if (sd) {
            if (!sd.log) sd.log = [];
            sd.log.push({ date, detail });
            dataStore.set('students_domiciliary', studentsDomiciliary);
        }

        document.getElementById('modal-log-entry').remove();
        this.render(document.getElementById('content-area'));
    }
};

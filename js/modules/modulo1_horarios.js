/* ==========================================================================
   MÓDULO 1: GESTIÓN DE TIEMPOS Y HORARIOS (SIMOHORA v5.3 + GENERADOR MAESTRO 2027)
   ========================================================================== */

const Modulo1 = {
    activeTab: 'simohora',

    render(container) {
        const teachers = dataStore.get('teachers') || [];

        container.innerHTML = `
            <div class="section-header">
                <div class="section-header-info">
                    <h2>Módulo 1: Gestión de Tiempos y Horarios</h2>
                    <p>Planificador de Cargas Horarias (Leyes 20.903/21.625) y Generador Maestro de Horarios 2027.</p>
                </div>
                <div class="section-actions">
                    <button class="btn btn-secondary" onclick="Modulo1.exportRosterCSV()">
                        📥 Exportar Planta a CSV
                    </button>
                    <button class="btn btn-primary" onclick="Modulo1.switchTab('generador2027'); Modulo1.runSolver2027();">
                        ⚡ Ejecutar Solver Maestro 2027
                    </button>
                </div>
            </div>

            <!-- Tabs Nav Módulo 1 -->
            <div class="tabs-header">
                <button id="tab-btn-simohora" class="tab-btn ${this.activeTab === 'simohora' ? 'active' : ''}" onclick="Modulo1.switchTab('simohora')">
                    1. Cargas Horarias (SimoHora Ley 20.903 / 21.625)
                </button>
                <button id="tab-btn-generador2027" class="tab-btn ${this.activeTab === 'generador2027' ? 'active' : ''}" onclick="Modulo1.switchTab('generador2027')">
                    2. Generador Maestro de Horarios 2027
                </button>
            </div>

            <!-- CONTENIDO TAB 1: SIMOHORA -->
            <div id="tab-simohora" class="tab-content ${this.activeTab === 'simohora' ? 'active' : ''}">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            Planta General & Calculadora de Capacidades Legales
                        </div>
                        <button class="btn btn-sm btn-primary" onclick="Modulo1.showAddTeacherModal()">+ Nuevo Docente</button>
                    </div>

                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Docente</th>
                                    <th>Contrato</th>
                                    <th>Curso / Asignatura</th>
                                    <th>Régimen SEP</th>
                                    <th>Horas Lectivas (Máx)</th>
                                    <th>Horas No Lectivas (50/50)</th>
                                    <th>Estado Legal</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${teachers.map(t => {
                                    const calc = dataStore.calculateTeacherWorkload(t);
                                    return `
                                        <tr>
                                            <td>
                                                <strong>${t.name}</strong>
                                                <div class="sidebar-subtitle">${t.id} • ${t.daysPresence || 5} Días</div>
                                            </td>
                                            <td><strong>${t.contractHours} hrs</strong></td>
                                            <td>${t.assignedCourse || 'Sin asignar'} - <small>${t.subject || ''}</small></td>
                                            <td>
                                                ${t.isVulnerableSEP 
                                                    ? '<span class="badge badge-warning">60/40 (SEP >80%)</span>' 
                                                    : '<span class="badge badge-neutral">65/35 (Estándar)</span>'}
                                            </td>
                                            <td>
                                                <strong>${calc.maxLectivasCron} hrs</strong> cron. 
                                                <br><small style="color:var(--text-secondary);">(${calc.maxLectivasPedag} hrs pedag.)</small>
                                            </td>
                                            <td>
                                                <strong>${calc.totalNoLectivasCron} hrs</strong> Total
                                                <br><small style="color:var(--success-green);">Prep: ${calc.noLectivaInamovibleCron}h</small> | 
                                                <small style="color:var(--warning-amber);">Gestión: ${calc.noLectivaGestionCron}h</small>
                                            </td>
                                            <td>
                                                <span class="badge badge-${calc.status === 'Verde' ? 'success' : calc.status === 'Amarillo' ? 'warning' : 'danger'}">
                                                    ● ${calc.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button class="btn btn-sm btn-secondary" onclick="Modulo1.deleteTeacher('${t.id}')">Eliminar</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="8" style="padding-top:0; border-top:none;">
                                                <div class="workload-progress-container">
                                                    <div class="workload-progress-bar">
                                                        <div class="workload-segment segment-lectivas" style="width: ${calc.lectivaPercent};" title="Horas Lectivas">
                                                            Lectivas ${calc.lectivaPercent}
                                                        </div>
                                                        <div class="workload-segment segment-inamovible" style="width: calc(${calc.noLectivaPercent} / 2);" title="Prep. Inamovible 50%">
                                                            Prep. 50%
                                                        </div>
                                                        <div class="workload-segment segment-gestion" style="width: calc(${calc.noLectivaPercent} / 2);" title="Gestión Directiva 50%">
                                                            Gestión 50%
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- CONTENIDO TAB 2: GENERADOR MAESTRO 2027 -->
            <div id="tab-generador2027" class="tab-content ${this.activeTab === 'generador2027' ? 'active' : ''}">
                <div class="grid-2">
                    <!-- Configuración de Cursos y Docentes 2027 -->
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">🏫 Cursos y Malla 2027</div>
                            <button class="btn btn-sm btn-secondary" onclick="Modulo1.addCurso2027()">+ Agregar Curso</button>
                        </div>
                        <div id="contenedor-cursos-2027"></div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">👨‍🏫 Planta Docente & Asignaciones 2027</div>
                            <button class="btn btn-sm btn-secondary" onclick="Modulo1.addDocente2027()">+ Agregar Profesor</button>
                        </div>
                        <div id="contenedor-docentes-2027" style="max-height:500px; overflow-y:auto;"></div>
                    </div>
                </div>

                <!-- Grilla Semanal Horaria de Resultado 2027 -->
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            Horario Semanal Resultante 2027
                        </div>
                        <div style="display:flex; gap:0.5rem; align-items:center;">
                            <label class="form-label" style="margin:0;">Ver Curso:</label>
                            <select class="form-select" style="width:200px;" id="select-curso-2027" onchange="Modulo1.renderTablaCurso2027(this.value)"></select>
                            <button class="btn btn-sm btn-secondary" onclick="Modulo1.copiarMarkdownCurso()">📋 Copiar Markdown</button>
                            <button class="btn btn-sm btn-primary" onclick="window.print()">🖨️ Imprimir</button>
                        </div>
                    </div>

                    <div id="reporte-conflictos-2027"></div>

                    <div class="table-responsive">
                        <table class="table" id="tabla-horario-2027">
                            <thead>
                                <tr>
                                    <th style="width:140px; text-align:center;">Bloque / Horario</th>
                                    <th>Lunes</th>
                                    <th>Martes</th>
                                    <th>Miércoles</th>
                                    <th>Jueves</th>
                                    <th>Viernes</th>
                                </tr>
                            </thead>
                            <tbody id="tbody-horario-2027"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        if (this.activeTab === 'generador2027') {
            this.renderFormularios2027();
            this.runSolver2027();
        }
    },

    switchTab(tabName) {
        this.activeTab = tabName;
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        const btnEl = document.getElementById(`tab-btn-${tabName}`);
        const contentEl = document.getElementById(`tab-${tabName}`);

        if (btnEl) btnEl.classList.add('active');
        if (contentEl) contentEl.classList.add('active');

        if (tabName === 'generador2027') {
            this.renderFormularios2027();
            this.runSolver2027();
        }
    },

    renderFormularios2027() {
        const cursos = dataStore.get('cursos_2027') || [];
        const docentes = dataStore.get('docentes_2027') || [];

        // Cursos Form
        const contenedorCursos = document.getElementById('contenedor-cursos-2027');
        if (contenedorCursos) {
            contenedorCursos.innerHTML = cursos.map((c, idx) => `
                <div class="item-card">
                    <div class="item-card-header">
                        <strong>Curso #${idx + 1}: ${c.nombre}</strong>
                        <button class="btn-danger-sm" onclick="Modulo1.delCurso2027('${c.id}')">🗑️</button>
                    </div>
                    <div class="form-group-row">
                        <div class="form-group" style="flex:2;">
                            <label class="form-label">Nombre del Curso:</label>
                            <input type="text" class="form-control" value="${c.nombre}" onchange="Modulo1.updateCursoProp('${c.id}', 'nombre', this.value)">
                        </div>
                        <div class="form-group" style="flex:2;">
                            <label class="form-label">Nivel de Enseñanza:</label>
                            <select class="form-select" onchange="Modulo1.updateCursoProp('${c.id}', 'nivel', this.value)">
                                <option value="Basica" ${c.nivel === 'Basica' ? 'selected' : ''}>E. Básica (Max 19 Bloques)</option>
                                <option value="Media" ${c.nivel === 'Media' ? 'selected' : ''}>E. Media (Max 21 Bloques)</option>
                            </select>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Docentes Form
        const contenedorDocentes = document.getElementById('contenedor-docentes-2027');
        if (contenedorDocentes) {
            contenedorDocentes.innerHTML = docentes.map((d, idx) => `
                <div class="item-card">
                    <div class="item-card-header">
                        <strong style="color:var(--blue-600);">👨‍🏫 Profesor #${idx + 1}: ${d.nombre}</strong>
                        <button class="btn-danger-sm" onclick="Modulo1.delDocente2027('${d.id}')">🗑️</button>
                    </div>
                    <div class="form-group-row">
                        <div class="form-group" style="flex:2;">
                            <label class="form-label">Nombre Profesor:</label>
                            <input type="text" class="form-control" value="${d.nombre}" onchange="Modulo1.updateDocenteProp('${d.id}', 'nombre', this.value)">
                        </div>
                        <div class="form-group" style="flex:2;">
                            <label class="form-label">Asignatura:</label>
                            <input type="text" class="form-control" value="${d.asignatura}" onchange="Modulo1.updateDocenteProp('${d.id}', 'asignatura', this.value)">
                        </div>
                    </div>

                    <div class="sub-assignments-list">
                        <small style="font-weight:700; color:var(--navy-800);">Cursos que Atiende y Bloques Semanales:</small>
                        ${(d.asignaciones || []).map((asig, aIdx) => `
                            <div class="sub-assignment-row" style="margin-top:0.35rem;">
                                <select class="form-select" style="flex:2;" onchange="Modulo1.updateAsigProp('${d.id}', ${aIdx}, 'cursoId', this.value)">
                                    ${cursos.map(c => `<option value="${c.id}" ${c.id === asig.cursoId ? 'selected' : ''}>${c.nombre} (${c.nivel})</option>`).join('')}
                                </select>
                                <input type="number" class="form-control" style="flex:1;" value="${asig.bloques}" min="1" max="15" onchange="Modulo1.updateAsigProp('${d.id}', ${aIdx}, 'bloques', parseInt(this.value)||1)">
                                <button class="btn-danger-sm" onclick="Modulo1.delAsig2027('${d.id}', ${aIdx})">❌</button>
                            </div>
                        `).join('')}
                        <button class="btn-add-sm" style="margin-top:0.5rem;" onclick="Modulo1.addAsig2027('${d.id}')">+ Asignar Curso a Profesor</button>
                    </div>
                </div>
            `).join('');
        }
    },

    runSolver2027() {
        const result = dataStore.runSolver2027();
        this.solverResult = result;

        // Poblar Selector de Cursos
        const cursos = dataStore.get('cursos_2027') || [];
        const select = document.getElementById('select-curso-2027');
        if (select) {
            select.innerHTML = cursos.map(c => `<option value="${c.id}">${c.nombre} (${c.nivel})</option>`).join('');
            if (cursos.length > 0) {
                this.renderTablaCurso2027(cursos[0].id);
            }
        }

        // Renderizar Alerta de Diagnóstico
        const reporteBox = document.getElementById('reporte-conflictos-2027');
        if (reporteBox) {
            if (result.colisiones === 0) {
                reporteBox.innerHTML = `
                    <div style="background-color:var(--success-bg); border:1px solid var(--success-green); border-radius:var(--radius-sm); padding:0.85rem 1rem; margin-bottom:1rem; color:var(--success-green); font-size:0.875rem;">
                        <strong>🟢 ¡REPORTE EXCELENTE: CERO COLISIONES DETECTADAS!</strong>
                        <ul style="margin-left:1.25rem; margin-top:0.25rem; font-size:0.8rem;">
                            <li>✓ Cero colisiones docentes o de sala.</li>
                            <li>✓ Asignaturas troncales (Lenguaje / Matemática) agrupadas en Bloques 1 y 2.</li>
                            <li>✓ Salida unificada de Viernes en Bloque 3 (13:35 hrs).</li>
                            <li>✓ E. Básica finaliza en Bloque 4 (15:50 hrs) | E. Media usa Bloque 5 solo Lunes y Martes.</li>
                        </ul>
                    </div>
                `;
            } else {
                reporteBox.innerHTML = `
                    <div style="background-color:var(--danger-bg); border:1px solid var(--danger-red); border-radius:var(--radius-sm); padding:0.85rem 1rem; margin-bottom:1rem; color:var(--danger-red); font-size:0.875rem;">
                        <strong>🔴 ¡ATENCIÓN: ${result.colisiones} COLISIÓN(ES) DETECTADAS EN LA MATRIZ!</strong>
                        <p style="font-size:0.8rem; margin-top:0.25rem;">Revisa la disponibilidad de profesores o ajusta los bloques requeridos por asignatura.</p>
                    </div>
                `;
            }
        }
    },

    renderTablaCurso2027(cursoId) {
        const cursos = dataStore.get('cursos_2027') || [];
        const curso = cursos.find(c => c.id === cursoId);
        if (!curso || !this.solverResult) return;

        const tbody = document.getElementById('tbody-horario-2027');
        if (!tbody) return;

        tbody.innerHTML = '';

        BLOQUES_HORARIO_2027.forEach(bloque => {
            const tr = document.createElement('tr');

            const tdBloque = document.createElement('td');
            tdBloque.className = bloque.esClase ? 'cell-block-name' : 'cell-break';
            tdBloque.innerHTML = `<strong>${bloque.nombre}</strong><span class="cell-time">${bloque.hora}</span>`;
            tr.appendChild(tdBloque);

            DIAS_SEMANA_2027.forEach(dia => {
                const td = document.createElement('td');

                if (!bloque.esClase) {
                    td.className = 'cell-break';
                    if (dia === "Viernes" && bloque.id === "alm") {
                        td.className = 'cell-exit';
                        td.textContent = "SALIDA (13:35)";
                    } else {
                        td.textContent = `${bloque.nombre} (${bloque.duracion})`;
                    }
                } else {
                    const numBloque = bloque.id;
                    let esSalida = false;
                    if (dia === "Viernes" && numBloque > 3) esSalida = true;
                    if (curso.nivel === "Basica" && numBloque > 4) esSalida = true;
                    if (curso.nivel === "Media" && (dia === "Miércoles" || dia === "Jueves") && numBloque > 4) esSalida = true;

                    if (esSalida) {
                        td.className = 'cell-exit';
                        td.textContent = "SALIDA";
                    } else {
                        const clase = this.solverResult.mallas[cursoId][dia][numBloque];
                        if (clase) {
                            td.className = clase.esTroncal ? 'cell-core' : 'cell-subject';
                            td.innerHTML = `<strong>${clase.asignatura}</strong><br><small style="color:var(--text-secondary);">${clase.docenteNombre}</small>`;
                        } else {
                            td.className = 'cell-available';
                            td.textContent = "DISPONIBLE";
                        }
                    }
                }
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });
    },

    copiarMarkdownCurso() {
        const select = document.getElementById('select-curso-2027');
        const cursoId = select ? select.value : 'c1';
        const cursos = dataStore.get('cursos_2027') || [];
        const curso = cursos.find(c => c.id === cursoId);

        if (!curso || !this.solverResult) return;

        let md = `### Horario Semanal 2027: ${curso.nombre} (${curso.nivel})\n\n`;
        md += `| Bloque | Horario | Lunes | Martes | Miércoles | Jueves | Viernes |\n`;
        md += `| :--- | :---: | :---: | :---: | :---: | :---: | :---: |\n`;

        BLOQUES_HORARIO_2027.forEach(bloque => {
            let row = `| **${bloque.nombre}** | ${bloque.hora} | `;
            const cols = [];

            DIAS_SEMANA_2027.forEach(dia => {
                if (!bloque.esClase) {
                    if (dia === "Viernes" && bloque.id === "alm") {
                        cols.push(`**SALIDA (13:35)**`);
                    } else {
                        cols.push(`*${bloque.nombre}*`);
                    }
                } else {
                    const numBloque = bloque.id;
                    let esSalida = false;
                    if (dia === "Viernes" && numBloque > 3) esSalida = true;
                    if (curso.nivel === "Basica" && numBloque > 4) esSalida = true;
                    if (curso.nivel === "Media" && (dia === "Miércoles" || dia === "Jueves") && numBloque > 4) esSalida = true;

                    if (esSalida) {
                        cols.push(`**SALIDA**`);
                    } else {
                        const clase = this.solverResult.mallas[cursoId][dia][numBloque];
                        if (clase) {
                            cols.push(clase.esTroncal ? `**${clase.asignatura}**` : clase.asignatura);
                        } else {
                            cols.push(`DISPONIBLE`);
                        }
                    }
                }
            });

            md += cols.join(" | ") + " |\n";
        });

        navigator.clipboard.writeText(md).then(() => {
            alert("¡Tabla de Horario en formato Markdown copiada al portapapeles con éxito!");
        });
    },

    // Métodos CRUD Cursos/Docentes 2027
    addCurso2027() {
        const cursos = dataStore.get('cursos_2027') || [];
        const newId = 'c_' + Date.now();
        cursos.push({ id: newId, nombre: 'Nuevo Curso', nivel: 'Basica' });
        dataStore.set('cursos_2027', cursos);
        this.renderFormularios2027();
        this.runSolver2027();
    },

    delCurso2027(id) {
        let cursos = dataStore.get('cursos_2027') || [];
        cursos = cursos.filter(c => c.id !== id);
        dataStore.set('cursos_2027', cursos);
        this.renderFormularios2027();
        this.runSolver2027();
    },

    updateCursoProp(id, prop, val) {
        const cursos = dataStore.get('cursos_2027') || [];
        const c = cursos.find(item => item.id === id);
        if (c) {
            c[prop] = val;
            dataStore.set('cursos_2027', cursos);
            this.runSolver2027();
        }
    },

    addDocente2027() {
        const docentes = dataStore.get('docentes_2027') || [];
        const cursos = dataStore.get('cursos_2027') || [];
        const primerCurso = cursos.length > 0 ? cursos[0].id : '';
        docentes.push({
            id: 'd_' + Date.now(),
            nombre: 'Nuevo Profesor',
            asignatura: 'Asignatura',
            asignaciones: primerCurso ? [{ cursoId: primerCurso, bloques: 2 }] : []
        });
        dataStore.set('docentes_2027', docentes);
        this.renderFormularios2027();
        this.runSolver2027();
    },

    delDocente2027(id) {
        let docentes = dataStore.get('docentes_2027') || [];
        docentes = docentes.filter(d => d.id !== id);
        dataStore.set('docentes_2027', docentes);
        this.renderFormularios2027();
        this.runSolver2027();
    },

    updateDocenteProp(id, prop, val) {
        const docentes = dataStore.get('docentes_2027') || [];
        const d = docentes.find(item => item.id === id);
        if (d) {
            d[prop] = val;
            dataStore.set('docentes_2027', docentes);
            this.runSolver2027();
        }
    },

    addAsig2027(docenteId) {
        const docentes = dataStore.get('docentes_2027') || [];
        const cursos = dataStore.get('cursos_2027') || [];
        const d = docentes.find(item => item.id === docenteId);
        if (d && cursos.length > 0) {
            if (!d.asignaciones) d.asignaciones = [];
            d.asignaciones.push({ cursoId: cursos[0].id, bloques: 2 });
            dataStore.set('docentes_2027', docentes);
            this.renderFormularios2027();
            this.runSolver2027();
        }
    },

    delAsig2027(docenteId, index) {
        const docentes = dataStore.get('docentes_2027') || [];
        const d = docentes.find(item => item.id === docenteId);
        if (d && d.asignaciones) {
            d.asignaciones.splice(index, 1);
            dataStore.set('docentes_2027', docentes);
            this.renderFormularios2027();
            this.runSolver2027();
        }
    },

    updateAsigProp(docenteId, index, prop, val) {
        const docentes = dataStore.get('docentes_2027') || [];
        const d = docentes.find(item => item.id === docenteId);
        if (d && d.asignaciones && d.asignaciones[index]) {
            d.asignaciones[index][prop] = val;
            dataStore.set('docentes_2027', docentes);
            this.runSolver2027();
        }
    },

    showAddTeacherModal() {
        const modalHtml = `
            <div class="modal-backdrop show" id="modal-add-teacher">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <div class="modal-title">Registrar Nuevo Docente (SimoHora v5.3)</div>
                        <button class="btn-close-modal" onclick="document.getElementById('modal-add-teacher').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="form-label">Nombre Docente:</label>
                            <input type="text" class="form-control" id="new-t-name" placeholder="Ej: Patricia Morales">
                        </div>
                        <div class="grid-2">
                            <div class="form-group">
                                <label class="form-label">Horas Contrato (60m):</label>
                                <input type="number" class="form-control" id="new-t-contract" value="44" max="44">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Días Presencia:</label>
                                <input type="number" class="form-control" id="new-t-days" value="5" max="5">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Régimen SEP / Vulnerabilidad:</label>
                            <select class="form-select" id="new-t-sep">
                                <option value="false">Estándar Ley 20.903 (65% Lectivas / 35% No Lectivas)</option>
                                <option value="true">Prioritario >80% SEP 1°-4° Básico Ley 21.625 (60/40)</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="document.getElementById('modal-add-teacher').remove()">Cancelar</button>
                        <button class="btn btn-primary" onclick="Modulo1.saveNewTeacher()">Guardar Docente</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    saveNewTeacher() {
        const name = document.getElementById('new-t-name').value;
        const contractHours = Number(document.getElementById('new-t-contract').value) || 44;
        const daysPresence = Number(document.getElementById('new-t-days').value) || 5;
        const isVulnerableSEP = document.getElementById('new-t-sep').value === 'true';

        if (!name) return;

        const teachers = dataStore.get('teachers') || [];
        teachers.push({ id: 'T' + String(teachers.length + 1).padStart(2, '0'), name, contractHours, daysPresence, isVulnerableSEP });
        dataStore.set('teachers', teachers);

        document.getElementById('modal-add-teacher').remove();
        this.render(document.getElementById('content-area'));
    },

    deleteTeacher(id) {
        if (confirm('¿Eliminar docente de la simulación de planta?')) {
            let teachers = dataStore.get('teachers') || [];
            teachers = teachers.filter(t => t.id !== id);
            dataStore.set('teachers', teachers);
            this.render(document.getElementById('content-area'));
        }
    },

    exportRosterCSV() {
        const teachers = dataStore.get('teachers') || [];
        let csv = 'Nombre,Contrato,SepVulnerable,HorasLectivasMax,HorasNoLectivasTotal,PrepInamovible50,Gestion50,Estado\n';
        teachers.forEach(t => {
            const calc = dataStore.calculateTeacherWorkload(t);
            csv += `"${t.name}",${t.contractHours},"${t.isVulnerableSEP ? 'SI (60/40)' : 'NO (65/35)'}",${calc.maxLectivasCron},${calc.totalNoLectivasCron},${calc.noLectivaInamovibleCron},${calc.noLectivaGestionCron},"${calc.status}"\n`;
        });
        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Planta_Docente_Ley20903_${Date.now()}.csv`;
        link.click();
    }
};

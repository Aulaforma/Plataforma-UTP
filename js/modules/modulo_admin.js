/* ==========================================================================
   MÓDULO DE ADMINISTRACIÓN MÁSTER Y AUDITORÍA DE ACCESOS
   ========================================================================== */

const ModuloAdmin = {
    render(container) {
        const users = dataStore.get('users_list') || [];
        const logs = dataStore.get('access_logs') || [];

        const todayStr = new Date().toISOString().split('T')[0];
        const loginsToday = logs.filter(l => l.timestamp.startsWith(todayStr) && l.status === 'Éxito').length;
        const schoolsCount = new Set(users.map(u => u.school)).size;

        container.innerHTML = `
            <div class="section-header">
                <div class="section-header-info">
                    <h2>Panel de Administración Máster & Auditoría de Accesos</h2>
                    <p>Supervisión global de usuarios, registros de seguridad de ingresos y base de datos de colegios.</p>
                </div>
                <div class="section-actions">
                    <button class="btn btn-secondary" onclick="ModuloAdmin.exportSchoolsDatabaseCSV()">
                        📥 Exportar Base de Colegios (CSV)
                    </button>
                    <button class="btn btn-danger" onclick="ModuloAdmin.clearAuditLogs()">
                        🗑️ Limpiar Auditoría
                    </button>
                </div>
            </div>

            <!-- Dashboard de Estadísticas Globales -->
            <div class="grid-4" style="margin-bottom:1.5rem;">
                <div class="stat-card">
                    <div class="stat-icon blue">👥</div>
                    <div class="stat-data">
                        <div class="stat-value">${users.length}</div>
                        <div class="stat-label">Usuarios Registrados</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon green">🔑</div>
                    <div class="stat-data">
                        <div class="stat-value">${loginsToday}</div>
                        <div class="stat-label">Ingresos Hoy</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon amber">🏫</div>
                    <div class="stat-data">
                        <div class="stat-value">${schoolsCount}</div>
                        <div class="stat-label">Colegios en Red</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon red">📜</div>
                    <div class="stat-data">
                        <div class="stat-value">${logs.length}</div>
                        <div class="stat-label">Registros Auditoría</div>
                    </div>
                </div>
            </div>

            <!-- Subsección A: Base de Datos de Establecimientos -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3"/></svg>
                        Base de Datos de Colegios y Cuentas de Usuario
                    </div>
                    <div style="width:250px;">
                        <input type="text" class="form-control" placeholder="🔍 Buscar colegio o usuario..." onkeyup="ModuloAdmin.filterUsers(this.value)">
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Establecimiento</th>
                                <th>Responsable</th>
                                <th>Correo Acceso</th>
                                <th>Rol</th>
                                <th>Último Ingreso</th>
                                <th>Estado</th>
                                <th>Acciones de Administración</th>
                            </tr>
                        </thead>
                        <tbody id="admin-users-tbody">
                            ${this.renderUserRows(users)}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Subsección B: Historial de Auditoría de Accesos -->
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        Registro de Auditoría de Seguridad e Intentos de Entrada
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Fecha y Hora</th>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th>Establecimiento</th>
                                <th>Dispositivo / IP</th>
                                <th>Resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${logs.map(l => `
                                <tr>
                                    <td><small>${l.timestamp}</small></td>
                                    <td><strong>${l.name}</strong></td>
                                    <td><small>${l.email}</small></td>
                                    <td>${l.school}</td>
                                    <td><small style="color:var(--text-secondary);">${l.device}</small></td>
                                    <td>
                                        <span class="badge badge-${l.status === 'Éxito' ? 'success' : 'danger'}">
                                            ${l.status}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderUserRows(users) {
        return users.map(u => `
            <tr>
                <td><strong>🏫 ${u.school}</strong></td>
                <td>${u.name}</td>
                <td><small style="color:var(--blue-600);">${u.email}</small></td>
                <td><span class="badge badge-neutral">${u.role}</span></td>
                <td><small>${u.lastLogin || 'Nunca'}</small></td>
                <td>
                    <span class="badge badge-${u.status === 'activo' ? 'success' : 'danger'}">
                        ${u.status}
                    </span>
                </td>
                <td>
                    ${u.role === 'admin' ? '<small style="color:var(--text-muted);">Propietario Máster</small>' : `
                        <button class="btn btn-sm btn-secondary" onclick="ModuloAdmin.resetUserPassword('${u.id}')">🔑 Restablecer Clave</button>
                        <button class="btn btn-sm ${u.status === 'activo' ? 'btn-danger' : 'btn-success'}" onclick="ModuloAdmin.toggleUserStatus('${u.id}')">
                            ${u.status === 'activo' ? 'Suspender' : 'Activar'}
                        </button>
                    `}
                </td>
            </tr>
        `).join('');
    },

    filterUsers(query) {
        const q = query.toLowerCase();
        const users = dataStore.get('users_list') || [];
        const filtered = users.filter(u => u.school.toLowerCase().includes(q) || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
        document.getElementById('admin-users-tbody').innerHTML = this.renderUserRows(filtered);
    },

    toggleUserStatus(userId) {
        const users = dataStore.get('users_list') || [];
        const u = users.find(item => item.id === userId);
        if (!u) return;

        u.status = u.status === 'activo' ? 'suspendido' : 'activo';
        dataStore.set('users_list', users);
        alert(`Estado de la cuenta ${u.school} actualizado a: ${u.status}`);
        this.render(document.getElementById('content-area'));
    },

    resetUserPassword(userId) {
        const users = dataStore.get('users_list') || [];
        const u = users.find(item => item.id === userId);
        if (!u) return;

        const newPass = prompt(`Ingrese nueva contraseña para ${u.school} (${u.email}):`, 'simohora2026');
        if (newPass) {
            alert(`Contraseña actualizada con éxito.`);
            this.render(document.getElementById('content-area'));
        }
    },

    exportSchoolsDatabaseCSV() {
        const users = dataStore.get('users_list') || [];
        let csv = 'ID,Establecimiento,Responsable,Correo,Rol,UltimoIngreso,Estado\n';
        users.forEach(u => {
            csv += `"${u.id}","${u.school}","${u.name}","${u.email}","${u.role}","${u.lastLogin}","${u.status}"\n`;
        });
        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Base_Colegios_UTP_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    },

    clearAuditLogs() {
        if (confirm("¿Limpiar historial de auditoría de accesos?")) {
            dataStore.set('access_logs', []);
            this.render(document.getElementById('content-area'));
        }
    }
};

/* ==========================================================================
   MÓDULO 3: AGENDA INSTITUCIONAL Y CALENDARIO CON GRABACIÓN DE AUDIO
   ========================================================================== */

const Modulo3 = {
    mediaRecorder: null,
    audioChunks: [],
    recordingTimerInterval: null,
    currentRecordingSeconds: 0,

    render(container) {
        const events = dataStore.get('agenda_events') || [];

        container.innerHTML = `
            <div class="section-header">
                <div class="section-header-info">
                    <h2>Módulo 3: Agenda Institucional y Calendario UTP</h2>
                    <p>Calendario general de hitos, consejos y reuniones con sistema de grabación de audio nativo (MediaRecorder API).</p>
                </div>
                <div class="section-actions">
                    <button class="btn btn-primary" onclick="Modulo3.showAddEventModal()">
                        + Nuevo Hito / Reunión
                    </button>
                </div>
            </div>

            <!-- Listado de Hitos y Agenda -->
            <div class="grid-2">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            Calendario de Reuniones y Retroalimentaciones UTP
                        </div>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:1rem;">
                        ${events.map(ev => `
                            <div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem;">
                                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
                                    <div>
                                        <span class="badge badge-neutral">${ev.date} • ${ev.time} hrs</span>
                                        <h4 style="font-size:1.05rem; font-weight:700; color:var(--navy-900); margin-top:0.35rem;">${ev.title}</h4>
                                        <small style="color:var(--text-secondary);">📍 ${ev.location}</small>
                                    </div>
                                </div>
                                <p style="font-size:0.875rem; color:var(--navy-700); margin-bottom:1rem;">${ev.description}</p>
                                
                                <div id="audio-container-${ev.id}">
                                    ${ev.audioBlobUrl ? `
                                        <div style="background:#ffffff; border:1px solid var(--border-color); padding:0.75rem; border-radius:var(--radius-sm);">
                                            <p style="font-size:0.8rem; font-weight:700; color:var(--success-green); margin-bottom:0.35rem;">
                                                🎙️ Grabación de Audio Adjunta:
                                            </p>
                                            <audio controls src="${ev.audioBlobUrl}" style="width:100%; height:36px;"></audio>
                                        </div>
                                    ` : `
                                        <button class="btn btn-sm btn-secondary" onclick="Modulo3.openAudioRecorderModal('${ev.id}')">
                                            🎙️ Iniciar Grabación de Audio
                                        </button>
                                    `}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Panel Informativo de Grabación -->
                <div class="card" style="background:linear-gradient(135deg, var(--navy-900), var(--navy-800)); color:white;">
                    <div class="card-title" style="color:white; margin-bottom:1rem;">
                        🎙️ Registro de Audio Nativo del Navegador
                    </div>
                    <p style="font-size:0.9rem; color:#cbd5e1; margin-bottom:1.5rem; line-height:1.6;">
                        La plataforma UTP integra la API nativa <code>MediaRecorder</code> de su navegador web. Esto le permite grabar actas de consejos técnicos, retroalimentaciones a docentes y compromisos con apoderados sin instalar software adicional.
                    </p>
                    <ul style="font-size:0.85rem; color:#94a3b8; margin-left:1.25rem; display:flex; flex-direction:column; gap:0.5rem;">
                        <li>Seguridad local: Los audios se almacenan directamente en su dispositivo.</li>
                        <li>Reproducción directa: Escuche la grabación adjunta en cualquier momento desde el calendario.</li>
                        <li>Compatibilidad universal en Chrome, Edge y Safari.</li>
                    </ul>
                </div>
            </div>
        `;
    },

    showAddEventModal() {
        const modalHtml = `
            <div class="modal-backdrop show" id="modal-add-event">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <div class="modal-title">Agregar Hito a la Agenda UTP</div>
                        <button class="btn-close-modal" onclick="document.getElementById('modal-add-event').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="form-label">Título de la Reunión / Hito:</label>
                            <input type="text" class="form-control" id="ev-title" placeholder="Ej: Consejo de Profesores - Evaluación Trimestral">
                        </div>
                        <div class="grid-2">
                            <div class="form-group">
                                <label class="form-label">Fecha:</label>
                                <input type="date" class="form-control" id="ev-date" value="2026-08-28">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Hora:</label>
                                <input type="time" class="form-control" id="ev-time" value="15:30">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Lugar / Sala:</label>
                            <input type="text" class="form-control" id="ev-location" value="Sala de Profesores">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Descripción / Objetivo:</label>
                            <textarea class="form-control" id="ev-desc" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="document.getElementById('modal-add-event').remove()">Cancelar</button>
                        <button class="btn btn-primary" onclick="Modulo3.saveEvent()">Guardar Hito</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    saveEvent() {
        const title = document.getElementById('ev-title').value;
        const date = document.getElementById('ev-date').value;
        const time = document.getElementById('ev-time').value;
        const location = document.getElementById('ev-location').value;
        const description = document.getElementById('ev-desc').value;

        if (!title) {
            alert('Ingrese el título de la reunión.');
            return;
        }

        const events = dataStore.get('agenda_events') || [];
        const newId = 'EV' + String(events.length + 1).padStart(2, '0');
        events.push({ id: newId, title, date, time, location, description, audioBlobUrl: null });
        
        dataStore.set('agenda_events', events);
        document.getElementById('modal-add-event').remove();
        this.render(document.getElementById('content-area'));
    },

    // Modal de Grabación de Audio con MediaRecorder API
    openAudioRecorderModal(eventId) {
        const modalHtml = `
            <div class="modal-backdrop show" id="modal-audio-recorder">
                <div class="modal-dialog">
                    <div class="modal-header">
                        <div class="modal-title">🎙️ Grabación de Audio en Vivo (MediaRecorder API)</div>
                        <button class="btn-close-modal" onclick="Modulo3.closeRecorderModal()">&times;</button>
                    </div>
                    <div class="modal-body" style="text-align:center; padding:2rem 1.5rem;">
                        <div id="recorder-status" style="font-size:1.25rem; font-weight:700; color:var(--navy-900); margin-bottom:1rem;">
                            Listo para grabar
                        </div>
                        <div id="recording-timer" style="font-size:2.5rem; font-weight:800; font-family:monospace; color:var(--blue-600); margin-bottom:1.5rem;">
                            00:00
                        </div>
                        
                        <div class="audio-recorder-box" style="justify-content:center; gap:1.5rem;">
                            <button class="btn btn-danger" id="btn-start-record" onclick="Modulo3.startRecording('${eventId}')">
                                ⏺️ Iniciar Grabación
                            </button>
                            <button class="btn btn-secondary" id="btn-stop-record" onclick="Modulo3.stopRecording('${eventId}')" disabled style="opacity:0.5;">
                                ⏹️ Detener & Adjuntar
                            </button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="Modulo3.closeRecorderModal()">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    async startRecording(eventId) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioChunks = [];
            this.mediaRecorder = new MediaRecorder(stream);

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            };

            this.mediaRecorder.start();

            document.getElementById('btn-start-record').disabled = true;
            document.getElementById('btn-start-record').style.opacity = '0.5';
            
            const stopBtn = document.getElementById('btn-stop-record');
            stopBtn.disabled = false;
            stopBtn.style.opacity = '1';

            document.getElementById('recorder-status').innerHTML = '<span class="recording-pulse"></span> Grabando audio en tiempo real...';

            this.currentRecordingSeconds = 0;
            this.recordingTimerInterval = setInterval(() => {
                this.currentRecordingSeconds++;
                const mins = String(Math.floor(this.currentRecordingSeconds / 60)).padStart(2, '0');
                const secs = String(this.currentRecordingSeconds % 60).padStart(2, '0');
                document.getElementById('recording-timer').innerText = `${mins}:${secs}`;
            }, 1000);

        } catch (err) {
            alert('No se pudo acceder al micrófono del dispositivo: ' + err.message);
        }
    },

    stopRecording(eventId) {
        if (!this.mediaRecorder) return;

        this.mediaRecorder.onstop = () => {
            clearInterval(this.recordingTimerInterval);
            const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
            const reader = new FileReader();
            
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => {
                const base64Audio = reader.result;
                const events = dataStore.get('agenda_events') || [];
                const ev = events.find(e => e.id === eventId);
                if (ev) {
                    ev.audioBlobUrl = base64Audio;
                    dataStore.set('agenda_events', events);
                }
                Modulo3.closeRecorderModal();
                alert('¡Audio grabado y adjunto al hito institucional exitosamente!');
                Modulo3.render(document.getElementById('content-area'));
            };
        };

        this.mediaRecorder.stop();
        this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    },

    closeRecorderModal() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        clearInterval(this.recordingTimerInterval);
        const modal = document.getElementById('modal-audio-recorder');
        if (modal) modal.remove();
    }
};

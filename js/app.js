/* ==========================================================================
   APP - CONTROLADOR PRINCIPAL Y NAVEGACIÓN DE PLATAFORMA UTP (V2 2027)
   ========================================================================== */

const App = {
    currentModule: 'modulo1',

    init() {
        this.bindEvents();
        this.renderProfileBadge();
        this.navigateTo(this.currentModule);
    },

    bindEvents() {
        const profileBadge = document.getElementById('profile-badge-btn');
        const dropdownMenu = document.getElementById('profile-dropdown-menu');

        if (profileBadge && dropdownMenu) {
            profileBadge.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });

            document.addEventListener('click', () => {
                dropdownMenu.classList.remove('show');
            });
        }
    },

    switchProfile(role, name, email, avatar) {
        const activeProfile = { role, name, email, avatar };
        dataStore.set('activeProfile', activeProfile);
        this.renderProfileBadge();
        
        const dropdownMenu = document.getElementById('profile-dropdown-menu');
        if (dropdownMenu) dropdownMenu.classList.remove('show');

        // Si cambia a Administrador y estábamos en otro módulo, o visibilidad de sidebar
        if (role === 'Administrador') {
            this.navigateTo('modulo_admin');
        } else if (this.currentModule === 'modulo_admin') {
            this.navigateTo('modulo1');
        }
    },

    renderProfileBadge() {
        const profile = dataStore.get('activeProfile') || { role: 'UTP', name: 'Prof. Claudia Morales', avatar: 'CM' };
        
        const avatarEl = document.getElementById('navbar-avatar');
        const roleEl = document.getElementById('navbar-role');
        const subtextEl = document.getElementById('navbar-subtext');

        if (avatarEl) avatarEl.innerText = profile.avatar || 'UT';
        if (roleEl) roleEl.innerText = profile.name || 'Usuario UTP';
        if (subtextEl) subtextEl.innerText = 'Perfil: ' + profile.role;

        document.querySelectorAll('.dropdown-item').forEach(item => {
            if (item.getAttribute('data-role') === profile.role) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Visibilidad botón Máster Admin en Sidebar
        const adminNavItem = document.getElementById('nav-item-admin');
        if (adminNavItem) {
            adminNavItem.style.display = (profile.role === 'Administrador') ? 'flex' : 'none';
        }
    },

    navigateTo(moduleId) {
        this.currentModule = moduleId;
        const contentArea = document.getElementById('content-area');
        
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.getAttribute('data-module') === moduleId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        const titles = {
            'modulo1': 'Módulo 1: Gestión de Tiempos y Horarios',
            'modulo2': 'Módulo 2: Acompañamiento y Monitoreo Docente',
            'modulo3': 'Módulo 3: Agenda Institucional y Calendario',
            'modulo4': 'Módulo 4: Centro de Documentación y Estudiantes',
            'modulo_admin': 'Panel de Administración Máster & Auditoría'
        };

        const titleEl = document.getElementById('current-module-title');
        if (titleEl) titleEl.innerText = titles[moduleId] || 'Plataforma UTP';

        contentArea.innerHTML = '';
        switch (moduleId) {
            case 'modulo1':
                Modulo1.render(contentArea);
                break;
            case 'modulo2':
                Modulo2.render(contentArea);
                break;
            case 'modulo3':
                Modulo3.render(contentArea);
                break;
            case 'modulo4':
                Modulo4.render(contentArea);
                break;
            case 'modulo_admin':
                ModuloAdmin.render(contentArea);
                break;
            default:
                Modulo1.render(contentArea);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    resetAllData() {
        if (confirm('¿Restablecer datos del sistema a los valores de fábrica?')) {
            dataStore.resetToSeed();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

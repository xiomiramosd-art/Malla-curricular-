document.addEventListener('DOMContentLoaded', function() {

    // --- ESTRUCTURA DE DATOS DE LOS RAMOS ---
    // Cada objeto tiene: id (único), nombre, semestre y un array de requisitos (id's de otros ramos).
    // El id es crucial para la lógica de requisitos.
    const ramos = [
        // Semestre 1
        { id: 'grb', nombre: 'Gestión de riesgos biológicos', semestre: 1, requisitos: [] },
        { id: 'grsl', nombre: 'Gestión de riesgos en seguridad laboral', semestre: 1, requisitos: [] },
        { id: 'ofi', nombre: 'Ofimática para la prevención', semestre: 1, requisitos: [] },
        { id: 'pp', nombre: 'Procesos productivos', semestre: 1, requisitos: [] },
        { id: 'hbc', nombre: 'Habilidades básicas de comunicación', semestre: 1, requisitos: [] },
        { id: 'nm', nombre: 'Nivelación matemática', semestre: 1, requisitos: [] },

        // Semestre 2
        { id: 'grf', nombre: 'Gestión de riesgos físicos', semestre: 2, requisitos: ['grb'] },
        { id: 'grq', nombre: 'Gestión de riesgos químicos', semestre: 2, requisitos: ['grb'] },
        { id: 'gre', nombre: 'Gestión de riesgos ergonómicos', semestre: 2, requisitos: [] },
        { id: 'hce', nombre: 'Habilidades de comunicación efectiva', semestre: 2, requisitos: ['hbc'] },
        { id: 'hag', nombre: 'Herramientas de análisis para la gestión', semestre: 2, requisitos: [] },
        { id: 'fa', nombre: 'Fundamentos de antropología', semestre: 2, requisitos: [] },

        // Semestre 3
        { id: 'ppsso', nombre: 'Planes y programas en SSO', semestre: 3, requisitos: [] },
        { id: 'ara', nombre: 'Análisis y reducción de accidentabilidad', semestre: 3, requisitos: [] },
        { id: 'mpri', nombre: 'Materiales peligrosos y riesgo de incendios', semestre: 3, requisitos: [] },
        { id: 'grp', nombre: 'Gestión de riesgos psicosociales', semestre: 3, requisitos: [] },
        { id: 'cfc', nombre: 'Curso de formación cristiana', semestre: 3, requisitos: [] },
        { id: 'ib1', nombre: 'Ingles básico 1', semestre: 3, requisitos: [] },

        // Semestre 4
        { id: 'sgsso', nombre: 'Sistemas de gestión en SSO', semestre: 4, requisitos: [] },
        { id: 'csso', nombre: 'Capacitación en SSO', semestre: 4, requisitos: [] },
        { id: 'ci', nombre: 'Control de incidencias', semestre: 4, requisitos: ['mpri'] },
        { id: 'spsso', nombre: 'Supervisión de programas en SSO', semestre: 4, requisitos: [] },
        { id: 'me', nombre: 'Mentalidad emprendedora', semestre: 4, requisitos: [] },
        { id: 'ib2', nombre: 'Ingles básico 2', semestre: 4, requisitos: ['ib1'] },
        { id: 'et', nombre: 'Ética para el trabajo', semestre: 4, requisitos: ['fa'] },

        // Semestre 5
        { id: 'sgma', nombre: 'Sistemas de gestión en medio ambiente', semestre: 5, requisitos: ['sgsso'] },
        { id: 'sgc', nombre: 'Sistemas de gestión de calidad', semestre: 5, requisitos: ['sgsso'] },
        { id: 'cmr', nombre: 'Contaminantes y manejo de residuos', semestre: 5, requisitos: [] },
        { id: 'pfsso', nombre: 'Planes de formación en SSO', semestre: 5, requisitos: [] },
        { id: 'pl', nombre: 'Practica laboral', semestre: 5, requisitos: [] },
        { id: 'ei', nombre: 'Estadística inferencial', semestre: 5, requisitos: ['hag'] },
        { id: 'ie1', nombre: 'Ingles elemental 1', semestre: 5, requisitos: ['ib2'] },
        { id: 'fc1', nombre: 'Formación complementaria', semestre: 5, requisitos: [] },

        // Semestre 6
        { id: 'sgi', nombre: 'Sistemas de gestión integrados', semestre: 6, requisitos: ['sgma', 'sgc'] },
        { id: 'asg', nombre: 'Auditoría en sistemas de gestión', semestre: 6, requisitos: ['sgc'] },
        { id: 'isrh', nombre: 'Integración de SSO y RRHH', semestre: 6, requisitos: [] },
        { id: 'cop', nombre: 'Cultura organizacional y prevención', semestre: 6, requisitos: [] },
        { id: 'fep', nombre: 'Finanzas para la evaluación de proyectos', semestre: 6, requisitos: [] },
        { id: 'get', nombre: 'Gestión de equipos de trabajo', semestre: 6, requisitos: [] },
        { id: 'ie2', nombre: 'Ingles elemental 2', semestre: 6, requisitos: ['ie1'] },
        { id: 'fc2', nombre: 'Formación complementaria', semestre: 6, requisitos: [] },

        // Semestre 7
        { id: 'opsso', nombre: 'Optimización de procesos y SSO', semestre: 7, requisitos: ['fep'] },
        { id: 'coad', nombre: 'Continuidad operacional ante desastres', semestre: 7, requisitos: [] },
        { id: 'egpsso', nombre: 'Evaluación y gestión de proyectos en SSO', semestre: 7, requisitos: ['fep'] },
        { id: 'gfa', nombre: 'Gestión financiera y administrativa', semestre: 7, requisitos: [] },
        { id: 'iop', nombre: 'Innovación operacional y de procesos', semestre: 7, requisitos: ['me'] },
        { id: 'ep', nombre: 'Ética profesional', semestre: 7, requisitos: ['et'] },
        
        // Semestre 8
        { id: 'pt', nombre: 'Portafolio de titulo', semestre: 8, requisitos: [] },
        { id: 'pprof', nombre: 'Práctica profesional', semestre: 8, requisitos: [] }
    ];

    const contenedorMalla = document.getElementById('malla-curricular');
    let aprobados = []; // Array que contendrá los IDs de los ramos aprobados

    // --- FUNCIÓN PARA INICIALIZAR LA MALLA ---
    function inicializarMalla() {
        // Cargar los ramos aprobados desde localStorage
        const guardados = localStorage.getItem('ramosAprobados');
        if (guardados) {
            aprobados = JSON.parse(guardados);
        }

        // Determinar el número máximo de semestres
        const maxSemestre = Math.max(...ramos.map(r => r.semestre));

        // Crear una columna por cada semestre
        for (let i = 1; i <= maxSemestre; i++) {
            const columna = document.createElement('div');
            columna.classList.add('semestre-columna');
            columna.innerHTML = `<h2>Semestre ${i}</h2>`;
            
            // Filtrar y añadir los ramos correspondientes a este semestre
            ramos.filter(ramo => ramo.semestre === i).forEach(ramo => {
                const ramoDiv = document.createElement('div');
                ramoDiv.classList.add('ramo');
                ramoDiv.dataset.id = ramo.id; // Usamos data-id para identificar el ramo
                ramoDiv.textContent = ramo.nombre;
                
                // Añadir evento de clic
                ramoDiv.addEventListener('click', () => onRamoClick(ramo.id));
                
                columna.appendChild(ramoDiv);
            });
            contenedorMalla.appendChild(columna);
        }

        actualizarVisualizacionRamos();
    }

    // --- FUNCIÓN EJECUTADA AL HACER CLIC EN UN RAMO ---
    function onRamoClick(idRamo) {
        const ramo = ramos.find(r => r.id === idRamo);
        if (!ramo) return;

        const requisitosFaltantes = verificarRequisitos(idRamo);

        if (aprobados.includes(idRamo)) {
            // Si el ramo ya está aprobado, se desaprueba
            desaprobarRamo(idRamo);
        } else if (requisitosFaltantes.length === 0) {
            // Si no está aprobado y no le faltan requisitos, se aprueba
            aprobarRamo(idRamo);
        } else {
            // Si está bloqueado, mostrar notificación
            const nombresRamosFaltantes = requisitosFaltantes.map(id => ramos.find(r => r.id === id).nombre);
            mostrarNotificacion(`Requisitos pendientes: ${nombresRamosFaltantes.join(', ')}`);
        }
    }
    
    // --- LÓGICA DE APROBACIÓN Y REQUISITOS ---

    function aprobarRamo(idRamo) {
        if (!aprobados.includes(idRamo)) {
            aprobados.push(idRamo);
            guardarProgreso();
            actualizarVisualizacionRamos();
        }
    }

    function desaprobarRamo(idRamo) {
        // Lógica para desaprobar un ramo y todos los que dependen de él
        let aDesaprobar = [idRamo];
        let i = 0;
        while(i < aDesaprobar.length){
            const idActual = aDesaprobar[i];
            // Encontrar todos los ramos que tienen el ramo actual como requisito
            const dependientes = ramos.filter(r => r.requisitos.includes(idActual));
            dependientes.forEach(dep => {
                if(aprobados.includes(dep.id) && !aDesaprobar.includes(dep.id)){
                    aDesaprobar.push(dep.id);
                }
            });
            i++;
        }
        
        // Quitar todos los ramos identificados de la lista de aprobados
        aprobados = aprobados.filter(id => !aDesaprobar.includes(id));
        guardarProgreso();
        actualizarVisualizacionRamos();
    }

    function verificarRequisitos(idRamo) {
        const ramo = ramos.find(r => r.id === idRamo);
        if (!ramo || ramo.requisitos.length === 0) {
            return []; // No tiene requisitos
        }
        // Devuelve un array con los IDs de los requisitos que NO están en la lista de aprobados
        return ramo.requisitos.filter(req => !aprobados.includes(req));
    }

    // --- ACTUALIZACIÓN VISUAL ---
    function actualizarVisualizacionRamos() {
        document.querySelectorAll('.ramo').forEach(ramoDiv => {
            const id = ramoDiv.dataset.id;
            const requisitosFaltantes = verificarRequisitos(id);

            ramoDiv.classList.remove('aprobado', 'bloqueado');

            if (aprobados.includes(id)) {
                ramoDiv.classList.add('aprobado');
            } else if (requisitosFaltantes.length > 0) {
                ramoDiv.classList.add('bloqueado');
            }
        });
    }

    // --- PERSISTENCIA DE DATOS (localStorage) ---
    function guardarProgreso() {
        localStorage.setItem('ramosAprobados', JSON.stringify(aprobados));
    }

    // --- NOTIFICACIONES ---
    function mostrarNotificacion(mensaje) {
        const notificacionDiv = document.getElementById('notificacion');
        notificacionDiv.textContent = mensaje;
        notificacionDiv.classList.add('mostrar');

        // Ocultar la notificación después de 3 segundos
        setTimeout(() => {
            notificacionDiv.classList.remove('mostrar');
        }, 3000);
    }

    // --- INICIAR LA APLICACIÓN ---
    inicializarMalla();
});

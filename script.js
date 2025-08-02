// Espera a que todo el contenido del HTML se cargue antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINICIÓN DE DATOS DE LA MALLA ---
    // Se definen todos los ramos con un ID único, nombre, semestre y sus requisitos.
    // El ID es importante para las dependencias y el guardado.
    const ramos = [
        // Semestre 1
        { id: 'gestion-riesgos-biologicos', nombre: 'Gestión de riesgos biológicos', semestre: 1, requisitos: [] },
        { id: 'gestion-riesgos-seguridad-laboral', nombre: 'Gestión de riesgos en seguridad laboral', semestre: 1, requisitos: [] },
        { id: 'ofimatica-prevencion', nombre: 'Ofimática para la prevención', semestre: 1, requisitos: [] },
        { id: 'procesos-productivos', nombre: 'Procesos productivos', semestre: 1, requisitos: [] },
        { id: 'habilidades-basicas-comunicacion', nombre: 'Habilidades básicas de comunicación', semestre: 1, requisitos: [] },
        { id: 'nivelacion-matematica', nombre: 'Nivelación matemática', semestre: 1, requisitos: [] },
        
        // Semestre 2
        { id: 'gestion-riesgos-fisicos', nombre: 'Gestión de riesgos físicos', semestre: 2, requisitos: ['gestion-riesgos-biologicos'] },
        { id: 'gestion-riesgos-quimicos', nombre: 'Gestión de riesgos químicos', semestre: 2, requisitos: ['gestion-riesgos-biologicos'] },
        { id: 'gestion-riesgos-ergonomicos', nombre: 'Gestión de riesgos ergonómicos', semestre: 2, requisitos: [] },
        { id: 'habilidades-comunicacion-efectiva', nombre: 'Habilidades de comunicación efectiva', semestre: 2, requisitos: ['habilidades-basicas-comunicacion'] },
        { id: 'herramientas-analisis-gestion', nombre: 'Herramientas de análisis para la gestión', semestre: 2, requisitos: [] },
        { id: 'fundamentos-antropologia', nombre: 'Fundamentos de antropología', semestre: 2, requisitos: [] },

        // Semestre 3
        { id: 'planes-programas-sso', nombre: 'Planes y programas en SSO', semestre: 3, requisitos: [] },
        { id: 'analisis-reduccion-accidentabilidad', nombre: 'Análisis y reducción de accidentabilidad', semestre: 3, requisitos: [] },
        { id: 'materiales-peligrosos-riesgo-incendios', nombre: 'Materiales peligrosos y riesgo de incendios', semestre: 3, requisitos: [] },
        { id: 'gestion-riesgos-psicosociales', nombre: 'Gestión de riesgos psicosociales', semestre: 3, requisitos: [] },
        { id: 'curso-formacion-cristiana', nombre: 'Curso de formación cristiana', semestre: 3, requisitos: [] },
        { id: 'ingles-basico-1', nombre: 'Ingles básico 1', semestre: 3, requisitos: [] },

        // Semestre 4
        { id: 'sistemas-gestion-sso', nombre: 'Sistemas de gestión en SSO', semestre: 4, requisitos: [] },
        { id: 'capacitacion-sso', nombre: 'Capacitación en SSO', semestre: 4, requisitos: [] },
        { id: 'control-incidencias', nombre: 'Control de incidencias', semestre: 4, requisitos: ['materiales-peligrosos-riesgo-incendios'] },
        { id: 'supervision-programas-sso', nombre: 'Supervisión de programas en SSO', semestre: 4, requisitos: [] },
        { id: 'mentalidad-emprendedora', nombre: 'Mentalidad emprendedora', semestre: 4, requisitos: [] },
        { id: 'ingles-basico-2', nombre: 'Ingles básico 2', semestre: 4, requisitos: ['ingles-basico-1'] },
        { id: 'etica-trabajo', nombre: 'Ética para el trabajo', semestre: 4, requisitos: ['fundamentos-antropologia'] },

        // Semestre 5
        { id: 'sistemas-gestion-medio-ambiente', nombre: 'Sistemas de gestión en medio ambiente', semestre: 5, requisitos: ['sistemas-gestion-sso'] },
        { id: 'sistemas-gestion-calidad', nombre: 'Sistemas de gestión de calidad', semestre: 5, requisitos: ['sistemas-gestion-sso'] },
        { id: 'contaminantes-manejo-residuos', nombre: 'Contaminantes y manejo de residuos', semestre: 5, requisitos: [] },
        { id: 'planes-formacion-sso', nombre: 'Planes de formación en SSO', semestre: 5, requisitos: [] },
        { id: 'practica-laboral', nombre: 'Practica laboral', semestre: 5, requisitos: [] },
        { id: 'estadistica-inferencial', nombre: 'Estadística inferencial', semestre: 5, requisitos: ['herramientas-analisis-gestion'] },
        { id: 'ingles-elemental-1', nombre: 'Ingles elemental 1', semestre: 5, requisitos: ['ingles-basico-2'] },
        { id: 'formacion-complementaria-5', nombre: 'Formación complementaria', semestre: 5, requisitos: [] },

        // Semestre 6
        { id: 'sistemas-gestion-integrados', nombre: 'Sistemas de gestión integrados', semestre: 6, requisitos: ['sistemas-gestion-medio-ambiente', 'sistemas-gestion-calidad'] },
        { id: 'auditoria-sistemas-gestion', nombre: 'Auditoría en sistemas de gestión', semestre: 6, requisitos: ['sistemas-gestion-calidad'] },
        { id: 'integracion-sso-rrhh', nombre: 'Integración de SSO y RRHH', semestre: 6, requisitos: [] },
        { id: 'cultura-organizacional-prevencion', nombre: 'Cultura organizacional y prevención', semestre: 6, requisitos: [] },
        { id: 'finanzas-evaluacion-proyectos', nombre: 'Finanzas para la evaluación de proyectos', semestre: 6, requisitos: [] },
        { id: 'gestion-equipos-trabajo', nombre: 'Gestión de equipos de trabajo', semestre: 6, requisitos: [] },
        { id: 'ingles-elemental-2', nombre: 'Ingles elemental 2', semestre: 6, requisitos: ['ingles-elemental-1'] },
        { id: 'formacion-complementaria-6', nombre: 'Formación complementaria', semestre: 6, requisitos: [] },

        // Semestre 7
        { id: 'optimizacion-procesos-sso', nombre: 'Optimización de procesos y SSO', semestre: 7, requisitos: ['finanzas-evaluacion-proyectos'] },
        { id: 'continuidad-operacional-desastres', nombre: 'Continuidad operacional ante desastres', semestre: 7, requisitos: [] },
        { id: 'evaluacion-gestion-proyectos-sso', nombre: 'Evaluación y gestión de proyectos en SSO', semestre: 7, requisitos: ['finanzas-evaluacion-proyectos'] },
        { id: 'gestion-financiera-administrativa', nombre: 'Gestión financiera y administrativa', semestre: 7, requisitos: [] },
        { id: 'innovacion-operacional-procesos', nombre: 'Innovación operacional y de procesos', semestre: 7, requisitos: ['mentalidad-emprendedora'] },
        { id: 'etica-profesional', nombre: 'Ética profesional', semestre: 7, requisitos: ['etica-trabajo'] },

        // Semestre 8
        { id: 'portafolio-titulo', nombre: 'Portafolio de titulo', semestre: 8, requisitos: [] },
        { id: 'practica-profesional', nombre: 'Práctica profesional', semestre: 8, requisitos: [] },
    ];
    
    const container = document.getElementById('malla-curricular-container');
    const totalSemestres = 8;
    let ramosAprobados = new Set(JSON.parse(localStorage.getItem('ramosAprobados')) || []);

    // --- 2. FUNCIÓN PARA GENERAR LA ESTRUCTURA HTML DE LA MALLA ---
    const generarMalla = () => {
        for (let i = 1; i <= totalSemestres; i++) {
            // Crear una columna para cada semestre
            const semestreDiv = document.createElement('div');
            semestreDiv.className = 'semestre';
            semestreDiv.innerHTML = `<h2>Semestre ${i}</h2>`;
            
            // Filtrar los ramos que pertenecen al semestre actual
            const ramosDelSemestre = ramos.filter(ramo => ramo.semestre === i);
            
            // Crear un elemento div para cada ramo
            ramosDelSemestre.forEach(ramo => {
                const ramoDiv = document.createElement('div');
                ramoDiv.className = 'ramo';
                ramoDiv.id = ramo.id;
                ramoDiv.textContent = ramo.nombre;
                // Guardar los requisitos en un atributo data-* para fácil acceso
                ramoDiv.dataset.requisitos = JSON.stringify(ramo.requisitos);
                semestreDiv.appendChild(ramoDiv);
            });
            
            container.appendChild(semestreDiv);
        }
    };

    // --- 3. FUNCIONES PARA MANEJAR EL ESTADO (APROBADO/BLOQUEADO) ---
    
    // Actualiza la clase 'aprobado' en los elementos visuales según el set de ramosAprobados
    const actualizarRamosAprobados = () => {
        document.querySelectorAll('.ramo').forEach(ramoDiv => {
            if (ramosAprobados.has(ramoDiv.id)) {
                ramoDiv.classList.add('aprobado');
            } else {
                ramoDiv.classList.remove('aprobado');
            }
        });
    };

    // Revisa los requisitos y añade o quita la clase 'bloqueado'
    const actualizarEstadoBloqueo = () => {
        document.querySelectorAll('.ramo').forEach(ramoDiv => {
            if (ramoDiv.classList.contains('aprobado')) {
                ramoDiv.classList.remove('bloqueado');
                return;
            }

            const requisitos = JSON.parse(ramoDiv.dataset.requisitos);
            const requisitosFaltantes = requisitos.filter(req => !ramosAprobados.has(req));

            if (requisitosFaltantes.length > 0) {
                ramoDiv.classList.add('bloqueado');
            } else {
                ramoDiv.classList.remove('bloqueado');
            }
        });
    };
    
    // Guarda el set de ramos aprobados en el localStorage del navegador
    const guardarProgreso = () => {
        localStorage.setItem('ramosAprobados', JSON.stringify(Array.from(ramosAprobados)));
    };

    // --- 4. MANEJADOR DE EVENTOS ---

    // Función que se ejecuta al hacer clic en un ramo
    const manejarClickEnRamo = (e) => {
        // Solo reaccionar si se hizo clic en un elemento con la clase 'ramo'
        if (!e.target.classList.contains('ramo')) return;

        const ramoId = e.target.id;
        const ramoDiv = e.target;
        
        // Si el ramo ya está aprobado, permitir des-aprobarlo
        if (ramoDiv.classList.contains('aprobado')) {
            ramosAprobados.delete(ramoId);
        } else {
            // Si está bloqueado, mostrar alerta y no hacer nada más
            if (ramoDiv.classList.contains('bloqueado')) {
                const requisitos = JSON.parse(ramoDiv.dataset.requisitos);
                const faltantes = requisitos
                    .filter(reqId => !ramosAprobados.has(reqId))
                    .map(reqId => ramos.find(r => r.id === reqId).nombre); // Busca el nombre completo
                
                alert(`🔴 Ramo bloqueado. \nDebes aprobar primero:\n\n- ${faltantes.join('\n- ')}`);
                return;
            }
            // Si no está bloqueado ni aprobado, lo aprueba
            ramosAprobados.add(ramoId);
        }
        
        // Actualizar el estado visual y guardar el progreso
        actualizarRamosAprobados();
        actualizarEstadoBloqueo();
        guardarProgreso();
    };

    // --- 5. INICIALIZACIÓN DE LA APLICACIÓN ---
    
    generarMalla(); // Dibuja la malla en la página
    actualizarRamosAprobados(); // Pinta los ramos guardados como aprobados
    actualizarEstadoBloqueo(); // Bloquea los ramos cuyos requisitos no están cumplidos
    
    // Añadir un único listener de eventos al contenedor principal (más eficiente)
    container.addEventListener('click', manejarClickEnRamo);
});

// Datos de ejemplo para la aplicación
const sampleData = {
    students: [
        {
            id: 1,
            matricula: 'EST2024001',
            nombre: 'Wilson Pascal Villota',
            grado: '3er semestre',
            email: 'wilson.villota@educacionfuturo.edu',
            telefono: '099999999',
            promedio: 9.8,
            estado: 'activo',
            fechaIngreso: '2025-12-01'
        },
        {
            id: 2,
            matricula: 'EST2024002',
            nombre: 'Andres Simabaña',
            grado: '3er semestre',
            email: 'andres.simabaña@educacionfuturo.edu',
            telefono: '099999998',
            promedio: 9.5,
            estado: 'activo',
            fechaIngreso: '2025-12-01'
        },
        {
            id: 3,
            matricula: 'EST2024003',
            nombre: 'Wendy Pamela Macias Guaranda',
            grado: '3er semestre',
            email: 'wendy.macias@educacionfuturo.edu',
            telefono: '099999997',
            promedio: 9.5,
            estado: 'activo',
            fechaIngreso: '2025-12-01'
        },
        {
            id: 4,
            matricula: 'EST2024004',
            nombre: 'Karla Bachón',
            grado: '3er semestre',
            email: 'karla.bachon@educacionfuturo.edu',
            telefono: '099999996',
            promedio: 6.2,
            estado: 'activo',
            fechaIngreso: '2025-12-01'
        },
        {
            id: 5,
            matricula: 'EST2024005',
            nombre: 'Jhon Cano',
            grado: '3er semestre',
            email: 'jhon.cano@educacionfuturo.edu',
            telefono: '099999995',
            promedio: 8.7,
            estado: 'inactivo',
            fechaIngreso: '2025-12-01'
        }
    ],
    courses: [
        {
            id: 1,
            codigo: 'MAT101',
            nombre: 'Programación orientada a objetos',
            profesor: 'Dr. Jhon Miller',
            grado: '3 semestre',
            horario: 'L-V 8:00-10:00',
            aula: 'Aula 201',
            cupo: 30,
            inscritos: 25,
            promedio: 8.5
        },
        {
            id: 2,
            codigo: 'HIS201',
            nombre: 'Calidad de software',
            profesor: 'Dr. Isaac Arteaga',
            grado: '3 semestre',
            horario: 'L-V 8:00-10:00',
            aula: 'Aula 105',
            cupo: 25,
            inscritos: 22,
            promedio: 8.8
        },
        {
            id: 3,
            codigo: 'CIE301',
            nombre: 'Programación funcional',
            profesor: 'Prof. Alex Velez',
            grado: '3 semestre',
            horario: 'L-V 11:00-13:00',
            aula: 'Lab. 301',
            cupo: 20,
            inscritos: 18,
            promedio: 8.0
        },
        {
            id: 4,
            codigo: 'ING401',
            nombre: 'Inglés Avanzado',
            profesor: 'Mr. John Smith',
            grado: 'Todos',
            horario: 'M-J 14:00-16:00',
            aula: 'Aula 204',
            cupo: 30,
            inscritos: 28,
            promedio: 9.0
        }
    ],
    grades: [
        {
            id: 1,
            estudiante: 'Wilson Pascal Villota',
            curso: 'Fundamentos de programación y metodología de desarrollo de software',
            parcial1: 9.5,
            parcial2: 10.0,
            parcial3: 9.8,
            final: 9.5,
            promedio: 9.7,
            estado: 'aprobado'
        },
        {
            id: 2,
            estudiante: 'Andres Simabaña',
            curso: 'Calidad de software',
            parcial1: 7.0,
            parcial2: 8.0,
            parcial3: 7.5,
            final: 7.0,
            promedio: 7.4,
            estado: 'aprobado'
        },
        {
            id: 3,
            estudiante: 'Wendy Pamela Macias Guaranda',
            curso: 'Programación funcional',
            parcial1: 9.0,
            parcial2: 9.5,
            parcial3: 10.0,
            final: 9.5,
            promedio: 9.5,
            estado: 'aprobado'
        }
    ]
};


let currentStudents = [...sampleData.students];
let currentCourses = [...sampleData.courses];


document.addEventListener('DOMContentLoaded', function() {
    
    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentDate').textContent = currentDate;

    
    initNavigation();
    initStudentsSection();
    initCoursesSection();
    initGradesSection();
    initReportsSection();
    initModals();
    initEventListeners();
    
    
    loadStudentsTable();
    loadCoursesGrid();
    loadGradesTable();
});


function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            
            navLinks.forEach(l => l.classList.remove('active'));
            
            
            this.classList.add('active');
            
            
            sections.forEach(section => section.classList.remove('active'));
            
            
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
            
            
            document.getElementById('navMenu').classList.remove('active');
        });
    });
    
    
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}


function initStudentsSection() {
    const btnNewStudent = document.getElementById('btnNewStudent');
    const searchInput = document.getElementById('searchStudent');
    const filterGrade = document.getElementById('filterGrade');
    
    if (btnNewStudent) {
        btnNewStudent.addEventListener('click', function() {
            document.getElementById('studentModal').classList.add('active');
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterStudents();
        });
    }
    
    if (filterGrade) {
        filterGrade.addEventListener('change', function() {
            filterStudents();
        });
    }
}

function loadStudentsTable() {
    const tbody = document.getElementById('studentsTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    currentStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.matricula}</td>
            <td>${student.nombre}</td>
            <td>${student.grado}</td>
            <td>${student.email}</td>
            <td>${student.telefono}</td>
            <td><strong>${student.promedio.toFixed(1)}</strong></td>
            <td>
                <span class="status-badge ${student.estado === 'activo' ? 'status-active' : 'status-inactive'}">
                    ${student.estado === 'activo' ? 'Activo' : 'Inactivo'}
                </span>
            </td>
            <td>
                <button class="btn-action" onclick="editStudent(${student.id})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action" onclick="viewStudent(${student.id})" title="Ver">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action danger" onclick="deleteStudent(${student.id})" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterStudents() {
    const searchTerm = document.getElementById('searchStudent').value.toLowerCase();
    const selectedGrade = document.getElementById('filterGrade').value;
    
    currentStudents = sampleData.students.filter(student => {
        const matchesSearch = student.nombre.toLowerCase().includes(searchTerm) ||
                            student.matricula.toLowerCase().includes(searchTerm);
        const matchesGrade = !selectedGrade || student.grado === selectedGrade;
        
        return matchesSearch && matchesGrade;
    });
    
    loadStudentsTable();
}


function initCoursesSection() {
    const btnNewCourse = document.getElementById('btnNewCourse');
    
    if (btnNewCourse) {
        btnNewCourse.addEventListener('click', function() {
            alert('Funcionalidad de nuevo curso - En desarrollo');
        });
    }
}

function loadCoursesGrid() {
    const grid = document.getElementById('coursesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    currentCourses.forEach(course => {
        const progress = (course.inscritos / course.cupo) * 100;
        
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-header">
                <span class="course-code">${course.codigo}</span>
                <span class="status-badge status-active">Activo</span>
            </div>
            <h3 class="course-title">${course.nombre}</h3>
            <div class="course-info">
                <span><i class="fas fa-chalkboard-teacher"></i> ${course.profesor}</span>
                <span><i class="fas fa-users"></i> ${course.inscritros}/${course.cupo} estudiantes</span>
            </div>
            <div class="course-info">
                <span><i class="fas fa-clock"></i> ${course.horario}</span>
                <span><i class="fas fa-door-open"></i> ${course.aula}</span>
            </div>
            <div class="course-progress">
                <div class="progress-bar">
                    <div style="width: ${progress}%"></div>
                </div>
            </div>
            <div class="course-stats">
                <span><strong>Promedio:</strong> ${course.promedio.toFixed(1)}</span>
                <span><strong>Grado:</strong> ${course.grado}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}


function initGradesSection() {
    const selectCourse = document.getElementById('selectCourse');
    const selectPeriod = document.getElementById('selectPeriod');
    
    if (selectCourse) {
        selectCourse.addEventListener('change', function() {
            loadGradesTable();
        });
    }
    
    if (selectPeriod) {
        selectPeriod.addEventListener('change', function() {
            loadGradesTable();
        });
    }
}

function loadGradesTable() {
    const tbody = document.getElementById('gradesTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    sampleData.grades.forEach(grade => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${grade.estudiante}</td>
            <td>${grade.parcial1.toFixed(1)}</td>
            <td>${grade.parcial2.toFixed(1)}</td>
            <td>${grade.parcial3.toFixed(1)}</td>
            <td>${grade.final.toFixed(1)}</td>
            <td><strong>${grade.promedio.toFixed(1)}</strong></td>
            <td>
                <span class="status-badge ${grade.estado === 'aprobado' ? 'status-active' : 'status-inactive'}">
                    ${grade.estado === 'aprobado' ? 'Aprobado' : 'Reprobado'}
                </span>
            </td>
            <td>
                <button class="btn-action" onclick="editGrade(${grade.id})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action" onclick="viewGradeDetails(${grade.id})" title="Detalles">
                    <i class="fas fa-info-circle"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


function initReportsSection() {
    const reportButtons = document.querySelectorAll('.btn-report');
    
    reportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reportType = this.getAttribute('data-type');
            generateReportPreview(reportType);
        });
    });
    
    const btnGenerateReport = document.getElementById('btnGenerateReport');
    if (btnGenerateReport) {
        btnGenerateReport.addEventListener('click', function() {
            generatePDFReport();
        });
    }
}

function generateReportPreview(type) {
    const preview = document.getElementById('reportPreview');
    
    let content = '';
    
    switch(type) {
        case 'grades':
            content = `
                <h4>📊 Reporte de Calificaciones</h4>
                <p>Generado: ${new Date().toLocaleDateString()}</p>
                <hr>
                <p><strong>Resumen del Período:</strong></p>
                <ul>
                    <li>Total de estudiantes evaluados: ${sampleData.grades.length}</li>
                    <li>Promedio general: 8.7</li>
                    <li>Porcentaje de aprobación: 92%</li>
                    <li>Estudiantes destacados: 3</li>
                </ul>
                <p>Este reporte incluye todas las calificaciones del sistema.</p>
            `;
            break;
            
        case 'students':
            content = `
                <h4>👥 Lista de Estudiantes</h4>
                <p>Generado: ${new Date().toLocaleDateString()}</p>
                <hr>
                <p><strong>Resumen de Estudiantes:</strong></p>
                <ul>
                    <li>Total de estudiantes: ${sampleData.students.length}</li>
                    <li>Activos: ${sampleData.students.filter(s => s.estado === 'activo').length}</li>
                    <li>Por grado:</li>
                    <ul>
                        <li>1er Grado: ${sampleData.students.filter(s => s.grado === '1ro').length}</li>
                        <li>2do Grado: ${sampleData.students.filter(s => s.grado === '2do').length}</li>
                        <li>3er Grado: ${sampleData.students.filter(s => s.grado === '3ro').length}</li>
                        <li>4to Grado: ${sampleData.students.filter(s => s.grado === '4to').length}</li>
                    </ul>
                </ul>
            `;
            break;
            
        case 'statistics':
            content = `
                <h4>📈 Estadísticas Académicas</h4>
                <p>Generado: ${new Date().toLocaleDateString()}</p>
                <hr>
                <p><strong>Análisis de Rendimiento:</strong></p>
                <ul>
                    <li>Promedio institucional: 8.3</li>
                    <li>Distribución de calificaciones:</li>
                    <ul>
                        <li>9.0-10.0: 25% de estudiantes</li>
                        <li>8.0-8.9: 35% de estudiantes</li>
                        <li>7.0-7.9: 20% de estudiantes</li>
                        <li>6.0-6.9: 12% de estudiantes</li>
                        <li>Menos de 6.0: 8% de estudiantes</li>
                    </ul>
                    <li>Tendencia: 📈 Mejora del 5% vs período anterior</li>
                </ul>
            `;
            break;
            
        case 'attendance':
            content = `
                <h4>✅ Control de Asistencia</h4>
                <p>Generado: ${new Date().toLocaleDateString()}</p>
                <hr>
                <p><strong>Resumen de Asistencia:</strong></p>
                <ul>
                    <li>Asistencia promedio: 92%</li>
                    <li>Asistencia perfecta: 15 estudiantes</li>
                    <li>Con inasistencias justificadas: 8 estudiantes</li>
                    <li>Con inasistencias injustificadas: 2 estudiantes</li>
                    <li>Curso con mejor asistencia: Inglés (95%)</li>
                </ul>
            `;
            break;
            
        default:
            content = '<p>Seleccione un tipo de reporte para ver la vista previa</p>';
    }
    
    preview.innerHTML = content;
}

function generatePDFReport() {
    alert('📄 Generando reporte en PDF...\n\nEsta funcionalidad está en desarrollo.\nEn una versión completa, aquí se generaría y descargaría un archivo PDF con todos los datos.');
}


function initModals() {
    
    const studentModal = document.getElementById('studentModal');
    const closeStudentModal = document.getElementById('closeStudentModal');
    const cancelStudent = document.getElementById('cancelStudent');
    const saveStudent = document.getElementById('saveStudent');
    
    if (closeStudentModal) {
        closeStudentModal.addEventListener('click', () => {
            studentModal.classList.remove('active');
        });
    }
    
    if (cancelStudent) {
        cancelStudent.addEventListener('click', () => {
            studentModal.classList.remove('active');
        });
    }
    
    if (saveStudent) {
        saveStudent.addEventListener('click', function() {
            const form = document.getElementById('studentForm');
            
            if (form.checkValidity()) {
                
                alert('✅ Estudiante guardado exitosamente');
                studentModal.classList.remove('active');
                form.reset();
                
                
                loadStudentsTable();
            } else {
                alert('⚠️ Por favor, complete todos los campos requeridos');
            }
        });
    }
    
    
    const gradeModal = document.getElementById('gradeModal');
    const closeGradeModal = document.getElementById('closeGradeModal');
    const cancelGrade = document.getElementById('cancelGrade');
    const saveGrade = document.getElementById('saveGrade');
    
    if (closeGradeModal) {
        closeGradeModal.addEventListener('click', () => {
            gradeModal.classList.remove('active');
        });
    }
    
    if (cancelGrade) {
        cancelGrade.addEventListener('click', () => {
            gradeModal.classList.remove('active');
        });
    }
    
    if (saveGrade) {
        saveGrade.addEventListener('click', function() {
            const form = document.getElementById('gradeForm');
            
            if (form.checkValidity()) {
                alert('✅ Calificación asignada exitosamente');
                gradeModal.classList.remove('active');
                form.reset();
                
                
                loadGradesTable();
            } else {
                alert('⚠️ Por favor, complete todos los campos requeridos');
            }
        });
    }
    
    
    window.addEventListener('click', function(e) {
        const studentModal = document.getElementById('studentModal');
        const gradeModal = document.getElementById('gradeModal');
        
        if (studentModal && e.target === studentModal) {
            studentModal.classList.remove('active');
        }
        
        if (gradeModal && e.target === gradeModal) {
            gradeModal.classList.remove('active');
        }
    });
}


function initEventListeners() {
    
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            
            if (section) {
                
                document.querySelectorAll('.nav-menu a').forEach(link => link.classList.remove('active'));
                document.querySelectorAll('.dashboard-section').forEach(section => section.classList.remove('active'));
                
                const targetLink = document.querySelector(`.nav-menu a[href="#${section}"]`);
                if (targetLink) {
                    targetLink.classList.add('active');
                }
                
                document.getElementById(section).classList.add('active');
                
               
                if (this.textContent.includes('Nuevo Estudiante')) {
                    setTimeout(() => {
                        document.getElementById('studentModal').classList.add('active');
                    }, 300);
                }
            }
        });
    });
    
    
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            if (confirm('¿Está seguro que desea cerrar sesión?')) {
                alert('👋 Sesión cerrada. Redirigiendo al login...');
               
                window.location.reload();
            }
        });
    }
    
   
    const btnViewSchedule = document.getElementById('btnViewSchedule');
    if (btnViewSchedule) {
        btnViewSchedule.addEventListener('click', function() {
            alert('📅 Esta funcionalidad mostraría los horarios de todos los cursos.\n\nEn una versión completa, se mostraría una tabla con:\n- Día y hora de cada curso\n- Aula asignada\n- Profesor responsable\n- Estudiantes inscritos');
        });
    }
}


function editStudent(id) {
    const student = sampleData.students.find(s => s.id === id);
    if (student) {
        alert(`✏️ Editando estudiante: ${student.nombre}\n\nEsta funcionalidad abriría un formulario con los datos del estudiante para editar.\n\nDatos actuales:\n- Matrícula: ${student.matricula}\n- Grado: ${student.grado}\n- Email: ${student.email}\n- Teléfono: ${student.telefono}`);
    }
}

function viewStudent(id) {
    const student = sampleData.students.find(s => s.id === id);
    if (student) {
        const details = `
            👤 Detalles del Estudiante:
            
            🎫 Matrícula: ${student.matricula}
            📛 Nombre: ${student.nombre}
            🏫 Grado: ${student.grado}
            📧 Email: ${student.email}
            📞 Teléfono: ${student.telefono}
            📊 Promedio: ${student.promedio.toFixed(1)}
            📅 Fecha de ingreso: ${student.fechaIngreso}
            🏷️ Estado: ${student.estado === 'activo' ? '✅ Activo' : '❌ Inactivo'}
            
            📚 Cursos matriculados: 4
            📈 Rendimiento: Excelente
            🎯 Observaciones: Estudiante destacado
        `;
        alert(details);
    }
}

function deleteStudent(id) {
    const student = sampleData.students.find(s => s.id === id);
    if (student) {
        if (confirm(`¿Está seguro que desea eliminar al estudiante ${student.nombre}?`)) {
            
            alert(`✅ Estudiante ${student.nombre} eliminado exitosamente`);
           
            loadStudentsTable();
        }
    }
}


function editGrade(id) {
    const grade = sampleData.grades.find(g => g.id === id);
    if (grade) {
        alert(`✏️ Editando calificación de ${grade.estudiante}\n\nCurso: ${grade.curso}\nPromedio actual: ${grade.promedio.toFixed(1)}`);
    }
}

function viewGradeDetails(id) {
    const grade = sampleData.grades.find(g => g.id === id);
    if (grade) {
        const details = `
            📊 Detalles de Calificación:
            
            👤 Estudiante: ${grade.estudiante}
            📚 Curso: ${grade.curso}
            
            📝 Calificaciones parciales:
            • Parcial 1: ${grade.parcial1.toFixed(1)}
            • Parcial 2: ${grade.parcial2.toFixed(1)}
            • Parcial 3: ${grade.parcial3.toFixed(1)}
            
            🎯 Examen final: ${grade.final.toFixed(1)}
            📈 Promedio final: ${grade.promedio.toFixed(1)}
            
            🏆 Estado: ${grade.estado === 'aprobado' ? '✅ Aprobado' : '❌ Reprobado'}
            
            💬 Comentarios:
            ${grade.promedio >= 9 ? 'Excelente rendimiento, estudiante destacado.' : 
              grade.promedio >= 7 ? 'Buen rendimiento, puede mejorar.' :
              'Necesita refuerzo académico.'}
        `;
        alert(details);
    }
}


function exportData(type) {
    switch(type) {
        case 'students':
            const studentsCSV = 'Matrícula,Nombre,Grado,Email,Teléfono,Promedio,Estado\n' +
                sampleData.students.map(s => 
                    `${s.matricula},${s.nombre},${s.grado},${s.email},${s.telefono},${s.promedio},${s.estado}`
                ).join('\n');
            
           
            console.log('CSV de estudiantes:', studentsCSV);
            alert('📥 Lista de estudiantes exportada exitosamente\n\nEn una versión completa, se descargaría un archivo CSV.');
            break;
            
        case 'grades':
            alert('📊 Calificaciones exportadas exitosamente\n\nEn una versión completa, se generaría un archivo Excel con todas las calificaciones.');
            break;
    }
}


function simulateLoading(action) {
    alert(`🔄 ${action}...\n\nSimulando carga de datos del servidor.`);
    return new Promise(resolve => setTimeout(resolve, 1000));
}

// Exportar funciones globales (para uso en HTML onclick)
window.editStudent = editStudent;
window.viewStudent = viewStudent;
window.deleteStudent = deleteStudent;
window.editGrade = editGrade;
window.viewGradeDetails = viewGradeDetails;
window.exportData = exportData;
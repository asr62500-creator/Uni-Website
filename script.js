// Function to load external HTML sections
const sectionFiles = {
    home: '1_home.html',
    courses: '2_courses.html',
    student: '3_student_corner.html',
    academic: '4_academic.html',
    staff: '5_faculty.html',
    about: '6_About.html',
    contact: '7_contact_section.html',
    departments: '8_departments.html' // <--- PASTE THIS LINE HERE
};

async function loadSection(sectionName) {
    const contentArea = document.getElementById('content-area');
    try {
        const fileName = sectionFiles[sectionName] || `${sectionName}.html`;
        const response = await fetch(fileName);
        if (!response.ok) throw new Error('Failed to load file');
        
        const html = await response.text();
        contentArea.innerHTML = html;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
        console.error("Error loading section:", err);
        contentArea.innerHTML = `<div class="p-5 text-center text-danger"><h4>Security Error</h4><p>You cannot use fetch() with file:// protocol. Please open this folder using VS Code Live Server.</p></div>`;
    }
}

// Section Navigation Logic
function showSection(id, element) {
    // Update active UI state on sidebar
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    } else {
        // Fallback if triggered via search instead of click
        const navBtn = document.querySelector(`.nav-btn[onclick*="${id}"]`);
        if(navBtn) navBtn.classList.add('active');
    }

    // Load the file
    loadSection(id);
}

// Initial Load
window.onload = () => loadSection('home');

// --- Data for Dynamic Output (Course Details) ---
const staticCourses = {
    'BCA': { duration: '3 Years', fees: '₹25,000/semester', syllabus: 'Programming (C++, Java), DBMS, Web Dev', bg: 'var(--accent-1)' },
    'B.Sc': { duration: '3 Years', fees: '₹20,000/semester', syllabus: 'Physics, Chemistry, Mathematics', bg: 'var(--accent-2)' },
    'B.Com': { duration: '3 Years', fees: '₹18,000/semester', syllabus: 'Accounting, Economics, Business Studies', bg: '#f59e0b' },
    'MCA': { duration: '2 Years', fees: '₹35,000/semester', syllabus: 'Advanced Programming, AI, Data Structures', bg: '#10b981' },
    'MBA': { duration: '2 Years', fees: '₹40,000/semester', syllabus: 'Marketing, Finance, HR Management', bg: '#ef4444' }
};

// --- Data for Dynamic Output (Department Details) ---
const staticDepartments = {

    'CS & IT': { 
        head: 'Prof Vibhakar Mansotra',
        image: 'DeptOfCS&IT.png',   // <-- UPDATED
        programs: [
            'Master of Computer Applications (MCA)',
            'Bachelor of Computer Applications (BCA)',
            'Ph.D. in Computer Science'
        ], 
        staff: ['Prof Vibhakar Mansotra', 'Dr. Danishwar', 'Dr. Palvi', 'Swastik'],
        facilities: 'Advanced Computing Lab, AI Research Lab, Smart Classrooms', 
        bg: '#10b981' 
    },

    'Business School': { 
        head: 'Dr. Alka Sharma', 
        image: 'business.jpg',   // <-- UPDATED
        programs: [
            'Master of Business Administration (MBA)',
            'BBA',
            'Ph.D. in Management'
        ], 
        staff: ['Dr. Alka Sharma', 'Prof. Sameer Gupta', 'Dr. Vinay Chauhan'],
        facilities: 'Analytics Lab, Case Study Room, Conference Hall', 
        bg: '#f59e0b' 
    },

    'Physics': { 
        head: 'Prof. Arun Bharti', 
        image: 'physics.jpg',   // <-- UPDATED
        programs: [
            'M.Sc in Physics',
            'B.Sc Honors',
            'Ph.D. in Physics'
        ], 
        staff: ['Prof. Arun Bharti', 'Dr. Ramni Gupta', 'Dr. Rani Devi'],
        facilities: 'Quantum Mechanics Lab, Electronics Lab, Optics Center', 
        bg: '#3b82f6' 
    }
};

function showCourseDetails(courseKey) {
    const data = staticCourses[courseKey];
    const div = document.getElementById('courseDetails');
    if(data && div) {
        div.innerHTML = `
            <div class="d-flex align-items-center mb-3">
                <div style="width:15px; height:40px; background:${data.bg}; border-radius:5px; margin-right:15px;"></div>
                <h3 class="mb-0 fw-bold text-white">${courseKey} Details</h3>
            </div>
            <div class="row pt-2">
                <div class="col-md-4 mb-3">
                    <h6 class="text-info text-uppercase fw-bold"><i class="fa-regular fa-clock me-2"></i> Duration</h6>
                    <p class="fs-5 text-white">${data.duration}</p>
                </div>
                <div class="col-md-4 mb-3">
                    <h6 class="text-warning text-uppercase fw-bold"><i class="fa-solid fa-indian-rupee-sign me-2"></i> Fees</h6>
                    <p class="fs-5 text-white">${data.fees}</p>
                </div>
                <div class="col-md-4 mb-3">
                    <h6 class="text-success text-uppercase fw-bold"><i class="fa-solid fa-list me-2"></i> Core Subjects</h6>
                    <p class="text-white">${data.syllabus}</p>
                </div>
            </div>
        `;
        div.style.display = 'block';
        div.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

// --- Data for Dynamic Output (Staff Details) ---
function showStaffDetails(name, dept) {
    const div = document.getElementById('staffDetails');
    if(div) {
        div.innerHTML = `
            <h4 class="fw-bold mb-3 text-white"><i class="fa-solid fa-id-badge text-success me-2"></i> Selected Profile</h4>
            <div class="d-flex align-items-center mb-3 p-3" style="background: rgba(255,255,255,0.05); border-radius: 10px;">
                <i class="fa-solid fa-user-tie fa-3x text-muted me-4"></i>
                <div>
                    <h3 class="fw-bold text-white mb-0">${name}</h3>
                    <p class="text-info mb-0 fs-5">${dept} </p>
                </div>
            </div>
            <p class="text-muted">Clicking provides access to the professor's thesis directory, contact hours, and subject allocations within the university ERP portal.</p>
            <button class="btn btn-outline-success mt-2">View Full Profile <i class="fa-solid fa-arrow-up-right-from-square ms-2"></i></button>
        `;
        div.style.display = 'block';
        div.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

// Function to show the selected department's details
function showDepartmentDetails(deptKey) {
    const data = staticDepartments[deptKey];
    const div = document.getElementById('departmentDetails');
    
    if(data && div) {
        // Convert the arrays into HTML lists and badges
        const programsHTML = data.programs.map(prog => `<li>${prog}</li>`).join('');
        const staffHTML = data.staff.map(person => 
            `<span class="badge bg-secondary me-2 mb-2 p-2"
                style="cursor:pointer;"
                onclick="openFacultyFromDepartment('${person}')">
                ${person}
            </span>`
        ).join('');
        div.innerHTML = `
            <div class="d-flex align-items-center mb-4 border-bottom border-secondary pb-3">
                <div style="width:15px; height:40px; background:${data.bg}; border-radius:5px; margin-right:15px;"></div>
                <h3 class="mb-0 fw-bold text-white">Department of ${deptKey}</h3>
            </div>
            
            <div class="row g-4 pt-2">
                <div class="col-md-5">
                    <img src="${data.image}" alt="${deptKey} Building" class="img-fluid rounded-4 mb-3" style="width: 100%; height: 200px; object-fit: cover; border: 2px solid ${data.bg};">
                    <div class="p-3 rounded-3" style="background: rgba(255,255,255,0.05);">
                        <h6 class="text-success text-uppercase fw-bold mb-2"><i class="fa-solid fa-building-circle-check me-2"></i> Facilities</h6>
                        <p class="text-muted small mb-0">${data.facilities}</p>
                    </div>
                </div>

                <div class="col-md-7">
                    <div class="mb-4">
                        <h6 class="text-info text-uppercase fw-bold"><i class="fa-solid fa-user-tie me-2"></i> Head of Department</h6>
                        <p class="fs-5 text-white mb-0">${data.head}</p>
                    </div>
                    
                    <div class="mb-4">
                        <h6 class="text-warning text-uppercase fw-bold"><i class="fa-solid fa-graduation-cap me-2"></i> Academic Programs</h6>
                        <ul class="text-white ps-3 mb-0" style="line-height: 1.8;">
                            ${programsHTML}
                        </ul>
                    </div>

                    <div>
                        <h6 class="text-white text-uppercase fw-bold mb-3"><i class="fa-solid fa-users me-2"></i> Core Faculty</h6>
                        <div>
                            ${staffHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        div.style.borderLeftColor = data.bg;
        div.style.display = 'block';
        div.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

function openFacultyFromDepartment(name) {

    // Switch to Faculty section
    showSection('staff', null);

    // Wait for section to load (important because of fetch)
    setTimeout(() => {

        // Auto trigger staff details
        showStaffDetails(name, "Faculty Member");

        // Scroll to details
        const el = document.getElementById('staffDetails');
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }

    }, 300); // delay required because of dynamic loading
}

// --- Search Functionality ---
const searchableContent = [
    { id: 'home', title: 'Home / Overview', desc: 'Welcome, Excellence in Education, Virtual Tour' },
    { id: 'courses', title: 'Academic Programs (Courses)', desc: 'BCA, B.Sc, B.Com, MCA, MBA details' },
    { id: 'student', title: 'Student Zone', desc: 'Login, Register, Secure Access Gateway, Portal' },
    { id: 'academic', title: 'Academics', desc: 'Results, Attendance, Exam Schedules, Study Materials, e-Library' },
    { id: 'departments', title: 'University Departments', desc: 'CS & IT, Business School, Physics, Head of Department, Facilities' },
    { id: 'staff', title: 'Faculty & Staff', desc: 'Teaching, Non-Teaching, Professors, Administration' },
    { id: 'about', title: 'About Us', desc: 'Legacy, History, Infrastructure, Campus Life' },
    { id: 'contact', title: 'Contact Information', desc: 'Campus Location, Email, Phone, Social Media Updates' }
];

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsList = document.getElementById('searchResults');
    resultsList.innerHTML = '';

    if (query.trim().length === 0) return;

    const filtered = searchableContent.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        resultsList.innerHTML = '<li class="list-group-item text-muted text-center py-4 bg-transparent border-0">No matching sections found.</li>';
        return;
    }

    filtered.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item p-3 border-0 border-bottom d-flex align-items-center';
        li.style.background = 'transparent';
        li.style.cursor = 'pointer';
        li.style.color = '#e6f1ff';
        li.style.borderBottomColor = 'rgba(255,255,255,0.05) !important';
        
        li.innerHTML = `
            <i class="fa-solid fa-arrow-right text-info me-3"></i>
            <div>
                <h6 class="mb-0 fw-bold">${item.title}</h6>
                <small class="text-muted">${item.desc}</small>
            </div>
        `;
        
        li.onmouseover = () => { li.style.background = 'rgba(255, 255, 100, 0.1)'; };
        li.onmouseout = () => { li.style.background = 'transparent'; };
        
        li.onclick = () => {
            // Close Modal
            const searchModalEl = document.getElementById('searchModal');
            const modal = bootstrap.Modal.getInstance(searchModalEl);
            modal.hide();
            
            // Clear search
            document.getElementById('searchInput').value = '';
            resultsList.innerHTML = '';
            
            // Navigate properly
            showSection(item.id, null);
        };
        resultsList.appendChild(li);
    });
}
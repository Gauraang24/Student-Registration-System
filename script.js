document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const studentsTableBody = document.querySelector('#studentsTable tbody');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const studentName = document.getElementById('studentName').value.trim();
        const studentID = document.getElementById('studentID').value.trim();
        const email = document.getElementById('email').value.trim();
        const contactNumber = document.getElementById('contactNumber').value.trim();

        if (studentName === '' || studentID === '' || email === '' || contactNumber === '') {
            alert('All fields are required.');
            return;
        }

        addStudent({ studentName, studentID, email, contactNumber });
        form.reset();
    });

    //Add Student Function
    const addStudent = (student) => {
        const students = getStudentsFromLocalStorage();
        students.push(student);
        saveStudentsToLocalStorage(students);
        renderStudents();
    };

    //Edit Student Function
    const editStudent = (index) => {
        const students = getStudentsFromLocalStorage();
        const student = students[index];

        document.getElementById('studentName').value = student.studentName;
        document.getElementById('studentID').value = student.studentID;
        document.getElementById('email').value = student.email;
        document.getElementById('contactNumber').value = student.contactNumber;

        deleteStudent(index);
    };

    //Delete Student Function
    const deleteStudent = (index) => {
        const students = getStudentsFromLocalStorage();
        students.splice(index, 1);
        saveStudentsToLocalStorage(students);
        renderStudents();
    };

    // Get/Store student data in localStorage
    const getStudentsFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('students')) || [];
    };

    const saveStudentsToLocalStorage = (students) => {
        localStorage.setItem('students', JSON.stringify(students));
    };

    const renderStudents = () => {
        const students = getStudentsFromLocalStorage();
        studentsTableBody.innerHTML = '';

        students.forEach((student, index) => {
            const row = document.createElement('tr');

            Object.values(student).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });

            const actionsCell = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit';
            editButton.addEventListener('click', () => editStudent(index));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';
            deleteButton.addEventListener('click', () => deleteStudent(index));
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
            studentsTableBody.appendChild(row);
        });
    };

    renderStudents();
});

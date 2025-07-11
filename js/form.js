
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employee-form');
    const employeeId = new URLSearchParams(window.location.search).get('id');
    if (employeeId) {
        // Simulate fetching employee data
        const stored = JSON.parse(localStorage.getItem('employees')) || [];
        const emp = stored.find(e => e.id == employeeId);
        if (emp) {
            document.getElementById('employee-id').value = emp.id;
            document.getElementById('first-name').value = emp.firstName;
            document.getElementById('last-name').value = emp.lastName;
            document.getElementById('email').value = emp.email;
            document.getElementById('department').value = emp.department;
            document.getElementById('role').value = emp.role;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newEmp = {
            id: document.getElementById('employee-id').value || Date.now().toString(),
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            department: document.getElementById('department').value,
            role: document.getElementById('role').value
        };
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const index = employees.findIndex(e => e.id === newEmp.id);
        if (index > -1) {
            employees[index] = newEmp;
        } else {
            employees.push(newEmp);
        }
        localStorage.setItem('employees', JSON.stringify(employees));
        window.location.href = 'dashboard.html';
    });
});

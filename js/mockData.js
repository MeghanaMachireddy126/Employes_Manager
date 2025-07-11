
window.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('employees')) {
        const mockEmployees = [
            { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', department: 'HR', role: 'Manager' },
            { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', department: 'Engineering', role: 'Developer' },
            { id: '3', firstName: 'Alice', lastName: 'Johnson', email: 'alice.j@example.com', department: 'Marketing', role: 'Executive' }
        ];
        localStorage.setItem('employees', JSON.stringify(mockEmployees));
    }
});
<div id="pagination-controls" style="text-align:center; margin-top:20px;"></div>

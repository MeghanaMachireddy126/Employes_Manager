document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const employeeList = document.getElementById('employee-list');
  const pagination = document.getElementById('pagination-controls');

  let employees = JSON.parse(localStorage.getItem('employees')) || [];
  let filtered = [...employees];
  let currentPage = 1;
  const itemsPerPage = 5;

  const paginate = (list, page, perPage) => {
    const start = (page - 1) * perPage;
    return list.slice(start, start + perPage);
  };

  const renderPagination = (list) => {
    const totalPages = Math.ceil(list.length / itemsPerPage);
    if (totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }

    let html = `<button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">Prev</button>`;

    for (let i = 1; i <= totalPages; i++) {
      html += `<button ${i === currentPage ? 'style="font-weight:bold;"' : ''} onclick="goToPage(${i})">${i}</button>`;
    }

    html += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">Next</button>`;

    pagination.innerHTML = html;
  };

  const renderEmployees = (list) => {
    const pageItems = paginate(list, currentPage, itemsPerPage);
    employeeList.innerHTML = '';

    if (pageItems.length === 0) {
      employeeList.innerHTML = '<p>No results found.</p>';
      pagination.innerHTML = '';
      return;
    }

    pageItems.forEach(emp => {
      const card = document.createElement('div');
      card.className = 'employee-card';
      card.dataset.id = emp.id;
      card.innerHTML = `
        <h3>${emp.firstName} ${emp.lastName}</h3>
        <p><strong>Email:</strong> ${emp.email}</p>
        <p><strong>Department:</strong> ${emp.department}</p>
        <p><strong>Role:</strong> ${emp.role}</p>
        <button class="edit-btn" data-id="${emp.id}">Edit</button>
        <button class="delete-btn" data-id="${emp.id}">Delete</button>
      `;
      employeeList.appendChild(card);
    });

    attachEvents();
    renderPagination(list);
  };

  const attachEvents = () => {
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.onclick = (e) => {
        const id = e.target.dataset.id;
        employees = employees.filter(emp => emp.id !== id);
        localStorage.setItem('employees', JSON.stringify(employees));
        filtered = [...employees];
        renderEmployees(filtered);
      };
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
      button.onclick = (e) => {
        const id = e.target.dataset.id;
        window.location.href = `form.html?id=${id}`;
      };
    });
  };

  // Search Logic
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    filtered = employees.filter(emp =>
      emp.firstName.toLowerCase().includes(q) ||
      emp.lastName.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q)
    );
    currentPage = 1;
    renderEmployees(filtered);
  });

  // Expose pagination to global scope
  window.goToPage = function (page) {
    currentPage = page;
    renderEmployees(filtered);
  };

  // Initial render
  renderEmployees(filtered);
});

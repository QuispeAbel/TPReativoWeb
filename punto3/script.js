let users = [];
let currentPage = 1;
const usersPerPage = 5;

/// Fetch users from API
async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  users = await response.json();
  displayUsers();
}

// Display users in the user list
function displayUsers() {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  const start = (currentPage - 1) * usersPerPage;
  const end = start + usersPerPage;
  const paginatedUsers = users.slice(start, end);

  paginatedUsers.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.classList.add('user');
      userDiv.innerHTML = `
          <h3>${user.name}</h3>
          <p>Email: ${user.email}</p>
          <button class="btn-editar" onclick="editUser(${user.id})">Editar</button>
          <button class="btn-eliminar" onclick="deleteUser(${user.id})">Eliminar</button>
      `;
      userList.appendChild(userDiv);
  });

  createPagination();
}

// Create pagination
function createPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(users.length / usersPerPage);
  
  for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.classList.add('btn-paginacion'); // Agregar clase para estilo de paginación
      button.innerText = i;
      button.onclick = () => {
          currentPage = i;
          displayUsers();
      };
      pagination.appendChild(button);
  }
}

// Show the user form
function showForm() {
  document.querySelector('.modal').style.display = 'block';
  document.getElementById('formTitle').innerText = 'Agregar Usuario';
  document.getElementById('userId').value = '';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
}

// Hide the user form
function hideForm() {
  document.querySelector('.modal').style.display = 'none';
}

// Submit the user form
async function submitForm() {
  const id = document.getElementById('userId').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (id) {
      // Edit user
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ id, name, email }),
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const updatedUser = await response.json();
      users = users.map(user => (user.id === updatedUser.id ? updatedUser : user));
  } else {
      // Add user
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          body: JSON.stringify({ name, email }),
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const newUser = await response.json();
      users.push(newUser);
  }

  hideForm();
  displayUsers();
}

// Edit user
function editUser(id) {
  const user = users.find(user => user.id === id);
  document.getElementById('userId').value = user.id;
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  showForm();
}

// Delete user
async function deleteUser(id) {
  await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
  });
  users = users.filter(user => user.id !== id);
  displayUsers();
}

// Search users
function searchUsers() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput));
  
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  
  filteredUsers.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.classList.add('user');
      userDiv.innerHTML = `
          <h3>${user.name}</h3>
          <p>Email: ${user.email}</p>
          <button class="btn-editar" onclick="editUser(${user.id})">Editar</button>
          <button class="btn-eliminar" onclick="deleteUser(${user.id})">Eliminar</button>
      `;
      userList.appendChild(userDiv);
  });
}

// Load users on page load
fetchUsers();


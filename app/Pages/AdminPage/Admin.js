window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
        return;
    }

    fetch('/api/me', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => res.ok ? res.json() : null)
    .then(data => {
        if (!data || data.rol !== 'admin') {
            window.location.href = '/';
        } else {
            loadUsers();
        }
    })
    .catch(() => {
        window.location.href = '/login';
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    });

    function loadUsers() {
        fetch('/api/admin/users', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(res => res.json())
        .then(users => {
            const tbody = document.querySelector('#users-table tbody');
            tbody.innerHTML = '';
            users.forEach(u => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${u.user_id}</td>
                    <td>${u.username}</td>
                    <td>${u.email}</td>
                    <td>${u.rol}</td>
                    <td>
                        <button class="delete-btn" data-id="${u.user_id}">Șterge</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            tbody.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const userId = this.getAttribute('data-id');
                    if (confirm('Sigur vrei să ștergi acest utilizator?')) {
                        fetch(`/api/admin/users/${userId}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': 'Bearer ' + token
                            }
                        })
                        .then(res => res.json())
                        .then(data => {
                            alert(data.message || data.error);
                            loadUsers();
                        });
                    }
                });
            });
        });
    }
});
document.getElementById('toggle-mode').addEventListener('click', function() {
       window.location.href = 'register';
});

document.getElementById('auth-form').addEventListener('submit', async function(e) {
       e.preventDefault();

       const username = document.getElementById('username').value.trim();
       const password = document.getElementById('password').value;

       const response = await fetch('/api/auth', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password })
       });

       const result = await response.json();
       if (response.ok) {
              localStorage.setItem('token', result.token);
              window.location.href = '/';
       } else {
              alert(result.error || 'Eroare la autentificare!');
       }
});
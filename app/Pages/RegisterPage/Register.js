document.getElementById('toggle-login').addEventListener('click', function() {
       window.location.href = 'login';
});

document.getElementById('register-form').addEventListener('submit', async function(e) {
       e.preventDefault();

       const username = document.getElementById('username').value.trim();
       const password = document.getElementById('password').value;
       const email = document.getElementById('email').value.trim();

       const response = await fetch('/api/users', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ username, password, email })
       });

       const result = await response.json();
       if(response.ok) {
              window.location.href = 'login';
       }
})
document.getElementById('toggle-login').addEventListener('click', function() {
    window.location.href = 'login';
});

document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const email = document.getElementById('email').value.trim();
    const messageDiv = document.getElementById('register-message');

    if (username.length < 3) {
        messageDiv.textContent = "Username-ul trebuie să aibă minim 3 caractere.";
        return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        messageDiv.textContent = "Username-ul poate conține doar litere, cifre și _";
        return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        messageDiv.textContent = "Email invalid.";
        return;
    }
    if (password.length < 6) {
        messageDiv.textContent = "Parola trebuie să aibă minim 6 caractere.";
        return;
    }
    if (password !== confirmPassword) {
        messageDiv.textContent = "Parolele nu coincid.";
        return;
    }

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password, email })
    });

    const result = await response.json();
    if(response.ok) {
        window.location.href = 'login';
    } else {
        messageDiv.textContent = result.error || "Eroare la înregistrare.";
    }
});
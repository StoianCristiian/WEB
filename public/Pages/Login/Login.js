const form=document.getElementById('auth-form');
        const toggle=document.getElementById('toggle-mode');
        const title=document.getElementById('form-title');
        const endpoint = '/api/auth'; 
        let isLogin=true;
        toggle.addEventListener('click', () => {
            isLogin = !isLogin;
            title.textContent = isLogin ? 'Login' : 'Register';
            toggle.textContent = isLogin ? 'Nu ai cont? Inregistreaza-te' : 'Ai deja cont? Autentifica-te';
            emailField.style.display = isLogin ? 'none' : 'block';
                 form.querySelector('button').textContent = isLogin ? 'Login' : 'Register';
        });

        form.addEventListener('submit',async (e)=>{
           e.preventDefault();
           const username=document.getElementById('username').value;
              const password=document.getElementById('password').value;
           const data={username,password,...(isLogin? {} : {email})};
           const response =await fetch(endpoint,{
            method:'POST',
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            })
           });
    
        const result=await response.json();
        alert(result.message ||JSON.stringify(result));
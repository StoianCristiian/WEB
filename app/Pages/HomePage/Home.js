window.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const adminBtn = document.getElementById('admin-btn');
    const welcomeSpan = document.getElementById('welcome');
    const token = localStorage.getItem('token');

    if (token) {
        fetch('/api/me', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
            console.log(data.rol);
            if (data && data.username) {
                welcomeSpan.textContent = `Bine ai venit, ${data.username}!`;
                loginBtn.style.display = 'none';
                logoutBtn.style.display = 'inline-block';
                if (data.rol === 'admin') {
                    adminBtn.style.display = 'inline-block';
                } else {
                    adminBtn.style.display = 'none';
                }
            } else {
                loginBtn.style.display = 'block';
                logoutBtn.style.display = 'none';
                adminBtn.style.display = 'none';
                welcomeSpan.textContent = '';
            }
        })
        .catch(() => {
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
            adminBtn.style.display = 'none';
            welcomeSpan.textContent = '';
        });
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        adminBtn.style.display = 'none';
        welcomeSpan.textContent = '';
    }

    loginBtn.addEventListener('click', function() {
        window.location.href = 'login';
    });

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('token');
        window.location.reload();
    });

    adminBtn.addEventListener('click', function() {
        window.location.href = 'admin';
    });
});


document.getElementById('login-btn').addEventListener('click', function() {
       window.location.href = 'login';
});
document.addEventListener('DOMContentLoaded', ()=>{

const inputProperties=document.getElementById('input-properties');
let clicked =0 ;
document.querySelectorAll('.input-card').forEach(card=>{
    card.addEventListener('click', ()=> {
        const type=card.dataset.type;
        clicked=(clicked+1)%2 ;
        if(clicked==1){
      if(type=='vector'){
    fetch('HomePage/HomeVector.html')
    .then(r => r.text())
    .then(html => {
        inputProperties.innerHTML = html;
        const form = document.getElementById('vector-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form));
            fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': 'Bearer ' + localStorage.getItem('token')
                 },
                body: JSON.stringify({
                    input_type_id: 1,
                    parameters: data,
                })
            })
            .then(r => r.json())
            .then(result => {
                showAlert('Vector generat: ' + JSON.stringify(result.result));
            });
        });
    });
}
        if(type=='matrice'){
             fetch('HomePage/HomeMatrix.html')
        .then(r => r.text())
        .then(html => {
            inputProperties.innerHTML = html;
             const form = document.getElementById('matrix-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form));
            fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': 'Bearer ' + localStorage.getItem('token')
                 },
                body: JSON.stringify({
                    input_type_id: 2,
                    parameters: data,
                })
            })
            .then(r => r.json())
            .then(result => {
                showAlert('Matrice generată: ' + JSON.stringify(result.result));
            });
        });
        });
        }
        if(type=='string'){
             fetch('HomePage/HomeString.html')
        .then(r => r.text())
        .then(html => {
            inputProperties.innerHTML = html;
             const form = document.getElementById('string-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form));
            fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input_type_id: 4,
                    parameters: data,
                })
            })
            .then(r => r.json())
            .then(result => {
                showAlert('Șir de caractere generat: ' + JSON.stringify(result.result));
            });
        });
        });
        }
        if(type=='arbore'){
           fetch('HomePage/HomeTree.html')
        .then(r => r.text())
        .then(html => {
            inputProperties.innerHTML = html;
             const form = document.getElementById('tree-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form));
            fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input_type_id: 5,
                    parameters: data,
                })
            })
            .then(r => r.json())
            .then(result => {
                showAlert('Șir de caractere generat: ' + JSON.stringify(result.result));
            });
        });
        });
        } 
 if(type=='graf'){
    fetch('HomePage/HomeGraph.html')
        .then(r => r.text())
        .then(html => {
            inputProperties.innerHTML = html;
const form = document.getElementById('graph-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            input_type_id: 3,
            parameters: data,
        })
    })
    .then(r => r.json())
    .then(result => {
        showAlert('Graf generat: ' + JSON.stringify(result.result));
    });
});
            const costCheckbox = document.getElementById('cost-checkbox');
            const costSection = document.getElementById('cost-section');
            costCheckbox.addEventListener('change', function() {
                costSection.style.display = this.checked ? 'block' : 'none';
            });

            const graph1 = document.getElementById('graph-1');
            const graph2 = document.getElementById('graph-2'); 

            function checkGraphType(e) {
                if (graph1.checked && graph2.checked) {
                    showAlert('Poți selecta doar un singur tip de graf: orientat sau neorientat!');
                    e.target.checked = false;
                }
            }
            graph1.addEventListener('change', checkGraphType);
            graph2.addEventListener('change', checkGraphType);

            const conexCheckbox = document.getElementById('conex');
            const conexSection = document.getElementById('conex-section');
            const updateConexSection = () => {
                conexSection.style.display = (graph2.checked && conexCheckbox.checked) ? 'block' : 'none';
            };
            conexCheckbox.addEventListener('change', updateConexSection);
            graph2.addEventListener('change', updateConexSection);

            const weakCheckbox = document.getElementById('weak');
            const strongCheckbox = document.getElementById('strong');
            function checkConexType(e) {
                if (weakCheckbox.checked && strongCheckbox.checked) {
                    showAlert('Poți selecta doar un singur tip de conexitate: slabă sau tare!');
                    e.target.checked = false;
                }
            }
            weakCheckbox.addEventListener('change', checkConexType);
            strongCheckbox.addEventListener('change', checkConexType);
        });
}
        
    }
        else {
            inputProperties.innerHTML='' ;
        }
});
})
})

function showAlert(message) {
    const modal = document.getElementById('custom-alert-modal');
    const msgSpan = document.getElementById('custom-alert-message');
    const closeBtn = document.getElementById('custom-alert-close');
    msgSpan.textContent = message;
    modal.style.display = 'flex';

    modal.onclick = (e) => {
        if (e.target === modal) e.stopPropagation();
    };

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
}

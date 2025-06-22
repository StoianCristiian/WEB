window.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const adminBtn = document.getElementById('admin-btn');
    const welcomeSpan = document.getElementById('welcome');
    const historyBtn = document.getElementById('history-btn');
    const token = localStorage.getItem('token');

    if (token) {
        fetch('/api/me', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
            if (data && data.username) {
                welcomeSpan.textContent = `Bine ai venit, ${data.username}!`;
                loginBtn.style.display = 'none';
                logoutBtn.style.display = 'inline-block';
                if (data.rol === 'admin') {
                    adminBtn.style.display = 'inline-block';
                } else {
                    adminBtn.style.display = 'none';
                }
                historyBtn.style.display = 'inline-block'; 
            } else {
                loginBtn.style.display = 'block';
                logoutBtn.style.display = 'none';
                adminBtn.style.display = 'none';
                welcomeSpan.textContent = '';
                historyBtn.style.display = 'none'; 
            }
        })
        .catch(() => {
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
            adminBtn.style.display = 'none';
            welcomeSpan.textContent = '';
            historyBtn.style.display = 'none'; 
        });
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        adminBtn.style.display = 'none';
        welcomeSpan.textContent = '';
        historyBtn.style.display = 'none'; 
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

    historyBtn.addEventListener('click', () => {
        fetch('/api/history', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
        .then(r => r.json())
        .then(data => {
            if (data.error) {
                showAlert(data.error);
            } else {
                showHistory(data.history);
            }
        });
    });

    function showHistory(history) {
    fetch('HomePage/HomeHistory.html')
        .then(r => r.text())
        .then(html => {
            const inputProperties = document.getElementById('input-properties');
            inputProperties.innerHTML = html;
            const tableDiv = document.getElementById('history-table');
            let tableHtml = '';
            if (history && history.length > 0) {
                tableHtml += `<table>
                    <tr>
                        <th>Tip input</th>
                        <th>Data</th>
                        <th>Rezultat</th>
                    </tr>`;
               history.forEach((row, idx) => {
    const date = new Date(row.created_at);
    const formatted = date.toLocaleString('ro-RO');
    const jsonContent = typeof row.generated_content === 'string'
        ? row.generated_content
        : JSON.stringify(row.generated_content, null, 2);
    tableHtml += `<tr>
        <td>${row.input_type_id}</td>
        <td>${formatted}</td>
        <td><pre>${jsonContent}</pre></td>
        <td><button class="export-json-btn" data-idx="${idx}">Exportă JSON</button></td>
    </tr>`;
});
                tableHtml += '</table>';
            }
            tableDiv.innerHTML = tableHtml;
           document.querySelectorAll('.export-json-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const idx = this.getAttribute('data-idx');
        const row = history[idx];
        let content = row.generated_content ?? row[2];
        try {
            content = typeof content === 'string' ? JSON.parse(content) : content;
        } catch {
        }
        const exportObj = {
            input_id: row.input_id ?? row[0],
            input_type_id: row.input_type_id ?? row[1],
            generated_content: content,
            created_at: row.created_at ?? row[3],
            parameters: row.parameters ?? row[4] ?? {}
        };
        const blob = new Blob(
            [JSON.stringify(exportObj, null, 2)],
            { type: 'application/json' }
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `input_${exportObj.input_id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
             });
      });
  });
 }
 });



document.getElementById('login-btn').addEventListener('click', function() {
       const historyBtn = document.getElementById('history-btn');

if (userIsLoggedIn) { 
    historyBtn.style.display = 'inline-block';
} else {
    historyBtn.style.display = 'none';
}indow.location.href = 'login';
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
                    input_type_id: 6, 
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
                    input_type_id: 7,
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
                headers: { 'Content-Type': 'application/json',
                           'Authorization': 'Bearer ' + localStorage.getItem('token')
                 },
                body: JSON.stringify({
                    input_type_id: 9,
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
                headers: { 'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                 },
                body: JSON.stringify({
                    input_type_id: 10, 
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
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        input_type_id: 8,
                        parameters: data,
                    })
                })
                .then(r => r.json())
                .then(result => {
                    console.log('Răspuns backend:', result);
                    if (result.error) {
                        showAlert('Eroare la generare: ' + result.error);
                    } else if (result.result !== undefined) {
                        showAlert('Graf generat: ' + JSON.stringify(result.result));
                    } else {
                        showAlert('Graf generat, dar nu am primit rezultat de la server!');
                    }
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

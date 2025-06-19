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
            inputProperties.innerHTML=` <form id="vector-form" class="property-form">
                        <h3>Proprietăți vector</h3>
                        <label>Lungime:<input type="number" name="length" min="1" required></label><br>
                        <label>Valoare minimă: <input type="number" name="min" required></label><br>
                        <label>Valoare maximă: <input type="number" name="max" required></label><br>
                        <label> Tip numere:</label>
                        <select name="number-type">
                            <option value="integer">Întregi</option>
                            <option value="float">Reale</option>
                                </select><br>
                        <label>Tip sortare:</label>
                        <select name="sort">
                            <option value="random">Aleatoriu</option>
                            <option value="asc">Crescător</option>
                            <option value="desc">Descrescător</option>
                            <option value="const">Constant</option>
                        </select><br>
                        <button type="submit">Generează vector</button>
                    </form>`
        }
        if(type=='matrice'){
            inputProperties.innerHTML=` <form id="matrix-form" class="property-form">
                        <h3>Proprietăți matrice</h3>
                     <label>Număr linii: <input type="number" name="rows" min="1" required></label><br>
                     <label>Număr coloane: <input type="number" name="columns" min="1" required></label><br>
                     <label>Valoare minimă: <input type="number" name="min" required></label><br>
                     <label>Valoare maximă: <input type="number" name="max" required></label><br>
                     <label> Tip numere:</label>
                        <select name="number-type">
                            <option value="integer">Întregi</option>
                            <option value="float">Reale</option>
                                                    </select><br>
                        <label>Tip matrice:</label>
                        <select name="type">
                            <option value="random">Aleatorie completă</option>
                            <option value="identity">Identitate</option>
                            <option value="diagonal">Matrice diagonală</option>
                            <option value="triangular superior">Triunghiulară superioară</option>
                            <option value="triangular inferior">Triunghiulară inferioară</option>
                            <option value="binary">Matrice binară</option>
                        </select><br>
                        <button type="submit">Generează matrice</button>
                    </form>`
        }
        if(type=='string'){
            inputProperties.innerHTML=` <form id="string-form" class="property-form">
                                    <h3>Proprietăți șir de caractere</h3>
                        <label>Lungime: <input type="number" name="length" min="1" required></label><br>
                        <label>Conține:</label><br>
    <label><input type="checkbox" name="lowercase"> Litere mici (a-z)</label><br>
    <label><input type="checkbox" name="uppercase"> Litere mari (A-Z)</label><br>
    <label><input type="checkbox" name="digits"> Cifre (0-9)</label><br>
    <label><input type="checkbox" name="special" > Caractere speciale (!@#$...)</label><br>
                    </form>`;
        }
        if(type=='arbore'){
            inputProperties.innerHTML=` <form id="tree-form" class="property-form">
                        <h3>Proprietăți arbore</h3>
                        <label>Adâncime maximă: <input type="number" name="max-depth" min="1" required></label><br>
                        <label>Tip noduri:</label>
                        <select name="node-type">
                            <option value="integer">Întregi</option>
                            <option value="float">Reale</option>
                        </select><br>
                         <label>Valoare minimă: <input type="number" name="min" required></label><br>
                        <label>Valoare maximă: <input type="number" name="max" required></label><br>
                        <label> Tip arbore:</select>
                        <select name="tree-type">
                            <option value="binary">Arbore binar</option>
                            <option value="search">Arbore binar de căutare</option>
                            <option value="AVL">Arbore AVL</option>
                            </select><br>
                        <label>Reprezentare:</label>
                        <select name="representation">
                            <option value="parent">Referințe ascendente(nod,Tata[nod],Tip[nod])</option>
                            <option value="children">Referințe descendente(nod,copilStânga[k],copilDreapta[k])</option>
                            <option value="alocation>Alocare dinamică</option>
                        </select><br>
                        <button type="submit">Generează arbore</button>
                        `;
        } 
if(type=='graf'){
    inputProperties.innerHTML = `
        <form id="graph-form" class="property-form">
            <h3>Proprietăți graf</h3>
            <label>Număr noduri: <input type="number" name="nodes" min="1" required></label><br>
            <label>Număr muchii: <input type="number" name="edges" min="0" required></label><br>
            <label> Proprietăți:</label>
            <label><input type="checkbox" id="cost-checkbox" name="cost" > Costuri</label><br>
            <div id="cost-section" style="display:none;">
                <label>Valoare minimă cost: <input type="number" name="min-cost"></label><br>
                <label>Valoare maximă cost: <input type="number" name="max-cost"></label><br>
            </div>
            <label><input type="checkbox" id="graph-1" name="graph">Graf neorientat</label><br>
            <label><input type="checkbox" id="graph-2" name="digraph">Graf orientat</label><br>
            <label><input type="checkbox" id="conex" name="Conex">Graf conex</label><br>
             <div id="conex-section" style="display:none;">
                <label><input type="checkbox" id="weak" name="Weak">Slab conex</label><br>
                <label><input type="checkbox" id="strong" name="Strong">Tare conex</label><br>
                <label></label><br>
            </div>
            <label><input type="checkbox" id="bipartit" name="Bipartit">Graf bipartit</label><br>
            <label>Tip reprezentare:</label>
            <select name="sd-type">
                            <option value="matrix">Matrice de adiacență</option>
                            <option value="list">Liste de adiacență</option>
                        </select><br>
            <button type="submit">Generează graf</button>
        </form>
    `;

    const costCheckbox = document.getElementById('cost-checkbox');
    const costSection = document.getElementById('cost-section');
    costCheckbox.addEventListener('change', function() {
        costSection.style.display = this.checked ? 'block' : 'none';
    });

    const graph1 = document.getElementById('graph-1');
    const graph2 = document.getElementById('graph-2'); 

    function checkGraphType(e) {
        if (graph1.checked && graph2.checked) {
            alert('Poți selecta doar un singur tip de graf: orientat sau neorientat!');
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
            alert('Poți selecta doar un singur tip de conexitate: slabă sau tare!');
            e.target.checked = false;
        }
    }
    weakCheckbox.addEventListener('change', checkConexType);
strongCheckbox.addEventListener('change', checkConexType);
}
        
    }
        else {
            inputProperties.innerHTML='' ;
        }
});
})
})
 
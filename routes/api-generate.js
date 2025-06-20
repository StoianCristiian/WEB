import { getConnection } from '../database/db.js';
import { getUserFromToken } from '../utils/auth.js';

function generateVector(params) {
    const length = Number(params.length);
    const min = Number(params.min);
    const max = Number(params.max);
    const sort = params.sort;
    const numberType = params['number-type'];
    let arr = [];
    for (let i = 0; i < length; i++) {
        let val = numberType === 'float'
            ? Math.random() * (max - min) + min
            : Math.floor(Math.random() * (max - min + 1)) + min;
        arr.push(val);
    }
    if (sort === 'asc') arr.sort((a, b) => a - b);
    if (sort === 'desc') arr.sort((a, b) => b - a);
    return arr;
}
function generateMatrix(params) {
    const rows=Number(params.rows);
    const cols=Number(params.columns) ;
    const min=Number(params.min);
    const max=Number(params.max);
    const numberType = params['number-type'];
    const type = params.type;
    let matrix=[];
    if(type==='identity'){
        for(let i=0;i<rows;i++){
            let row=[] ;
            for(let j=0;j<cols;j++)
            {
               if(i==j){
                row.push(1) ;
               }
               else row.push(0) ;
            }
            matrix.push(row);
    }
}
    else if(type==='random'){
     for(let i=0;i<rows;i++){
            let row=[] ;
            for(let j=0;j<cols;j++)
            {
               let val= numberType === 'float'
                    ? Math.random() * (max - min) + min
                    : Math.floor(Math.random() * (max - min + 1)) + min;
                    row.push(val);
            }
            matrix.push(row);
    }
}
    else if(type==='diagonal'){
        for(let i=0;i<rows;i++){
            let row=[] ;
            for(let j=0;j<cols;j++)
            {
               if(i==j){
                let val= numberType === 'float'
                    ? Math.random() * (max - min) + min
                    : Math.floor(Math.random() * (max - min + 1)) + min;
                row.push(val) ;
               }
               else row.push(0) ;
            }
            matrix.push(row);
    }
}
    else if(type==='triangular superior'){
         for(let i=0;i<rows;i++){
            let row=[] ;
            for(let j=0;j<cols;j++)
            {
               if(i<=j){
                let val= numberType === 'float'
                    ? Math.random() * (max - min) + min
                    : Math.floor(Math.random() * (max - min + 1)) + min;
                row.push(val) ;
               }
               else row.push(0) ;
            }
            matrix.push(row);
    }
    }
    else if(type==='triangular inferior'){
       for(let i=0;i<rows;i++){
            let row=[] ;
            for(let j=0;j<cols;j++)
            {
               if(i>=j){
                let val= numberType === 'float'
                    ? Math.random() * (max - min) + min
                    : Math.floor(Math.random() * (max - min + 1)) + min;
                row.push(val) ;
               }
               else row.push(0) ;
            }
            matrix.push(row);
    }
    }
    else if(type==='binary'){
      for(let i=0;i<rows;i++){
            let row=[] ;
            for(let j=0;j<cols;j++)
            {
               let bit = Math.floor(Math.random() * 2);
               row.push(bit);
            }
            matrix.push(row);
    }
    }
    return matrix;
    }

export async function handleGenerateInput(req, res) {
    if (req.method === 'POST' && req.url === '/api/generate') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            try {
                const { input_type_id, parameters } = JSON.parse(body);
                const user = getUserFromToken(req);
                const user_id = user ? user.user_id : null;

                let generated;
                if (input_type_id == 1) {
                    generated = generateVector(parameters);
                } 
                else if (input_type_id == 2) {
                    generated = generateMatrix(parameters);
                }
                else {
                    throw new Error('Tip de input necunoscut!');
                }
               
                // Dacă user_id nu există, doar trimite rezultatul
                if (!user_id) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ result: generated }));
                    return;
                }

                // Dacă user_id există, salvează și în baza de date
                const connection = await getConnection();
                const result = await connection.execute(
                    `INSERT INTO Generated_Inputs (user_id, input_type_id, generated_content) 
                     VALUES (:user_id, :input_type_id, :generated_content) RETURNING input_id INTO :input_id`,
                    {
                        user_id,
                        input_type_id,
                        generated_content: JSON.stringify(generated),
                        input_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
                    }
                );
                const input_id = result.outBinds.input_id[0];

                for (const [param_name, param_value] of Object.entries(parameters)) {
                    await connection.execute(
                        `INSERT INTO Input_Parameters (input_id, param_name, param_value)
                         VALUES (:input_id, :param_name, :param_value)`,
                        { input_id, param_name, param_value: String(param_value) }
                    );
                }

                await connection.commit();
                await connection.close();

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Input generat și salvat', input_id, result: generated }));
            } catch (err) {
                    console.error('Eroare la generare:', err); // <-- adaugă asta!
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return true;
    }
    return false;
}
import { getConnection } from '../database/db.js';
import bcrypt from 'bcrypt'; 

export async function handleUserRegister(req, res) {
    if (req.method === 'POST' && req.url === '/api/users') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            try {
                const { username, password, email } = JSON.parse(body);
                const password_hash = await bcrypt.hash(password, 10);

                const connection = await getConnection();
                await connection.execute(
                    `INSERT INTO Users (username, password_hash, email, rol) 
                     VALUES (:username, :password_hash, :email, :rol)`,
                    { username, password_hash, email, rol: 'user' }
                );
                await connection.commit();
                await connection.close();

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User created' }));
            } catch (err) {
                let message = 'Something went wrong.';
                
                if (err && err.message.includes('ORA-00001')) {
                    message = 'Un utilizator cu aceste date exista deja.';
                }

                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: message }));
            }
        });
        return true;
    }
    return false;
}

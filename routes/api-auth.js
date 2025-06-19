import { getConnection } from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_TOKEN; 

export async function handleAuth(req, res) {
    if (req.method === 'POST' && req.url === '/api/auth') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            try {
                const { username, password } = JSON.parse(body);
                const connection = await getConnection();
                const result = await connection.execute(
                    `SELECT user_id, password_hash FROM Users WHERE username = :username`,
                    { username }
                );
                await connection.close();

                if (result.rows.length === 0) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'User not found' }));
                    return;
                }

                const [user_id, password_hash] = result.rows[0];
                const match = await bcrypt.compare(password, password_hash);

                if (match) {
                    // Generează JWT
                    const token = jwt.sign({ user_id, username }, SECRET, { expiresIn: '2h' });
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Login successful', token }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid password' }));
                }
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return true;
    }
    return false;
}
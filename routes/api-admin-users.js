import { getConnection } from '../database/db.js';
import { getUserFromToken, isAuthenticated } from '../utils/auth.js';

export async function handleAdminUsers(req, res) {
    if (req.method === 'GET' && req.url === '/api/admin/users') {
        if (!isAuthenticated(req)) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not authenticated' }));
            return true;
        }
        const user = getUserFromToken(req);
        if (!user || user.rol !== 'admin') {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Access denied' }));
            return true;
        }
        try {
            const connection = await getConnection();
            const result = await connection.execute(
                `SELECT user_id, username, email, rol FROM Users ORDER BY user_id`
            );
            await connection.close();
            const users = result.rows.map(row => ({
                user_id: row[0],
                username: row[1],
                email: row[2],
                rol: row[3]
            }));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return true;
    }

    if (req.method === 'DELETE' && req.url.startsWith('/api/admin/users/')) {
        if (!isAuthenticated(req)) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not authenticated' }));
            return true;
        }
        const user = getUserFromToken(req);
        if (!user || user.rol !== 'admin') {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Access denied' }));
            return true;
        }
        const userId = req.url.split('/').pop();
        try {
            const connection = await getConnection();
            await connection.execute(
                `DELETE FROM Users WHERE user_id = :userId`,
                { userId }
            );
            await connection.commit();
            await connection.close();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User deleted' }));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return true;
    }

    return false;
}
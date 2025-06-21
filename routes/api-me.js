import { isAuthenticated, getUserFromToken } from '../utils/auth.js';

export async function handleMe(req, res) {
    if (req.method === 'GET' && req.url === '/api/me') {
        if (!isAuthenticated(req)) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not authenticated' }));
            return true;
        }
        const user = getUserFromToken(req);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ username: user.username, user_id: user.user_id, rol: user.rol }));
        return true;
    }
    return false;
}
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_TOKEN;

export function isAuthenticated(req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, SECRET);
        return true;
    } catch {
        return false;
    }
}

export function getUserFromToken(req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    const token = authHeader.split(' ')[1];
    try {
        return jwt.verify(token, SECRET);
    } catch {
        return null;
    }
}
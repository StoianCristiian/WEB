import http from 'http';
import { handleUserRegister } from './routes/api-users.js';
import { handleAuth } from './routes/api-auth.js';
import { handleMe } from './routes/api-me.js';
import fs from 'fs/promises'
import { getRoute } from './routes/routes.js';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer(async (req, res) => {
    if (await handleAuth(req,res)) return;
    if (await handleUserRegister(req, res)) return;
    if(await handleMe(req, res)) return;
    try 
    {
        if(req.method === 'GET'){
            const filePath = getRoute(req.url)
            const ext = path.extname(filePath)
            let contentType = 'text/html';
            if(ext === '.css') contentType = 'text/css'
            else if(ext === '.js') contentType = 'application/javascript';

            const data = await fs.readFile(filePath);
            res.setHeader('Content-Type', contentType);
            res.write(data);
            res.end();
        }
        else {
            throw new Error('Method not allowed');
        }
    }
    catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain'})
        res.end('Server Error')
    }
});

server.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})
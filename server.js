import http from 'http';
import fs from 'fs/promises'
import { getRoute } from './routes.js';

const PORT = process.env.PORT;

const server = http.createServer(async (req, res) => {
    try 
    {
        if(req.method === 'GET'){
            const filePath = getRoute(req.url);
            const data = await fs.readFile(filePath);
            res.setHeader('Content-Type', 'text/html');
            res.write(data);
            res.end();
        }
        else {
            throw new Error('Method not allowed');
        }
    }
    catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain'})
        res.end('Server Error')
    }
});

server.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})
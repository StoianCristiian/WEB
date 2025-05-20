import http from 'http';
import { getConnection } from './database/db.js';
import fs from 'fs/promises'
import { getRoute } from './routes.js';
import dotenv from 'dotenv';

const PORT = process.env.PORT;

const server = http.createServer(async (req, res) => {
    try 
    {
        if(req.method === 'GET' && req.url === '/db-test'){
            const connection = await getConnection();
            const result = await connection.execute('SELECT 1 FROM DUAL');
            console.log(result);
            await connection.close();

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.rows));

            // const filePath = getRoute(req.url);
            // const data = await fs.readFile(filePath);
            // res.setHeader('Content-Type', 'text/html');
            // res.write(data);
            // res.end();
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
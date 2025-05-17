import http from 'http';
const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    res.end('<h1>Hello world!</h1>');
});

server.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})
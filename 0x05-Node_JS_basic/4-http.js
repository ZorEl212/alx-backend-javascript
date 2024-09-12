//const { createServer} = require('http');
//
//const hostname = 'localhost';
//const port = 1245;
//
//const server = createServer((req, res) => {
//	res.statusCode = 200;
//	res.setHeader('Content-Type', 'text/plain');
//	res.end("Hello Holberton school!");
//});
//
//server.listen(port, hostname, () => {
//	console.log(`Server running at http://${hostname}:${port}/`);
//})

const { createServer }= require('http');

const hostname = 'localhost';
const port = 1245;

const server = createServer((req ,res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end("Hello Holberton school!");
});

server.listen(port, hostname, () => {
	console.log(`Server running at ${hostname}:${port}/`);
});

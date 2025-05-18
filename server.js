const http = require('http');

let users = []; 

const server = http.createServer((req, res) => {
    const urlParts = new URL(req.url, `http://${req.headers.host}`);
    const username = urlParts.searchParams.get("username");
    const password = urlParts.searchParams.get("password");

    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.method === 'GET' && req.url.startsWith('/signup')) {
        if (username && password) {
            if (users.some(user => user.username === username)) {
                res.end("<h3>Signup Failed! Username already exists.</h3>");
            } else {
                users.push({ username, password });
                console.log("Users:", users);
                res.end("<h3>Signup Successful!</h3>");
            }
        } else {
            res.end("<h3>Signup Failed! Provide username and password.</h3>");
        }
    } 
    
    else if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const data = new URLSearchParams(body);
            const user = users.find(u => u.username === data.get("username") && u.password === data.get("password"));
            res.end(user ? "<h3>Login Successful!</h3>" : "<h3>Invalid Username or Password</h3>");
        });
    } 
    
    else if (req.method === 'GET' && req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users, null, 2));
    } 
    
    else {
        res.end("<h3>Invalid Request</h3>");
    }
});

server.listen(3232, () => console.log('Server running on port 3232'));

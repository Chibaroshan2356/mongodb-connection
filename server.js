http = require('http');
url = require('url');
querystring = require('querystring');
function onRequest(req, res) {
    var path = url.parse(req.url).pathname;
    var query = url.parse(req.url).query;
    var email = querystring.parse(query)["email"];
    var password = querystring.parse(query)["password"];
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (email == "gowthamm.23it@kongu.edu" && (password == "23ITR049" || password == "23itr049")) {
        res.write("Logged in Successfully");
    } else {
        res.write("Login Failed");
    }
    res.end();
}
server = http.createServer(onRequest);
server.listen(4004, () => console.log('Server running on http://localhost:3000'));

const http = require("http");

let server = {};

server.httpServer = http.createServer(function (req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200)
    res.end("You Wasted Your Time");
});

server.init = function () {
    server.httpServer.listen(8000, function () {
        console.log("listening on 8000");
    });
}

module.exports = server;
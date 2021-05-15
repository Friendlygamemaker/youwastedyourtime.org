// noinspection DuplicatedCode

const http = require("http");
const url = require("url");
const stringDecoder = require('string_decoder').StringDecoder;
const handlers = require("./handlersV0.2");
const helpers = require("./helpersV0.2");

let server = {};

server.httpServer = http.createServer(function (req, res){
    let parsedUrl = url.parse(req.url, true);

    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');

    let queryStringObject = parsedUrl.query;

    let method = req.method.toLowerCase();

    let headers = req.headers;

    let decoder = new stringDecoder('utf-8');
    let buffer = '';
    req.on('data', function (data){
        buffer += decoder.write(data);
    });

    req.on('end', function (){
        buffer += decoder.end();
        let chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

        let data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : helpers.parseJsonToObject(buffer)
        }

        chosenHandler(data, function (statusCode, payload, contentType){
            try {
                server.processHandlerResponse(res, method, trimmedPath, statusCode, payload, contentType);
            } catch (e) {
                server.processHandlerResponse(res, method, trimmedPath, 500, {'error' : 'unknown error has occurred'}, 'json');
            }
        });
    });
});

server.processHandlerResponse = function (res, method, trimmedPath, statusCode, payload, contentType) {
    contentType = typeof (contentType) == 'string' ? contentType : 'json';
    statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

    let payloadS;
    switch (contentType) {
        case 'json':
            res.setHeader('Content-Type', 'application/json');
            payload = typeof (payload) == 'object' ? payload : {};
            payloadS = JSON.stringify(payload);
            break;
        case 'html' :
            res.setHeader('Content-Type', 'text/html');
            payloadS = typeof (payload) == 'string' ? payload : '';
            break;
        case 'css' :
            res.setHeader('Content-Type', 'text/css');
            payloadS = typeof (payload) !== 'undefined' ? payload : '';
            break;
        case 'js' :
            res.setHeader('Content-Type', 'text/javascript');
            payloadS = typeof (payload) !== 'undefined' ? payload : '';
            break;
        case 'plain' :
            res.setHeader('Content-Type', 'text/plain');
            payloadS = typeof (payload) !== 'undefined' ? payload : '';
            break;
        case 'png' :
            res.setHeader('Content-Type', 'image/png');
            payloadS = typeof (payload) !== 'undefined' ? payload : '';
            break;
        case 'favicon' :
            res.setHeader('Content-Type', 'image/x-icon');
            payloadS = typeof (payload) !== 'undefined' ? payload : '';
            break;
        default:
            res.setHeader('Content-Type', 'text/plain');
            payloadS = 'an error has occurred';
            break;
    }

    res.writeHead(statusCode);
    res.end(payloadS);

    console.log(method.toUpperCase()+'/'+trimmedPath+': '+statusCode);
}

server.router = {
    '' : handlers.index,
    'index.css': handlers.indexCSS,
    'index.js': handlers.indexJS,
    'about' : handlers.about,
    'about.css': handlers.aboutCSS,
    'contact' : handlers.contact,
    'contact.css': handlers.contactCSS,
    'comments' : handlers.comments,
    'comments.css': handlers.commentsCSS,
    'comments.js' : handlers.commentsJS,
    'favicon.ico' : handlers.favicon,
    'apple-touch-icon.png' : handlers.appleTouch
}

server.init = function (port) {
    server.httpServer.listen(port, function () {
        console.log(`Listening on ${port}`);
    });
}

module.exports = server;
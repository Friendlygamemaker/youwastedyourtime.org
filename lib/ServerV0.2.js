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
        case 'xml' :
            res.setHeader('Content-Type', 'application/xml');
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

    server.log(method, trimmedPath, statusCode);

}

server.log = function (method, trimmedPath, statusCode) {
    let date = new Date();

    let h = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();

    let am = date.getHours() > 12 ? "PM" : "AM";

    let logMessage = h + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + am + ': ' + method.toUpperCase()+'/'+trimmedPath+': '+statusCode;
    helpers.writeLog(logMessage, function (err){
        if (err) {
            console.log("Log Broke");
        }
    });

    if (statusCode !== 200) {
        console.log(logMessage);
    }
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
    'background.png' : handlers.background,
    'apple-touch-icon.png' : handlers.appleTouch,
    'apple-touch-icon-precomposed.png' : handlers.appleTouch,
    'android-chrome-192x192.png' : handlers.androidChrome,
    'android-chrome-512x512.png' : handlers.androidChrome,
    'sitemap' : handlers.sitemap
}

server.init = function (port) {
    server.httpServer.listen(port, function () {
        console.log(`Listening on ${port}`);
    });
}

module.exports = server;
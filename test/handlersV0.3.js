const helpers = require("./helpersV0.2");

let handlers = {};

handlers.index = function (data, callback) {
    if(data.method === 'get') {
        helpers.getTemplate('index.html', function (err, str){
            if (!err && str) {
                callback(200, str, 'html');
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
}

handlers.indexCSS = function (data, callback) {
    if(data.method === 'get') {
        helpers.getTemplate('index.css', function (err, str){
            if (!err && str) {
                callback(200, str, 'css');
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
}

handlers.indexJS = function (data, callback) {
    if(data.method === 'get') {
        helpers.getTemplate('index.js', function (err, str){
            if (!err && str) {
                callback(200, str, 'js');
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
}

handlers.about = function (data, callback) {
    if(data.method === 'get') {
        helpers.getTemplate('about.html', function (err, str){
            if (!err && str) {
                callback(200, str, 'html');
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
}

handlers.aboutCSS = function (data, callback) {
    if(data.method === 'get') {
        helpers.getTemplate('about.css', function (err, str){
            if (!err && str) {
                callback(200, str, 'css');
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
}

handlers.contact = function (data, callback) {
    if(data.method === 'get') {
        helpers.getTemplate('contact.html', function (err, str){
            if (!err && str) {
                callback(200, str, 'html');
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
}

handlers.contactCSS = function (data, callback) {
    if(data.method === 'get') {
        helpers.getTemplate('contact.css', function (err, str){
            if (!err && str) {
                callback(200, str, 'css');
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
}

handlers.comments = function (data, callback) {
    if(data.method === 'get') {
        helpers.getTemplate('comments.html', function (err, str){
            if (!err && str) {
                callback(200, str, 'html');
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else if (data.method === 'post') {
        if (typeof (data.payload.text) === 'string') {
            if (typeof (data.payload.name) === 'string') {
                let testData = {text: data.payload.text, name: data.payload.name}
                if (JSON.stringify(data.payload) === JSON.stringify(testData)) {
                    helpers.writeComment(data.payload, function (err){
                        if (!err) {
                            callback(200, undefined, 'html');
                        } else {
                            callback(500, undefined, 'html');
                        }
                    });
                } else {
                    callback(405, undefined, 'html');
                }
            } else {
                callback(405, undefined, 'html');
            }
        } else {
            callback(405, undefined, 'html');
        }
    } else if (data.method === 'put') {
        helpers.readComments(function (err, data){
            if (!err && data) {
                callback(200, data, 'plain');
            } else {
                callback(500, undefined, 'html');
            }
        })
    } else {
        callback(405, undefined, 'html')
    }
}

handlers.commentsCSS = function (data, callback) {
    if(data.method === 'get') {
        helpers.getTemplate('comments.css', function (err, str){
            if (!err && str) {
                callback(200, str, 'css');
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
}

handlers.commentsJS = function (data, callback) {
    if(data.method === 'get') {
        helpers.getTemplate('comments.js', function (err, str){
            if (!err && str) {
                callback(200, str, 'js');
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html')
    }
}

handlers.favicon = function (data, callback) {
    if(data.method === 'get') {
        helpers.getImages('favicon.ico', function (err, data){
            if (!err && data) {
                callback(200, data, 'favicon');
            } else {
                callback(500);
            }
        });
    } else {
        callback(405);
    }
}

handlers.appleTouch = function (data, callback) {
    if(data.method === 'get') {
        helpers.getImages('apple-touch-icon.png', function (err, data){
            if (!err && data) {
                callback(200, data, 'png');
            } else {
                callback(500);
            }
        });
    } else {
        callback(405);
    }
}

handlers.notFound = function (data, callback){
    callback(404);
}

module.exports = handlers;
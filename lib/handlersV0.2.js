const helpers = require("./helpersV0.2");

let handlers = {};

handlers.universal = function (data, callback) {
    if(data.method === 'get') {
        helpers.getTemplate('universal.css', null, function (err, str){
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

handlers.index = function (data, callback) {
    if(data.method === 'get') {
        var templateData = {
            'head.title' : 'Home',
            'head.style' : 'index.css'
        }
        helpers.getTemplate('index.html', templateData, function (err, str){
            if (!err && str) {
                helpers.addUniversalTemplate(str, templateData, function (err, str){
                    if (!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
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
        helpers.getTemplate('index.css', null, function (err, str){
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
        helpers.getTemplate('index.js', null, function (err, str){
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
        var templateData = {
            'head.title' : 'About Me',
            'head.style' : 'about.css'
        }
        helpers.getTemplate('about.html', templateData, function (err, str){
            if (!err && str) {
                helpers.addUniversalTemplate(str, templateData, function (err, str){
                    if (!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
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
        helpers.getTemplate('about.css', null, function (err, str){
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
    var templateData = {
        'head.title' : 'Contact Me',
        'head.style' : 'contact.css'
    }
    if(data.method === 'get') {
        helpers.getTemplate('contact.html', templateData, function (err, str){
            if (!err && str) {
                helpers.addUniversalTemplate(str, templateData, function (err, str){
                    if (!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
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
        helpers.getTemplate('contact.css', null, function (err, str){
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
    var templateData = {
        'head.title' : 'Comments',
        'head.style' : 'comments.css'
    }
    if(data.method === 'get') {
        helpers.getTemplate('comments.html', templateData, function (err, str){
            if (!err && str) {
                helpers.addUniversalTemplate(str, templateData, function (err, str){
                    if (!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else if (data.method === 'post') {
        if (typeof (data.payload.text) === 'string' && data.payload.text.trim().length > 0 && data.payload.text.trim().length < 280) {
            if (typeof (data.payload.name) === 'string' && data.payload.name.trim().length > 0 && data.payload.name.trim().length < 20) {
                if (data.payload.name.toLowerCase().indexOf('Dev(noah)'.toLowerCase()) === -1) {
                    let testData = {text: data.payload.text, name: data.payload.name};
                    if (JSON.stringify(data.payload) === JSON.stringify(testData)) {
                        let testData = {text: data.payload.text.trim(), name: data.payload.name.trim()};
                        helpers.writeComment(testData, function (err) {
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
        helpers.getTemplate('comments.css', null, function (err, str){
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
        helpers.getTemplate('comments.js', null, function (err, str){
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

handlers.sitemap = function (data, callback) {
    if(data.method === 'get') {
        helpers.getTemplate('sitemap.xml', null, function (err, data){
            if (!err && data) {
                callback(200, data, 'xml');
            } else {
                callback(500);
            }
        });
    } else {
        callback(405);
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

handlers.background = function (data, callback) {
    if(data.method === 'get') {
        helpers.getImages('background.png', function (err, data){
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

handlers.androidChrome = function (data, callback) {
    if(data.method === 'get') {
        helpers.getImages('android-chrome-192x192.png', function (err, data){
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
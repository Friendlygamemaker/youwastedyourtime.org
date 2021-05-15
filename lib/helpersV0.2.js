const fs = require("fs");
const path = require("path");

let helpers = {};

helpers.parseJsonToObject = function (str){
    try {
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
}

helpers.getTemplate = function (name, callback) {
    name = typeof (name) == 'string' && name.length > 0 ? name : false;

    if (name) {
        let tempsDir = path.join(__dirname, '/../temps/');
        fs.readFile(tempsDir+name, 'utf8', function (err, str){
            if (!err && str) {
                callback(false, str);
            } else {
                callback('No temp could be found');
            }
        });
    }
}

helpers.getImages = function (name, callback) {
    name = typeof (name) == 'string' && name.length > 0 ? name : false;

    if (name) {
        let imagesDir = path.join(__dirname, '/../images/');
        fs.readFile(imagesDir+name, function (err, str){
            if (!err && str) {
                callback(false, str);
            } else {
                callback('No temp could be found');
            }
        });
    }
}

helpers.writeComment = function (obj, callback) {
    let fileDir = path.join(__dirname, "./../comments/comments.txt");
    fs.writeFile(fileDir, JSON.stringify(obj) + "\n", { flag:"a" }, function (err) {
        if (!err) {
            callback(false);
        } else {
            callback(err);
        }
    })
}

helpers.writeLog = function (str, callback) {
    let date = new Date();
    let logName = '' + date.getMonth() + '_' + date.getDay() + '_' + date.getFullYear() + '.txt';
    let fileDir = path.join(__dirname, "./../logs/" + logName);
    fs.writeFile(fileDir, str + "\n", { flag:"a" }, function (err) {
        if (!err) {
            callback(false);
        } else {
            callback(err);
        }
    })
}

helpers.readComments = function (callback) {
    let fileDir = path.join(__dirname, "./../comments/comments.txt");
    fs.readFile(fileDir, function (err, data){
        if (!err && data) {
            callback(false, data);
        } else {
            callback(true, '');
        }
    });
}


module.exports = helpers;
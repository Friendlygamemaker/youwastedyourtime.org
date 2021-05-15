const readline = require('readline');
const helpers = require('./helpersV0.2');
const events = require('events');
class _events extends events{}
e = new _events();

let cli = {};

cli.responders = {};

e.on('chat', function (str) {
    cli.responders.chat(str);
});

e.on('help', function () {
    cli.responders.help();
});

cli.responders.chat = function (str) {
    let mes = str.split('-');
    if (mes.length > 1) {
        mes.shift();
        mes = mes.join('-');
        helpers.writeComment({name: 'Dev(noah)', text: mes}, function (err) {
            if (!err) {
                console.log("It went through!");
            } else {
                console.log("Something happened...");
            }
        });
    } else {
        console.log("ERROR: Did not provide enough arguments: Try using: help");
    }
}

cli.responders.help = function () {
    console.log('chat: Type something in chat as Dev(noah)');
    console.log('    usage: chat -[String arg]');
}

cli.processInput = function (str) {
    str = typeof (str) == 'string' && str.trim().length > 0? str.trim() : false;
    if (str) {
        let uniqueInputs = [
            'chat',
            'help'
        ];

        let matchFound = false;
        let counter = 0;
        uniqueInputs.some(function (input){
            if (str.toLowerCase().indexOf(input) > -1) {
                matchFound = true;
                e.emit(input, str);
                return true;
            }
        });

        if (!matchFound) {
            console.log("Try using: help");
        }
    }
}

cli.init = function () {
    console.log("cli is now running");

    let _interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'server>'
    });

    _interface.prompt();

    _interface.on('line', function (str){
        cli.processInput(str);

        _interface.prompt();

        _interface.on('close', function (){
            process.exit(0);
        });
    });
}

module.exports = cli;
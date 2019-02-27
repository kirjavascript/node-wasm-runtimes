const PHP = require('./php');
const readline = require('readline');

const phpModuleOptions = {
    postRun: [init],
    print: function (text) {
        if (arguments.length > 1) {
            text = Array.prototype.slice.call(arguments).join(' ');
        }
        console.log(text)
    },
    printErr: function (text) {
        if (arguments.length > 1) {
            text = Array.prototype.slice.call(arguments).join(' ');
        }
        console.error(text)
    }
};

const phpModule = PHP(phpModuleOptions);

function init() {
    const rl = readline.createInterface(process.stdin, process.stdout);

    rl.setPrompt('>> ');
    rl.prompt();

    rl.on('line', (line) => {

        const code = line.trim() + "\necho PHP_EOL;";
        const ret = phpModule.ccall('pib_eval', 'number', ["string"], [code]);

        rl.prompt();
    }).on('close', () => {
        console.log('rip');
        process.exit(0);
    });
}

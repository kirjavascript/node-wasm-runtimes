import * as rp from 'rustpython/wasm/lib/pkg';
import readline from 'readline';

const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('>> ');
rl.prompt();

rl.on('line', (line) => {

    try {
        const result = rp.pyEval(line.trim().replace(/  /g, '\n'));
        if (result !== null) {
            console.log(result);
        }
    } catch (err) {
        if (err instanceof WebAssembly.RuntimeError) {
            err = global.__RUSTPYTHON_ERROR || err;
        }
        console.error(err);
    }

    rl.prompt();
}).on('close', () => {
    console.log('rip');
    process.exit(0);
});

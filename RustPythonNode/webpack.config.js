const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const path = require('path');
const fs = require('fs');

module.exports = {
    target: 'node',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    mode: 'development',
    plugins: [
        new WasmPackPlugin({
            crateDirectory: path.join(
                __dirname,
                'node_modules/rustpython/wasm/lib',
            ),
            extraArgs: '--target nodejs',
        })
    ]
};

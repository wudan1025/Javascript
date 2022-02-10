const path = require('path');
module.exports = {
    mode: 'production',
    entry: './ajax.js',
    output: {
        filename: 'ajax.min.js',
        path: path.resolve(__dirname, 'dist')
    }
};
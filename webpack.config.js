const path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, '../dist/index.js')
    },
    output: {
        path: path.join(__dirname, './src/'),
        filename: '[name].build.js'
    },
    module: {
        loaders: [{
            test: '/\.js|jsx$/',
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
};

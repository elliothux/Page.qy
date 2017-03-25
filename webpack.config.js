const path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, './dist/index.js')
    },
    output: {
        path: path.join(__dirname, './src/'),
        filename: '[name].build.js',
        publicPath: "/assets/"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [{
            test: '/\.js|jsx$/',
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }]
    },
    target: "web"
};

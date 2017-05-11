module.exports = {
    entry: {
        index: require('path').join(__dirname, './src/index.js')
    },
    output: {
        path: require('path').join(__dirname, './src/'),
        filename: '[name].build.js',
        publicPath: '/assets/'
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    target: "web",
};

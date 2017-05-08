module.exports = {
    entry: {
        index: require('path').join(__dirname, './dist/index.js'),
        uploading: require('path').join(__dirname, './dist/uploading.js'),
        login: require('path').join(__dirname, './dist/login.js'),
        logout: require('path').join(__dirname, './dist/logout.js'),
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
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            }
        ]
    },
    target: "electron",
};

const electron = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const platform = require('os').platform();
const db = require('./src/js/db');
const dataToHTML = require('./src/js/dataToHTML');
const {app, BrowserWindow} = electron;
const config = JSON.parse(fs.readFileSync(
    path.join(__dirname, './user/config.json')
));


let win;


// Define a function to create window
function openWindow(path, options, isMax) {
    !options && (options = {});
    options = Object.assign(
        {
            width: 1200,
            height: 800,
            minHeight: 600,
            minWidth: 400,
            center: true,
            show: false
        },
        options
    );

    win = new BrowserWindow(options);
    isMax && win.maximize();

    win.loadURL(url.format({
        pathname: path,
        protocol: 'file',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });

    win.on('ready-to-show', () => {
        win.show()
    });

    const devToolPath = platform === 'win32' ?
        `C:\\Users\\hqy84\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\2.0.12_0`:
        `/Users/huqingyang/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.0.12_0`;
    BrowserWindow.addDevToolsExtension(devToolPath);
}


// App events
app.on('ready',
    openWindow.bind(null,
        path.join(__dirname, './src/html/index.html'),
        null, true)
);

app.on('window-all-closed', () => {
    platform !== 'darwin' && app.quit()
});

app.on('activate', () => {
    win === null &&
        openWindow(path.join(__dirname, './src/html/index.html'), null, true);
    win.show();
});



// Functions for rendering process
exports.platform = platform;
exports.db = db;
exports.path = path.join(__dirname);
exports.openWindow = openWindow;
exports.dataToHTML = dataToHTML;
exports.config = Object.assign(config, {password: '*'});

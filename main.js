const electron = require('electron');
const path = require('path');
const url = require('url');
const platform = require('os').platform();
const {app, BrowserWindow} = electron;



let win;


// Define a function to create window
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 600,
        minWidth: 400,
        center: true,
        show: false
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, './src/html/index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });

    win.on('ready-to-show', () => {
        win.show()
    });

    BrowserWindow.addDevToolsExtension(`C:\\Users\\hqy84\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\2.0.12_0`);
}


// App events
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    platform !== 'darwin' && app.quit()
});

app.on('activate', () => {
    win === null && createWindow();
    win.show();
});


// Functions for rendering process
exports.platform = platform;

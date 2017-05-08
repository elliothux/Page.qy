const electron = require('electron');
const path = require('path');
const url = require('url');
const fs = require('node-fs-extra');
const env = process.env.NODE_ENV;
const platform = require('os').platform();
const db = require('./src/js/db');
const dataToHTML = require('./src/js/dataToHTML');
const formatContent = require('./src/js/contentProcess').formatContent;
const github = require('./src/js/github');
const config = require('./src/js/config');
const theme = require('./src/js/theme');
const user = require('./src/js/user');
const menuTemplate = require('./src/js/menuTemplate');
const {app, BrowserWindow, Menu } = electron;


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

    if (env === 'development') {
        const devToolPath = {
            'win32': `C:\\Users\\HuQingyang\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\2.1.9_0`,
            'darwin': `/Users/huqingyang/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.1.9_0`,
            'linux': '/home/hu/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.1.3_0'
        }[platform];
        BrowserWindow.addDevToolsExtension(devToolPath);
    }
    return win;
}


// App events
const isLogged = config.get().username !== '' && config.get().password !== '';
app.on('ready', function () {
    openWindow(
        isLogged ?
            path.join(__dirname, './src/html/index.html') :
            path.join(__dirname, './src/html/login.html'),
        isLogged ? null :
            {
                width: 600,
                height: 300,
                frame: false
            },
        isLogged);
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(app)));
});

app.on('window-all-closed', () => {
    platform !== 'darwin' && app.quit()
});

app.on('activate', () => {
    win === null && (win =
        openWindow(
            isLogged ?
                path.join(__dirname, './src/html/index.html') :
                path.join(__dirname, './src/html/login.html'),
            isLogged ? null :
                {
                    width: 600,
                    height: 300,
                    frame: false
                },
            isLogged));
    win.show();
});


const upload = {
    win: null,
    openWindow: function () {
        this.win = openWindow(
            path.join(__dirname, './src/html/uploading.html'),
            {
                width: 500,
                height: 200,
                frame: false
            }, false);
        this.win.show();
    },
    start: function(message) {
        this.message = function (msg) {
            try {
                message(msg)
            } catch(error) {
                console.error(error)
            }
        };
        github.pushRepo(this.message)
    },
    end: function () {
        this.win.close();
        this.win = null;
        this.message = () => {}
    }
};

const logout = {
    win: null,
    start: function () {
        this.win = openWindow(
            path.join(__dirname, './src/html/logout.html'),
            {
                width: 600,
                height: 300,
                frame: false
            }, false);
        this.win.show();
    },
    end: function () {
        this.win.close();
        this.win = null
    }
};


// Functions for rendering process
exports.platform = platform;
exports.db = db;
exports.path = path.join(__dirname);
exports.openWindow = openWindow;
exports.upload = upload;
exports.dataToHTML = dataToHTML;
exports.config = config;
exports.theme = theme;
exports.formatContent = formatContent;
exports.user = user;
exports.logout = logout;

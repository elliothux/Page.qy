const electron = require('electron');
const path = require('path');
const {app, BrowserWindow} = electron;



let window;


// Create window
function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 600,
        minWidth: 400,
    })
}
// const remote = require('electron').remote.app.getPath(global.module);
import { remote } from 'electron';
const main = remote.require('./main.js');
const upload = main.upload;


const button = document.getElementById('cancel');
const load = document.getElementById('load');
const message = document.getElementById('message');

function closeWindow() {
    upload.end()
}


button.addEventListener('click', closeWindow);


upload.client.then(success).catch(failed);


function success() {
    load.style.display = 'none';
    message.innerHTML = '✨Upload success!';
    button.innerHTML = 'Done';
}

function failed() {
    load.style.display = 'none';
    message.innerHTML = '😢Upload failed!';
    button.innerHTML = 'Retry';
    button.addEventListener('click', retry)
}

function retry() {
    load.style.display = 'block';
    message.innerHTML = '🏃Working hard on updating...';
    button.innerHTML = 'Cancel';
    upload.removeEventListener('click', closeWindow);
    upload.client.then(success).catch(failed);
}
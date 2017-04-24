import { remote } from 'electron';
const upload = remote.require('./main.js').upload;


const cancelButton = document.getElementById('cancel');
const retryButton = document.getElementById('retry');
const load = document.getElementById('load');
const message = document.getElementById('message');
const operateArea = document.getElementById('operateArea');



cancelButton.addEventListener('click', function () {
    upload.end()
});
retryButton.addEventListener('click', retry);


upload.start(callback);


function callback(error) {
    if (error) return failed();
    return success()
}

function success() {
    load.style.display = 'none';
    message.innerHTML = '✨Upload success!';
    cancelButton.innerHTML = 'Done';
    operateArea.className = 'center';
}

function failed() {
    load.style.display = 'none';
    retryButton.style.display = 'inline-block';
    message.innerHTML = '😢Upload failed!';
    cancelButton.innerHTML = 'Done';
    operateArea.className = 'center';
}

function retry() {
    load.style.display = 'block';
    retryButton.style.display = 'none';
    message.innerHTML = '🏃Working hard on updating...';
    cancelButton.innerHTML = 'Cancel';
    upload.start();
    operateArea.className = '';
}

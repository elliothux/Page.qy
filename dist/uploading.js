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


upload.start(messageClient);


function messageClient(message) {
    switch (message) {
        case 'error': failed(); break;
        case 'done': success(); break;
    }
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
    message.innerHTML = '🏃Working hard on uploading...';
    cancelButton.innerHTML = 'Cancel';
    upload.start(messageClient);
    operateArea.className = '';
}

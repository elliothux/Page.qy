import { remote } from 'electron';
const upload = remote.require('./main.js').upload;
const language = remote.require('./main.js').config.get().language;


const cancelButton = document.getElementById('cancel');
const retryButton = document.getElementById('retry');
const load = document.getElementById('load');
const message = document.getElementById('message');
const operateArea = document.getElementById('operateArea');


cancelButton.innerHTML = language === 'zh' ?
    '取消' : 'CANCEL';
retryButton.innerHTML = language === 'zh' ?
    '重试' : 'RETRY';
message.innerHTML = language === 'zh' ?
    `🏃正在努力上传...` : `🏃Working Hard On Uploading...`;


cancelButton.addEventListener('click', function () {
    upload.end()
});
retryButton.addEventListener('click', retry);


upload.start().then(success).catch(failed);


function success() {
    load.style.display = 'none';
    message.innerHTML = language === 'zh' ?
        '✨上传成功!' : '✨Upload Success!';
    cancelButton.innerHTML = language === 'zh' ?
        '完成' : 'DONE';
    operateArea.className = 'center';
}

function failed() {
    load.style.display = 'none';
    retryButton.style.display = 'inline-block';
    message.innerHTML = language === 'zh' ?
        '😢上传失败!' : '😢Upload Failed!';
    cancelButton.innerHTML = language === 'zh' ?
        '完成' : 'DONE';
    operateArea.className = 'center';
}

function retry() {
    load.style.display = 'block';
    retryButton.style.display = 'none';
    message.innerHTML = language === 'zh' ?
        `🏃正在努力上传...` : '🏃Working Hard On Uploading...';
    cancelButton.innerHTML = language === 'zh' ?
        '取消' : 'CANCEL';
    upload.start();
    operateArea.className = '';
}

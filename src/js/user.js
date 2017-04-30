const fs = require('node-fs-extra');
const path = require('path');
const config = require('./config');
const github = require('./github');
const db = require('./db');


module.exports.backupOnGitHub = backupOnGitHub;
module.exports.backupOnLocal = backupOnLocal;


function backupOnGitHub() {
    db.backup();
    config.backup();
    return new Promise((resolve, reject) => {
        github.pushRepo(function (message) {
            message === 'error' && reject();
            message === 'done' && resolve()
        });
    })
}


function backupOnLocal(folderPath) {
    db.backup();
    config.backup();
    const from = path.join(__dirname, `../../user/${config.get().username}.github.io/backup/`);
    const to = path.join(folderPath,
        `./backup_on_${(new Date()).toISOString()}`);
    fs.copySync(from, to);
    fs.removeSync(from);
    return to;
}


async function login(username, password) {
    config.set({
        username: username,
        password: password
    });
    await github.getUserInfo();
    await db.restore();
}


function logout(message) {

}

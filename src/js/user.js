const fs = require('node-fs-extra');
const path = require('path');
const config = require('./config');
const github = require('./github');
const db = require('./db');
const dataToHTML = require('./dataToHTML');


module.exports.backupOnGitHub = backupOnGitHub;
module.exports.backupOnLocal = backupOnLocal;
module.exports.restore = restore;
module.exports.login = login;
module.exports.logout = logout;
module.exports.exportAll = exportAll;



async function login(username, password) {
    config.set({
        username: username,
        password: password
    });
    await github.getUserInfo(username, password);
    const dbPath = path.join(__dirname,
        `../../db/article`);
    fs.existsSync(dbPath) && fs.removeSync(dbPath);
}


function logout() {
    const repoPath = path.join(__dirname,
        `../../user/${config.get().username}.github.io/`);
    const tempPath = path.join(__dirname,
        `../../user/temp`);
    const avatarPath = path.join(__dirname,
        `../../user/avatar.jpg`);
    try {
        fs.existsSync(repoPath) && fs.removeSync(repoPath);
        fs.existsSync(tempPath) && fs.removeSync(tempPath);
        fs.existsSync(avatarPath) && fs.removeSync(avatarPath);
    } catch (error) {
        console.log(error)
    }
    config.initConfig();
    fs.mkdirsSync(tempPath);
}


function backupOnGitHub() {
    db.backup(path.join(__dirname,
        `../../user/${config.get().username}.github.io/backup/db`));
    config.backup(path.join(__dirname,
        `../../user/${config.get().username}.github.io/backup/`));
    return github.pushRepo();
}


function backupOnLocal(folderPath) {
    db.backup(path.join(__dirname,
        `../../user/${config.get().username}.github.io/backup/db`));
    config.backup(path.join(__dirname,
        `../../user/${config.get().username}.github.io/backup/`));
    const from = path.join(__dirname, `../../user/${config.get().username}.github.io/backup/`);
    const to = path.join(folderPath,
        `./backup_on_${(new Date()).toISOString().replace(/\:/g, '')}`);
    fs.copySync(from, to);
    fs.removeSync(from);
    return to;
}


async function restore(folderPath) {
    try {
        if (folderPath) {
            db.restore(path.join(folderPath, './db'));
            config.restore(path.join(folderPath, './config.json'));
        } else {
            await github.updateRepo();
            db.restore(path.join(__dirname,
                `../../user/${config.get().username}.github.io/backup/db`));
            config.restore(path.join(__dirname,
                `../../user/${config.get().username}.github.io/backup/config.json`));
        }
    } catch (error) {
        console.error(error);
        return false;
    }
    dataToHTML.generateHTML(true);
    return true;
}


function exportAll(to) {
    to = path.join(to,
        `./Export_on_${(new Date()).toISOString().replace(/\:/g, '')}`);
    const from = path.join(__dirname,
        `../../user/temp`);
    const backup = path.join(to, './backup');
    const temp = path.join(to, './articles/temp.html');
    fs.copySync(from, to);
    fs.existsSync(backup) && fs.removeSync(backup);
    fs.existsSync(temp) && fs.removeSync(temp);
    return to;
}

const config = require('./config');
const github = require('./github');
const db = require('./db');


module.exports.backupOnGitHub = backupOnGitHub;


function backupOnGitHub() {
    db.backup();
    config.backup();
    return new Promise((resolve, reject) => {
        github.pushRepo(function (error) {
            if (error) {
                return reject(error);
            }
            resolve()
        });
    })
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

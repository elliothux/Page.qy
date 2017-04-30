const config = require('./config').get();
const setConfig = require('./config').set;
const github = require('./github');
const db = require('./db');


async function login(username, password) {
    setConfig({
        username: username,
        password: password
    });
    await github.getUserInfo();
    await db.restore();
}


function logout(message) {
    db.backup();
    github.pushRepo(function (error) {
        if (error) return message('error');
        require('./config').initConfig();
    });
}

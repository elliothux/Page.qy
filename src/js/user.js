const config = require('./config').get();
const setConfig = require('./config').set;
const github = require('./github');
const db = require('./db');


async function login(username, password, message) {
    setConfig({
        username: username,
        password: password
    });
    message('🏃Login...');
    await github.getUserInfo();
    message('🚀Restore user data...');
    await db.restore();
    message('done');
}


function logout(message) {
    message('🏃Uploading backup data...');
    db.backup();
    github.pushRepo(function (error) {
        if (error) return message('error');
        require('./config').initConfig();
        message('done');
    });
}

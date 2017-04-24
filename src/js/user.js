const config = require('./config').get();
const setConfig = require('./config').set;
const github = require('./github');


async function login(username, password) {
    setConfig({
        username: username,
        password: password
    });
    await github.getUserInfo();
}


function logout() {
    require('./config').initConfig();
}

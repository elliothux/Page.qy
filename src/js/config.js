const fs = require('node-fs-extra');
const path = require('path');


module.exports.set = setConfig;
module.exports.get = getConfig;
module.exports.initConfig = initConfig;
module.exports.backup = backup;
module.exports.restore = restore;


const target = path.join(__dirname, '../../user/config.json');
const config = JSON.parse(fs.readFileSync(target, 'utf-8'));


function getConfig() {
    return JSON.parse(fs.readFileSync(target, 'utf-8'))
}


function setConfig(newConfig) {
    newConfig = Object.assign(config, newConfig);
    fs.writeFileSync(target, newConfig);
    return newConfig;
}


function initConfig() {
    setConfig({
        "username": "",
        "password": "",
        "name": "",
        "selfIntroduction": "",
        "language": "en",
        "editor": "default",
        "theme": "Default",
        "avatar": "",
        "mail": "",
        "layoutColumn": 3
    })
}


function backup() {
    const configData =
        Object.assign(config, { password: '*' });
    const target = path.join(__dirname, `../../user/${config.username}.github.io/backup/`);
    !fs.existsSync(target) && fs.mkdirsSync(target);
    fs.writeJSONFileSync(path.join(target, './config.json'), configData);
    return path.join(target, './config.json');
}


function restore(filePath) {
    const configData = Object.assign(
        JSON.parse(fs.readFileSync(filePath, 'utf-8')),
        {password: config.password}
    );
    setConfig(configData);
}

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
    fs.writeFileSync(target, JSON.stringify(newConfig), 'utf-8');
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
        "layoutColumn": 3,
        "initView": "manage",
        "miniNav": false,
        "maxHistory": 50
    })
}


function backup(target) {
    const configData = JSON.stringify(
        Object.assign(config, { password: '*' }));
    !fs.existsSync(target) && fs.mkdirsSync(target);
    fs.writeFileSync(path.join(target, './config.json'), configData, 'utf-8');
    return path.join(target, './config.json');
}


function restore(filePath) {
    const configData = Object.assign(
        JSON.parse(fs.readFileSync(filePath, 'utf-8')),
        {
            username: config.username,
            password: config.password,
            name: config.name,
            mail: config.mail,
            avatar: config.avatar,
        }
    );
    setConfig(configData);
}

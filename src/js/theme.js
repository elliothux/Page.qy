const path = require('path');
const fs = require('node-fs-extra');
const extract = require('extract-zip');
const config = require('./config');
const dataToHTML = require('./dataToHTML');


module.exports.getThemesList = getThemesList;
module.exports.confirm = confirm;
module.exports.install = install;
module.exports.set = set;


const target = path.join(__dirname, `../../user/themes/`);


function set(theme) {
    config.set({theme: theme});
    return dataToHTML.generateHTML(true);
}


function getThemesList() {
    const themes = [];
    for (theme of fs.readdirSync(target))
        if (theme !== '.temp' &&
            fs.existsSync(path.join(target, `./${theme}/info.json`)))
            themes.push(JSON.parse(
                fs.readFileSync(
                    path.join(target, `./${theme}/info.json`),
                    'utf-8')
            ));
    return themes;
}


async function confirm(filePath, message) {
    const tempPath = path.join(target, './.temp');
    fs.existsSync(tempPath) && fs.removeSync(tempPath);
    fs.mkdirSync(tempPath);
    await _extractFile(filePath, tempPath);
    if (!_check(tempPath)) {
        fs.removeSync(tempPath);
        return message('error');
    }

    const info = JSON.parse(fs.readFileSync(
        path.join(tempPath, './info.json'),'utf-8'));
    const themes = getThemesList().map(theme => theme.name);
    if (!themes.includes(info.name)) {
        await install(filePath, message);
        return message('done');
    }

    message('confirm', {
        name: info.name,
        preVersion: parseInt(_getInfo(info.name).version.split('.').join('')),
        newVersion: parseInt(info.version.split('.').join(''))
    })
}


async function install() {
    const tempPath = path.join(target, './.temp');
    const name = JSON.parse(fs.readFileSync(
        path.join(tempPath, './info.json')
    ), 'utf-8').name;
    fs.existsSync(path.join(target, `./${name}`)) &&
        fs.removeSync(path.join(target, `./${name}`));
    fs.renameSync(tempPath, path.join(target, `./${name}`));
}


function _check(tempPath) {
    const files = fs.readdirSync(tempPath);
    return files.includes('info.json') &&
        files.includes('script') &&
        files.includes('statics') &&
        files.includes('style') &&
        files.includes('templates')
}


function _getInfo(theme) {
    const infoPath = path.join(target, `./${theme}/info.json`);
    if (!fs.existsSync(infoPath))
        return null;
    return JSON.parse(fs.readFileSync(infoPath, 'utf-8'))
}


function _extractFile(from, to) {
    !fs.existsSync(to) && fs.mkdirsSync(to);
    return new Promise((resolve, reject) => {
        return extract(
            from,
            {dir: to},
            error => {
                if (error) return reject(error);
                resolve(to);
            }
        )
    })
}
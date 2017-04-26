const path = require('path');
const fs = require('node-fs-extra');
const extract = require('extract-zip');
const config = require('./config');
const dataToHTML = require('./dataToHTML');


module.exports.getThemesList = getThemesList;
module.exports.install = install;
module.exports.set = set;


const target = path.join(__dirname, `../../user/themes/`);


function set(theme) {
    config.set({theme: theme});
    return dataToHTML.reGenerateAll();
}


function getThemesList() {
    const themes = [];
    for (theme of fs.readdirSync(target))
        if (fs.existsSync(path.join(target, `./${theme}/info.json`)))
            themes.push(JSON.parse(
                fs.readFileSync(
                    path.join(target, `./${theme}/info.json`),
                    'utf-8')
            ));
    return themes;
}


async function install(filePath, confirmInstall) {
    const tempPath = path.join(target, './.temp');
    !fs.existsSync(tempPath) && fs.mkdirSync(tempPath);
    for (each of fs.readdirSync(tempPath))
        fs.removeSync(path.join(tempPath, `./${each}`));
    await _extractFile(filePath, tempPath);
    const info = JSON.parse(fs.readFileSync(path.join(tempPath, './info.json'), 'utf-8'));
    const themes = getThemesList().map(theme => theme.name);
    if (!themes.includes(info.name))
        return _install();

    const preVersion = parseInt(_getInfo(info.name).version.split('.').join(''));
    const newVersion = parseInt(info.version.split('.').join(''));
    const con = confirmInstall(newVersion, preVersion);
    console.log(con);
    if (con) _install();
    else fs.removeSync(tempPath);

    function _install() {
        console.log(tempPath);
        console.log(path.join(target, `./${info.name}`));
        fs.existsSync(path.join(target, `./${info.name}`)) &&
            fs.removeSync(path.join(target, `./${info.name}`));
        fs.renameSync(tempPath, path.join(target, `./${info.name}`));
    }
}


function _getInfo(theme) {
    const infoPath = path.join(target, `./${theme}/info.json`);
    if (!fs.existsSync(infoPath))
        return null;
    return JSON.parse(fs.readFileSync(infoPath, 'utf-8'))
}


function _extractFile(from, to) {
    // let name = from.split('/');
    // name = name[name.length-1];
    // name = name.replace(/\.zip$/, '');
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
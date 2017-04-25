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


async function install(path) {
    await _extractFile(path, target);
}



function _extractFile(from, to) {
    let name = from.split('/');
    name = name[name.length-1];
    name = name.replace(/\.zip$/, '');
    to = path.join(to, `./${name}`);
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
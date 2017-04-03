const fs = require('fs');
const path = require('path');


module.exports.setConfig = setConfig;


const target = path.join(__dirname, '../../user/config.json');
const config = JSON.parse(fs.readFileSync(target, 'utf-8'));


function setConfig(newConfig) {
    newConfig = Object.assign(config, newConfig);
    fs.writeFileSync(target, JSON.stringify(newConfig));
    return newConfig;
}

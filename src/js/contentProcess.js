const fs = require('node-fs-extra');
const path = require('path');
const db = require('./db');


module.exports.formatContent = formatContent;


const picPath = path.join(__dirname, '../../db/pic/');


function formatContent(content, key) {
    const match = content.match(/\<img.+?\>/);
    if (match && match.length > 0) {
        const imgData = match.map((img, index) => {
            const data = img.match(/\"data:image\/.+?\"/)[0]
                .replace(/\"data:image\/[a-zA-z]+?\;base64\,/, '').slice(0, -1);
            const extensionName = img.match(/data:image\/.+?;base64/)[0]
                .replace(/data:image\//, '').replace(/;base64/, '');
            const name = `${key}-${index}.${extensionName}`;
            return savePic(name, data);
        });
        for (let i = 0; i<match.length; i++)
            content = content.replace(match[i], `<img src="${imgData[i]}"/>`);
    }
    return content
}


function savePic(name, data) {
    const filePath = path.join(picPath, name);
    fs.writeFileSync(filePath, data, 'base64');
    return filePath;
}

const fs = require('fs');
const path = require('path');


module.exports.dataToArticle = dataToArticle;


const templates = path.join(__dirname, '../templates/');
const target = path.join(__dirname, '../../user/temp/');


function dataToArticle(data) {
    let article = fs.readFileSync(
        path.join(templates, 'article.html'),
        'utf-8'
    );
    article = article.replace(
        /\{\{ title \}\}/g,
        data.title === '' ? 'Untitled Article' : data.title
    );
    article = article.replace(
        /\{\{ content \}\}/,
        data.content === '' ? 'Nothing here' : data.content
    );

    const targetPath = path.join(target, `./${data.key}/`);
    !fs.existsSync(targetPath) && fs.mkdirSync(targetPath);
    fs.writeFileSync(path.join(targetPath, 'index.html'), article, 'utf-8');
    return path.join(targetPath, 'index.html')
}

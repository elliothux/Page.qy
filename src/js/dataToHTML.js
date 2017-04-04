const fs = require('node-fs-extra');
const path = require('path');


module.exports.dataToArticle = dataToArticle;


const config = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../../user/config.json'),
    'utf-8'
));
const theme = path.join(__dirname, `../../user/themes/${config.theme}/`);
const target = path.join(__dirname, '../../user/temp/');


function dataToArticle(data) {
    let article = fs.readFileSync(
        path.join(theme, './templates/article.html'),
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
    article = article = article.replace(
        /\{\{ style \}\}/,
        `<link type="text/css" rel="stylesheet" href="../static/css/common.css"/>
        <link type="text/css" rel="stylesheet" href="../static/css/article.css"/>`
    );
    article = article = article.replace(
        /\{\{ script \}\}/,
        `<script type="text/javascript" rel="script" src="../static/js/common.js"/>
        <script type="text/javascript" rel="script" src="../static/js/article.js"/>`
    );


    const targetPath = path.join(target, `./${data.key}/`);
    !fs.existsSync(targetPath) && fs.mkdirSync(targetPath);
    fs.writeFileSync(path.join(targetPath, 'index.html'), article, 'utf-8');
    fs.copySync(
        path.join(theme, './css/'),
        path.join(target, './static/css/')
    );
    fs.copySync(
        path.join(theme, './js/'),
        path.join(target, './static/js/')
    );
    return path.join(targetPath, 'index.html')
}



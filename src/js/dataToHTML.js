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
    article = article = article.replace(
        /\{\{ static \}\}/g,
        '../static/static'
    );

    article = article.replace(
        /\{\{ title \}\}/g,
        data.title === '' ? 'Untitled Article' : data.title
    );
    article = article.replace(
        /\{\{ content \}\}/,
        data.content === '' ? 'Nothing here' : data.content
    );
    article = article.replace(
        /\{\{ link.home \}\}/g,
        '../index.html'
    );

    const date = formatDate(data.createDate);
    console.log(date);
    article = article.replace(/\{\{ date.year \}\}/g, date.year);
    article = article.replace(/\{\{ date.month \}\}/g, date.month);
    article = article.replace(/\{\{ date.date \}\}/g, date.date);
    article = article.replace(/\{\{ date.hours \}\}/g, date.hours);
    article = article.replace(/\{\{ date.minutes \}\}/g, date.minutes);
    article = article.replace(/\{\{ date.day \}\}/g, date.day);



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
    fs.copySync(
        path.join(theme, './static/'),
        path.join(target, './static/static/')
    );
    return path.join(targetPath, 'index.html')
}





function formatDate(date) {
    date = new Date(date);
    console.log(date);
    const daysZh = ['日', '一','二','三','四','五','六'];
    const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'];
    return {
        year: date.getFullYear(),
        month: date.getMonth()+1 < 10 ? '0' + date.getMonth() : date.getMonth(),
        date: date.getDate()+1 < 10 ? '0' + date.getDate() : date.getDate(),
        hours: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        day: config.language === 'zh' ?
            `星期${daysZh[date.getDay()]}`:
            daysEn[date.getDay()]
    }
}

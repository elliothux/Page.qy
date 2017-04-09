const fs = require('node-fs-extra');
const path = require('path');


module.exports.dataToArticle = dataToArticle;


const config = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../../user/config.json'),
    'utf-8'
));
const theme = path.join(__dirname, `../../user/themes/${config.theme}/`);
const target = path.join(__dirname, '../../user/temp/');


function dataToArticle(rawData) {
    let article = fs.readFileSync(
        path.join(theme, './templates/article.html'),
        'utf-8'
    );

    const [static, script, style, link] = [
        '../static/static',
        `<script type="text/javascript" rel="script" src="../static/js/common.js"/>
        <script type="text/javascript" rel="script" src="../static/js/article.js"/>`,
        `<link type="text/css" rel="stylesheet" href="../static/css/common.css"/>
        <link type="text/css" rel="stylesheet" href="../static/css/article.css"/>`,
        {
            home: '../index.html'
        }
    ];
    const data = {
        date: formatDate(data.createDate),
        title: rawData.title,
        content: rawData.content,
        avatar: rawData.avatar,
        tags: rawData.tags,
        selfIntroduction: rawData.selfIntroduction,
        archives: rawData.archives
    };

    const match = article.match(/\{\{.+\}\}/g);
    for (each of match)
        article = article.replace(each, eval(each))


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


// function test() {
//     let article = fs.readFileSync(
//         path.join(theme, './templates/article.html'),
//         'utf-8'
//     );
//     console.log(article.match(/\{\{.+\}\}/g))
// }
//
// test()
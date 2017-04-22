const fs = require('node-fs-extra');
const path = require('path');
const templateEngine = require('./templateEngine');
const db = require('./db');


module.exports.dataToArticle = dataToArticle;
module.exports.dataToHome = dataToHome;


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

    const templateData = {
        data: {
            date: formatDate(rawData.createDate),
            content: rawData.content,
            tags: rawData.tags,
            archives: rawData.archives,
            avatar: config.avatar,
            name: config.name,
            username: config.username,
            selfIntroduction: config.selfIntroduction,
        },
        link: {
            home: '../index.html',
            tags: '',
            archives: '',
            about: ''
        },
        script: `../statics/script`,
        statics: '../statics/statics',
        style: `../statics/style`,
        title: rawData.title,
        user: {
            avatar: config.avatar,
            name: config.name,
            selfIntroduction: config.selfIntroduction,
            username: config.username,
        }
    };
    article = templateEngine.parse(templateData, article);

    const targetPath = path.join(target, `./articles/`);
    !fs.existsSync(targetPath) && fs.mkdirSync(targetPath);
    fs.writeFileSync(path.join(targetPath, `${rawData.key}.html`), article, 'utf-8');
    updateStaticFiles();
    return path.join(targetPath, `${rawData.key}.html`)
}



async function dataToHome(rawData) {
    let home = fs.readFileSync(
        path.join(theme, './templates/index.html'),
        'utf-8'
    );

    const templateData = {
        data: (await db.getPublishedArticleList()).map(article => {
            article.date = formatDate(article.createDate);
            article.link = `./articles/${article.key}.html`;
            return article
        }).sort((a, b) => (
            (new Date(b.createDate)).getTime() - (new Date(a.createDate)).getTime()
        )),
        link: {
            home: './index.html',
            tags: '',
            archives: '',
            about: ''
        },
        script: `./statics/script`,
        statics: './statics/statics',
        style: `./statics/style`,
        title: 'Home',
        user: {
            avatar: config.avatar,
            name: config.name,
            selfIntroduction: config.selfIntroduction,
            username: config.username,
        }
    };
    home = await templateEngine.parse(templateData, home);

    const targetPath = target;
    fs.writeFileSync(path.join(targetPath, 'index.html'), home, 'utf-8');
    updateStaticFiles();
    return path.join(targetPath, 'index.html')
}


function updateStaticFiles() {
    fs.copySync(
        path.join(theme, './style/'),
        path.join(target, './statics/style/')
    );
    fs.copySync(
        path.join(theme, './script/'),
        path.join(target, './statics/script/')
    );
    fs.copySync(
        path.join(theme, './statics/'),
        path.join(target, './statics/statics/')
    );
}


function formatDate(date) {
    date = new Date(date);
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

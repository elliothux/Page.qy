const fs = require('node-fs-extra');
const path = require('path');
const templateEngine = require('./templateEngine');
const db = require('./db');
const getConfig = require('./config').get;


module.exports.dataToArticle = dataToArticle;
module.exports.dataToHome = dataToHome;
module.exports.dataToArchives = dataToArchives;
module.exports.dataToTags = dataToTags;
module.exports.getArticlePath = getArticlePath;
module.exports.reGenerateAll = reGenerateAll;
module.exports.formatDate = formatDate;



const theme = () => path.join(__dirname, `../../user/themes/${getConfig().theme}/`);
const target = path.join(__dirname, '../../user/temp/');


function getArticlePath(key) {
    const target = path.join(__dirname, '../../user/temp/articles');
    return path.join(target, `${key}.html`)
}


async function reGenerateAll() {
    fs.existsSync(target) && fs.removeSync(target);
    fs.mkdirpSync(target);
    const articles = await db.getPublishedArticleList();
    for (article of articles)
        dataToArticle(article);
    await dataToTags();
    await dataToArchives();
    await dataToHome();
    return target;
}


function dataToArticle(rawData) {
    const config = getConfig();
    let article = fs.readFileSync(
        path.join(theme(), './templates/article.html'),
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
            tags: '../tags.html',
            archives: '../archives.html',
            about: '../about.html'
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

    !fs.existsSync(path.join(target, `./articles/`)) &&
        fs.mkdirpSync(path.join(target, `./articles/`));
    const targetPath = rawData.key ?
        path.join(target, `./articles/${rawData.key}.html`) :
        path.join(target, `./articles/temp.html`);
    fs.writeFileSync(targetPath, article, 'utf-8');
    updateStaticFiles();
    return targetPath;
}



async function dataToHome() {
    const config = getConfig();
    let home = fs.readFileSync(
        path.join(theme(), './templates/index.html'),
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
            tags: './tags.html',
            archives: './archives.html',
            about: './about.html'
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


async function dataToTags() {
    const config = getConfig();
    let tags = fs.readFileSync(
        path.join(theme(), './templates/tags.html'),
        'utf-8'
    );

    const templateData = {
        data: await getTagsData(),
        link: {
            home: './index.html',
            tags: './tags.html',
            archives: './archives.html',
            about: './about.html'
        },
        script: `./statics/script`,
        statics: './statics/statics',
        style: `./statics/style`,
        title: 'Tags',
        user: {
            avatar: config.avatar,
            name: config.name,
            selfIntroduction: config.selfIntroduction,
            username: config.username,
        }
    };
    tags = await templateEngine.parse(templateData, tags);

    const targetPath = target;
    fs.writeFileSync(path.join(targetPath, 'tags.html'), tags, 'utf-8');
    updateStaticFiles();
    return path.join(targetPath, 'tags.html')
}

async function getTagsData() {
    const articles = (await db.getPublishedArticleList())
        .sort((a, b) => (
            (new Date(b.createDate)).getTime() - (new Date(a.createDate)).getTime()
        ));
    let data = [];
    for (article of articles) {
        article.date = formatDate(article.createDate);
        article.link = `./articles/${article.key}.html`;
        for (tag of article.tags) {
            data = pushTagToData(data, tag, article)
        }
    }
    return data;

    function pushTagToData(data, tag, article) {
        if (data.length === 0 ) {
            data.push({
                name: tag,
                articles: [article]
            });
            return data;
        }
        for (each of data) {
            if (each.name === tag) {
                each.articles.push(article);
                return data
            }
            if (each === data[data.length-1]) {
                data.push({
                    name: tag,
                    articles: [article]
                });
                return data;
            }
        }
        return data;
    }
}


async function dataToArchives() {
    const config = getConfig();
    let archives = fs.readFileSync(
        path.join(theme(), './templates/archives.html'),
        'utf-8'
    );

    const templateData = {
        data: await getArchiveData(),
        link: {
            home: './index.html',
            tags: './tags.html',
            archives: './archives.html',
            about: './about.html'
        },
        script: `./statics/script`,
        statics: './statics/statics',
        style: `./statics/style`,
        title: 'Archives',
        user: {
            avatar: config.avatar,
            name: config.name,
            selfIntroduction: config.selfIntroduction,
            username: config.username,
        }
    };

    archives = await templateEngine.parse(templateData, archives);

    const targetPath = target;
    fs.writeFileSync(path.join(targetPath, 'archives.html'), archives, 'utf-8');
    updateStaticFiles();
    return path.join(targetPath, 'archives.html')
}


async function getArchiveData() {
    const articles = (await db.getPublishedArticleList())
        .sort((a, b) => (
                (new Date(b.createDate)).getTime() - (new Date(a.createDate)).getTime()
            ));
    const data = [];
    let yearData = {
        year: null,
        monthData: []
    };
    let monthData = {
        month: null,
        articles: []
    };
    for (article of articles) {
        article.date = formatDate(article.createDate);
        article.link = `./articles/${article.key}.html`;

        !monthData.month && (monthData.month = article.date.month);
        if (monthData.month !== article.date.month) {
            yearData.monthData.push(monthData);
            monthData = {
                month: null,
                articles: []
            };
        }
        monthData.articles.push(article);

        !yearData.year && (yearData.year = article.date.year);
        if (yearData.year !== article.date.year) {
            data.push(yearData);
            yearData = {
                year: null,
                monthData: []
            };
        }
    }
    yearData.monthData.push(monthData);
    data.push(yearData);
    return data
}


async function checkPath() {
    // const articles = await db.getPublishedArticleList();
    // const keys = [];
    // for (article of articles)
    //     keys.push(article.key)
    // for (file of fs.readdirSync(path.join(target, './articles')))
    //     if (!keys.includes(file.split('.')[0]))
    //         fs.removeSync(path.join(target, `./articles/${file}`));
}


function updateStaticFiles() {
    fs.copySync(
        path.join(theme(), './style/'),
        path.join(target, './statics/style/')
    );
    fs.copySync(
        path.join(theme(), './script/'),
        path.join(target, './statics/script/')
    );
    fs.copySync(
        path.join(theme(), './statics/'),
        path.join(target, './statics/statics/')
    );
    checkPath();
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
        day: getConfig().language === 'zh' ?
            `星期${daysZh[date.getDay()]}`:
            daysEn[date.getDay()]
    }
}

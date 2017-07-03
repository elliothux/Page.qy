const fs = require('node-fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const templateEngine = require('./templateEngine');
const db = require('./db');
const getConfig = require('./config').get;



module.exports.getPath = getPath;
module.exports.generateHTML = generateHTML;
module.exports.generateArticle = generateArticle;
module.exports.formatDate = formatDate;



const theme = () => path.join(__dirname, `../../user/themes/${getConfig().theme}/`);
const target = path.join(__dirname, '../../user/temp/');



async function getPath(type, key) {
    if (type === 'article') {
        const target = path.join(__dirname, `../../user/temp/articles/${key}.html`);
        !fs.existsSync(target) && generateArticle(await db.getArticle({key: key}));
        return target;
    }
    const paths = {
        home: path.join(target, './index.html'),
        tags: path.join(target, './tags.html'),
        archives: path.join(target, './archives.html')
    };
    if (type) return paths[type];
    return paths;
}


async function generateArticle(rawData, key, isTemp) {
    !fs.existsSync(path.join(target, './articles')) &&
    fs.mkdirSync(path.join(target, './articles'));
    !rawData && (rawData = await db.getArticle({ key: key }));
    const data = await _getData('article', rawData);
    let template = fs.readFileSync(
        path.join(theme(), `./templates/article.html`),
        'utf-8'
    ).replace(/\<\/\s*head\>/, `\n\t<script type="text/javascript" src="../statics/script/highlight.min.js"></script>\n\t<script>hljs.initHighlightingOnLoad();</script>\n</head>`);
    const result = templateEngine.parse(data, template);
    const targetPath = isTemp ?
        path.join(target, `./articles/_temp.html`) :
        path.join(target, `./articles/${data.key}.html`);
    fs.writeFileSync(targetPath, result, 'utf-8');
    !isTemp && (await db.isArticlePublished(data.key) && await generateHTML());
    return targetPath;
}


async function generateHTML(willGenerateArticle=false) {
    !fs.existsSync(target) && fs.mkdirSync(target);
    const data = await _getData();
    const types = ['index', 'archives', 'tags', 'about'];
    for (let type of types) {
        let template = fs.readFileSync(
            path.join(theme(), `./templates/${type}.html`),
            'utf-8'
        );
        const result = templateEngine.parse(data, template);
        const targetPath = path.join(target, `./${type}.html`);
        fs.writeFileSync(targetPath, result, 'utf-8');
    }
    if (willGenerateArticle) {
        for (let article of data.articles)
            await generateArticle(article)
    }
    _updateStaticFiles();
}


async function _getData(type, rawData) {
    let data = {
        language: getConfig().language,
        links: type === 'article' ? {
            home: '../index.html',
            tags: '../tags.html',
            archives: '../archives.html',
            about: '../about.html'
        } : {
            home: './index.html',
            tags: './tags.html',
            archives: './archives.html',
            about: './about.html'
        },
        script: _getScript(type),
        statics: _getStatics(type),
        style: _getStyle(type),
        user: {
            avatar: getConfig().avatar,
            name: getConfig().name,
            selfIntroduction: getConfig().selfIntroduction,
            username: getConfig().username,
            mail: getConfig().mail
        }
    };
    if (type !== 'article') {
        const articles = await _getArticles(type);
        data.articles = articles;
        data.tags = _getTags(type, articles);
        data.archives = _getArchives(type, articles)
    } else
        data = Object.assign(data, _formatArticleData(rawData, 'article'));
    return data
}


function _getScript(type) {
    const dir = fs.readdirSync(
        path.join(theme(), './script/'));
    const script = {};
    for (let each of dir) {
        if (each.match(/.+\.js$/)) {
            const name = each.replace(/\.js$/, '');
            script[name] = type === 'article' ?
                `../statics/script/${each}` :
                `./statics/script/${each}`
        }
    }
    return script
}


function _getStatics(type) {
    const dir = fs.readdirSync(
        path.join(theme(), './statics/'));
    const statics = {};
    for (let each of dir) {
        statics[each] = type === 'article' ?
            `../statics/statics/${each}` :
            `./statics/statics/${each}`
    }
    return statics
}


function _getStyle(type) {
    const dir = fs.readdirSync(
        path.join(theme(), './style/'));
    const style = {};
    for (let each of dir) {
        if (each.match(/.+\.css$/)) {
            const name = each.replace(/\.css$/, '');
            style[name] = type === 'article' ?
                `../statics/style/${each}` :
                `./statics/style/${each}`
        }
    }
    return style
}


async function _getArticles(type) {
    return (await db.getPublishedArticleList())
        .map(article => _formatArticleData(article, type))
}


function _getTags(type, articles) {
    let data = [];
    for (article of articles) {
        for (tag of article.tags) {
            data = _pushTagToData(data, tag.name, article)
        }
    }
    return data;

    function _pushTagToData(data, tag, article) {
        if (data.length === 0 ) {
            data.push({
                name: tag,
                articles: [article],
                link: type === 'article' ?
                    `../tags.html#tags-${tag}` :
                    `./tags.html#tags-${tag}`,
                id: `tags-${tag}`
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
                    articles: [article],
                    link: type === 'article' ?
                        `../tags.html#tags-${tag}` :
                        `./tags.html#tags-${tag}`,
                    id: `tags-${tag}`
                });
                return data;
            }
        }
        return data;
    }
}


function _getArchives(type, articles) {
    const data = [];
    let yearData = {
        year: null,
        months: []
    };
    let monthsData = {
        month: null,
        articles: []
    };
    for (article of articles) {
        !monthsData.month && (monthsData.month =
            article.createDate.month);
        if (monthsData.month !==
            article.createDate.month) {
            yearData.months.push(monthsData);
            monthsData = {
                month: null,
                articles: []
            };
        }
        monthsData.articles.push(article);

        !yearData.year && (yearData.year =
            article.createDate.year);
        if (yearData.year !== article.createDate.year) {
            data.push(yearData);
            yearData = {
                year: null,
                months: []
            };
        }
    }
    yearData.months.push(monthsData);
    data.push(yearData);
    return data
}


function _formatArticleData(article, type) {
    delete article.historyContent;
    delete article._id;
    delete article.published;
    delete article.type;
    article.createDate = formatDate(article.createDate);
    article.editDate = formatDate(article.editDate);
    article.link = type === 'article' ?
        `./${article.key}.html` :
        `./articles/${article.key}.html`;
    article.tags = article.tags.map(tag => {
        if (typeof tag === 'string') return {
                name: tag,
                link: type === 'article' ?
                    `../tags.html#tags-${tag}` :
                    `./tags.html#tags-${tag}`
        };
        return {
            name: tag.name,
            link: `.${tag.link}`
        }
    });
    !article.cover && (
        article.cover = function () {
            const $ = cheerio.load(article.content);
            const img = $('img').attr('src');
            if (img) return img;
            return false
        }()
    );
    return article
}



function _updateStaticFiles() {
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
    fs.existsSync(path.join(__dirname, '../lib/highlight.min.js')) &&
        fs.copySync(path.join(__dirname, '../lib/highlight.min.js'),
            path.join(target, './statics/script/highlight.min.js')
        )
}


function formatDate(date, language) {
    if (typeof date === 'string')
        date = new Date(date);
    else if (typeof date === 'object' && date.constructor !== Date)
        return date;
    const daysZh = ['日', '一','二','三','四','五','六'];
    const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'];
    return {
        year: date.getFullYear(),
        month: date.getMonth()+1 < 10 ? '0' + date.getMonth()+1 : date.getMonth(),
        date: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        hours: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        day: language === 'zh' ?
            `星期${daysZh[date.getDay()]}`:
            daysEn[date.getDay()]
    }
}

const DataStore = require('nedb');
const path = require('path');


// Define the database of articles
const articlePath = path.join(__dirname, '../../db/article');
const article = new DataStore({
    filename: articlePath,
    autoload: true
});

// Export functions to call
module.exports.isArticleExist = isArticleExist;
module.exports.createArticle = createArticle;
module.exports.editArticle = editArticle;
module.exports.deleteArticle = deleteArticle;
module.exports.getArticleList =getArticleList;
module.exports.editArticle = editArticle;


// Generate an unique key
async function keyGenerator() {
    let key = "";
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for(let i=0; i < 6; i++)
        key += possible.charAt(Math.floor(Math.random() * possible.length));

    if (!(await isArticleExist({key: key})))
        return key;
    return keyGenerator()
}



////////////// Base functions to operate database ////////////////


// Rewrite 'insert' method using 'async/await'
async function insert(options, db) {
    if (!options || typeof options !== 'object') {
        console.error(`Function 'insert' except an object instead of ${typeof options} as the first argument.`);
        return;
    }

    return new Promise((resolve, reject) => {
        db.insert(options, (error, doc) => {
            error && reject(`An error occurred inside the 'insert' function.`);
            doc && resolve(doc);
        })
    })
}


// Rewrite 'update' method using 'async/await'
async function update(options, db) {
    if (!options || typeof options !== 'object') {
        console.error(`Function 'update' except an object instead of ${typeof options} as the first argument.`);
        return;
    }

    return new Promise((resolve, reject) => {
        db.update({key: options.key}, options, {}, (error, doc) => {
            error && reject(`An error occurred inside the 'update' function: ${error}`);
            doc && resolve(doc);
        })
    })
}


// Rewrite 'find' method using 'async/await'
async function find(options, db) {
    !options && (options = {});
    if (typeof options !== 'object') {
        options = {};
        console.error(`Function 'find' except an object instead of ${typeof options} as the first argument.`);
    }

    return new Promise((resolve, reject) => {
        db.find(options).exec((error, docs) => {
            error && reject(`An error occurred inside the 'find' function.`);
            docs && resolve(docs);
        })
    })
}


// Rewrite 'remove' method using 'async/await'
async function remove(options, db) {
    if (!options || typeof options !== 'object') {
        console.error(`Function 'remove' except an object instead of ${typeof options} as the first argument.`);
        return;
    }

    return new Promise((resolve, reject) => {
        db.remove(options, {}, (error) => {
            error && reject('An error occurred inside the database.');
            resolve(options);
        })
    })
}



////////////// Base functions to operate database ////////////////


// Pass an object which contains 'key' or 'title' or both
// to check if one article is exist
async function isArticleExist(options) {
    if (!options || typeof options !== 'object') {
        console.error(`Function 'isArticleExist' except an object instead of ${typeof options} as the first argument.`);
        return;
    }

    let keyExist = 'key' in options ?
        (await find({key: options.key}, article)).length > 0 : false;
    let titleExist = 'title' in options ?
        (await find({title: options.title}, article)).length > 0 : false;
    return keyExist || titleExist;
}


// Passing data and create an article
async function createArticle(data) {
    if (checkData(data) &&
        !(await isArticleExist({title: data.title}))) {
        const options = {
            key: await keyGenerator(),
            createDate: (new Date()).toString(),
            editDate: (new Date()).toString(),
            historyContent: {}
        };
        const newArticle = await insert(Object.assign(data, options), article);
        console.log(`Create article '${newArticle.title}' success at ${newArticle.createDate}.`);
        return newArticle;
    } else {
        console.error(`Create article ${data.title} failed with invalid argument.`);
        return (await find({title: data.title}, article))[0];
    }

    function checkData(data) {
        if (!data || typeof data !== 'object') {
            console.error(`Function 'create' except an object instead of ${typeof data} as the first argument.`);
            return false;
        }

        if (!'content' in data || !'title' in data) {
            console.error('Create article failed with invalid arguments.');
            return false;
        }

        return true;
    }
}


async function editArticle(data) {
    if (await checkData(data)) {
        if (JSON.stringify(data) === JSON.stringify((await find({key: data.key}, article))[0])) {
            console.log(`Nothing changed of article ${data.title}`);
            return (await find({key: data.key}, article))[0];
        }

        const prevArticle = (await find({key: data.key}, article))[0];
        const editDate = (new Date()).toString();

        let historyContent = prevArticle.historyContent;
        historyContent[editDate] = (() => {
            const newHistoryData = {
                title: prevArticle.title,
                content: prevArticle.content,
            };
            'tags' in prevArticle && (newHistoryData.tags =  prevArticle.tags);
            return newHistoryData;
        })();

        const newArticle = Object.assign({}, prevArticle, data, {
            editDate: editDate,
            historyContent: historyContent
        });
        if (await update(newArticle, article))
            return (await find({key: data.key}, article))[0]
    }
    else
        return (await find({key: data.key}, article))[0];


    async function checkData(data) {
        if (!data || typeof data !== 'object') {
            console.error(`Function 'editArticle' except an object instead of ${typeof data} as the first argument.`);
            return false;
        }

        if (!'content' in data || !'title' in data || !'key' in data) {
            console.error('Update article failed with invalid arguments.');
            return false;
        }

        // Check this article is exist or not.
        if (! await isArticleExist({key: data.key})) {
            console.error('Update article failed for this article is not exist.');
            return false
        }

        if (data.title !== (await find({key: data.key}, article))[0].title &&
            await isArticleExist({title: data.title}, article)) {
            console.error('Update article failed for the title is already exist.');
            return false
        }

        return true;
    }
}


// Pass a 'key' to delete an article
async function deleteArticle(key) {
    if (!key) {
        console.error(`Delete article failed with invalid argument.`);
        return false;
    } else if (!(await isArticleExist({key: key}))) {
        console.warn(`Delete article failed for it's not exist.`);
        return false;
    }

    const title = (await find({key: key}, article))[0].title;
    await remove({key: key}, article);
    console.log(`Delete article '${title}' success at ${(new Date()).toString()}`);
}


// Pass an optional argument 'tags' to get articles
async function getArticleList(tags) {
    return (await find(tags ? {tags: tags} : {}, article));
}


async function test() {
    const data = {
        title: 'Hey! 写点什么吧!',
        content: '😉恭喜! 你已经完成了了设置 Site.qy 的最后一步! Site.qy 是一个轻量级且易于使用的博客框架。现在开始, 享受使用它写博客的感觉吧~',
        tags: ['欢迎', '教程']
    };
    return await createArticle(data)
}

// test().then(a => console.log(a));

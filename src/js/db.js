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
module.exports.deleteArticle = deleteArticle;
module.exports.getArticleList =getArticleList;


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
            createDate: (new Date()).toISOString(),
            editDate: (new Date()).toISOString(),
            historyContent: {}
        };
        const newArticle = await insert(Object.assign(data, options), article);
        console.log(`Create article '${newArticle.title}' success at ${newArticle.createDate}.`);
        return newArticle;
    } else {
        console.error(`Create article ${data.title} failed with an invalid title.`);
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
    console.log(`Delete article '${title}' success at ${(new Date()).toISOString()}`);
}


// Pass an optional argument 'topic' to get articles
async function getArticleList(topic) {
    return (await find(topic ? {topic: topic} : {}, article));
}


async function test() {
    const data = {
        title: 'test2',
        topic: 'js',
        content: 'test0'
    };
    const newArticle = await createArticle(data, article);
    console.log(await isArticleExist({key: newArticle.key}));
    console.log(newArticle.key);
    await deleteArticle(newArticle.key);
    console.log(await isArticleExist({title: newArticle.title}));
}

test().then(a => console.log('end'));

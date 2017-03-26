const DataStore = require('nedb');
const path = require('path');


// Define the database of articles
const articlePath = path.join(__dirname, '../../db/article');
const article = new DataStore({
    filename: articlePath,
    autoload: true
});


// Export functions to call
module.exports.isExist = isExist;
module.exports.createArticle = createArticle;
module.exports.deleteArticle = deleteArticle;
module.exports.getArticleList =getArticleList;


// Generate an unique key
async function keyGenerator() {
    let key = "";
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for(let i=0; i < 6; i++)
        key += possible.charAt(Math.floor(Math.random() * possible.length));

    if (!(await isExist({key: key})))
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
async function isExist(options, db) {
    if (!options || typeof options !== 'object') {
        console.error(`Function 'isExist' except an object instead of ${typeof options} as the first argument.`);
        return;
    }

    let keyExist = 'key' in options ?
        (await find({key: options.key}, db)).length > 0 : false;
    let titleExist = 'title' in options ?
        (await find({title: options.title}, db)).length > 0 : false;
    return keyExist || titleExist;
}


// Passing data and create an article
async function createArticle(data) {
    if (checkData(data) &&
        !(await isExist({title: data.content.title}))) {
        const options = {
            key: await keyGenerator(),
            createDate: (new Date()).toISOString(),
            editDate: (new Date()).toISOString(),
            
        };
        const newArticle = insert(Object.assign(data, options), article);
        console.log(`Add article ${newArticle.content.title} success at ${newArticle.createDate}`);
        return newArticle;
    }

    function checkData(data) {
        if (!data || typeof data !== 'object') {
            console.error(`Function 'create' except an object instead of ${typeof data} as the first argument.`);
            return false;
        }

        if (!'content' in data || typeof data.content !== 'object') {
            console.error('Create article failed with invalid arguments.');
            return false;
        }

        const content = data.content;
        if (!'title' in content || !'content' in content) {
            console.error('Create article failed with invalid content.');
            return false;
        }
        return true;
    }
}


// Pass a 'key' to delete an article
async function deleteArticle(key) {
    if (!key || !(await isExist(key))) {
        console.error(`Delete article failed with invalid argument.`);
        return false;
    }
    await remove({key: key}, article);
    console.log(`Delete article ${key} success at ${(new Date()).toISOString()}`);
}


// Pass an optional argument 'topic' to get articles
async function getArticleList(topic) {
    return (await find(topic ? {topic: topic} : {}, article));
}


async function test() {
    const data = {}
}

test().then(a => console.log(a));
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


// Rewrite 'update' method using 'async/await'
async function update(options, db) {
    if (!options || typeof options !== 'object') {
        console.error(`Function 'update' except an object instead of ${typeof options} as the first argument.`);
        return;
    }

    return new Promise((resolve, reject) => {
        db.update({key: options.key}, options, {}, (error, doc) => {
            error && reject(`An error occurred inside the 'update' function.`);
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
    if (checkData(data) &&
        (await isArticleExist({title: data.key}))) {
        const prevArticle = (await find({key: data.key}, article))[0];
        const editDate = (new Date()).toISOString();

        let historyContent = prevArticle.historyContent;
        historyContent[editDate] = (() => {
           let content = prevArticle;
           delete content.createDate; delete content.editDate;
           delete content.key; delete content.historyContent;
           delete content._id;
           return content;
        })();

        delete data.key; delete data.createDate; delete data.editDate;
        delete data.historyContent; delete data._id;

        let newArticle = Object.assign({}, prevArticle, data, {
            editDate: editDate,
            historyContent: historyContent
        });
        return await editArticle(newArticle);
    } else {
        console.error(`Edit article ${data.title} failed with invalid argument.`);
        return (await find({key: data.key}, article))[0];
    }

    function checkData(data) {
        if (!data || typeof data !== 'object') {
            console.error(`Function 'editArticle' except an object instead of ${typeof data} as the first argument.`);
            return false;
        }

        if (!'content' in data || !'title' in data || !'key' in data) {
            console.error('Update article failed with invalid arguments.');
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
    const data = {"title":"test101","topic":"test","content":"test0","key":"gviu97","createDate":"2017-03-26T13:06:45.797Z","editDate":"2017-03-26T13:06:45.797Z","historyContent":{},"_id":"V0h6K38emu7OZLPT"};
    delete data._id;
    const doc = await update(data, article);
    console.log(doc);
}

test().then(a => console.log('end'));

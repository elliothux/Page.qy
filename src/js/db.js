const DataStore = require('nedb');
const path = require('path');


const articlePath = path.join(__dirname, '../../db/article');
const article = new DataStore({
    filename: articlePath,
    autoload: true
});



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


// Check if one article is exist
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


// Create an article
async function create(data) {
    if (checkData(data)) {

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
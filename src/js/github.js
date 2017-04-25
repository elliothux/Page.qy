const fs = require('fs-extra');
const path = require('path');
const exec = require('child_process').execSync;
const platform = require('os').platform();
const GitHub = require('github-api');
const Git = require('simple-git');
const config = require('./config').get();
const setConfig = require('./config').set;
const db = require('./db');


module.getUserINfo = getUserInfo;
module.exports.pushRepo = pushRepo;


if (platform === 'win32') {
    exec('set GIT_CURL_VERBOSE=1');
    exec('set GIT_TRACK_PACKET=2');
}


const userPath = path.join(__dirname, '../../user/');
const gh = new GitHub({
    username: config.username,
    password: config.password
});


async function pushRepo(callback) {
    const path = await _getRepoPath();
    _copyFile();
    console.log('Pushing repo...');
    return Git(path)
        .raw([
            'add',
            '--all'
        ])
        .commit(`Update on ${(new Date()).toLocaleString()}`)
        .push(['-u', 'origin', 'master'], callback)
}


async function getUserInfo() {
    const info = (await gh.getUser().getProfile()).data;
    const [avatar, name, mail, username] = [
        info.avatar_url,
        info.name,
        info.email,
        info.login
    ];
    setConfig({
        avatar: avatar,
        name: name,
        mail: mail,
        username: username
    });
    console.log('Get user info success.')
}


async function _getRepoPath() {
    const name = config.username;
    if (!fs.readdirSync(userPath).includes(`${name}.github.io`)) {
        if (await _isRepoExist()) {
            console.log('Cloning repo ...');
            await Git(userPath).clone(
                `https://github.com/${name}/${name}.github.io`,
                path.join(userPath, `/${name}.github.io`)
            );
            console.log('Clone repo success.')
        }
        else {
            await gh.getUser().createRepo({name: `${name}.github.io`});
            console.log('Create an new repo success.')
        }
    }
    return `${userPath}${name}.github.io`;
}


function _isRepoExist() {
    return new Promise((resolve, reject) => {
        gh.getUser().listRepos().then(repos => {
            let exist = false;
            for (repo of repos.data)
                if (repo.name.toLowerCase() ===
                    `${config.username}.github.io`.toLowerCase())
                    exist = true;
            resolve(exist);
        }).catch(error => reject(error))
    })
}


function _copyFile() {
    const name = config.username;
    const from = path.join(__dirname, '../../user/temp/');
    const to = `${userPath}${name}.github.io`;
    fs.existsSync(path.join(to, './articles')) &&
    fs.removeSync(path.join(to, './articles'));
    fs.existsSync(path.join(to, './statics')) &&
    fs.removeSync(path.join(to, './statics'));
    for (each of fs.readdirSync(from))
        fs.copySync(
            path.join(from, `./${each}`),
            path.join(to, `./${each}`)
        )
    db.backup();
}

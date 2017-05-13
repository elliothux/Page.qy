const fs = require('node-fs-extra');
const path = require('path');
const request = require('request');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const platform = require('os').platform();
const GitHub = require('github-api');
const Git = require('simple-git');
const config = require('./config');
const db = require('./db');


module.exports.pushRepo = pushRepo;
module.exports.getUserInfo = getUserInfo;
module.exports.updateRepo = updateRepo;



if (platform === 'win32') {
    exec('set GIT_CURL_VERBOSE=1');
    exec('set GIT_TRACK_PACKET=2');
}


const userPath = path.join(__dirname, '../../user/');
const gh = () => (
    new GitHub({
        username: config.get().username,
        password: config.get().password
    })
);


async function pushRepo() {
    const name = config.get().username;
    const path = await _getRepoPath();
    return new Promise((resolve, reject) => {
        Git(path)
            .pull('origin', 'master', (error) => {
                if (error) reject.error(error);
                console.log('Pull repo success.');
                _copyFile();
            })
            .raw([
                'add',
                '--all'
            ], (error) => {
                if (error) reject.error(error);
                console.log('Add files success.')
            })
            .commit(`Update on ${(new Date()).toLocaleString()}`, (error) => {
                if (error) reject.error(error);
                console.log('Pushing repo...');
            })
            .push([`https://${name}:${config.get().password}@github.com/${name}/${name}.github.io.git`], (error) => {
                if (error) reject.error(error);
                console.log('Push repo success.');
                resolve()
            });
    })
}


async function updateRepo() {
    if (fs.existsSync(await _getRepoPath())) {
        await Git(await _getRepoPath())
            .pull('origin', 'master')
    } else {
        console.log('Cloning repo ...');
        await Git(userPath).clone(
            `https://github.com/${name}/${name}.github.io`,
            path.join(userPath, `/${name}.github.io`)
        );
        console.log('Clone repo success.')
    }
}


async function getUserInfo() {
    const info = (await gh().getUser().getProfile()).data;
    const [avatar, name, mail, username] = [
        info.avatar_url,
        info.name,
        info.email,
        info.login
    ];
    config.set({
        avatar: avatar,
        name: name,
        mail: mail,
        username: username
    });
    await new Promise((resolve, reject) => {
        request.head(avatar, function(){
            request(avatar).pipe(fs.createWriteStream(
                path.join(userPath, './avatar.jpg')
            ))
                .on('close', resolve)
        });
    });
    console.log('Get user info success.');
    await _getRepoPath();
}


async function _getRepoPath() {
    const name = config.get().username;
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
            await gh().getUser().createRepo({name: `${name}.github.io`});
            console.log('Create an new repo success.')
        }
        return new Promise((resolve, reject) => {
            const repoPath = path.join(userPath, `./${name}.github.io/`);
            fs.writeFileSync(path.join(repoPath, './.temp'), (new Date()).toLocaleString(), 'utf-8');
            console.log('Start test push ...');
            exec(`cd ${repoPath} && git add --all`, error => {
                error && reject(error);
                execSync(`cd ${repoPath} && git commit -m 'Test Push'`);
                exec(`cd ${repoPath} && git push https://${name}:${config.get().password}@github.com/${name}/${name}.github.io.git`, error => {
                    error && reject(error);
                    console.log('Test push success.');
                    resolve()
                })
            })
        })
    }
    exec(`cd ./user/${config.get().username}.github.io && git config http.sslVerify "false"`);
    return `${userPath}${name}.github.io`;
}


function _isRepoExist() {
    return new Promise((resolve, reject) => {
        gh().getUser().listRepos().then(repos => {
            let exist = false;
            for (repo of repos.data)
                if (repo.name.toLowerCase() ===
                    `${config.get().username}.github.io`.toLowerCase())
                    exist = true;
            resolve(exist);
        }).catch(error => reject(error))
    })
}


function _copyFile() {
    const name = config.get().username;
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
}

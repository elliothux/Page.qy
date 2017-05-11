const fs = require('node-fs-extra');
const path = require('path');
const extract = require('extract-zip');
const download = require('download-file');
const request = require('request');
const preVersion = require('../../package.json').version;


module.exports.check = check;


const URL = "http://123.206.184.175/api/update";
const target = path.join(__dirname, "../../upgrade/");


// 开始检查更新
async function check() {
    fs.existsSync(target) && fs.removeSync(target);
    const info = JSON.parse(await _getData(URL));
    if (info.version === preVersion) return false;
    let filePath = await downloadFile(
        info.url, target, `v${info.version}.zip`);
    return info;
}

async function start() {
    console.log('Start updating...');

    filePath = await _extractUpdateFile(filePath);
    _getInstallPath(filePath).map(each => _installUpdate(each));
}


function _installUpdate(data) {
    const filePath = data.filePath;
    const installPath = data.installPath;
    fs.copySync(filePath, installPath, {overwrite: true});
}


function _getInstallPath(dirPath) {
    const fileList=[];
    fs.readdirSync(dirPath).map(file => {
        if (file === '.DS_Store') return;
        const realPath = path.join(dirPath, file);
        if (fs.lstatSync(realPath).isDirectory())
            _getInstallPath(realPath, fileList);
        else
            fileList.push(realPath)
    });
    return(fileList).map(filePath => ({
        filePath: filePath,
        installPath: path.join(__dirname, '../../', filePath.split('upgrade')[1])
    }))
}



function _extractUpdateFile(filePath) {
    return new Promise((resolve, reject) => {
        return extract(
            filePath,
            {dir: path.join(filePath, '../')},
            error => {
                if (error) reject(error);
                else {
                    resolve(path.join(filePath, '../'));
                    fs.unlink(filePath)
                }
            }
        )
    })
}


function _getData(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            error && reject(error);
            body && resolve(body);
        })
    })
}


// 传入 URL 、路径及文件名, 下载文件, 并返回文件路径
function _downloadFile(url, dirName, fileName) {
    return new Promise((resolve, reject) => {
        const options = {
            directory: dirName,
            filename: fileName
        };
        download(url, options, (error) => {
            if (error) reject(`Download file failed: ${error}`);
            resolve(`${options.directory}/${fileName}`);
        })
    })
}
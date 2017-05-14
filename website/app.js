'use strict';
const fs = require('fs');
const express = require('express');
const path = require('path');


const app = express();
app.use(require('morgan')('dev'));
app.use('/updates/releases', express.static(path.join(__dirname, 'releases')));
app.use(express.static(path.join(__dirname, './src')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/index.html'));
});
app.get('/api/update', (req, res) => {
    res.json(Object.assign(
        JSON.parse(fs.readFileSync('./package.json', 'utf-8')).update,
        { url: getUpdateUrl(req.query.platform)}
    ));
});
app.get('/download/win', (req, res) => {
    res.redirect(getDownloadURL('win32'));
});
app.get('/download/mac', (req, res) => {
    res.redirect(getDownloadURL('darwin'));
});
app.get('/download/linux', (req, res) => {
    res.redirect(getDownloadURL('linux'));
});


const getLatestRelease = () => {
    return JSON.parse(fs.readFileSync('./package.json', 'utf-8')).update.version;
};

const getUpdateUrl = (platform) => {
    if (JSON.parse(fs.readFileSync(
        './package.json', 'utf-8')).update.type === 'full')
        return getDownloadURL(platform);
    else
        return `http://oprticelb.bkt.clouddn.com/v${getLatestRelease()}.zip`
};

const getDownloadURL = (platform) => {
    const latest = JSON.parse(fs.readFileSync('./package.json', 'utf-8')).update.fullVersion;
    return {
        darwin: `http://oprticelb.bkt.clouddn.com/Page.qy-v${latest}.dmg`,
        win32: `http://oprticelb.bkt.clouddn.com/Page.qy-v${latest}.exe`,
        linux: `http://oprticelb.bkt.clouddn.com/Page.qy-v${latest}.zip`,
    }[platform]
};

app.listen(process.env.PORT, () => {
    console.log(`Express server listening on port ${process.env.PORT}`);
});

'use strict';
const fs = require('fs');
const express = require('express');
const path = require('path');


const app = express();
app.use(require('morgan')('dev'));
app.use('/updates/releases', express.static(path.join(__dirname, 'releases')));


app.get('/updates/latest', (req, res) => {
    const latest = getLatestRelease();
    const clientVersion = req.query.v;
    if (clientVersion === latest) {
        res.status(204).end();
    } else {
        res.json({
            url: getUpdateUrl('darwin', 'x64')
        });
    }
});


let getLatestRelease = () => {
    return JSON.parse(fs.readFileSync('./package.json', 'utf-8')).update.version;
};


let getUpdateUrl = (platform, arch) => {
    if (process.env.NODE_ENV === 'development')
        return 'http://localhost:3000';
    else
        return `http://oprticelb.bkt.clouddn.com/${platform}-${arch}-${getLatestRelease()}.zip`
};


app.listen(process.env.PORT, () => {
    console.log(`Express server listening on port ${process.env.PORT}`);
});
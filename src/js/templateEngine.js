const path = require('path');
const fs = require('node-fs-extra');


module.exports.parse = parse;


function parse(data, template) {
    let $;
    require('jsdom').env(template, (error, window) => {
        if (error)
            return console.error(error);
        $ = require("jquery")(window);
    });

    const match = $('*[@for*="of"]]');
    console.log(match);
    // const match = template.match(/\{\{(.|\s)+?\}\}/g);
    // for (each of match)
    //     home = home.replace(each, eval(each.replace(/(\{+|\}+)/g, '')))
}


function test() {
    const config = JSON.parse(fs.readFileSync(
        path.join(__dirname, '../../user/config.json'),
        'utf-8'
    ));
    const theme = path.join(__dirname, `../../user/themes/${config.theme}/`);
    const template = fs.readFileSync(
        path.join(theme, './templates/index.html'),
        'utf-8'
    );

    parse(null, template)
}

test();

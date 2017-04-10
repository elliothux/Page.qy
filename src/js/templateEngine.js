

module.exports.parse = parse;


function parse(data, template) {
    let $ = require('cheerio').load(template);
    const match = $('template');

    // const match = template.match(/\{\{(.|\s)+?\}\}/g);
    // for (each of match)
    //     home = home.replace(each, eval(each.replace(/(\{+|\}+)/g, '')))
}


function test() {
    const fs = require('fs');
    const path = require('path');
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

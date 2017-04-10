const $ = require('cheerio');

module.exports.parse = parse;


function parse(data, template) {
    const html = $.load(template);
    const match = html('template');
    if (match.length > 0) {
        const innerHTML = $.html(match[0].children);
        const attr = match[0].attribs['@for'];
        const a = attr.replace(/\s+of\s+.+/g, '');
        const b = attr.replace(/.+\s+of\s+/g, '');
        const exec = `
        for (${a} of data.${b}) {
            let temp = '';
            if ($.load(innerHTML('template') > 0)) {
                for (each of $.load(innerHTML('template')) {
                    temp += parse(${a}, $.html(each))
                }
            }
            console.log(${a});
        }`;
        eval(exec);
    }
    return $.html(html)

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
    const data = {
        'static': '',
        'script': '',
        'style': '',
        'link': ''
    };
    data.data = {
        avatar: 'test',
        archives: 'test',
        articles: [
            'test1',
            'test2'
        ],
        name: 'hu',
        username: 'huqingyang',
        selfIntroduction: 'test',
    };

    parse(data, template)
}

test();

const $ = require('cheerio');

module.exports.parse = parse;


function parse(rawData, template) {
    template = template.replace(/\<\!\-\-.*\-\-\>/g, '');
    with (rawData) {
        let templateDOM = $.load(template);
        let match = templateDOM('template');
        while (match.length > 0) {
            template = template.replace($.html(match[0]), (() => {
                const templateHTML = $.html(match[0].children);
                const attr = match[0].attribs['@for'];
                const a = attr.replace(/\s+of\s+.+/g, '');
                const b = attr.replace(/.+\s+of\s+/g, '');
                const aString = a;
                let temp = '';
                const exec = `for (${a} of ${b}) temp += parse(Object.assign({}, rawData, {${aString}: ${a}}), templateHTML)`
                eval(exec);
                return temp;
            })());

            templateDOM = $.load(template);
            match = templateDOM('template');
        }
    }

    return parseTemplate(rawData, template);
}


function parseTemplate(rawData, template) {
    with (rawData) {
        const match = template.match(/\{\{(.|\s)+?\}\}/g);
        if (match)
            for (each of match)
                template = template.replace(each, eval(each.replace(/(\{+|\}+)/g, '')));
        return template;
    }
}


function test() {
    const template = `
     <template @for="article of data">
        <a class="article">
            <h1 class="title">{{ article.title }}</h1>
            <ul class="tags">
                <template @for="tag of article.tags">
                    <li><a>#{{ tag }}</a></li>
                </template>
            </ul>
            <hr>
        </a>
    </template>
    `;
    const data = {
            data: [
                {
                    title: '1',
                    tags: ['test1_1', 'test1_2']
                },
                {
                    title: '2',
                    tags: ['test2_1', 'test2_2']
                }
            ]
    };
    return parse(data, template);
}

// console.log(test());
// test();
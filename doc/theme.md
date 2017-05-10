# 如何为Page.qy编写主题
## 1. 主题的文件结构
/—— Theme Name  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/—— script  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/—— statics  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/—— style  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/—— templates  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/—— about.html  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/—— archives.html  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/—— article.html  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/—— index.html  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/—— tags.html  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/—— info.json  

其中每个目录:
* script: 存放 js 文件 **(该目录可以为空, 但必须存在)**
* statics: 存放图标、图片、音频等静态资源 **(该目录可以为空, 但必须存在)**
* style: 存放 css 文件 **(该目录可以为空, 但必须存在)**
* templates: 存放HTML模板文件 **(必须)**
* info.json: 该主题的信息 **(必须)**

template 目录:
* about.html: “关于” 页面的模板文件 **(必须)**
* archives.html: “归档” 页面的模板文件 **(必须)**
* index.html: “首页” 的模板文件 **(必须)**
* tags.html: “标签” 页面的模板文件 **(必须)**

## 2. HTML模板
Page.qy的主题模块使用一个非常轻量级的HTML模板引擎, 要使用该模块非常简单: 

* 在HTML中使用 **”{{  }}”** 来引用值, 如:

```html
<p class="date">
    Written By {{ user.name }} on {{ createDate.month }}/{{ createDate.date }}
</p>
```
如果 user.name 的值为字符串 “Joe”, createDate的值为对象 { month: ’05’, date: ’16’ }, 则上面的语句将被模板引擎解析为:
```html
<p class="date">
    Written By Joe on 05/16
</p>
```

* 在HTML中的 **”\<template\>”标签** 中使用 **“@for”属性** 遍历值, 如:

```html
<div id="tags">
    <template @for="tag of tags">
        <a>#{{ tag }}</a>
    </template>
</div>
```
如果tags的值为数组 [“Hello”, “World”, “Page.qy”], 则上面的语句将被模板引擎解析为:
```html
<div id="tags">
    <a>#Hello</a>
    <a>#World</a>
    <a>#Page.qy</a>
</div>
```

## 3. 在模板中可以引用的值
### 1.在所有模板中可以引用的值
* language (Type: String; Value: “zh” || “en”): 用户的当前的设置的语言, 如:
```html
<a>{{ language === 'zh' ? '首页' : 'HOME' }}</a>
```

* links (Type: Object): 链接到其他页面的链接, 如:
```html
<div id="nav">
    <a id="navHome" href="{{ links.home }}">首页</a>
    <a href="{{ links.tags }}">标签</a>
    <a href="{{ links.archives }}">归档</a>
    <a href="{{ links.about }}">关于</a>
</div>
```

* script (Type: Object): script 目录中的 js 文件的真实资源地址, 如, 引入 script 目录下的 ‘common.js’ 文件:
```html
<script type="text/javascript" src="{{ script.common }}"></script>
```
**注意: 要引用 js 文件, 必须使用该方法!**

* statics (Type: Object): statics 目录中的静态文件的真实资源地址, 如, 引入 statics 目录下的 ‘nav.jpg’ 文件:
```html
<img src="{{ statics['nav.jpg'] }}">
```
**注意: 要引用静态文件, 必须使用该方法!**

* style (Type: Object): style 目录中的 css 文件的真实资源地址, 如, 引入 style 目录下的 ‘common.css’ 文件:
```html
<link type="text/css" rel="stylesheet" href="{{ style.common }}"/>
```
**注意: 要引用 css 文件, 必须使用该方法!**

* user (Type: Object): 用户的个人信息, 其值为: 
```js
{   
    avatar (Type: String): 用户 GitHub 账户的头像,
    name (Type: String): 用户 GitHub 账户的姓名,
    selfIntroduction (Type: String): 用户的自我介绍,
    username (Type: String): 用户 GitHub 账户的账户名,
    mail (Type: String): 用户 GitHub 账户的公开邮箱
}
```


### 2.在所有除 ”article.html” 之外的所有模板中可以引用的值
* articles (Type: Array): 所有的文章, 其中每个元素的值为一个存储一篇文章信息的对象, 该对象的值为:
```js
{
	cover(Type: String): 文章的封面 (可选)
	content(Type: String): 文章的内容,
	createDate(Type: Object, 请参阅: 日期对象): 文章的创建时间,
	editDate(Type: Object, 请参阅: 日期对象): 文章最近编辑的时间,
	introduction(Type: String): 文章的摘要
	tags(Type: Array): 文章的所有标签, 其中每个元素的值为一个表示文章标签的对象, 该对象的值为: 
	{
		name(Type: String): 该标签名,
		link(Type: String): 链接到所有该标签文章的链接
	},
	title(Type: String): 文章的标题,
	link(Type: String): 链接到该文章的链接
}
```
如: 
```html
<div id="articles">
    <template @for="article of articles">
        <div class="article">
            <a class="title" href="{{ article.link }}">{{ article.title }}</a>
            <div class="introduction">{{ article.introduction }}</div>
            <p class="date">Written on {{ article.createDate.month }}/{{ article.createDate.date }} {{ article.createDate.year }}</p>
            <ul class="tags">
                <template @for="tag of article.tags">
                    <li><a href="{{ tag.link }}">#{{ tag.name }}</a></li>
                </template>
            </ul>
            <hr>
        </div>
    </template>
</div>
```

* tags (Type: Array): 所有的标签信息, 其中每个元素的值为一个存储一个标签信息的对象, 该对象的值为:
```js
{
	name(Type: String): 该标签名,
	articles(Type: Array): 该标签的所有文章, 其中每个元素的值为一个存储一篇文章信息的对象 (该对象的值请参考: articles),
	link(Type: String): 链接到所有该标签文章的链接,
	id(Type: String): 用于在 "tags.html" 中指定链接到所有该标签文章的链接锚点
}
```
如:
```html
<div id="tags">
    <template @for="tag of tags">
        <h2 id="{{ tag.id }}">#{{ tag.name }}</h2>
        <template @for="article of tag.articles">
            <a href="{{ article.link }}"><h3>{{ article.title }}</h3></a>
        </template>
    </template>
</div>
```

* archives(Type: Array): 所有的归档信息, 其中每个元素的值为一个存储某一年的归档信息的对象, 该对象的值为:
```js
{ 
	year(Type: String): 该年的文字, 
	months(Type: Array): 该年所有月份的归档信息, 其中每个元素的值为一个存储该年某一月的归档信息的对象, 该对象的值为: 
	{
		month(Type: String): 该月份的文字,
		articles(Type: Array): 该月份的所有文章, 其中每个元素的值为一个存储一篇文章信息的对象 (该对象的值请参考: articles)
	}
}
```
如: 
```html
<div id="archives">
    <template @for="yearData of archives">
        <h1>YEAR {{ yearData.year }}</h1>
        <template @for="monthData of yearData.months">
            <h2>MONTH {{ monthData.month }}</h2>
            <template @for="article of monthData.articles">
                <a href="{{ article.link }}"><h3>{{ article.title }}</h3></a>
            </template>
        </template>
    </template>
</div>
```

### 3. 在 “article.html” 模板中可以引用的值
* cover(Type: String): 文章的封面 (当文章不存在封面时为false)
* content(Type: String): 文章的内容
* createDate(Type: Object, 请参阅: [日期对象](./#date)): 文章的创建时间
* editDate(Type: Object, 请参阅: 日期对象): 文章最近编辑的时间
* introduction(Type: String): 文章的摘要
* tags(Type: Array): 文章的所有标签, 其中每个元素的值为一个表示文章标签的对象, 该对象的值为: 
```js
{
	name(Type: String): 该标签名,
	link(Type: String): 链接到所有该标签文章的链接
}
```
* title(Type: String): 文章的标题,
* link(Type: String): 链接到该文章的链接
如: 
```html
<div id="header">
    <img src="{{ cover || statics['nav.jpg'] }}">
    <div id="nav">
        <a id="navHome" href="{{ links.home }}">HOME</a>
        <a href="{{ links.tags }}">TAGS</a>
        <a href="{{ links.archives }}">ARCHIVES</a>
        <a href="{{ links.about }}">ABOUT</a>
    </div>
    <h1 id="headTitle">{{ title }}</h1>
    <p id="introduction">Written By {{ user.name }}
        on {{ createDate.month }}/{{ createDate.date }} {{ createDate.year }}
    </p>
</div>
  
<ul id="tags">
    <template @for="tag of tags">
        <li><a href="{{ tag.link }}">#{{ tag.name }}</a></li>
    </template>
</ul>
  
<div id="content">{{ content }}</div>
```

<h3 id="date">4. 日期对象</h3>
为了方便的显示日期, Page.qy主题模板中所有引用的日期都为一个对象, 该对象的值为: 
```js
{ 
    year(Type: String): 年份,
    month(Type: String): 月份,
    date(Type: String): 日期,
    hours(Type: String): 小时,
    minutes(Type: String): 分钟,
    day(Type: String): 星期 
}
```

## 4. 代码高亮
Page.qy 使用 Highlight.js 实现代码高亮, 只需要在主题中引入相应的  css 主题文件。

## 5. info.json
主题的信息, 其有效的值为
* name(Type: String): 主题名
* version(Type: String): 版本
* author(Type: String [Optional]): 作者信息
* introduction(Type: String [optional]): 主题介绍

### 6. 打包主题
使用 zip 格式压缩主题文件即可。

### 7. 示例
参考: [Simple Blog](https://github.com/huqingyang/SimpleBlog)
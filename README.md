# Page.qy => 🤘 建立静态网站从未如此简单

## 1.简介
对于很多想要拥有自己网站的人, 大多数都会首先上网搜索”如何建立一个网站”, 然而基本上所有的答案都是下面几个标准的步骤: 申请域名 => 购买云服务器 => 在服务器上部署 Web 应用 (balabalabala…)。  
虽然前端与后端存在着大量优秀的 Web 框架, 软件工程师们可以很轻松地搭建起一个网站, 但这些步骤对于不会编程的人来说还是太困难了: 大多数人甚至不会在 Linux 系统下移动一个文件, 也不知道什么是 CSS 和 ES6 , 更不知道 Flask 和 express 有什么区别。很多人都会被网上(软件工程师们觉得超简单的)教程中大段大段的代码吓到, 然后选择放弃或者购买付费建站服务。  
然而大多数人只是需要一个可以记录、分享内容的简单的静态网站, 并不需要一个功能复杂的网站, 于是Page.qy应运而生!  
Page.qy 是一个一站式管理、生成、部署静态网站的工具, 只需要一个 GitHub 账号, 然后剩下你需要做的唯一事情就是网站本身的内容! 不需要写一行代码, 也不需要进行任何服务器操作!   

## 2.优点
💅 拒绝一成不变 => Page.qy 支持高度自定义的主题功能, 只需要安装并应用不同的主题, 就能为你生成完全不同风格的网站! (参考: 如何为Page.qy 编写主题)  
🚀 乘坐时间机器 => Page.qy 的 TimeMachine 功能支持完整的文档历史记录, 你可以随时轻松恢复到任何一次的保存记录!  
📦 不再丢失数据 => Page.qy 完整的备份/恢复功能保障你的数据足够安全!  
📂 文件自由导出 => Page.qy 依托于 GitHub Page 但并不限于此, 你完全可以自由地将所有页面作为文件导出并部署在你想要的地方!  
💻 所有平台可用 => Page.qy 适用于 macOS/Windows/Linux 平台, 且为各平台提供一致的体验!  
🌍 多种语言支持 => Page.qy 目前支持中/英文  
🤑 免费自由开源 => Page.qy 将网站部署在 GitHub Page, 感谢 GitHub 免费提供的服务! Page.qy 基于 React 、Electron、Node.js 等现代 Web 技术构建, 感谢为这些开源项目贡献源码的软件工程师, 你们的开源项目是 Page.qy 的基础! 同时, Page.qy 也开源在 GitHub 并接受 Issues 或共同开发!  

## 3.项目结构
│── build (项目打包所需文件)  
│── db	(用户数据库)  
│── dist (渲染进程中引入的JS文件)  
│   │── components (React 组件目录)  
│   │   │── App.js (根组件)  
│   │   │── Nav.js (导航栏)  
│   │   │── Preview.js (预览)  
│   │   │── Common (通用组件)  
│   │   │   │── Message.js (提示消息)  
│   │   │   └── Select.js (Select.js (替换丑陋的默认 \<select\>))   
│   │   │── Manage (管理模块)  
│   │   │   │── Article.js (文章)  
│   │   │   │── Editor.js (编辑)  
│   │   │   │── History (历史模块)  
│   │   │   │   │── History.js  
│   │   │   │   └── HistoryItem.js  
│   │   │   └── Manage.js\
│   │   │── Options (选项模块)\
│   │   │   │── About.js (关于)\
│   │   │   │── Options.js (选项)\
│   │   │   │── Setting.js (设置)\
│   │   │   └── Theme.js (主题管理)\
│   │── lib (渲染进程所需的JS库文件)\
│   │   └── eventProxy.js\
│   │── index.js	(主窗口)\
│   │── login.js (登录窗口)\
│   │── logout.js (登出窗口)\
│   └── uploading.js (上传窗口)\
│── src (项目资源文件)\
│   │── css (样式)\
│   │── fonts (字体)\
│   │── lib (后台进程所需的JS库文件)\
│   │── pic (图片)\
│   │── html (渲染进程的HTML文件)\
│   │   │── editor.html (编辑)\
│   │   │── index.html (主界面)\
│   │   │── login.html (登录界面)\
│   │   │── logout.html (登出界面)\
│   │   └── uploading.html (上传界面)\
│   │── js (后台进程引入的JS文件)\
│   │   │── config.js (管理用户配置)\
│   │   │── contentProcess.js (处理内容)\
│   │   │── dataToHTML.js (根据数据生成HTML)\
│   │   │── db.js (操作数据库)\
│   │   │── github.js (部署网站)\
│   │   │── menuTemplate.js (应用菜单栏)\
│   │   │── templateEngine.js (模板引擎)\
│   │   │── theme.js (管理主题)\
│   │   └── user.js (管理用户)\
│   │── index.build.js (打包的主窗口引入的JS文件)\
│   │── login.build.js (打包的登录口引入的JS文件)\
│   │── logout.build.js (打包的登出口引入的JS文件)\
│   └── uploading.build.js (打包的上传窗口引入的JS文件)\
│── user (用户文件)\
│   │── avatar.jpg (头像)\
│   │── config.json (用户配置)\
│   │── temp (临时文件)\
│   └── themes (主题文件)\
│── webpack.config.js (webpack配置)\
│── main.js (主进程)\
└── package.json (项目信息文件)

## 4. 技术栈
Page.qy 基于纯 JavaScript 技术开发。
前端使用 React, 采用 reactCSS 实现 css in js, 采用 react-addons-pure-render-mixin 来提升组件渲染速度, 富文本编辑器使用 wangEditor, 开发时使用 WebpackDevServer, 使用 babel 和 Webpack 打包 JS 文件。
后台使用 Node.js。HTML模板引擎采用 cheerio 结合正则表达式实现。考虑到Windows上的兼容性(依赖 C++ 的 Node 模块在 Windows 上有时执行 electron-rebuild 失败)数据库使用纯 JavaScript 实现的 nedb。Git 操作使用 simple-git 和 github-api。

前端 View 部分使用 React, 但是 model 部分没有使用 Redux, 因为最初对于 Page.qy 的定位是一个轻量级的工具, 但是后期开发中加入了太多(最初没想到又必不可少的)的功能, Redux 的重要性便逐渐显现出来, 后期可能会使用 Redux (或者Mobx?) 重构整个前端部分。
为了实现 React 组件间通信, 采用了 eventProxy 模式, 但是存在一些问题, 例如: 
在 HistoryItem 组件中存在一个initState() 方法, 用于切换到其他界面时初始化所有 HistoryItem 组件的实例的状态; 但是界面的切换是采用 eventProxy 监听消息实现的, 如果存在大量的 HistoryItem 的实例, 在切换界面时会出现错误:
`Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component.`
由于 React 还未及时销毁一些已经 unmounted 的 HistoryItem 实例, 这些实例中的 eventProxy 接收到消息并初始化该实例的状态而引发的错误; 正常情况下, 应该在组件中使用 componentWillUnmount() 方法取消订阅 eventProxy 的监听, 但是, 这样会取消其他组件中的相同的监听, 因此行不通; 最终只能选择采用一种很 Trick 的方法来避免这个错误: 检测`this._reactInternalInstance === undefined`, 因为在组件在 unmount 之前 _reactInternalInstance 的值为一个对象, unmount 之后该值为 undefined. 不过这种方法实在是下策; 优秀的解决方案应该是开发之前合理的设计!

后台进程中最有意思的是一个功能就是基于自定义主题的生成 HTMl (data + template => HTML)。为了实现这个功能, 写了一个轻量级的 HTML 静态模板引擎, 用于将静态的数据结合模板转为静态 HTML 文件。 目前, 这个引擎支持在模板中使用 “{{ }}” 引用值和在 “<template>” 标签中使用 “@for” 属性来遍历值, 如: 
模板中:
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
模板中:
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
模板引擎大概的实现思路为, 使用 with 语句将需要引用的值注入当前作用域, 解析模板, 使用正则表达式查找引用值并执行 eval(), 然后使用正则表达式将引用替换为 eval() 执行的结果。
这样就只需更改 data 和 模板, 就能拓展主题的功能!
目前的模板引擎目前还跟简单, 还有很多工作可以做...

Page.qy 会继续更新, 后期会加入 Markdown 支持。一直在寻找合适的编辑器, 如果没找到合适的, 可能会自己写(都说编辑器是神坑, 想尝试一下😂)…

Happy hacking!

#EOF

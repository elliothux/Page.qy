import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../../lib/eventProxy';



export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return (
        <div style={this.style().container}>
            <img
                style={this.style().logo}
                src={`${this.props.mainPath}/src/pic/logo.svg`}
            />
            {
                <div style={this.style().text}>
                    <p>🌟当前版本: Page.qy-v{this.props.version}</p><br/>
                    <p>Page.qy 致力于让每个不会编程的人都能轻松地免费建立专属自己的网站。Page.qy 适用于个人博客、在线文档等简单的静态网站。</p><br/>
                    <p>Page.qy 将网页代码托管于<a style={this.style().link} onClick={this.props.openURL.bind(null, 'https://pages.github.com/')}>
                        &nbsp;GitHub Pages </a>，感谢 GitHub 提供的服务。</p><br/>
                    <p>Page.qy 基于
                        <a style={this.style().link} onClick={this.props.openURL.bind(null, 'https://facebook.github.io/react/')}> React </a>、
                        <a style={this.style().link} onClick={this.props.openURL.bind(null, 'https://electron.atom.io/')}> Electron </a>
                        及<a style={this.style().link} onClick={this.props.openURL.bind(null, 'https://nodejs.org/en/')}> Node.js </a>
                        等现代 Web 技术构建, 感谢为这些开源项目贡献源码的软件工程师, 你们的开源项目是 Page.qy 的基础!
                    </p><br/>
                    <p>Page.qy开源并将代码托管在<a style={this.style().link} onClick={this.props.openURL.bind(null, 'https://github.com/HuQingyang/Page.qy')}>GitHub</a>,
                    欢迎Star、提交Issues或者参与共同开发。</p><br/>
                    <p>欢迎关注我的<a style={this.style().link} onClick={this.props.openURL.bind(null, 'https://www.zhihu.com/people/hu-qing-yang-67/activities')}>知乎</a>向我提交Bug或建议。</p>
                </div>
            }
            <button
                style={this.style().button}
                onClick={() => {
                    eventProxy.trigger('message',
                        this.props.language === 'zh' ?
                            '正在检查更新...' : 'Checking Update...');
                    eventProxy.trigger('checkUpdate');
                }}
            >{
                this.props.language === 'zh' ? '检查更新': 'Check Update'
            }
            </button>
            <a
                style={this.style().externalLink}
                onClick={this.props.openURL.bind(null, 'https://github.com/HuQingyang/Page.qy/blob/master/doc/theme.md')}
            >{
                this.props.language === 'zh' ? '💅 开发主题' : '💅 Develop Theme'
            }
            </a>
            <a
                style={this.style().externalLink}
                onClick={this.props.openURL.bind(null, 'http://123.206.184.175/')}
            >{
                this.props.language === 'zh' ? '🌏 访问网站' : '🌏 Visit Website'
            }
            </a>
            <a
                style={this.style().externalLink}
                onClick={this.props.openURL.bind(null, 'http://123.206.184.175/')}
            >
                {function () {
                    switch (this.props.platform) {
                        case 'darwin': return this.props.language === 'zh' ?
                            '💻 Windows/Linux版本' : '💻 Windows/Linux Version';
                        case 'win32': return this.props.language === 'zh' ?
                            '💻 macOS/Linux版本' : '💻macOS/Linux Version';
                        default: return this.props.language === 'zh' ?
                            '💻 macOS/Windows版本' : '💻 macOS/Windows VERSION';
                    }
                }.bind(this)()}
            </a>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: 'calc(33% - 50px)',
                height: 'calc(100% - 30px)',
                display: 'inline-block',
                padding: '15px 25px',
                boxShadow: '-10px 0 20px 0px rgba(0,0,0,0.08)',
                zIndex: 3,
                position: 'absolute',
                top: 0,
                left: '67%',
                overflowY: 'auto'
            },
            logo: {
                width: '70%',
                height: 'auto',
                marginBottom: '15px'
            },
            text: {
                fontSize: '0.9em',
                margin: '0 15px 25px 15px',
                letterSpacing: '0.05em',
                lineHeight: '20px',
                fontFamily: 'Merriweather'
            },
            link: {
                color: 'rgb(61, 144, 239)',
                cursor: 'pointer',
                textDecoration: 'underline'
            },
            externalLink: {
                color: 'black',
                cursor: 'pointer',
                textDecoration: 'underline',
                display: 'block',
                marginLeft: '15px',
                fontSize: '0.9em',
                letterSpacing: '0.05em',
            },
            button: {
                height: '30px',
                width: 'fit-content',
                padding: '0 15px',
                margin: '20px 15px',
                textAlign: 'center',
                lineHeight: '30px',
                borderRadius: '50px',
                display: 'block',
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 1) 0%, rgba(61, 144, 239, 1) 100%)',
                color: 'white',
                fontSize: '0.9em',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                boxShadow: '0px 4px 11px 1px rgba(0,0,0,0.21)',
                border: 'none',
                fontFamily: '-apple-system, system-ui, "Microsoft YaHei UI", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
            }
        }
    }, this.props, this.state)}
}
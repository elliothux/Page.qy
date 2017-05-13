Function.prototype.toString = Object.prototype.toString;


import React from 'react';
import ReactDOM from 'react-dom';
import reactCSS from 'reactcss';
import { remote, shell } from 'electron';


const user = remote.require('./main.js').user;
const config = remote.require('./main.js').config;
const reGenerateAll = remote.require('./main.js').dataToHTML.reGenerateAll;
const platform = remote.require('./main.js').platform;
const app = remote.app;
const openURL = shell.openExternal;
const gitLink = {
    darwin: "https://sourceforge.net/projects/git-osx-installer/files/git-2.13.0-intel-universal-mavericks.dmg/download?use_mirror=autoselect",
    win32: "https://github.com/git-for-windows/git/releases/download/v2.13.0.windows.1/Git-2.13.0-64-bit.exe",
    linux: "https://git-scm.com/download/linux"
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleOperate = this.handleOperate.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleRestore = this.handleRestore.bind(this);
        this.skipRestore = this.skipRestore.bind(this);
        this.restoreOnGitHub = this.restoreOnGitHub.bind(this);
        this.restoreOnLocal = this.restoreOnLocal.bind(this);
        this.handleQuit = this.handleQuit.bind(this);
        this.handleSetLanguage = this.handleSetLanguage.bind(this);
        this.handelSetIntroduction = this.handelSetIntroduction.bind(this);
        this.initIntroduction  = this.initIntroduction.bind(this);

        this.state = {
            status: 'language',
            selected: 'github',
            installed: false,
            language: this.props.config.get().language
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', function () {
            if(event.keyCode !== 13) return;
            if (this.state.status === 'init')
                this.handleOperate();
        }.bind(this))
    }

    async handleLogin() {
        this.setState({ status: 'login' });
        const username = this.refs.username.value.trim();
        const password = this.refs.password.value.trim();
        if (!username || !password) return;
        try {
            await this.props.user.login(username, password)
        } catch(error) {
            console.error(error);
            this.setState({ status: 'failed' });
            return this.props.user.logout();
        }
        this.setState({ status: 'select' })
    }

    handleSetLanguage() {
        config.set({
            language: this.state.language
        });
        this.setState({
            status: 'install'
        })
    }

    handleSelect(select) {
        this.setState({
            selected: select,
        })
    }

    restoreOnLocal() {
        const chooser = document.createElement('input');
        chooser.type = 'file';
        chooser.webkitdirectory = true;
        chooser.directory = true;
        chooser.multiple = true;
        chooser.addEventListener('change', async function (e) {
            const path = e.target.files[0].path;
            this.setState({ status: 'restore' });
            if (!await this.props.user.restore(path))
                return this.setState({ status: 'restoreFailed' });
            this.initIntroduction();
        }.bind(this));
        chooser.click();
    }

    async restoreOnGitHub() {
        if (!await this.props.user.restore())
            return this.setState({ status: 'restoreFailed' });
        this.initIntroduction();
    }

    skipRestore() {
        const confirm = window.confirm(this.state.language === 'zh' ?
            '真的要跳过恢复吗?\n如果你是第一次使用Page.qy则可以直接跳过.' :
            "Do you really want to skip to restore?\nIf it's your first using Page.qy you can just skip.");
        if (confirm)
            this.initIntroduction();
        else
            this.setState({ status: 'select' });
    }

    handleRestore() {
        if (this.state.selected === 'github')
            return this.restoreOnGitHub();
        if (this.state.selected === 'local')
            return this.restoreOnLocal();
        if (this.state.selected === 'skip')
            return this.skipRestore();
    }

    initIntroduction() {
        this.setState({
            status: 'introduction'
        });
        this.refs.introduction.focus();
        this.refs.introduction.value = this.props.config.get().selfIntroduction;
    }

    async handelSetIntroduction() {
        const value = this.refs.introduction.value.trim();
        if (!value) return;
        this.props.config.set({
            selfIntroduction: value
        });
        await this.props.reGenerateAll();
        this.props.app.relaunch();
        this.props.app.exit(0);
    }

    handleOperate() {
        switch (this.state.status) {
            case 'language': return this.handleSetLanguage();
            case 'install': return this.state.installed ? this.setState({status: 'init'}) : openURL(gitLink[platform]);
            case 'init': return this.handleLogin();
            case 'login': return this.setState({ status: 'init' });
            case 'failed': return this.handleLogin();
            case 'select': return this.handleRestore();
            case 'restore': return this.setState({ status: 'select' });
            case 'restoreFailed': return this.handleRestore();
            case 'introduction': return this.handelSetIntroduction();
        }
    }

    handleQuit() {
        this.props.user.logout();
        this.props.app.quit();
    }

    render() {return (
        <div>
            <p style={this.style().title}>
                {function () {
                    switch (this.state.status) {
                        case 'language':
                            return this.state.language === 'zh' ?
                                '🇨🇳 选择语言' : '🌎 LANGUAGE';
                        case 'install':
                            return this.state.language === 'zh' ?
                                '⚙ 安装 Git' : '⚙ INSTALL GIT';
                        case 'init':
                            return this.state.language === 'zh' ?
                                '🚀 登录' : '🚀 LOGIN';
                        case 'login':
                            return false;
                        case 'failed':
                            return this.state.language === 'zh' ?
                               '😢 登录失败!' : '😢 LOGIN FAILED!';
                        case 'select':
                            return this.state.language === 'zh' ?
                                '📦 恢复数据' : '📦 RESTORE DATA';
                        case 'restore': return false;
                        case 'restoreFailed':
                            return this.state.language === 'zh' ?
                                '😢 恢复失败!' : '😢 RESTORE FAILED!';
                        case 'introduction':
                            return this.state.language === 'zh' ?
                                '🖋 介绍一下你自己呗, 将会显示在你的网站(依据主题而定)' :
                                '🖋 Write Something About Yourself. It Will Show On Your Website (Depends On Your Theme)';
                    }
                }.bind(this)()}
            </p>
            <div style={this.style().languageArea}>
                <button
                    onClick={this.setState.bind(this, { language: 'zh' }, () => {})}
                    style={this.state.language === 'zh' ?
                        this.style().operateButtonSelected :
                        this.style().operateButton}
                >中文</button>
                <button
                    onClick={this.setState.bind(this, { language: 'en' }, () => {})}
                    style={this.state.language === 'en' ?
                        this.style().operateButtonSelected :
                        this.style().operateButton}
                >ENGLISH</button>
            </div>
            <p style={this.style().installText}>{this.state.language === 'zh' ?
                'Page.qy 需要 Git 才能运行, 你是否安装 Git?' : 'Git is required for Page.qy, install Git?'}
            </p>
            <div style={this.style().installArea}>
                <button
                    onClick={this.setState.bind(this, { installed: false }, () => {})}
                    style={!this.state.installed ?
                        this.style().operateButtonSelected :
                        this.style().operateButton}
                >
                    {this.state.language === 'zh' ?
                        '立即安装' : 'INSTALL NOW'}
                </button>
                <button
                    onClick={this.setState.bind(this, { installed: true }, () => {})}
                    style={this.state.installed ?
                        this.style().operateButtonSelected :
                        this.style().operateButton}
                >
                    {this.state.language === 'zh' ?
                        '我已安装' : 'I HAVE INSTALLED'}
                </button>
            </div>
            <div style={this.style().inputArea}>
                <input
                    ref="username"
                    type="text"
                    style={this.style().input}
                    placeholder={this.state.language === 'zh' ?
                        '输入GitHub用户名' : 'GITHUB USERNAME'}
                />
                <input
                    ref="password"
                    type="password"
                    style={this.style().input}
                    placeholder={this.state.language === 'zh' ?
                        '输入密码' : 'PASSWORD'}
                />
            </div>
            <div style={this.style().operateArea}>
                <button
                    onClick={this.handleSelect.bind(this, 'github')}
                    style={this.state.selected === 'github' ?
                        this.style().operateButtonSelected :
                        this.style().operateButton}
                >
                    {this.state.language === 'zh' ?
                        '使用GitHub恢复备份' : 'RESTORE DATA ON GITHUB'}
                </button>
                <button
                    onClick={this.handleSelect.bind(this, 'local')}
                    style={this.state.selected === 'local' ?
                        this.style().operateButtonSelected :
                        this.style().operateButton}
                >
                    {this.state.language === 'zh' ?
                        '恢复本地备份' : 'RESTORE DATA ON LOCAL'}
                </button>
                <button
                    onClick={this.handleSelect.bind(this, 'skip')}
                    style={this.state.selected === 'skip' ?
                        this.style().operateButtonSelected :
                        this.style().operateButton}
                >
                    {this.state.language === 'zh' ?
                        '跳过恢复' : 'SKIP'}
                </button>
            </div>
            <div style={this.style().loading} id="load">
                <div>G</div>
                <div>N</div>
                <div>I</div>
                <div>K</div>
                <div>R</div>
                <div>O</div>
                <div>W</div>
            </div>
            {function () {
                switch (this.state.status) {
                    case 'login':
                        return <p
                            style={this.style().messageText}
                            dangerouslySetInnerHTML={{ __html: this.state.language === 'zh' ?
                                `🏃 正在登陆并克隆你的GitHub.io仓库<br/>请稍等...` :
                                `🏃 Logging in and cloning your GitHub.io repository<br/>Waiting...`}}
                        />;
                    case 'restore':
                        return <p
                            style={this.style().messageText}
                            dangerouslySetInnerHTML={{ __html: this.state.language === 'zh' ?
                                `🏃 正在恢复备份, 请稍等...` :
                                `🏃 Restoring data. Please wait for a while...`}}
                        />;
                    default: return false
                }
            }.bind(this)()}
            <div style={this.style().buttonArea}>
                <button
                    style={this.style().button}
                    onClick={this.handleOperate}
                >
                    {function () {
                        switch (this.state.status) {
                            case 'language':
                                return this.state.language === 'zh' ? '继续' : 'CONTINUE';
                            case 'install':
                                return this.state.language === 'zh' ? '继续' : 'CONTINUE';
                            case 'init':
                                return this.state.language === 'zh' ? '登录' : 'LOGIN';
                            case 'login':
                                return this.state.language === 'zh' ? '取消' : 'CANCEL';
                            case 'restore':
                                return this.state.language === 'zh' ? '取消' : 'CANCEL';
                            case 'select':
                                return this.state.language === 'zh' ?
                                    '继续' : 'CONTINUE';
                            case 'failed':
                                return this.state.language === 'zh' ? '重试' : 'RETRY';
                            case 'restoreFailed':
                                return this.state.language === 'zh' ? '重试' : 'RETRY';
                            case 'introduction':
                                return this.state.language === 'zh' ? '确认' : 'CONTINUE'

                        }
                    }.bind(this)()}
                </button>
                <button
                    style={this.style().button}
                    onClick={this.handleQuit}
                >
                    {this.state.language === 'zh' ? '退出' : 'QUIT'}
                </button>
            </div>
            <textarea ref="introduction" type="text" style={this.style().introduction}/>
            <a
                id="signUp"
                style={this.style().signUp}
                onClick={function () {
                    this.props.openURL('https://github.com/join?source=header-home')
                }.bind(this)}
            >{this.state.language === 'zh' ?
                '没有GitHub账号?点击这里注册 👈' :
                'Have no GitHub Account? Click here to sign up 👈'}
            </a>
        </div>
    )}

    style() {return reactCSS({
        default: {
            title: {
                fontSize: this.state.status === 'introduction' ?
                    (this.state.language === 'zh' ? '1em' : '0.9em') : '1.3em',
                textAlign: 'center',
                color: 'white',
                width: '80%',
                margin: '35px 10%',
                letterSpacing: '0.06em'
            },
            messageText: {
                width: '80%',
                margin: '0 10%',
                textAlign: 'center',
                color: 'white',
                position: 'absolute',
                fontSize: '0.9em',
                top: '145px',
                letterSpacing: '0.05em',
                display: this.state.status === 'login' ||
                    this.state.status === 'restore' ?
                        'block' : 'none'
            },
            inputArea: {
                width: '40%',
                margin: '0 30%',
                display: this.state.status === 'init'  ||
                    this.state.status === 'failed' ?
                        'block' : 'none',
                position: 'absolute',
            },
            input: {
                width: 'calc(100% - 16px)',
                height: '25px',
                marginBottom: '20px',
                padding: '3px 8px',
                fontSize: '1em',
                border: 'none',
                borderBottom: '1px solid #63D9F4',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: 'white',
                fontWeight: 'lighter',
                letterSpacing: '0.04em',
                textAlign: 'center'
            },
            languageArea: {
                width: '40%',
                display: this.state.status === 'language' ?
                    'flex' : 'none',
                color: 'white',
                flexDirection: 'column',
                alignItems: 'center',
                flexWrap: 'wrap',
                position: 'absolute',
                top: '110px',
                left: '30%'
            },
            installText: {
                color: 'white',
                position: 'absolute',
                top: '70px',
                width: '100%',
                textAlign: 'center',
                display: this.state.status === 'install' ?
                    'block' : 'none',
                fontWeight: 'lighter'
            },
            installArea: {
                width: '40%',
                display: this.state.status === 'install' ?
                    'flex' : 'none',
                color: 'white',
                flexDirection: 'column',
                alignItems: 'center',
                flexWrap: 'wrap',
                position: 'absolute',
                top: '130px',
                left: '30%'
            },
            operateArea: {
                width: '40%',
                display: this.state.status === 'select' ||
                    this.state.status === 'restoreFailed' ?
                        'flex' : 'none',
                color: 'white',
                flexDirection: 'column',
                alignItems: 'center',
                flexWrap: 'wrap',
                position: 'absolute',
                top: '90px',
                left: '30%'
            },
            operateButton: {
                width: '92%',
                height: '30px',
                border: 'none',
                color: 'white',
                backgroundColor: 'rgba(54, 122, 209, 0.3)',
                cursor: 'pointer',
                fontSize: '0.7em',
                letterSpacing: '0.08em',
                marginBottom: '10px',
            },
            operateButtonSelected: {
                width: '92%',
                height: '30px',
                border: 'none',
                color: 'white',
                backgroundColor: 'rgba(54, 122, 209, 0.8)',
                cursor: 'pointer',
                fontSize: '0.7em',
                letterSpacing: '0.08em',
                marginBottom: '10px'
            },
            loading: {
                position: 'absolute',
                width: '100%',
                height: '80px',
                left: '40%',
                top: '60px',
                marginLeft: '-260px',
                overflow: 'visible',
                display: (this.state.status === 'login' ||
                    this.state.status === 'restore') ?
                        'block' : 'none'
            },
            buttonArea: {
                width: '36%',
                position: 'absolute',
                left: '32%',
                bottom: '45px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            button: {
                width: '42%',
                height: '30px',
                borderRadius: '30px',
                border: 'none',
                color: 'white',
                backgroundColor: 'rgba(54, 122, 209, 0.3)',
                cursor: 'pointer',
                fontSize: '0.7em',
                letterSpacing: '0.08em',
                transition: 'all ease 200ms'
            },
            introduction: {
                width: '80%',
                position: 'absolute',
                left: 'calc(10% - 15px)',
                top: '85px',
                height: '80px',
                padding: '15px',
                border: 'none',
                color: 'white',
                fontSize: '1.2em',
                textAlign: 'center',
                backgroundColor: 'rgba(54, 122, 209, 0.298039)',
                display: this.state.status === 'introduction' ?
                    'block' : 'none'
            },
            signUp: {
                color: 'white',
                fontSize: '0.7em',
                position: 'absolute',
                bottom: '10px',
                textAlign: 'center',
                textDecoration: 'underline',
                display: this.state.status === 'init' ?
                    'block' : 'none',
                width: '100%',
                cursor: 'pointer',
                fontWeight: 'lighter',
                letterSpacing: '0.05em'
            }
        }
    }, this.state, this.props)}
}


ReactDOM.render(
    <App
        config={config}
        user={user}
        app={app}
        openURL={shell.openExternal}
        reGenerateAll={reGenerateAll}
    />,
    document.getElementById('root')
);

Function.prototype.toString = Object.prototype.toString;


import React from 'react';
import ReactDOM from 'react-dom';
import reactCSS from 'reactcss';
import { remote } from 'electron';


const user = remote.require('./main.js').user;
const config = remote.require('./main.js').config;
const app = remote.app;


class App extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleOperate = this.handleOperate.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleRestore = this.handleRestore.bind(this);
        this.skipRestore = this.handleRestore.bind(this);
        this.restoreOnGitHub = this.restoreOnGitHub.bind(this);
        this.restoreOnLocal = this.restoreOnLocal.bind(this);
        this.handleQuit = this.handleQuit.bind(this);

        this.state = {
            status: 'init',
            selected: 'github'
        }
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

    handleSelect(select) {
        this.setState({
            selected: select
        })
    }

    restoreOnLocal() {
        const chooser = document.createElement('input');
        chooser.type = 'file';
        chooser.webkitdirectory = true;
        chooser.directory = true;
        chooser.multiple = true;
        chooser.addEventListener('change', function (e) {
            const path = e.target.files[0].path;
            this.setState({ status: 'restore' });
            if (!this.props.user.restore(path))
                return this.setState({ status: 'restoreFailed' });
            this.props.app.relaunch();
            this.props.app.exit(0);
        }.bind(this));
        chooser.click();
    }

    restoreOnGitHub() {
        if (!this.props.user.restore())
            return this.setState({ status: 'restoreFailed' });
        this.props.app.relaunch();
        this.props.app.exit(0);
    }

    handleRestore() {
        this.state.selected === 'github' &&
            this.restoreOnGitHub();
        this.state.selected === 'local' &&
            this.restoreOnLocal();
    }

    skipRestore() {
        const confirm = window.confirm(this.props.language === 'zh' ?
            '真的要跳过恢复吗?' :
            'Do you really want to skip restore?');
        if (confirm) {
            this.props.app.relaunch();
            this.props.app.exit(0);
        } else
            this.setState({ status: 'restoreFailed' });
    }

    handleOperate() {
        switch (this.state.status) {
            case 'init': return this.handleLogin();
            case 'failed': return this.handleLogin();
            case 'login': return this.setState({ status: 'init' });
            case 'select': return this.handleRestore();
            case 'restoreFailed': return this.handleRestore();
            case 'restore': return this.setState({ status: 'select' })
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
                        case 'init':
                            return this.props.language === 'zh' ?
                                '登录' : 'LOGIN';
                        case 'login':
                            return false;
                        case 'failed':
                            return this.props.language === 'zh' ?
                                '登录失败!' : 'LOGIN FAILED!';
                        case 'select':
                            return this.props.language === 'zh' ?
                                '恢复数据' : 'RESTORE DATA';
                        case 'restore': return false;
                        case 'restoreFailed':
                            return this.props.language === 'zh' ?
                                '恢复失败!' : 'RESTORE FAILED!';
                    }
                }.bind(this)()}
            </p>
            <div style={this.style().inputArea}>
                <input
                    ref="username"
                    type="text"
                    style={this.style().input}
                    placeholder={this.props.language === 'zh' ?
                        '输入GitHub用户名' : 'GITHUB USERNAME'}
                />
                <input
                    ref="password"
                    type="password"
                    style={this.style().input}
                    placeholder={this.props.language === 'zh' ?
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
                    {this.props.language === 'zh' ?
                        '使用GitHub恢复备份' : 'RESTORE DATA ON GITHUB'}
                </button>
                <button
                    onClick={this.handleSelect.bind(this, 'local')}
                    style={this.state.selected === 'local' ?
                        this.style().operateButtonSelected :
                        this.style().operateButton}
                >
                    {this.props.language === 'zh' ?
                        '恢复本地备份' : 'RESTORE DATA ON LOCAL'}
                </button>
                <button
                    onClick={this.handleSelect.bind(this, 'skip')}
                    style={this.state.selected === 'skip' ?
                        this.style().operateButtonSelected :
                        this.style().operateButton}
                >
                    {this.props.language === 'zh' ?
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
            <div
                onClick={this.handleOperate}
                style={this.style().buttonArea}
            >
                <button style={this.style().button}>
                    {function () {
                        switch (this.state.status) {
                            case 'failed':
                                return this.props.language === 'zh' ? '重试' : 'RETRY';
                            case 'restoreFailed':
                                return this.props.language === 'zh' ? '重试' : 'RETRY';
                            case 'init':
                                return this.props.language === 'zh' ? '登录' : 'LOGIN';
                            case 'login':
                                return this.props.language === 'zh' ? '取消' : 'CANCEL';
                            case 'restore':
                                return this.props.language === 'zh' ? '取消' : 'CANCEL';
                            case 'select':
                                return this.props.language === 'zh' ?
                                    '继续' : 'CONTINUE';

                        }
                    }.bind(this)()}
                </button>
                <button
                    style={this.style().button}
                    onClick={this.handleQuit}
                >
                    {this.props.language === 'zh' ? '退出' : 'QUIT'}
                </button>
            </div>
        </div>
    )}

    style() {return reactCSS({
        default: {
            title: {
                fontSize: '1.3em',
                textAlign: 'center',
                color: 'white',
                width: '100%',
                margin: '35px 0',
                letterSpacing: '0.06em'
            },
            inputArea: {
                width: '40%',
                margin: '0 30%',
                display: this.state.status === 'init'  ||
                    this.state.status === 'failed' ?
                        'block' : 'none'
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
            operateArea: {
                width: '40%',
                margin: '0 30%',
                display: this.state.status === 'select' ||
                    this.state.status === 'restoreFailed' ?
                        'flex' : 'none',
                color: 'white',
                flexDirection: 'column',
                alignItems: 'center',
                flexWrap: 'wrap'
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
                top: '100px',
                marginLeft: '-260px',
                overflow: 'visible',
                display: this.state.status === 'login' ?
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
        }
    }, this.state, this.props)}
}


ReactDOM.render(
    <App
        language={config.get().language}
        user={user}
        app={app}
    />,
    document.getElementById('root')
);

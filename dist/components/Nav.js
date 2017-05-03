import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../lib/eventProxy';


export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.handleToggleNav = this.handleToggleNav.bind(this);
        this.handleBackup = this.handleBackup.bind(this);
        this.handleRestore = this.handleRestore.bind(this);
        this.handleRegenerate = this.handleRegenerate.bind(this);

        this.state = {
            showOperate: false
        }
    }

    handleToggleNav() {
        const preValue = this.props.miniNav;
        this.props.config.set({
            miniNav: !preValue
        });
        this.setState({
            showOperate: false
        });
        eventProxy.trigger('miniNav', !preValue);
    }

    async handleRegenerate() {
        this.setState({
            showOperate: false
        });
        eventProxy.trigger('message',
            this.props.config.get().language === 'zh' ?
                '正在重新生成所有页面...' : 'Regenerating...'
        );
        await this.props.dataToHTML.reGenerateAll();
        eventProxy.trigger('message',
            this.props.config.get().language === 'zh' ?
                '完成!' : 'Done!'
        );
    }

    handleBackup() {
        this.setState({
            showOperate: false
        });
        const chooser = document.createElement('input');
        chooser.type = 'file';
        chooser.webkitdirectory = true;
        chooser.directory = true;
        chooser.multiple = true;
        chooser.addEventListener('change', function (e) {
            eventProxy.trigger('message',
                this.props.config.get().language === 'zh' ?
                    '正在备份...' : 'Backing up...'
            );
            const path = e.target.files[0].path;
            const target = this.props.user.backupOnLocal(path);
            target && this.props.shell.showItemInFolder(target);
        }.bind(this));
        chooser.click();
    }

    handleRestore() {
        this.setState({
            showOperate: false
        });
        const chooser = document.createElement('input');
        chooser.type = 'file';
        chooser.webkitdirectory = true;
        chooser.directory = true;
        chooser.multiple = true;
        chooser.addEventListener('change', function (e) {
            const path = e.target.files[0].path;
            if (!this.props.user.restore(path))
                return eventProxy.trigger('message',
                    this.props.config.get().language === 'zh' ?
                        '恢复失败!' : 'Restore Failed!'
                );
            this.props.app.relaunch();
            this.props.app.exit(0);
        }.bind(this));
        chooser.click();
    }

    render() {return(
        <div style={this.style().container}>
            <div
                style={this.style().userArea}
                onClick={this.props.openURL.bind(null,
                    `https://${this.props.config.get().username}.github.io`)}
            >
                <img
                    id="avatar"
                    style={this.style().userHead}
                    src="../../user/avatar.jpg"
                />
                <div style={this.style().userInfo}>
                    <p style={this.style().userName}>
                        {this.props.config.get().name ||
                            this.props.config.get().username}
                    </p>
                    <p style={this.style().userURL}>
                        {`${this.props.config.get().username}.github.io`}
                    </p>
                </div>
            </div>
            <div style={this.style().navArea}>
                <div
                    style={Object.assign({}, this.style().navButtonContainer,
                        this.props.mainView === 'preview' ?
                            {backgroundColor: 'rgba(0, 0, 0, 0.3)'} :
                            {backgroundColor: 'rgba(0, 0, 0, 0.1)'})}
                    onClick={this.props.handleViewChange.bind(null, 'preview')}
                >
                    <img style={this.style().navButtonImg} src="../../src/pic/previewNav.svg"/>
                    <p style={this.style().navBottomText}>
                        {this.props.config.get().language === 'zh' ? '预览' : 'PREVIEW'}
                    </p>
                </div>
                <div
                    style={Object.assign({}, this.style().navButtonContainer,
                        this.props.mainView === 'manage' ?
                            {backgroundColor: 'rgba(0, 0, 0, 0.3)'} :
                            {backgroundColor: 'rgba(0, 0, 0, 0.1)'})}
                    onClick={function () {
                        this.props.handleViewChange('manage');
                        this.props.mainView === 'manage' &&
                            eventProxy.trigger('closeEditor');
                    }.bind(this)}
                >
                    <img style={this.style().navButtonImg} src="../../src/pic/manageNav.svg"/>
                    <p style={this.style().navBottomText}>
                        {this.props.config.get().language === 'zh' ? '管理' : 'MANAGE'}
                    </p>
                </div>
                <div
                    style={Object.assign({}, this.style().navButtonContainer,
                        this.props.mainView === 'options' ?
                            {backgroundColor: 'rgba(0, 0, 0, 0.3)'} :
                            {backgroundColor: 'rgba(0, 0, 0, 0.1)'})}
                    onClick={this.props.handleViewChange.bind(null, 'options')}
                >
                    <img style={this.style().navButtonImg} src="../../src/pic/optionsNav.svg"/>
                    <p style={this.style().navBottomText}>
                        {this.props.config.get().language === 'zh' ? '选项' : 'OPTIONS'}
                    </p>
                </div>
            </div>
            <div style={this.style().operateContainer}>
                <div style={this.style().operates}>
                    <button
                        style={this.style().operate}
                        onClick={this.handleToggleNav}
                    >
                        {this.props.config.get().language === 'zh' ? '切换导航栏' : 'Toggle NavBar'}
                    </button>
                    <button
                        style={this.style().operate}
                        onClick={this.handleBackup}
                    >
                        {this.props.config.get().language === 'zh' ? '备份数据' : 'Backup'}
                    </button>
                    <button
                        style={this.style().operate}
                        onClick={this.handleRestore}
                    >
                        {this.props.config.get().language === 'zh' ? '恢复备份' : 'Restore Backup'}
                    </button>
                    <button
                        style={this.style().operate}
                        onClick={this.handleRegenerate}
                    >
                        {this.props.config.get().language === 'zh' ? '重新生成页面' : 'Regenerate Pages'}
                    </button>
                </div>
                <img
                    onClick={this.setState.bind(this,
                        { showOperate: !this.state.showOperate }, () => {})}
                    style={this.style().operateButton}
                    src="../../src/pic/toggleNav.svg"
                />
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: this.props.miniNav ?
                    '80px' : '200px',
                height: '100%',
                position: 'fixed',
                top: 0, left: 0,
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 1) 0%, rgba(61, 144, 239, 1) 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                letterSpacing: '0.15em',
                transition: 'all ease 800ms',
                zIndex: 3
            },
            userArea: {
                width: '100%',
                height: this.props.miniNav ?
                    '100px' : '200px',
                transition: 'all ease 300ms',
                cursor: 'pointer',
            },
            navArea: {
                width: '100%',
                height: '45%',
                display: 'flex',
                flexFlow: 'column wrap',
                justifyContent: 'space-between',
                transition: 'all ease 800ms',
            },
            userHead: {
                width: this.props.miniNav ?
                    '60px' : '80px',
                height: this.props.miniNav ?
                    '60px' : '80px',
                borderRadius: this.props.miniNav ?
                    '5px' : '10px',
                marginTop: '25px',
                marginLeft: this.props.miniNav ?
                    '9px' : '25px',
                cursor: 'pointer',
                transition: 'all ease 300ms',
            },
            userInfo: {
                width: 'calc(90% - 15px)',
                height: '45px',
                margin: '30px 0 0 5%',
                borderLeft: 'solid 5px white',
                paddingLeft: '15px',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                display: this.props.miniNav ?
                    'none' : 'flex',
            },
            userName: {
                fontSize: '1.3em',
                fontWeight: 'bold',
                cursor: 'pointer'
            },
            userURL: {
                fontSize: '0.6em',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                cursor: 'pointer'
            },
            navButtonContainer: {
                width: '100%',
                height: '23%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
            },
            navButtonImg: {
                width: 'auto',
                height: '48%',
                marginRight: this.props.miniNav ?
                    '0' : '20px',
                cursor: 'pointer',
                transition: 'all ease 300ms',
            },
            navBottomText: {
                fontSize: '1.3em',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: 'white',
                textDecoration: 'none',
                display: this.props.miniNav ?
                    'none' : 'block'
            },
            operateContainer: {
                margin: '0 0 40px 20px',
                position: 'relative'
            },
            operateButton: {
                width: '30px',
                height: 'auto',
                cursor: 'pointer',
                position: 'absolute',
                zIndex: 4
            },
            operates: {
                position: 'absolute',
                top: this.state.showOperate ? '-160px' : '40px',
                left: 0,
                transition: 'all ease 300ms',
                opacity: this.state.showOperate ? 1 : 0,
                zIndex: 3,
                width: '150px',
                boxShadow: '0px 3px 10px 1px rgba(0,0,0,0.21)',
            },
            operate: {
                width: '160px',
                height: '35px',
                backgroundColor: 'white',
                border: 'none',
                borderLeft: '5px solid rgb(0, 103, 210)',
                cursor: 'pinter',
                fontSize: '0.8em',
                fontWeight: 'bold',
                letterSpacing: '0.02em'
            }
        }
    }, this.props, this.state))}
}

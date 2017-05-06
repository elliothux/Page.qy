import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../../lib/eventProxy';


export default class Theme extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.installTheme = this.installTheme.bind(this);
        this.messageClient  = this.messageClient.bind(this);

        this.state = {
            themes: this.props.theme.getThemesList(),
        }
    }

    setTheme(theme) {
        eventProxy.trigger('message',
            this.props.config.get().language === 'zh' ?
                '⚡ 正在应用主题...' : '⚡ Applying Theme...');
        this.props.theme.set(theme).then(function () {
            this.setState(() => ({
                themes: this.props.theme.getThemesList()
            }));
            eventProxy.trigger('message',
                this.props.config.get().language === 'zh' ?
                    '✨ 主题应用成功!' : '✨ Apply Theme Success!');
            eventProxy.trigger('refreshPreview', null);
        }.bind(this));
    }

    installTheme(e) {
        if (e.target.files.length === 0) return;
        const path = e.target.files[0].path;
        this.props.theme.confirm(path, this.messageClient)
            .then(function () {
                this.setState(() => ({
                    themes: this.props.theme.getThemesList()
                }));
        }.bind(this))
    }

    messageClient(message, data) {
        if (message === 'error')
            return eventProxy.trigger('message',
                this.props.config.get().language === 'zh' ?
                    '😂 无效的主题包!' : '😂 Invalid Theme Package!'
            );
        if (message === 'done')
            return eventProxy.trigger('message',
                this.props.config.get().language === 'zh' ?
                    '🎉 主题安装完成!' : 'Install Theme Success!'
            );
        if (message === 'confirm') {
            let confirm;
            if (data.newVersion === data.preVersion) {
                confirm = window.confirm(
                    this.props.config.get().language === 'zh' ?
                        `主题 "${data.name}" 已安装\n要重新安装吗?`:
                        `Theme "${data.name}" is already exists\nReinstall?`
                );
            }
            else if (data.newVersion > data.preVersion)
                confirm = window.confirm(
                    this.props.config.get().language === 'zh' ?
                        `升级主题 "${data.name}" 吗?`:
                        `Upgrade Theme "${data.name}" ?`
                );
            else
                confirm = window.confirm(
                    this.props.config.get().language === 'zh' ?
                        `主题 "${data.name}" 的更高版本已安装\n要替换为更低的版本吗?`:
                        `The higher version of theme "${data.name}" has already installed\nDowngrade?`
                );
            confirm && this.props.theme.install(data.name)
                .then(function () {
                    eventProxy.trigger('message',
                        this.props.config.get().language === 'zh' ?
                            '🎉 安装完成!' : '🎉 Install Theme Success!'
                    )
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                    eventProxy.trigger('message',
                        this.props.config.get().language === 'zh' ?
                            '😢 安装失败!' : '😢 Install theme failed!'
                    )
                }.bind(this))
        }
    }

    render() {return (
        <div style={this.style().container}>
            <h1 style={this.style().title}>
                {this.props.config.get().language === 'zh' ? '主题' : 'THEME'}
            </h1>
            <div>
                {this.state.themes.map((theme, index) => (
                    <div
                        key={index}
                        style={Object.assign({}, this.style().theme,
                            theme.name === this.props.config.get().theme ?
                             {
                                 borderLeft: '6px solid #42A5F0',
                                 width: 'calc(100% - 36px)',
                             } : {}
                             )}
                        className="theme"
                    >
                        <h2 style={this.style().name}>{theme.name}</h2>
                        <p style={this.style().version}>
                            {this.props.config.get().language === 'zh' ? '版本: ' : 'Version: '}
                            {theme.version}
                        </p>
                        <p style={this.style().author}>
                            {this.props.config.get().language === 'zh' ? '作者: ' : 'Author: '}
                            {theme.author}
                        </p>
                        <p style={this.style().introduction}>
                            {theme.introduction ? theme.introduction : false}
                        </p>
                        <div
                            className="themeOperate"
                            style={this.style().operate}
                            onClick={theme.name === this.props.config.get().theme ?
                                null : this.setTheme.bind(null, theme.name)}
                        >
                            <img
                                style={this.style().operateImg}
                                src={this.props.mainPath + '/src/pic/ok.svg'}
                            />
                            <p style={this.style().operateText}>
                                {
                                    theme.name === this.props.config.get().theme ?
                                        this.props.config.get().language === 'zh' ? '已应用' : 'Applied':
                                        this.props.config.get().language === 'zh' ? '应用' : 'Apply'
                                }
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <label style={this.style().installButton}>
                {this.props.config.get().language === 'zh' ?
                    '安装主题' : 'Install Theme'}
                <input
                    onChange={this.installTheme}
                    accept=".zip" type="file" style={this.style().fileChooser}/>
            </label>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: 'calc(34% - 50px)',
                height: 'calc(100% - 30px)',
                overflowY: 'auto',
                display: 'inline-block',
                padding: '15px 25px',
                boxShadow: '-10px 0 20px 0px rgba(0,0,0,0.08)',
                zIndex: 2,
                position: 'absolute',
                top: 0,
                left: '33%'
            },
            title: {
                fontSize: '2em',
                letterSpacing: '0.1em',
                color: '#4A4A4A',
                marginBottom: '35px'
            },
            theme: {
                position: 'relative',
                width: 'calc(100% - 30px)',
                color: '#4A4A4A',
                marginBottom: '30px',
                cursor: 'pointer',
                padding: '8px 15px 5px 15px',
                boxShadow: 'rgba(0, 0, 0, 0.207843) 0px 4px 11px 1px',
                overflow: 'hidden'
            },
            name: {
                letterSpacing: '0.05em',
                marginBottom: '8px',
                cursor: 'pointer',
            },
            version: {
                letterSpacing: '0.05em',
                marginBottom: '5px',
                fontSize: '0.9em',
                color: 'gray',
                cursor: 'pointer',
            },
            author: {
                wordBreak: 'break-all',
                letterSpacing: '0.05em',
                marginBottom: '8px',
                fontSize: '0.9em',
                color: 'gray',
                cursor: 'pointer',
            },
            introduction: {
                letterSpacing: '0.05em',
                marginBottom: '5px',
                cursor: 'pointer',
                color: 'gray',
            },
            operate: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0, left: 0,
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 0.87) 0%, rgba(61, 144, 239, 0.92) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                justifyItems: 'center',
                cursor: 'pointer'
            },
            operateImg: {
                width: 'auto',
                height: '40px',
                cursor: 'pointer',
                marginTop: '15px'
            },
            operateText: {
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                marginBottom: '15px',
                letterSpacing: '0.05em'
            },
            installButton: {
                height: '35px',
                width: 'fit-content',
                padding: '0 20px',
                margin: '25px auto',
                textAlign: 'center',
                lineHeight: '35px',
                borderRadius: '50px',
                display: 'block',
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 1) 0%, rgba(61, 144, 239, 1) 100%)',
                color: 'white',
                fontSize: '1.2em',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                boxShadow: '0px 4px 11px 1px rgba(0,0,0,0.21)',
                border: 'none',
            },
            fileChooser: {
                left: '-9999px',
                position: 'absolute'
            }
        }
    }, this.props, this.state)}
}
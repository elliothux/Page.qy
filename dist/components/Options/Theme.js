import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../../lib/eventProxy';


export default class Theme extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.setTheme = this.setTheme.bind(this);

        this.state = {
            themes: this.props.theme.getThemesList(),
        }
    }

    setTheme(theme) {
        this.refs.operateText.innerHTML =
            this.props.config.get().language === 'zh' ?
                '重新生成页面...' : 'Setting theme...';
        this.props.theme.set(theme).then(function () {
            this.setState(() => ({
                themes: this.props.theme.getThemesList()
            }));
            this.refs.operateText.innerHTML =
                this.props.config.get().language === 'zh' ?
                    '应用' : 'Apply';
            eventProxy.trigger('refreshPreview', null)
        }.bind(this));
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
                            <p
                                ref="operateText"
                                style={this.style().operateText}
                            >
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
            }
        }
    }, this.props, this.state)}
}
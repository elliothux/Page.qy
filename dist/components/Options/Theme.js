import React from 'react';
import reactCSS from 'reactcss';


export default class Theme extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return (
        <div style={this.style().container}>
            <h1 style={this.style().title}>
                {this.props.config.language === 'zh' ? '主题' : 'THEME'}
            </h1>
            <div>
                {this.props.theme.getThemesList().map((theme, index) => (
                    <div key={index}
                         style={Object.assign({}, this.style().theme,
                             theme.name === this.props.config.theme ?
                                 {
                                     borderLeft: '6px solid #42A5F0',
                                     width: 'calc(100% - 36px)',
                                 } : {}
                         )}
                    >
                        <h2 style={this.style().name}>{theme.name}</h2>
                        <p style={this.style().version}>
                            {this.props.config.language === 'zh' ? '版本: ' : 'Version: '}
                            {theme.version}
                        </p>
                        <p style={this.style().author}>
                            {this.props.config.language === 'zh' ? '作者: ' : 'Author: '}
                            {theme.author}
                        </p>
                        <p style={this.style().introduction}>
                            {theme.introduction === '' ? false : theme.introduction}
                        </p>
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
                width: 'calc(100% - 30px)',
                color: '#4A4A4A',
                marginBottom: '30px',
                cursor: 'pointer',
                padding: '8px 15px 5px 15px',
                boxShadow: 'rgba(0, 0, 0, 0.207843) 0px 4px 11px 1px'
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
                fontWeight: 'lighter',
                marginBottom: '5px',
                fontStyle: 'italic',
                cursor: 'pointer',
            }
        }
    }, this.props, this.state)}
}
import React from 'react';
import reactCSS from 'reactcss';


export default class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return (
        <div style={this.style().container}>
            <h1 style={this.style().title}>SETTING</h1>
            <div style={this.style().buttonsContainer}>
                <div style={this.style().button}>使用中文</div>
                <div style={this.style().button}>Use Markdown</div>
            </div>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: 'calc(33% - 50px)',
                height: 'calc(100% - 30px)',
                display: 'inline-block',
                zIndex: 1,
                padding: '15px 25px',
                position: 'absolute',
                top: 0,
                left: 0
            },
            title: {
                fontSize: '2em',
                letterSpacing: '0.1em',
                color: '#4A4A4A'
            },
            buttonsContainer: {
                marginTop: '50px',
            },
            button: {
                height: '35px',
                width: 'fit-content',
                padding: '0 20px',
                margin: '20px 0',
                textAlign: 'center',
                lineHeight: '35px',
                borderRadius: '50px',
                display: 'block',
                backgroundImage: 'linear-gradient(-225deg, rgba(85, 203, 242, 1) 0%, rgba(61, 144, 239, 1) 100%)',
                color: 'white',
                fontSize: '1.2em',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                boxShadow: '0px 4px 11px 1px rgba(0,0,0,0.21)'
            }
        }
    }, this.props, this.state)}
}

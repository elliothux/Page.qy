import React from 'react';
import reactCSS from 'reactcss';


export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return (
        <div style={this.style().container}>
            <h1 style={this.style().title}>
                {this.props.config.get().language === 'zh' ? '关于' : 'ABOUT'}
            </h1>
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
                left: '67%'
            },
            title: {
                fontSize: '2em',
                letterSpacing: '0.1em',
                color: '#4A4A4A'
            }
        }
    }, this.props, this.state)}
}
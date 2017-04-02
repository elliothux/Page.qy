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
            },
            title: {
                fontSize: '2em',
                letterSpacing: '0.1em',
                color: '#4A4A4A'
            }
        }
    }, this.props, this.state)}
}

import React from 'react';
import reactCSS from 'reactcss';


export default class Options extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return (
        <div style={this.style().container}>
            <h1>Options</h1>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: '100%',
                backgroundColor: 'red',
            }
        }
    }, this.props, this.state)}
}
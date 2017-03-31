import React from 'react';
import reactCSS from 'reactcss';


export default class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return (
        <div style={this.style().container}>
            <h1>Preview</h1>
        </div>
    )}

    style() {return reactCSS({
        default: {
            container: {
                width: 'calc(100% - 200px)',
                marginLeft: '200px',
                backgroundColor: 'green'
            }
        }
    }, this.props, this.state)}
}
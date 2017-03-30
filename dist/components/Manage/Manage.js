import React from 'react';
import reactCSS from 'reactcss';
import Editor from './Editor';


export default class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div style={this.style().container}>
            <Editor/>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            container: {
                width: 'calc(100% - 200px)',
                marginLeft: '200px',
            }
        }
    }, this.state, this.props))}
}

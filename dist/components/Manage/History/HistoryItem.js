import React from 'react';
import reactCSS from 'reactcss';


export default class HistoryItem extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {return (
        <div>
            <p>{this.props.data.content}</p>
        </div>
    )}

    style() {return reactCSS({
        default: {

        }
    }, this.props, this.state)}
}
import React from 'react';
import reactCSS from 'reactcss';
import eventProxy from '../../lib/eventProxy';


export default class History extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {return(
        <div>

        </div>
    )}

    style() {return reactCSS({
        default: {

        }
    }, this.props, this.state)}
}
import React from 'react';
import reactCSS from 'reactcss';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div>

        </div>
    )}

    style() {return(reactCSS({
        default: {

        }
    }, this.props, this.state))}
}
